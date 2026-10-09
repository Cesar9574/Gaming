# Canal Gaming – API de videos (NestJS) + interfaz React

Tarea: API HTTP validada con NestJS y una interfaz React que usa su contrato.
Recurso elegido: **videos** de un canal de gaming. Los datos viven **en memoria**
(no hay base de datos; al reiniciar el backend se vuelven a cargar 2 videos de ejemplo).

## Estructura

```
backend/    NestJS (módulo videos: controlador, servicio, DTOs, filtro de errores)
frontend/   React + Vite
```

## Cómo ejecutarlo

Requisitos: Node.js 18 o superior.

**1. Backend** (puerto 3000)

```bash
cd backend
npm install
npm run start        # o: npm run start:dev  (recarga automática)
```

- API: http://localhost:3000/videos
- Documentación OpenAPI (Swagger): http://localhost:3000/docs

**2. Frontend** (puerto 5173)

```bash
cd frontend
npm install
npm run dev
```

Abrir http://localhost:5173

> El backend acepta CORS **solo** desde `http://localhost:5173` (origen exacto).
> Se puede cambiar con la variable `FRONTEND_ORIGIN` (ver `backend/.env.example`).
> La URL de la API en el frontend se cambia con `VITE_API_URL` (ver `frontend/.env.example`).

## Modelo `Video`

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | UUID | lo genera el servidor |
| `titulo` | string | requerido, 3–80 caracteres, **único** (sin importar mayúsculas) |
| `juego` | string | requerido, 2–50 caracteres |
| `duracionSegundos` | entero | requerido, 1–43200 |
| `estado` | `"borrador"` \| `"publicado"` | opcional, por defecto `borrador` |
| `etiquetas` | string[] | opcional, máx. 5, cada una de 2–20 caracteres |
| `creadoEn`, `actualizadoEn` | fecha ISO | los maneja el servidor |

## Rutas

| Método | Ruta | Descripción | Éxito |
|---|---|---|---|
| GET | `/videos` | Lista todos los videos | 200 |
| GET | `/videos/:id` | Detalle de un video | 200 |
| POST | `/videos` | Crea un video | 201 |
| PATCH | `/videos/:id` | Actualización parcial | 200 |
| DELETE | `/videos/:id` | Elimina un video | 204 (sin cuerpo) |

No se implementó `PUT` (es opcional en la tarea).

## Códigos de estado y por qué se usan

| Código | Cuándo |
|---|---|
| **200 OK** | GET (lista y detalle) y PATCH exitosos: se devuelve el recurso. |
| **201 Created** | POST exitoso: se creó un recurso nuevo y se devuelve completo (con `id`). |
| **204 No Content** | DELETE exitoso: ya no hay recurso que devolver, por eso no hay cuerpo. |
| **400 Bad Request** | Datos faltantes, tipos incorrectos, restricciones incumplidas, propiedades desconocidas (`forbidNonWhitelisted`) o `:id` que no es UUID. |
| **404 Not Found** | El `id` tiene formato válido pero no existe (GET detalle, PATCH, DELETE). |
| **409 Conflict** | El título ya lo usa otro video (POST o PATCH): la petición es válida pero choca con el estado actual. |

No se provoca ningún 500 a propósito. Si ocurriera un error inesperado, el filtro global lo
responde como 500 genérico sin exponer detalles internos.

## Formato de errores (siempre igual)

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": ["titulo debe tener entre 3 y 80 caracteres", "property hack should not exist"],
  "path": "/videos",
  "timestamp": "2026-10-08T21:43:55.078Z"
}
```

`message` es **siempre un arreglo**, aunque tenga un solo mensaje.

## Decisiones de diseño

- `ValidationPipe` global con `whitelist`, `forbidNonWhitelisted` y `transform`.
- Se usan excepciones estándar de Nest (`NotFoundException`, `ConflictException`); no se usa `@Res()`.
- `UpdateVideoDto` extiende `PartialType(CreateVideoDto)`: reutiliza las mismas validaciones.
- `HttpErrorFilter` solo unifica la forma del cuerpo de error; no cambia los códigos.
- El frontend no valida antes de enviar a propósito: muestra los errores reales del servidor.
- La interfaz se actualiza con la respuesta confirmada de la API (el objeto devuelto por POST/PATCH,
  y solo se quita un video de la lista cuando el DELETE responde 204).

## Probar rápido con curl

```bash
# Solicitud inválida -> 400
curl -i -X POST http://localhost:3000/videos -H "Content-Type: application/json" \
  -d '{"titulo":"a","juego":5,"duracionSegundos":"abc","hack":true}'

# Título repetido -> 409
curl -i -X POST http://localhost:3000/videos -H "Content-Type: application/json" \
  -d '{"titulo":"Reacciono a mis peores sustos","juego":"Varios","duracionSegundos":60}'
```
