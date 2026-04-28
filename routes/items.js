import { Router } from "express";
import db from "../database/db.js";

const router = Router();

const getAll = db.prepare("SELECT * FROM items ORDER BY id DESC");
const getById = db.prepare("SELECT * FROM items WHERE id = ?");
const insertItem = db.prepare(`
  INSERT INTO items (title, description, body, image, category, rating)
  VALUES (@title, @description, @body, @image, @category, @rating)
`);

// GET /items
router.get("/", (req, res) => {
  const items = getAll.all();
  res.json(items);
});

// GET /items/:id
router.get("/:id", (req, res) => {
  const item = getById.get(req.params.id);
  if (!item) {
    return res.status(404).json({ error: "Articulo no encontrado" });
  }
  res.json(item);
});

// POST /items
router.post("/", (req, res) => {
  const { title, description, body, image, category, rating } = req.body;

  if (!title) {
    return res.status(400).json({ error: "El titulo es obligatorio" });
  }

  if (rating !== undefined && (rating < 0 || rating > 5)) {
    return res.status(400).json({ error: "El rating debe estar entre 0 y 5" });
  }

  const result = insertItem.run({
    title,
    description: description || null,
    body: body || null,
    image: image || null,
    category: category || null,
    rating: rating ?? 0,
  });

  const newItem = getById.get(result.lastInsertRowid);
  res.status(201).json(newItem);
});

export default router;
