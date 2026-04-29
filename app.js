import express from "express";
import cors from "cors";
import morgan from "morgan";
import itemsRouter from "./routes/items.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    nombre: "Dragon Ball Blog API",
    version: "1.0.0",
    endpoints: {
      items: "/items",
      item: "/items/:id",
    },
  });
});

app.use("/items", itemsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
