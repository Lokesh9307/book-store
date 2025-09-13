import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: String,
  availability: String,
  rating: String,
  detailUrl: String,
  imageUrl: String,
});

export default mongoose.model("Book", bookSchema);
