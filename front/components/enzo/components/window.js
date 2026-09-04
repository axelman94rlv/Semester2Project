export function TrafficLights() {
  const dot = ["w-[12px]", "h-[12px]", "rounded-full"];

  return {
    type: "div",
    attributes: [["class", ["flex", "items-center", "gap-[8px]"]]],
    children: [
      {
        type: "span",
        attributes: [["class", [...dot, "bg-[#ff5f57]"]]],
        children: [],
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
  children = [],
  className = [],
  bodyClass = [],
  dark = false,
  trafficLights = true,
} = {}) {
  return {
    type: "div",
    attributes: [
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
              [
                "class",
                [
                  "absolute",
                  "top-[14px]",
                  "left-[16px]",
                  "z-30",
                  "pointer-events-none",
                ],
              ],
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
