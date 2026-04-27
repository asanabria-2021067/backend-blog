# Backend Blog

API REST para blog construida con Express 5, SQLite y Node.js.

## Tech Stack

- **Express 5** - Framework HTTP
- **better-sqlite3** - Base de datos SQLite
- **morgan** - Logger de peticiones HTTP
- **cors** - Middleware CORS
- **nodemon** - Hot reload en desarrollo

## Instalacion

```bash
npm install
```

## Scripts

```bash
npm run dev    # Desarrollo con hot reload (nodemon)
npm start      # Produccion
```

## Endpoints

### Items

| Metodo | Ruta        | Descripcion          |
|--------|-------------|----------------------|
| GET    | /items      | Obtener todos        |
| GET    | /items/:id  | Obtener por ID       |
| POST   | /items      | Crear nuevo item     |

### POST /items - Body

```json
{
  "title": "string (requerido)",
  "description": "string",
  "image": "string (URL)",
  "category": "string",
  "rating": "number (0-5)"
}
```

## Estructura

```
backend-blog/
  app.js            # Entry point + middleware
  database/
    db.js           # Conexion SQLite + schema + seeds
  routes/
    items.js        # CRUD items
```
