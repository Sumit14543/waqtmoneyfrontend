import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, "public");

const imagesToCompress = [
  { name: "testimonals-img-4.jpg", maxWidth: 600, type: "jpeg" },
  { name: "testimonals-img-1.jpg", maxWidth: 600, type: "jpeg" },
  { name: "testimonals-img-3.jpg", maxWidth: 600, type: "jpeg" },
  { name: "testimonal-img-2.jpg", maxWidth: 600, type: "jpeg" },
  { name: "login-finance-hero.png", maxWidth: 1000, type: "png" },
  { name: "ashoka4-pillers.png", maxWidth: 600, type: "png" },
  { name: "aadharcard-img.png", maxWidth: 800, type: "png" },
  { name: "about-img.jpg", maxWidth: 800, type: "jpeg" },
  { name: "about1-img.jpg", maxWidth: 800, type: "jpeg" },
  { name: "landing_banner_img.png", maxWidth: 1000, type: "png" },
  { name: "waqt-money-logo-img.png", maxWidth: 300, type: "png" },
  { name: "waqt-money-logo-imgg.png", maxWidth: 300, type: "png" },
];

async function compressAll() {
  console.log("Starting image compression job...");
  for (const img of imagesToCompress) {
    const imgPath = path.join(PUBLIC_DIR, img.name);
    if (!fs.existsSync(imgPath)) {
      console.log(`File not found, skipping: ${img.name}`);
      continue;
    }

    try {
      const tempPath = path.join(PUBLIC_DIR, `temp_${img.name}`);
      const metadata = await sharp(imgPath).metadata();
      const originalSize = fs.statSync(imgPath).size;

      let pipeline = sharp(imgPath);

      // Resize only if original width is greater than maxWidth
      if (metadata.width && metadata.width > img.maxWidth) {
        pipeline = pipeline.resize({ width: img.maxWidthWithoutUpScaling || img.maxWidth });
      }

      // Compress based on type
      if (img.type === "jpeg") {
        pipeline = pipeline.jpeg({ quality: 75, progressive: true });
      } else if (img.type === "png") {
        pipeline = pipeline.png({ compressionLevel: 9, palette: true });
      }

      await pipeline.toFile(tempPath);

      // Overwrite original file
      fs.renameSync(tempPath, imgPath);
      const newSize = fs.statSync(imgPath).size;
      const reduction = (((originalSize - newSize) / originalSize) * 100).toFixed(1);

      console.log(
        `Optimized: ${img.name} | ${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(newSize / 1024).toFixed(1)}KB | Reduced: ${reduction}%`
      );
    } catch (err) {
      console.error(`Error processing ${img.name}:`, err);
    }
  }
  console.log("Image compression job complete!");
}

compressAll();
