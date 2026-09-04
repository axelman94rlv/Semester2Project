import finderIcon from "../../../lib/img/enzo/dock-finder.png";

function dismiss(event) {
  event.stopPropagation();
  const notif = event.currentTarget.closest(".enzo-notification");
  if (notif) notif.remove();
}

export function Notification({ onClick = null } = {}) {
  const events = [];
  if (onClick) events.push(["click", onClick]);

  return {
    type: "div",
    attributes: [
      ["role", "button"],
      ["tabindex", "0"],
      ["data-app", "mail"],
      [
        "class",
        [
          "enzo-sf",
          "enzo-notification",
          "group",
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
        type: "button",
        attributes: [
          ["type", "button"],
          ["aria-label", "Fermer la notification"],
          ["title", "Fermer"],
          [
            "class",
            [
              "absolute",
              "top-[-6px]",
              "right-[-6px]",
              "z-10",
              "w-[16px]",
              "h-[16px]",
              "flex",
              "items-center",
              "justify-center",
              "rounded-full",
              "bg-black/35",
              "hover:bg-black/60",
              "text-white",
              "text-[9px]",
              "leading-none",
              "shadow-[0_1px_4px_rgba(0,0,0,0.35)]",
              "transition-opacity",
              "opacity-0",
              "group-hover:opacity-100",
              "focus-visible:opacity-100",
            ],
          ],
        ],
        events: [["click", dismiss]],
        children: ["✕"],
      },

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
