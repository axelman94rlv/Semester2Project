import RoueImage from "../../../lib/img/Roue.svg";

export default function Roue(letter) {
  function onMouseEnter(event) {
    const image = event.currentTarget.querySelector(".roue-tick");

    if (!image) return;

    image.classList.add("is-running");
  }

  function onMouseLeave(event) {
    const image = event.currentTarget.querySelector(".roue-tick");

    if (!image) return;

    image.classList.remove("is-running");
  }

  return {
    type: "div",

    attributes: [
      [
        "class",
        [
          "relative",
          "w-fit",
          "flex",
          "items-center",
          "justify-center",
         
        ],
      ],
    ],

    events: [
      ["mouseenter", onMouseEnter],
      ["mouseleave", onMouseLeave],
    ],

    children: [
      {
        type: "img",

        attributes: [
          ["src", RoueImage],
          ["alt", "Roue décorative"],

          [
            "class",
            [
              "roue-tick",
              "block",
              "w-[12rem]",
              "h-[12rem]",
            ],
          ],
        ],
      },

      {
        type: "span",

        attributes: [
          [
            "class",
            [
              "absolute",
              "inset-0",
              "z-10",
              "flex",
              "items-center",
              "justify-center",
              "text-[#fffdd8]",
              "font-[HurricaneCustom]",
              "text-[1.5rem]",
              "leading-none",
              "pointer-events-none",
             
            ],
          ],
        ],

        children: [letter],
      },
    ],
  };
}