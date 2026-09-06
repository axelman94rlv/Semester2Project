import Window, { TrafficLights } from "./components/window.js";
import { apiPost } from "../../api/payload.js";
import sendIcon from "../../lib/img/enzo/mail/send.svg";
import chevronDown from "../../lib/img/enzo/mail/chevron-down.svg";
import replyIcon from "../../lib/img/enzo/mail/reply.svg";
import attachIcon from "../../lib/img/enzo/mail/attach.svg";
import emojiIcon from "../../lib/img/enzo/mail/emoji.svg";
import photoIcon from "../../lib/img/enzo/mail/photo.svg";

function statusClass(state) {
  const base = ["px-[16px]", "py-[10px]", "text-[13px]"];
  if (state === "ok") return [...base, "text-[#12805c]"];
  if (state === "error") return [...base, "text-[#e5484d]"];
  return [...base, "text-black/50"];
}

function setStatus(win, state, text) {
  const status = win.querySelector(".enzo-mail-status");
  if (!status) return;
  status.className = ["enzo-mail-status", ...statusClass(state)].join(" ");
  status.textContent = text;
}

async function submitContact(event) {
  const win = event.currentTarget.closest('[data-window="mail"]');
  if (!win) return;

  const value = (name) =>
    win.querySelector(`[name="${name}"]`)?.value.trim() ?? "";

  const nom = value("nom");
  const entreprise = value("entreprise");
  const email = value("email");
  const message = value("message");

  if (!nom || !email || !message) {
    setStatus(win, "error", "Nom, email et message sont obligatoires.");
    return;
  }

  setStatus(win, "info", "Envoi…");

  const result = await apiPost("/enzo-contacts", {
    nom,
    entreprise,
    email,
    message,
  });

  if (result) {
    setStatus(win, "ok", "Message envoyé ✓");
    for (const name of ["nom", "entreprise", "email", "message"]) {
      const field = win.querySelector(`[name="${name}"]`);
      if (field) field.value = "";
    }
  } else {
    setStatus(win, "error", "Erreur lors de l'envoi. Réessayez.");
  }
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

function FieldRow(label, { name, type = "text", placeholder = "" }) {
  return {
    type: "div",
    attributes: [
      [
        "class",
        [
          "flex",
          "items-center",
          "gap-[12px]",
          "px-[16px]",
          "h-[44px]",
          "border-b",
          "border-black/[0.07]",
        ],
      ],
    ],
    children: [
      {
        type: "span",
        attributes: [
          ["class", ["shrink-0", "w-[100px]", "text-[13px]", "text-black/45"]],
        ],
        children: [label],
      },
      {
        type: "input",
        attributes: [
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
              "rounded-[6px]",
              "focus-visible:ring-2",
              "focus-visible:ring-[#007aff]",
              "focus-visible:ring-inset",
              "text-[14px]",
              "text-black/85",
              "placeholder:text-black/30",
            ],
          ],
        ],
      },
    ],
  };
}

export function Mail() {
  return Window({
    name: "mail",
    title: "Me contacter",
    trafficLights: false,
    className: ["enzo-sf", "w-[720px]", "max-w-[92vw]", "flex", "flex-col"],
    bodyClass: ["flex", "flex-col", "h-full"],
    children: [
      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "enzo-drag-handle",
              "cursor-move",
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
                    onClick: submitContact,
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
              ToolbarButton(emojiIcon, "Emoji"),
              ToolbarButton(photoIcon, "Image"),
            ],
          },
        ],
      },

      {
        type: "div",
        attributes: [["class", ["px-[16px]", "pt-[16px]", "pb-[6px]"]]],
        children: [
          {
            type: "h2",
            attributes: [
              ["class", ["text-[18px]", "font-bold", "text-black"]],
            ],
            children: ["Me contacter"],
          },
          {
            type: "p",
            attributes: [
              ["class", ["text-[13px]", "text-black/50", "mt-[2px]"]],
            ],
            children: ["Envoyez-moi un message, je vous répondrai vite."],
          },
        ],
      },

      FieldRow("Nom", { name: "nom", placeholder: "Votre nom" }),
      FieldRow("Entreprise", {
        name: "entreprise",
        placeholder: "Votre entreprise (facultatif)",
      }),
      FieldRow("Email", {
        name: "email",
        type: "email",
        placeholder: "vous@email.com",
      }),

      {
        type: "textarea",
        attributes: [
          ["name", "message"],
          ["aria-label", "Message"],
          ["placeholder", "Votre message…"],
          [
            "class",
            [
              "flex-1",
              "min-h-[12rem]",
              "w-full",
              "resize-none",
              "bg-transparent",
              "border-0",
              "outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-[#007aff]",
              "focus-visible:ring-inset",
              "px-[16px]",
              "py-[14px]",
              "text-[14px]",
              "leading-[1.5]",
              "text-black/85",
              "placeholder:text-black/30",
            ],
          ],
        ],
        children: [],
      },

      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "flex",
              "items-center",
              "justify-between",
              "border-t",
              "border-black/10",
            ],
          ],
        ],
        children: [
          {
            type: "div",
            attributes: [["class", ["enzo-mail-status", "px-[16px]", "py-[10px]", "text-[13px]", "text-black/50"]]],
            children: [""],
          },
          {
            type: "button",
            attributes: [
              ["type", "button"],
              [
                "class",
                [
                  "mr-[14px]",
                  "px-[18px]",
                  "h-[32px]",
                  "rounded-[8px]",
                  "bg-[#007aff]",
                  "hover:bg-[#0069d9]",
                  "text-white",
                  "text-[13px]",
                  "font-medium",
                  "transition-colors",
                ],
              ],
            ],
            events: [["click", submitContact]],
            children: ["Envoyer"],
          },
        ],
      },
    ],
  });
}

export default Mail;
