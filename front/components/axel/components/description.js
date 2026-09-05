import { getProfile } from "../../../api/profiles.js";

// Relevés sur qui.svg : carte 1280 × 618, rx 50, remplissage #C86BFA à 0.62,
// bordure de 10px en #FDC500 à 0.5. Le corps est en Inconsolata, chasse fixe :
// le pas d'avance mesuré est de 20.67px pour un interligne de 32px, d'où le
// couple 1.75rem / 0.24em ci-dessous — si tu changes l'un, ajuste l'autre.

const TITLE = "Qui suis-je ??";

export default async function Description() {
  const profile = await getProfile();
  const body = profile?.description ?? "";

  return {
    type: "div",
    attributes: [
      [
        "class",
        [
          "mx-auto",
          "w-full",
          "max-w-[80rem]", // 1280px
          "rounded-[3.125rem]", // rx 50
          "border-[10px]",
          "border-[#FDC500]/50", // stroke-opacity 0.5
          "bg-[#C86BFA]/[0.62]",
          "px-[5.3125rem]", // 85px, relevé sur le texte
          "pt-[4rem]",
          "pb-[4.5rem]",
        ],
      ],
    ],
    children: [
      {
        type: "h2",
        attributes: [
          [
            "class",
            [
              "font-['AudiowideCustom']",
              "text-[#FDC500]",
              "text-[3.25rem]",
              "text-center",
              "leading-none",
            ],
          ],
        ],
        children: [TITLE],
      },
      {
        type: "p",
        attributes: [
          [
            "class",
            [
              "mt-[3.5rem]",
              "font-['InconsolataCustom']",
              "text-white",
              "text-[1.75rem]",
              "tracking-[0.24em]",
              "leading-[2rem]", // pas de 32px relevé sur la maquette
              "whitespace-pre-line", // respecte les retours à la ligne du textarea
            ],
          ],
        ],
        children: [body],
      },
    ],
  };
}
