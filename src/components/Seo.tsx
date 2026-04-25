import { useEffect } from "react";

const SITE_URL = "https://mahfuzahmedrony.dpdns.org";

interface SeoProps {
  title: string;
  description: string;
  path?: string; // e.g. "/install"
  robots?: string;
  ogImage?: string;
}

const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Invisible SEO updater. Updates document head only — does not render UI.
 * Used per-route to provide unique title, description, canonical and social tags.
 */
const Seo = ({ title, description, path = "/", robots = "index, follow", ogImage }: SeoProps) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[name="robots"]', "name", "robots", robots);
    setLink("canonical", url);

    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:type"]', "property", "og:type", "website");

    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");

    if (ogImage) {
      setMeta('meta[property="og:image"]', "property", "og:image", ogImage);
      setMeta('meta[name="twitter:image"]', "name", "twitter:image", ogImage);
    }
  }, [title, description, path, robots, ogImage]);

  return null;
};

export default Seo;
