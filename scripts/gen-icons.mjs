import sharp from "sharp";
import { mkdirSync, existsSync } from "fs";
import { resolve } from "path";

const src = resolve("public/favicon.png");
const out = resolve("public/icons");

if (!existsSync(src)) {
  console.error("favicon.png tidak ditemukan di public/");
  process.exit(1);
}

mkdirSync(out, { recursive: true });

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const PADDING = 0.03;

async function resizeWithPadding(inputPath, size) {
  const pad = Math.round(size * PADDING);
  const inner = size - pad * 2;
  return sharp(inputPath)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png();
}

for (const size of sizes) {
  await (await resizeWithPadding(src, size)).toFile(resolve(out, `icon-${size}x${size}.png`));
  console.log(`✓ icon-${size}x${size}.png`);
}

await (await resizeWithPadding(src, 180)).toFile(resolve("public/apple-touch-icon.png"));
console.log("✓ apple-touch-icon.png");

console.log("\nSemua icon berhasil digenerate.");
