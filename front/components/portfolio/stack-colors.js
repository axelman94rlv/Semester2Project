const C = (bg, fg) => [bg, fg];

// Couleur de fond = couleur du logo. Couleur de texte choisie pour un
// contraste WCAG AA (≥ 4.5:1) : certaines couleurs de marque (HTML, PHP,
// Laravel, Docker, Tremor) échouent avec du blanc, on met du noir.
export const STACK_COLORS = {
  html: C("bg-[#E34F26]", "text-black"),
  html5: C("bg-[#E34F26]", "text-black"),
  css: C("bg-[#1572B6]", "text-white"),
  css3: C("bg-[#1572B6]", "text-white"),
  js: C("bg-[#F7DF1E]", "text-black"),
  javascript: C("bg-[#F7DF1E]", "text-black"),
  ts: C("bg-[#3178C6]", "text-white"),
  typescript: C("bg-[#3178C6]", "text-white"),
  react: C("bg-[#61DAFB]", "text-black"),
  php: C("bg-[#777BB4]", "text-black"),
  python: C("bg-[#3776AB]", "text-white"),
  laravel: C("bg-[#FF2D20]", "text-black"),
  docker: C("bg-[#2496ED]", "text-black"),
  cpp: C("bg-[#00599C]", "text-white"),
  sfml: C("bg-[#8CC445]", "text-black"),
  django: C("bg-[#092E20]", "text-white"),
  tremor: C("bg-[#3B82F6]", "text-black"),
};

const DEFAULT_COLOR = C("bg-zinc-700", "text-zinc-200");

export function normalizeStack(name) {
  return String(name)
    .toLowerCase()
    .trim()
    .replace(/\+\+/g, "pp")
    .replace(/[.\s-]/g, "");
}

export function stackColorClasses(name) {
  return STACK_COLORS[normalizeStack(name)] ?? DEFAULT_COLOR;
}
