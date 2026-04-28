import express from "express";
import cors from "cors";
import morgan from "morgan";
import itemsRouter from "./routes/items.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/items", itemsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
