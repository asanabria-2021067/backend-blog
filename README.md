# Dragon Ball Blog API

API REST de blog tematico de Dragon Ball construida con Express 5, SQLite y Node.js.

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
npm run dev    # Desarrollo con hot reload (nodemon) - puerto 3001
npm start      # Produccion
```

## Endpoints

Base URL: `http://localhost:3001`

| Metodo | Ruta        | Descripcion              |
|--------|-------------|--------------------------|
| GET    | /items      | Obtener todos (desc ID)  |
| GET    | /items/:id  | Obtener por ID           |
| POST   | /items      | Crear nuevo articulo     |

### POST /items - Body

```json
{
  "title": "string (requerido)",
  "description": "string",
  "body": "string (contenido completo)",
  "image": "string (URL)",
  "category": "string (Batallas | Personajes | Transformaciones)",
  "rating": "number (0-5)"
}
```

## Datos Seed

12 articulos precargados:

- **Batallas**: Goku vs Freezer, Gohan vs Cell, Goku vs Vegeta, Goku vs Jiren
- **Personajes**: Goku, Vegeta, Piccolo, Gohan
- **Transformaciones**: Super Saiyan, Ultra Instinto, Super Saiyan Blue, Fusion

## Estructura

```
backend-blog/
  app.js            # Entry point + middleware
  database/
    db.js           # Conexion SQLite + schema + seeds
  routes/
    items.js        # CRUD items
```
