import Window, { TrafficLights } from "./components/window.js";
import sendIcon from "../../lib/img/enzo/mail/send.svg";
import chevronDown from "../../lib/img/enzo/mail/chevron-down.svg";
import replyIcon from "../../lib/img/enzo/mail/reply.svg";
import attachIcon from "../../lib/img/enzo/mail/attach.svg";
import emojiIcon from "../../lib/img/enzo/mail/emoji.svg";
import photoIcon from "../../lib/img/enzo/mail/photo.svg";

const CONTACT_EMAIL = "enzo.moita@ecole-decode.fr";

function sendMail(event) {
  const win = event.currentTarget.closest('[data-window="mail"]');
  if (!win) return;

  const value = (name) =>
    win.querySelector(`[name="${name}"]`)?.value.trim() ?? "";

  const to = value("to") || CONTACT_EMAIL;
  const cc = value("cc");
  const subject = value("subject");
  const body = value("body");

  const params = [];
  if (cc) params.push(`cc=${encodeURIComponent(cc)}`);
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);

  const query = params.length ? `?${params.join("&")}` : "";
  window.location.href = `mailto:${to}${query}`;
}

function ToolbarButton(
  src,
  alt,
  { onClick = null, imgClass = ["w-[18px]", "h-[18px]"] } = {},
) {
  const events = [];
  if (onClick) events.push(["click", onClick]);

  return {
    type: "button",
    attributes: [
      ["type", "button"],
      ["title", alt],
      ["aria-label", alt],
      [
        "class",
        [
          "flex",
          "items-center",
          "justify-center",
          "w-[30px]",
          "h-[26px]",
          "rounded-[6px]",
          "text-black/40",
          "hover:bg-black/5",
          "transition-colors",
        ],
      ],
    ],
    events,
    children: [
      {
        type: "img",
        attributes: [
          ["src", src],
          ["alt", ""],
          ["class", [...imgClass, "object-contain"]],
        ],
      },
    ],
  };
}

function FieldRow(
  label,
  { name, type = "text", value = "", placeholder = "", trailing = null },
) {
  const inputAttrs = [
    ["name", name],
    ["type", type],
    ["placeholder", placeholder],
    ["aria-label", label],
    [
      "class",
      [
        "flex-1",
        "min-w-0",
        "bg-transparent",
        "border-0",
        "outline-none",
        "text-[13px]",
        "leading-[20px]",
        "text-black/85",
        "placeholder:text-black/30",
      ],
    ],
  ];
  if (value) inputAttrs.push(["value", value]);

  return {
    type: "div",
    attributes: [
      [
        "class",
        [
          "flex",
          "items-center",
          "gap-[8px]",
          "px-[16px]",
          "h-[38px]",
          "border-b",
          "border-black/[0.07]",
        ],
      ],
    ],
    children: [
      {
        type: "span",
        attributes: [["class", ["shrink-0", "text-[13px]", "text-black/45"]]],
        children: [label],
      },
      { type: "input", attributes: inputAttrs },
      trailing,
    ],
  };
}

export function Mail() {
  return Window({
    name: "mail",
    trafficLights: false,
    className: ["enzo-sf", "w-[830px]", "max-w-[92vw]", "flex", "flex-col"],
    bodyClass: ["flex", "flex-col", "h-full"],
    children: [
      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "flex",
              "items-center",
              "justify-between",
              "px-[13px]",
              "py-[9px]",
              "border-b",
              "border-black/10",
            ],
          ],
        ],
        children: [
          {
            type: "div",
            attributes: [["class", ["flex", "items-center", "gap-[10px]"]]],
            children: [
              TrafficLights(),
              {
                type: "div",
                attributes: [
                  ["class", ["flex", "items-center", "gap-[2px]", "ml-[8px]"]],
                ],
                children: [
                  ToolbarButton(sendIcon, "Envoyer", {
                    onClick: sendMail,
                    imgClass: ["w-[20px]", "h-[20px]"],
                  }),
                  {
                    type: "img",
                    attributes: [
                      ["src", chevronDown],
                      ["alt", ""],
                      ["class", ["w-[9px]", "h-[6px]", "opacity-50"]],
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "div",
            attributes: [["class", ["flex", "items-center", "gap-[2px]"]]],
            children: [
              ToolbarButton(replyIcon, "Répondre"),
              ToolbarButton(attachIcon, "Joindre un fichier"),
              {
                type: "button",
                attributes: [
                  ["type", "button"],
                  ["title", "Police"],
                  ["aria-label", "Police"],
                  [
                    "class",
                    [
                      "flex",
                      "items-center",
                      "justify-center",
                      "w-[30px]",
                      "h-[26px]",
                      "rounded-[6px]",
                      "hover:bg-black/5",
                      "transition-colors",
                    ],
                  ],
                ],
                children: [
                  {
                    type: "span",
                    attributes: [
                      [
                        "class",
                        ["text-[15px]", "leading-none", "text-black/45"],
                      ],
                    ],
                    children: ["Aa"],
                  },
                ],
              },
              ToolbarButton(emojiIcon, "Emoji"),
              ToolbarButton(photoIcon, "Image"),
            ],
          },
        ],
      },

      FieldRow("À :", {
        name: "to",
        type: "email",
        value: CONTACT_EMAIL,
        trailing: {
          type: "span",
          attributes: [
            [
              "class",
              [
                "shrink-0",
                "w-[18px]",
                "h-[18px]",
                "flex",
                "items-center",
                "justify-center",
                "rounded-full",
                "text-[#007aff]",
                "text-[16px]",
                "leading-none",
              ],
            ],
          ],
          children: ["+"],
        },
      }),
      FieldRow("Cc :", { name: "cc", type: "email" }),
      FieldRow("Objet :", { name: "subject", placeholder: "" }),
      FieldRow("De :", {
        name: "from",
        type: "email",
        placeholder: "votre@email.com",
      }),

      {
        type: "textarea",
        attributes: [
          ["name", "body"],
          ["aria-label", "Message"],
          ["placeholder", "Écrivez votre message…"],
          [
            "class",
            [
              "flex-1",
              "min-h-[22rem]",
              "w-full",
              "resize-none",
              "bg-transparent",
              "border-0",
              "outline-none",
              "px-[16px]",
              "py-[14px]",
              "text-[13px]",
              "leading-[1.5]",
              "text-black/85",
              "placeholder:text-black/30",
            ],
          ],
        ],
        children: [],
      },
    ],
  });
}

export default Mail;
