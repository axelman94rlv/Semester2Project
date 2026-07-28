import Link from "../../components/router/link.js";
import Logo from "../../lib/img/Signature.svg";

let initialPositions = [];
let animationFrameId = null;
let currentScrollPosition = 0;

function formatPosition(position) {
  const roundedPosition = Math.round(position);
  const absolutePosition = Math.abs(roundedPosition);
  const formattedPosition = String(absolutePosition).padStart(3, "0");

  
  return `- ${formattedPosition}`;
}

function getScrollPosition(event) {
  const target = event?.target;

  // Scroll général de la page
  if (
    !target ||
    target === document ||
    target === document.documentElement ||
    target === document.body
  ) {
    return (
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  }

  // Scroll d'un conteneur avec overflow
  if (target instanceof HTMLElement) {
    return target.scrollTop;
  }

  return window.scrollY || 0;
}

function updatePositions() {
  const counters = document.querySelectorAll(".scroll-position");

  counters.forEach((counter, index) => {
    const initialPosition = initialPositions[index];

    if (initialPosition === undefined) return;

    const newPosition = initialPosition - currentScrollPosition;

    counter.textContent = formatPosition(newPosition);
  });

  animationFrameId = null;
}

function onScroll(event) {
  currentScrollPosition = getScrollPosition(event);

  if (animationFrameId !== null) return;

  animationFrameId = requestAnimationFrame(updatePositions);
}

function initializePositions() {
  const counters = document.querySelectorAll(".scroll-position");

  if (counters.length === 0) return;

  initialPositions = Array.from(counters).map((counter) => {
    return counter.getBoundingClientRect().top;
  });

  currentScrollPosition =
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;

  updatePositions();
}

// Le mode capture détecte aussi le scroll d'un conteneur interne.
document.removeEventListener("scroll", onScroll, true);
document.addEventListener("scroll", onScroll, true);

export function NavBar() {
  const linkStyle = [
    "flex",
    "items-center",
    "justify-center",
    "w-full",
    "h-[5.6rem]",
    "border-b",
    "border-white",
    "text-white",
    "text-[28px]",
    "font-['InconsolataCustom']",
    "font-light",
  ];

  // Attend que la navbar soit réellement ajoutée au DOM.
  requestAnimationFrame(() => {
    requestAnimationFrame(initializePositions);
  });

  return {
    type: "nav",

    attributes: [
      [
        "class",
        [
          "fixed",
          "top-0",
          "left-0",
          "z-50",
          "h-screen",
          "w-[4.6rem]",

          "after:content-['']",
          "after:absolute",
          "after:right-0",
          "after:top-0",
          "after:h-full",
          "after:w-px",
          "after:bg-[linear-gradient(to_bottom,_white_0_15px,_transparent_5px_5px)]",
          "after:bg-[length:1px_30px]",
        ],
      ],
    ],

    children: [
      {
        type: "section",

        attributes: [
          [
            "class",
            [
              "flex",
              "flex-col",
              "w-full",
              "items-center",
              "text-center",
            ],
          ],
        ],

        children: [
          Link(
            "/baptiste/portfolio",
            {
              type: "img",

              attributes: [
                ["src", Logo],
                ["alt", "Logo"],
                ["class", ["w-[4rem]", "h-[4rem]"]],
              ],
            },
            [["class", [...linkStyle, "h-[9rem]"]]],
          ),

          Link("#creatifSection", "01", [["class", linkStyle]]),
          Link("/", "02", [["class", linkStyle]]),
          Link("/", "03", [["class", linkStyle]]),
          Link("/", "04", [["class", linkStyle]]),
          Link("/", "05", [["class", linkStyle]]),
        ],
      },

      {
        type: "div",

        attributes: [
          [
            "class",
            [
              "fixed",
              "top-0",
              "left-[5.5rem]",
              "pt-[3rem]",
              "pb-[3rem]",
              "flex",
              "flex-col",
              "h-screen",
              "justify-between",
              "text-white",
              "pointer-events-none",
            ],
          ],
        ],

        children: [
          {
            type: "span",

            attributes: [
              ["class", ["scroll-position", "tabular-nums"]],
            ],

            children: ["- 000"],
          },

          {
            type: "span",

            attributes: [
              ["class", ["scroll-position", "tabular-nums"]],
            ],

            children: ["- 000"],
          },

          {
            type: "span",

            attributes: [
              ["class", ["scroll-position", "tabular-nums"]],
            ],

            children: ["- 000"],
          },
        ],
      },
    ],
  };
}