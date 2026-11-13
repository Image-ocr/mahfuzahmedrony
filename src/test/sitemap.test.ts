import { readFileSync, readdirSync } from "node:fs";
import { resolve, extname } from "node:path";
import { describe, expect, it } from "vitest";

const siteUrl = "https://mahfuzahmedrony.lovable.app";
const sitemap = readFileSync(resolve(process.cwd(), "public/sitemap.xml"), "utf8");
const robots = readFileSync(resolve(process.cwd(), "public/robots.txt"), "utf8");
const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
const routes = ["/", "/about", "/capabilities", "/education", "/projects", "/experience", "/contact"];
const imageFiles = readdirSync(resolve(process.cwd(), "public/images"))
  .filter((name) => [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"].includes(extname(name).toLowerCase()));

describe("public sitemap and identity metadata", () => {
  it("lists all seven canonical public routes", () => {
    const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    const routeLocations = locations.filter((location) => !location.includes("/images/"));

    expect(routeLocations).toEqual(routes.map((route) => `${siteUrl}${route}`));
  });

  it("includes every public content image once in the image sitemap", () => {
    const imageLocations = [...sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map((match) => match[1]);
    const expectedImages = imageFiles
      .map((name) => `${siteUrl}/images/${encodeURIComponent(name)}`)
      .sort();

    expect(imageLocations).toHaveLength(14);
    expect(imageLocations.sort()).toEqual(expectedImages);
    expect(new Set(imageLocations).size).toBe(imageLocations.length);
  });

  it("allows image crawling and points crawlers to the canonical sitemap", () => {
    expect(robots).toContain("User-agent: *\nAllow: /");
    expect(robots).toContain("User-agent: Googlebot-Image\nAllow: /");
    expect(robots).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);
  });

  it("uses the uploaded portrait in public person and social metadata", () => {
    const profileImage = `${siteUrl}/images/mahfuz-ahmed-rony.jpg`;
    const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map((match) => JSON.parse(match[1]) as Record<string, unknown>);
    const person = jsonLdBlocks.find((block) => block["@type"] === "Person");
    const profilePage = jsonLdBlocks.find((block) => block["@type"] === "ProfilePage");

    expect(person?.image).toBe(profileImage);
    expect(profilePage?.mainEntity).toEqual({ "@id": `${siteUrl}/#person` });
    expect(html).toContain(`<meta property="og:image" content="${profileImage}" />`);
    expect(html).toContain(`<meta name="twitter:image" content="${profileImage}" />`);
  });
});