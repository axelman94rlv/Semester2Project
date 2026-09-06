import { getProfile } from "../../../api/profiles.js";

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
          "max-w-[80rem]",
          "rounded-[3.125rem]",
          "border-[10px]",
          "border-[#FDC500]/50",
          "bg-[#C86BFA]/[0.62]",
          "px-[5.3125rem]",
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
              "leading-[2rem]",
              "whitespace-pre-line",
            ],
          ],
        ],
        children: [body],
      },
    ],
  };
}
