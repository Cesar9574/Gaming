import { useEffect, useState } from 'react';

const VACIO = { titulo: '', juego: '', duracionSegundos: '', estado: 'borrador', etiquetas: '' };

// Si llega "editando", el formulario se rellena y envía un PATCH; si no, es un POST
export default function VideoForm({ editando, guardando, onSubmit, onCancelar }) {
  const [form, setForm] = useState(VACIO);

  useEffect(() => {
    if (editando) {
      setForm({
        titulo: editando.titulo,
        juego: editando.juego,
        duracionSegundos: String(editando.duracionSegundos),
        estado: editando.estado,
        etiquetas: editando.etiquetas.join(', '),
      });
    } else {
      setForm(VACIO);
    }
  }, [editando]);

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    // Se manda tal cual lo escribió el usuario (sin validar aquí a propósito):
    // la validación real es la del servidor y así se ven sus errores 400.
    const etiquetas = form.etiquetas
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = {
      titulo: form.titulo,
      juego: form.juego,
      duracionSegundos: form.duracionSegundos === '' ? undefined : Number(form.duracionSegundos),
      estado: form.estado,
      etiquetas,
    };
    const ok = await onSubmit(payload);
    if (ok && !editando) setForm(VACIO);
  };

  return (
    <form className="card form" onSubmit={enviar} noValidate>
      <h2>{editando ? 'Editar video' : 'Nuevo video'}</h2>

      <label>
        Título
        <input name="titulo" value={form.titulo} onChange={cambiar} placeholder="Ej: Nivel tres sin morir" />
      </label>
      <label>
        Juego
        <input name="juego" value={form.juego} onChange={cambiar} placeholder="Ej: Roblox" />
      </label>
      <label>
        Duración (segundos)
        <input name="duracionSegundos" value={form.duracionSegundos} onChange={cambiar} placeholder="Ej: 600" />
      </label>
      <label>
        Estado
        <select name="estado" value={form.estado} onChange={cambiar}>
          <option value="borrador">borrador</option>
          <option value="publicado">publicado</option>
        </select>
      </label>
      <label>
        Etiquetas (separadas por coma)
        <input name="etiquetas" value={form.etiquetas} onChange={cambiar} placeholder="terror, gameplay" />
      </label>

      <div className="acciones">
        <button type="submit" disabled={guardando}>
          {guardando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Crear video'}
        </button>
        {editando && (
          <button type="button" className="secundario" onClick={onCancelar} disabled={guardando}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
