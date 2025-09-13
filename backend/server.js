import express from "express";
import cors from "cors";   // ✅ Import cors
import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js"; // ✅ make sure casing matches actual file
import dotenv from "dotenv";
dotenv.config();

const app = express();
connectDB();

// ✅ Enable CORS for all requests
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("📚 Book Explorer API running"));
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
