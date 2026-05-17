const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// ─── Connect to MongoDB ───────────────────────────────────────
mongoose.connect("mongodb://localhost:27017/simpledb")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ─── Simple Item Model ────────────────────────────────────────
const Item = mongoose.model("Item", new mongoose.Schema({
  name:  { type: String, required: true },
  price: { type: Number, required: true },
}));

// ─── 4 APIs ───────────────────────────────────────────────────

// GET - get all items
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// POST - create a new item
app.post("/items", async (req, res) => {
  const item = await Item.create(req.body);
  res.status(201).json(item);
});

// PUT - update an item by id
app.put("/items/:id", async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// DELETE - delete an item by id
app.delete("/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(3000, () => console.log("🚀 Server running on port 3000"));