import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Invisible helper: converts legacy hash URLs (e.g. "/#about") into clean
 * SEO-friendly routes (e.g. "/about"). Only redirects when the hash maps to a
 * known section route. No UI is rendered.
 */
const HASH_TO_ROUTE: Record<string, string> = {
  about: "/about",
  capabilities: "/capabilities",
  skills: "/capabilities",
  education: "/education",
  projects: "/projects",
  experience: "/experience",
  contact: "/contact",
};

const HashRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkHash = () => {
      const raw = window.location.hash.replace(/^#\/?/, "").trim().toLowerCase();
      if (!raw) return;
      const target = HASH_TO_ROUTE[raw];
      if (target) {
        navigate(target, { replace: true });
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [navigate]);

  return null;
};

export default HashRedirect;
