import Database from "better-sqlite3";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, "blog.db");

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image TEXT,
    category TEXT,
    rating INTEGER DEFAULT 0
  )
`);

const count = db.prepare("SELECT COUNT(*) AS total FROM items").get();

if (count.total === 0) {
  const insert = db.prepare(`
    INSERT INTO items (title, description, image, category, rating)
    VALUES (@title, @description, @image, @category, @rating)
  `);

  insert.run({
    title: "Getting Started with Node.js",
    description: "A beginner-friendly guide to building server-side applications with Node.js.",
    image: "https://picsum.photos/seed/nodejs/600/400",
    category: "Technology",
    rating: 5,
  });

  insert.run({
    title: "Understanding REST APIs",
    description: "Learn the fundamentals of RESTful API design and best practices.",
    image: "https://picsum.photos/seed/restapi/600/400",
    category: "Development",
    rating: 4,
  });
}

export default db;
