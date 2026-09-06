import wallpaper from "../../../lib/img/enzo/wallpaper.png";

export function Wallpaper() {
  return {
    type: "img",
    attributes: [
      ["src", wallpaper],
      ["alt", ""],
      ["aria-hidden", "true"],
      [
        "class",
        [
          "enzo-wallpaper",
          "absolute",
          "inset-0",
          "z-0",
          "block",
          "w-full",
          "h-full",
          "object-cover",
          "pointer-events-none",
          "select-none",
        ],
      ],
    ],
  };
}

export default Wallpaper;
