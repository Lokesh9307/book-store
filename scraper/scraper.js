import axios from "axios";
import * as cheerio from "cheerio";
import mongoose from "mongoose";
import Book from "../backend/models/Book.js";
import connectDB from "../backend/config/db.js";

const BASE_URL = "https://books.toscrape.com/catalogue/";

async function scrapeBooks() {
  await connectDB();
  await Book.deleteMany({}); // clear old data

  let page = 1;
  let hasNext = true;

  while (hasNext) {
    const url = page === 1
      ? "https://books.toscrape.com/catalogue/page-1.html"
      : `https://books.toscrape.com/catalogue/page-${page}.html`;

    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      $(".product_pod").each(async (_, el) => {
        const title = $(el).find("h3 a").attr("title");
        const price = $(el).find(".price_color").text();
        const availability = $(el).find(".availability").text().trim();
        const rating = $(el).find(".star-rating").attr("class").split(" ")[1];
        const detailUrl = BASE_URL + $(el).find("h3 a").attr("href");
        const imageUrl =
          "https://books.toscrape.com/" + $(el).find("img").attr("src");

        const book = new Book({
          title,
          price,
          availability,
          rating,
          detailUrl,
          imageUrl,
        });

        await book.save();
      });

      hasNext = $(".next a").length > 0;
      page++;
    } catch (err) {
      console.error("Scraping stopped:", err.message);
      hasNext = false;
    }
  }

  console.log("Scraping completed!");
  process.exit(0);
}

scrapeBooks();
