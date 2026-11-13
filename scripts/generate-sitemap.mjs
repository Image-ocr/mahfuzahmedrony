import { readdirSync, writeFileSync } from "node:fs";
import { resolve, extname, basename } from "node:path";

const BASE_URL = "https://mahfuzahmedrony.lovable.app";
const SITE_ROUTES = [
  ["/", "2026-04-25"],
  ["/about", "2026-04-25"],
  ["/capabilities", "2026-04-25"],
  ["/education", "2026-04-25"],
  ["/projects", "2026-04-25"],
  ["/experience", "2026-04-25"],
  ["/contact", "2026-04-25"],
];

const IMAGE_CAPTIONS = {
  "mahfuz-ahmed-rony.jpg": "Portrait of Mahfuz Ahmed Rony wearing sunglasses and a dark suit",
  "rony-portfolio-hero.webp": "Illustrated portrait of Mahfuz Ahmed Rony wearing sunglasses and a suit",
  "jurismind-ai-project.webp": "JurisMind AI legal technology project",
  "messwallet-project.webp": "MessWallet shared-expense management project",
  "islamic-university-logo.webp": "Islamic University logo",
  "savar-cantonment-public-school-college-logo.webp": "Savar Cantonment Public School & College logo",
  "savar-cantonment-board-boys-high-school-logo.webp": "Savar Cantonment Board Boys High School logo",
  "icestroke-ice-cream-poster.webp": "Icestroke ice cream poster design",
  "vitamin-c-serum-poster.webp": "Vitamin C serum poster design",
  "walnut-perfume-poster.webp": "Walnut perfume poster design",
  "pistachio-gelato-poster.webp": "Pistachio gelato poster design",
  "chocolate-refresh-poster.webp": "Chocolate drink poster design",
  "starbucks-coffee-poster.webp": "Starbucks coffee poster design",
  "blueberry-milkshake-poster.webp": "Blueberry milkshake poster design",
  "blueberry-energy-drink-poster.webp": "Blueberry energy drink poster design",
};

const escapeXml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

const imageDirectory = resolve("public/images");
const imageFiles = readdirSync(imageDirectory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
  .map((entry) => entry.name)
  .filter((name) => [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"].includes(extname(name).toLowerCase()))
  .sort();

if (imageFiles.length === 0) {
  throw new Error("No public content images found in public/images.");
}

const urls = SITE_ROUTES.map(([route, lastmod], index) => {
  const imageEntries = index === 0
    ? imageFiles.map((filename) => {
      const imageUrl = `${BASE_URL}/images/${encodeURIComponent(basename(filename))}`;
      const caption = IMAGE_CAPTIONS[filename];
      return [
        "    <image:image>",
        `      <image:loc>${escapeXml(imageUrl)}</image:loc>`,
        caption ? `      <image:caption>${escapeXml(caption)}</image:caption>` : null,
        "    </image:image>",
      ].filter(Boolean).join("\n");
    }).join("\n")
    : "";

  return [
    "  <url>",
    `    <loc>${BASE_URL}${route}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    imageEntries,
    "  </url>",
  ].filter(Boolean).join("\n");
});

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ...urls,
  "</urlset>",
  "",
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${SITE_ROUTES.length} routes, ${imageFiles.length} images)`);