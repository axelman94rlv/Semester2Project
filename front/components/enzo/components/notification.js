import finderIcon from "../../../lib/img/enzo/dock-finder.png";

export function Notification({ onClick = null } = {}) {
  const events = [];
  if (onClick) events.push(["click", onClick]);

  return {
    type: "button",
    attributes: [
      ["type", "button"],
      ["data-app", "mail"],
      [
        "class",
        [
          "enzo-sf",
          "enzo-notification",
          "fixed",
          "top-[42px]",
          "right-[20px]",
          "z-40",
          "w-[344px]",
          "flex",
          "items-start",
          "gap-[13px]",
          "pl-[13px]",
          "pr-[9px]",
          "py-[12px]",
          "rounded-[15px]",
          "text-left",
          "cursor-pointer",
          "bg-[rgba(245,245,245,0.55)]",
          "border",
          "border-white/40",
          "backdrop-blur-2xl",
          "shadow-[0_18px_50px_-18px_rgba(0,0,0,0.55)]",
        ],
      ],
    ],
    events,
    children: [
      {
        type: "img",
        attributes: [
          ["src", finderIcon],
          ["alt", ""],
          ["class", ["shrink-0", "w-[45px]", "h-[45px]", "object-contain"]],
        ],
      },
      {
        type: "div",
        attributes: [["class", ["flex-1", "min-w-0", "flex", "flex-col"]]],
        children: [
          {
            type: "p",
            attributes: [
              [
                "class",
                [
                  "font-bold",
                  "text-[13px]",
                  "leading-[16px]",
                  "tracking-[-0.02em]",
                  "text-[#1a1a1a]",
                  "truncate",
                ],
              ],
            ],
            children: ["Un projet ?"],
          },
          {
            type: "p",
            attributes: [
              ["class", ["text-[13px]", "leading-[16px]", "text-black/55"]],
            ],
            children: ["Contactez moi par mail !"],
          },
        ],
      },
      {
        type: "span",
        attributes: [
          [
            "class",
            ["shrink-0", "text-[11px]", "leading-[14px]", "text-black/45"],
          ],
        ],
        children: ["now"],
      },
    ],
  };
}

export default Notification;
