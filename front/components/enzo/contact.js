import Window, { TrafficLights } from "./components/window.js";
import generateStructure from "../../lib/generate-structure.js";

import avatar from "../../lib/img/enzo/contact/avatar.png";
import phoneIcon from "../../lib/img/enzo/contact/phone.svg";
import messageIcon from "../../lib/img/enzo/contact/message.svg";
import facetimeIcon from "../../lib/img/enzo/contact/facetime.svg";
import mailIcon from "../../lib/img/enzo/contact/mail.svg";

const LINKEDIN_URL = "https://www.linkedin.com/in/enzo-moita-a8479424a/"; // a mettre dans le payload

const INFOS = [
  { label: "Tel.", value: "07 81 67 94 04" },
  { label: "Mail.", value: "enzo.moita@ecole-decode.fr" },
  { label: "Ville.", value: "Paris" },
];

const ALTERNANCE = {
  title: "Développeur Junior Full-stack",
  subtitle: "Daven",
  rows: [
    { label: "Entreprise", value: "Daven" },
    { label: "Période", value: "Sept. 2025 – Sept. 2028" },
  ],
  site: "https://davenhr.com", // a mettre dans le payload
};

const ECOLE = {
  title: "Master Tech Lead Full-stack",
  subtitle: "Decode",
  rows: [
    { label: "École", value: "Decode" },
    { label: "Jusqu'en", value: "Septembre 2028" },
  ],
  site: "https://ecole-decode.fr/", // a mettre dans le payload
};

function openMail() {
  import("./windowManager.js").then((m) => m.openApp("mail"));
}

function selectTab(event) {
  const item = event.currentTarget;
  const tab = item.dataset.tab;
  const win = item.closest('[data-window="contact"]');
  if (!win) return;

  win.querySelectorAll("[data-tab]").forEach((el) => {
    const on = el.dataset.tab === tab;
    el.classList.toggle("bg-black/10", on);
    el.classList.toggle("hover:bg-black/5", !on);
  });

  const detail = win.querySelector(".enzo-contact-detail");
  if (detail) {
    detail.innerHTML = "";
    detail.appendChild(generateStructure(detailFor(tab)));
  }
}

function ListItem(label, { selected = false, tab = null } = {}) {
  const classes = [
    "w-full",
    "px-[12px]",
    "py-[4px]",
    "rounded-[5px]",
    "text-[12px]",
    "leading-[18px]",
    "font-medium",
    "text-black",
    "whitespace-nowrap",
    "text-left",
    selected ? "bg-black/10" : "hover:bg-black/5",
    "transition-colors",
    tab ? "cursor-pointer" : "cursor-default",
  ];

  if (tab) {
    return {
      type: "button",
      attributes: [
        ["type", "button"],
        ["data-tab", tab],
        [
          "class",
          [
            ...classes,
            "focus-visible:ring-2",
            "focus-visible:ring-[#2479ff]",
            "focus-visible:ring-inset",
            "focus-visible:outline-none",
          ],
        ],
      ],
      events: [["click", selectTab]],
      children: [label],
    };
  }

  return { type: "div", attributes: [["class", classes]], children: [label] };
}

function RoundButton({ icon, alt, href = null, onClick = null }) {
  const inner = {
    type: "img",
    attributes: [
      ["src", icon],
      ["alt", ""],
      ["class", ["w-[22px]", "h-[22px]", "object-contain"]],
    ],
  };
  const cls = [
    "w-[50px]",
    "h-[50px]",
    "rounded-full",
    "bg-[#2479ff]",
    "flex",
    "items-center",
    "justify-center",
    "shrink-0",
    "shadow-[0_4px_12px_-3px_rgba(36,121,255,0.6)]",
    "transition-transform",
    "hover:scale-105",
  ];

  if (href) {
    return {
      type: "a",
      attributes: [
        ["href", href],
        ["title", alt],
        ["aria-label", alt],
        ["class", cls],
      ],
      children: [inner],
    };
  }
  return {
    type: "button",
    attributes: [
      ["type", "button"],
      ["title", alt],
      ["aria-label", alt],
      ["class", cls],
    ],
    events: onClick ? [["click", onClick]] : [],
    children: [inner],
  };
}

function InfoRow({ label, value, labelWidth = "w-[46px]" }) {
  const text = [
    "text-[13px]",
    "leading-[18px]",
    "text-black/55",
    "tracking-[-0.01em]",
  ];
  return {
    type: "div",
    attributes: [
      [
        "class",
        [
          "flex",
          "items-center",
          "gap-[18px]",
          "py-[6px]",
          "border-b",
          "border-black/[0.08]",
        ],
      ],
    ],
    children: [
      {
        type: "span",
        attributes: [["class", [...text, labelWidth, "shrink-0"]]],
        children: [label],
      },
      {
        type: "span",
        attributes: [["class", [...text, "truncate"]]],
        children: [value],
      },
    ],
  };
}

function PillLink({ label, href, onClick = null }) {
  const cls = [
    "inline-flex",
    "items-center",
    "px-[18px]",
    "h-[28px]",
    "rounded-[7px]",
    "bg-black/5",
    "hover:bg-black/10",
    "text-[13px]",
    "leading-[16px]",
    "font-medium",
    "text-black",
    "transition-colors",
  ];
  if (href) {
    return {
      type: "a",
      attributes: [
        ["href", href],
        ["target", "_blank"],
        ["rel", "noopener noreferrer"],
        ["class", cls],
      ],
      children: [label],
    };
  }
  return {
    type: "button",
    attributes: [
      ["type", "button"],
      ["class", cls],
    ],
    events: onClick ? [["click", onClick]] : [],
    children: [label],
  };
}

function contactDetail() {
  return [
    {
      type: "div",
      attributes: [["class", ["flex", "items-center", "gap-[16px]"]]],
      children: [
        {
          type: "img",
          attributes: [
            ["src", avatar],
            ["alt", "Photo d'Enzo Moita"],
            [
              "class",
              [
                "w-[60px]",
                "h-[60px]",
                "rounded-full",
                "object-cover",
                "shrink-0",
              ],
            ],
          ],
        },
        {
          type: "div",
          attributes: [["class", ["flex", "flex-col"]]],
          children: [
            {
              type: "p",
              attributes: [
                [
                  "class",
                  ["text-[17px]", "leading-[20px]", "font-bold", "text-black"],
                ],
              ],
              children: ["Enzo Moita"],
            },
            {
              type: "p",
              attributes: [
                [
                  "class",
                  [
                    "text-[12px]",
                    "leading-[16px]",
                    "font-light",
                    "text-black/60",
                  ],
                ],
              ],
              children: ["Developper web"],
            },
          ],
        },
      ],
    },
    {
      type: "div",
      attributes: [
        ["class", ["flex", "items-center", "gap-[22px]", "mt-[26px]"]],
      ],
      children: [
        RoundButton({
          icon: phoneIcon,
          alt: "Appeler",
          href: "tel:+33781679404",
        }),
        RoundButton({ icon: messageIcon, alt: "Message" }),
        RoundButton({ icon: facetimeIcon, alt: "FaceTime" }),
        RoundButton({
          icon: mailIcon,
          alt: "Envoyer un mail",
          onClick: openMail,
        }),
      ],
    },
    {
      type: "div",
      attributes: [["class", ["mt-[30px]", "flex", "flex-col"]]],
      children: INFOS.map((info) => InfoRow(info)),
    },
    {
      type: "div",
      attributes: [["class", ["mt-[24px]", "flex", "justify-center"]]],
      children: [PillLink({ label: "En savoir plus", href: LINKEDIN_URL })],
    },
  ];
}

function infoDetail(data) {
  return [
    {
      type: "div",
      attributes: [["class", ["flex", "flex-col", "gap-[2px]"]]],
      children: [
        {
          type: "p",
          attributes: [
            [
              "class",
              ["text-[18px]", "leading-[22px]", "font-bold", "text-black"],
            ],
          ],
          children: [data.title],
        },
        {
          type: "p",
          attributes: [
            [
              "class",
              ["text-[13px]", "leading-[18px]", "font-light", "text-black/55"],
            ],
          ],
          children: [data.subtitle],
        },
      ],
    },
    {
      type: "div",
      attributes: [["class", ["mt-[26px]", "flex", "flex-col"]]],
      children: data.rows.map((row) =>
        InfoRow({ ...row, labelWidth: "w-[96px]" }),
      ),
    },
    {
      type: "div",
      attributes: [["class", ["mt-[26px]", "flex", "justify-center"]]],
      children: [PillLink({ label: "Voir le site", href: data.site })],
    },
  ];
}

function detailFor(tab) {
  if (tab === "alternance") return infoDetail(ALTERNANCE);
  if (tab === "ecole") return infoDetail(ECOLE);
  return contactDetail();
}

export function Contact() {
  return Window({
    name: "contact",
    title: "Contacts",
    trafficLights: false,
    className: ["enzo-sf", "w-[760px]", "max-w-[94vw]"],
    bodyClass: ["relative", "flex", "items-stretch", "min-h-[440px]", "h-full"],
    children: [
      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "enzo-drag-handle",
              "cursor-move",
              "absolute",
              "top-0",
              "left-0",
              "right-0",
              "h-[46px]",
              "z-20",
            ],
          ],
        ],
        children: [],
      },
      {
        type: "aside",
        attributes: [
          ["class", ["w-[152px]", "shrink-0", "flex", "flex-col", "px-[10px]"]],
        ],
        children: [
          {
            type: "div",
            attributes: [
              [
                "class",
                [
                  "relative",
                  "z-30",
                  "flex",
                  "items-center",
                  "gap-[9px]",
                  "py-[14px]",
                ],
              ],
            ],
            children: [TrafficLights()],
          },
          {
            type: "div",
            attributes: [
              [
                "class",
                ["flex", "flex-col", "gap-[6px]", "px-[6px]", "pt-[6px]"],
              ],
            ],
            children: [
              {
                type: "div",
                attributes: [
                  [
                    "class",
                    [
                      "px-[12px]",
                      "pb-[4px]",
                      "text-[12px]",
                      "leading-[18px]",
                      "font-bold",
                      "text-[#1a1a1a]",
                    ],
                  ],
                ],
                children: ["Contactez moi"],
              },
              ListItem("Contact", { selected: true, tab: "contact" }),
              ListItem("Alternance", { tab: "alternance" }),
              ListItem("Ecole", { tab: "ecole" }),
            ],
          },
        ],
      },

      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "w-[128px]",
              "shrink-0",
              "border-r",
              "border-black/10",
              "flex",
              "flex-col",
              "gap-[4px]",
              "px-[10px]",
              "pt-[60px]",
            ],
          ],
        ],
        children: [
          ListItem("Enzo Moita", { selected: true }),
          ListItem("Autres"),
        ],
      },

      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "enzo-contact-detail",
              "flex-1",
              "min-w-0",
              "flex",
              "flex-col",
              "px-[32px]",
              "py-[34px]",
            ],
          ],
        ],
        children: contactDetail(),
      },
    ],
  });
}

export default Contact;
