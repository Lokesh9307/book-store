import { exec } from "child_process";
import path from "path";

export const runScraper = () => {
  return new Promise((resolve, reject) => {
    const scraperPath = path.join(process.cwd(), "../scraper/scraper.js");

    exec(`node ${scraperPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Scraper error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`⚠️ Scraper stderr: ${stderr}`);
      }
      console.log(`✅ Scraper finished:\n${stdout}`);
      resolve(stdout);
    });
  });
};
