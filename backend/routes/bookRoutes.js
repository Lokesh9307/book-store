import express from "express";
import { getBooks, getBookById } from "../controllers/bookControllers.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);


// Trigger scraper manually
router.post("/refresh", async (req, res) => {
  try {
    await runScraper();
    res.json({ message: "Scraper run successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to run scraper", error: err.message });
  }
});

export default router;