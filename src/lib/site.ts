function readPublic(name: string): string {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

export const site = {
  name: readPublic("NEXT_PUBLIC_STUDIO_NAME") || "Shilpee Digital Studio",
  tagline:
    readPublic("NEXT_PUBLIC_STUDIO_TAGLINE") ||
    "Turning Ideas into Powerful Digital Experiences",
  url: readPublic("NEXT_PUBLIC_SITE_URL") || "http://localhost:3000",
  email: readPublic("NEXT_PUBLIC_STUDIO_EMAIL"),
  phone: readPublic("NEXT_PUBLIC_STUDIO_PHONE"),
  whatsapp: readPublic("NEXT_PUBLIC_STUDIO_WHATSAPP"),
  instagram: readPublic("NEXT_PUBLIC_INSTAGRAM_URL"),
  facebook: readPublic("NEXT_PUBLIC_FACEBOOK_URL"),
  linkedin:
    readPublic("NEXT_PUBLIC_LINKEDIN_URL") ||
    "https://linkedin.com/in/shilpee-srivastava0311",
  github:
    readPublic("NEXT_PUBLIC_GITHUB_URL") || "https://github.com/shilpee-0311",
} as const;

export function whatsappHref(): string | null {
  if (!site.whatsapp) return null;
  const digits = site.whatsapp.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}`;
}
