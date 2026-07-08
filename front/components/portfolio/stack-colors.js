const C = (bg, fg) => [bg, fg];

export const STACK_COLORS = {
  html: C("bg-[#E34F26]", "text-white"),
  html5: C("bg-[#E34F26]", "text-white"),
  css: C("bg-[#1572B6]", "text-white"),
  css3: C("bg-[#1572B6]", "text-white"),
  js: C("bg-[#F7DF1E]", "text-black"),
  javascript: C("bg-[#F7DF1E]", "text-black"),
  ts: C("bg-[#3178C6]", "text-white"),
  typescript: C("bg-[#3178C6]", "text-white"),
  react: C("bg-[#61DAFB]", "text-black"),
  php: C("bg-[#777BB4]", "text-white"),
  python: C("bg-[#3776AB]", "text-white"),
  laravel: C("bg-[#FF2D20]", "text-white"),
  docker: C("bg-[#2496ED]", "text-white"),
  cpp: C("bg-[#00599C]", "text-white"),
  sfml: C("bg-[#8CC445]", "text-black"),
  django: C("bg-[#092E20]", "text-white"),
  tremor: C("bg-[#3B82F6]", "text-white"),
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
