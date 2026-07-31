import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, "public", "blog-assets");

async function convertToWebp() {
  console.log("Starting WebP conversion for blog images...");
  const files = fs.readdirSync(BLOG_DIR);

  for (const file of files) {
    if (file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg")) {
      const inputPath = path.join(BLOG_DIR, file);
      const webpName = file.replace(/\.(png|jpg|jpeg)$/, ".webp");
      const outputPath = path.join(BLOG_DIR, webpName);

      try {
        const originalSize = fs.statSync(inputPath).size;
        await sharp(inputPath)
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);

        const newSize = fs.statSync(outputPath).size;
        console.log(`Converted: ${file} -> ${webpName} | ${(originalSize/1024).toFixed(1)}KB -> ${(newSize/1024).toFixed(1)}KB`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
  console.log("WebP conversion completed!");
}

convertToWebp();
