import { useEffect, useState } from 'react';
import { api, ApiError } from './api.js';
import VideoForm from './VideoForm.jsx';

const formatoDuracion = (seg) => {
  const m = Math.floor(seg / 60);
  const s = seg % 60;
  return `${m}:${String(s).padStart(2, '0')} min`;
};

export default function App() {
  const [videos, setVideos] = useState([]);
  const [cargando, setCargando] = useState(true); // carga inicial de la lista
  const [guardando, setGuardando] = useState(false); // POST / PATCH en curso
  const [eliminandoId, setEliminandoId] = useState(null); // DELETE en curso
  const [editando, setEditando] = useState(null);
  const [exito, setExito] = useState('');
  const [error, setError] = useState(null); // { status, mensajes }

  const mostrarError = (e) => {
    setExito('');
    setError(
      e instanceof ApiError
        ? { status: e.status, mensajes: e.mensajes }
        : { status: 0, mensajes: ['Error inesperado'] },
    );
  };

  const cargar = async () => {
    setCargando(true);
    setError(null);
    try {
      setVideos(await api.listar());
    } catch (e) {
      mostrarError(e);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardar = async (payload) => {
    setGuardando(true);
    setError(null);
    setExito('');
    try {
      if (editando) {
        // La UI se actualiza con lo que respondió la API (no con lo que escribió el usuario)
        const actualizado = await api.actualizar(editando.id, payload);
        setVideos((prev) => prev.map((v) => (v.id === actualizado.id ? actualizado : v)));
        setExito(`Video "${actualizado.titulo}" actualizado (200 OK)`);
        setEditando(null);
      } else {
        const creado = await api.crear(payload);
        setVideos((prev) => [...prev, creado]);
        setExito(`Video "${creado.titulo}" creado (201 Created)`);
      }
      return true;
    } catch (e) {
      mostrarError(e);
      return false;
    } finally {
      setGuardando(false);
    }
  };

  const eliminar = async (video) => {
    if (!window.confirm(`¿Eliminar "${video.titulo}"?`)) return;
    setEliminandoId(video.id);
    setError(null);
    setExito('');
    try {
      await api.eliminar(video.id); // si no lanza error, la API confirmó (204)
      setVideos((prev) => prev.filter((v) => v.id !== video.id));
      if (editando?.id === video.id) setEditando(null);
      setExito(`Video "${video.titulo}" eliminado (204 No Content)`);
    } catch (e) {
      mostrarError(e);
      // Si ya no existía en el servidor (404), la lista local estaba desactualizada
      if (e.status === 404) setVideos((prev) => prev.filter((v) => v.id !== video.id));
    } finally {
      setEliminandoId(null);
    }
  };

  const empezarEdicion = (v) => {
    setEditando(v);
    setError(null);
    setExito('');
  };

  return (
    <main>
      <header>
        <h1>🎮 Canal Gaming</h1>
        <p>Administrador de videos (React + NestJS)</p>
      </header>

      {exito && (
        <div className="aviso exito" role="status">
          ✅ {exito}
        </div>
      )}
      {error && (
        <div className="aviso error" role="alert">
          <strong>❌ Error {error.status || 'de red'}</strong>
          <ul>
            {error.mensajes.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="layout">
        <VideoForm
          editando={editando}
          guardando={guardando}
          onSubmit={guardar}
          onCancelar={() => setEditando(null)}
        />

        <section className="card">
          <div className="titulo-lista">
            <h2>Videos ({videos.length})</h2>
            <button className="secundario" onClick={cargar} disabled={cargando}>
              Recargar
            </button>
          </div>

          {cargando && <p className="cargando">Cargando videos...</p>}
          {!cargando && videos.length === 0 && !error && <p>No hay videos todavía. ¡Crea el primero!</p>}

          <ul className="lista">
            {videos.map((v) => (
              <li key={v.id} className={editando?.id === v.id ? 'activo' : ''}>
                <div>
                  <strong>{v.titulo}</strong>
                  <div className="meta">
                    {v.juego} · {formatoDuracion(v.duracionSegundos)} ·{' '}
                    <span className={`estado ${v.estado}`}>{v.estado}</span>
                  </div>
                  {v.etiquetas.length > 0 && (
                    <div className="etiquetas">
                      {v.etiquetas.map((t) => (
                        <span key={t}>#{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="acciones">
                  <button className="secundario" onClick={() => empezarEdicion(v)}>
                    Editar
                  </button>
                  <button className="peligro" onClick={() => eliminar(v)} disabled={eliminandoId === v.id}>
                    {eliminandoId === v.id ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
