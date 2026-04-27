import { Router } from "express";
import db from "../database/db.js";

const router = Router();

const getAll = db.prepare("SELECT * FROM items");
const getById = db.prepare("SELECT * FROM items WHERE id = ?");
const insertItem = db.prepare(`
  INSERT INTO items (title, description, image, category, rating)
  VALUES (@title, @description, @image, @category, @rating)
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
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

// POST /items
router.post("/", (req, res) => {
  const { title, description, image, category, rating } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const result = insertItem.run({
    title,
    description: description || null,
    image: image || null,
    category: category || null,
    rating: rating || 0,
  });

  const newItem = getById.get(result.lastInsertRowid);
  res.status(201).json(newItem);
});

export default router;
