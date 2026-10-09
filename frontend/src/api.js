const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

// Error con el status y la lista de mensajes que manda el backend
export class ApiError extends Error {
  constructor(status, mensajes) {
    super(mensajes.join(' | '));
    this.status = status;
    this.mensajes = mensajes;
  }
}

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    // fetch solo falla así cuando no hay conexión / servidor apagado / CORS
    throw new ApiError(0, ['No se pudo conectar con el servidor. ¿Está encendido el backend?']);
  }

  if (res.status === 204) return null; // DELETE: no hay cuerpo

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const mensajes = Array.isArray(data?.message) ? data.message : [data?.message ?? 'Error desconocido'];
    throw new ApiError(res.status, mensajes);
  }
  return data;
}

export const api = {
  listar: () => request('/videos'),
  crear: (video) => request('/videos', { method: 'POST', body: JSON.stringify(video) }),
  actualizar: (id, cambios) =>
    request(`/videos/${id}`, { method: 'PATCH', body: JSON.stringify(cambios) }),
  eliminar: (id) => request(`/videos/${id}`, { method: 'DELETE' }),
};
