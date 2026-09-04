function closeNearestWindow(event) {
  event.stopPropagation();
  const win = event.currentTarget.closest("[data-window]");
  if (win) win.remove();
}

export function TrafficLights() {
  const dot = [
    "w-[12px]",
    "h-[12px]",
    "rounded-full",
    "flex",
    "items-center",
    "justify-center",
    "leading-none",
  ];

  return {
    type: "div",
    attributes: [["class", ["group", "flex", "items-center", "gap-[8px]"]]],
    children: [
      {
        type: "button",
        attributes: [
          ["type", "button"],
          ["aria-label", "Fermer la fenêtre"],
          ["title", "Fermer"],
          ["class", [...dot, "bg-[#ff5f57]", "cursor-pointer"]],
        ],
        events: [["click", closeNearestWindow]],
        children: [
          {
            type: "span",
            attributes: [
              [
                "class",
                [
                  "text-[8px]",
                  "font-bold",
                  "text-black/45",
                  "opacity-0",
                  "transition-opacity",
                  "group-hover:opacity-100",
                ],
              ],
            ],
            children: ["✕"],
          },
        ],
      },
      {
        type: "span",
        attributes: [["class", [...dot, "bg-[#febc2e]"]]],
        children: [],
      },
      {
        type: "span",
        attributes: [["class", [...dot, "bg-[#28c840]"]]],
        children: [],
      },
    ],
  };
}

export default function Window({
  name = "window",
  children = [],
  className = [],
  bodyClass = [],
  dark = false,
  trafficLights = true,
} = {}) {
  return {
    type: "div",
    attributes: [
      ["data-window", name],
      [
        "class",
        [
          "relative",
          "overflow-hidden",
          "rounded-[12px]",
          "shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]",
          "ring-1",
          dark ? "ring-white/10" : "ring-black/10",
          dark ? "bg-[#0d1117]" : "bg-white",
          ...className,
        ],
      ],
    ],
    children: [
      trafficLights
        ? {
            type: "div",
            attributes: [
              ["class", ["absolute", "top-[14px]", "left-[16px]", "z-30"]],
            ],
            children: [TrafficLights()],
          }
        : null,

      {
        type: "div",
        attributes: [["class", ["relative", "z-10", ...bodyClass]]],
        children,
      },
    ],
  };
}
