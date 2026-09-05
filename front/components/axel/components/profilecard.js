import { getProfile } from "../../../api/profiles.js";
import { API_BASE_URL } from "../../../api/config.js";

import Button, { IconButton, MaskedIcon } from "./button.js";

import Logo from "../../../lib/img/axel/logo_color.svg";
import Download from "../../../lib/img/axel/download.svg";
import Arrow from "../../../lib/img/axel/arrow.svg";
import Mail from "../../../lib/img/axel/mail.svg";
import Phone from "../../../lib/img/axel/phone.svg";
import Linkedin from "../../../lib/img/axel/linkedin.svg";
import Location from "../../../lib/img/axel/location.svg";

const SERVER_URL = API_BASE_URL.replace(/\/api\/?$/, "");
const mediaUrl = (file) => (file?.url ? `${SERVER_URL}${file.url}` : null);

// Largeurs relevées sur les maquettes (bordure de 3px comprise) ---------------
const WIDTH_CLOSED = "22.375rem"; // 358px
const WIDTH_OPEN = "48.625rem"; // 778px

let cardOpen = false;

/** Ouvre/ferme la fiche. Retourne le nouvel état. */
export function toggleProfileCard() {
  const body = document.querySelector("[data-cardbody]");
  const panel = document.querySelector("[data-cardpanel]");
  const chevron = document.querySelector("[data-cardchevron]");
  if (!body || !panel) return cardOpen;

  cardOpen = !cardOpen;
  body.style.width = cardOpen ? WIDTH_OPEN : WIDTH_CLOSED;
  panel.style.opacity = cardOpen ? "1" : "0";
  if (chevron) chevron.style.transform = cardOpen ? "rotate(180deg)" : "";
  return cardOpen;
}

/** Referme la fiche sans animation de bascule (utilisé quand on la masque). */
export function closeProfileCard() {
  if (cardOpen) toggleProfileCard();
}

/** Une ligne du panneau : icône jaune + libellé blanc. */
function PanelRow(icon, label, href, iconSize) {
  const clickable = Boolean(href && label);

  const row = {
    type: clickable ? "a" : "div",
    attributes: [
      [
        "class",
        [
          "flex",
          "items-center",
          "gap-[0.875rem]", // 14px
          "h-[2.25rem]", // 36px → pas de 65px avec le gap-[1.8125rem]
          "font-['AudiowideCustom']",
          "text-[1.125rem]", // même corps que les boutons
          "leading-none",
          "text-white",
          ...(clickable
            ? [
                "transition-colors",
                "duration-200",
                "hover:text-[#FFEE32]",
                "cursor-pointer",
              ]
            : []),
        ],
      ],
    ],
    children: [
      {
        type: "span",
        attributes: [
          [
            "class",
            [
              "flex",
              "w-[2.25rem]", // boîte fixe : toutes les icônes sur le même axe
              "shrink-0",
              "items-center",
              "justify-center",
              "text-[#FDC500]",
            ],
          ],
        ],
        children: [MaskedIcon(icon, iconSize)],
      },
      label ?? "—",
    ],
  };

  if (clickable) {
    row.attributes.push(["href", href]);
    if (href.startsWith("http")) {
      row.attributes.push(["target", "_blank"], ["rel", "noopener noreferrer"]);
    }
  }

  return row;
}

export default async function ProfileCard({ onToggle } = {}) {
  const profile = await getProfile();

  const name = profile?.name ?? "AXEL BARBELLION";
  const role = profile?.role ?? "Développeur Web";
  const githubUrl = profile?.githubUrl ?? null;
  const cvUrl = mediaUrl(profile?.cv);

  const email = profile?.email ?? null;
  const phone = profile?.phone ?? null;
  const location = profile?.location ?? null;
  const linkedin = profile?.linkedin ?? null;
  const linkedinUrl = profile?.linkedinUrl ?? null;

  return {
    type: "div",
    attributes: [
      ["data-profilecard", "true"],
      ["class", ["relative", "flex", "items-center", "gap-[1.125rem]"]],
    ],
    children: [
      // ============ la carte : seule sa LARGEUR s'anime ============
      {
        type: "div",
        attributes: [
          ["data-cardbody", "true"],
          [
            "class",
            [
              "relative",
              "flex",
              "rounded-[1.5rem]", // rx 24
              "border-[3px]",
              "border-[#C86BFA]",
              "bg-[#C86BFA]/[0.16]",
              "overflow-hidden",
              "transition-[width]",
              "duration-500",
              "ease-out",
            ],
          ],
          ["style", [["width", WIDTH_CLOSED]]],
        ],
        children: [
          // -------- colonne gauche (identique aux deux maquettes) --------
          {
            type: "div",
            attributes: [
              [
                "class",
                [
                  "relative",
                  "w-[22rem]", // 352px + 6px de bordure = 358px
                  "shrink-0",
                  "bg-[#C86BFA]/[0.16]", // 2e couche → ~0.29 à gauche, 0.16 à droite
                  "border-r",
                  "border-[#C86BFA]",
                ],
              ],
            ],

            children: [
              // bande haute en dégradé + liseré
              {
                type: "div",
                attributes: [
                  [
                    "class",
                    [
                      "absolute",
                      "inset-x-0",
                      "top-0",
                      "h-[5.875rem]", // ~94px
                      "bg-gradient-to-br",
                      "from-[#C86BFA]/10",
                      "to-black/60",
                      "border-b",
                      "border-[#C86BFA]",
                    ],
                  ],
                ],
              },

              // contenu
              {
                type: "div",
                attributes: [
                  [
                    "class",
                    [
                      "relative",
                      "flex",
                      "flex-col",
                      "items-center",
                      "px-[1.75rem]",
                      "pt-[0.625rem]",
                      "pb-[2rem]",
                    ],
                  ],
                ],
                children: [
                  // logo (à cheval sur la ligne, comme sur la maquette)
                  {
                    type: "img",
                    attributes: [
                      ["src", Logo],
                      ["alt", ""],
                      ["class", ["block", "w-[14.125rem]", "h-auto"]],
                    ],
                  },

                  // nom
                  {
                    type: "h2",
                    attributes: [
                      [
                        "class",
                        [
                          "mt-[3.25rem]",
                          "font-['AudiowideCustom']",
                          "text-[#FDC500]",
                          "text-[1.375rem]",
                          "tracking-[0.02em]",
                          "uppercase",
                          "text-center",
                        ],
                      ],
                    ],
                    children: [name],
                  },

                  // rôle
                  {
                    type: "p",
                    attributes: [
                      [
                        "class",
                        [
                          "mt-[0.5rem]",
                          "font-['AudiowideCustom']",
                          "text-white",
                          "text-[1.125rem]",
                          "text-center",
                        ],
                      ],
                    ],
                    children: [role],
                  },

                  // bouton Github (pleine largeur)
                  Button("Voir sur Github", {
                    href: githubUrl,
                    className: ["mt-[2.5rem]", "w-full"],
                  }),

                  // ligne Afficher CV + carré download
                  {
                    type: "div",
                    attributes: [
                      [
                        "class",
                        ["mt-[1.125rem]", "w-full", "flex", "gap-[1.125rem]"],
                      ],
                    ],
                    children: [
                      Button("Afficher CV", {
                        href: cvUrl,
                        className: ["flex-1"],
                      }),
                      IconButton(Download, {
                        href: cvUrl,
                        download: true,
                        ariaLabel: "Télécharger le CV",
                      }),
                    ],
                  },
                ],
              },
            ],
          },

          // -------- colonne droite : découverte par l'élargissement --------
          {
            type: "div",
            attributes: [
              ["data-cardpanel", "true"],
              [
                "class",
                [
                  "w-[26.25rem]", // 420px
                  "shrink-0",
                  "pl-[2.875rem]", // 46px → icône centrée à 416px du bord
                  "pt-[5.75rem]", // 92px → 1re ligne centrée à 112,8px
                  "flex",
                  "flex-col",
                  "gap-[1.8125rem]", // 29px + 36px de ligne = pas de 65px
                  "opacity-0",
                  "transition-opacity",
                  "duration-300",
                  "delay-150",
                ],
              ],
            ],
            children: [
              PanelRow(
                Mail,
                email,
                email ? `mailto:${email}` : null,
                "2.25rem",
              ),
              PanelRow(
                Phone,
                phone,
                phone ? `tel:${phone.replace(/\s/g, "")}` : null,
                "1.875rem",
              ),
              PanelRow(Linkedin, linkedin, linkedinUrl, "1.875rem"),
              PanelRow(Location, location, null, "1.5rem"),
            ],
          },
        ],
      },

      // ============ chevron : bascule ouvert/fermé ============
      {
        type: "div",
        attributes: [
          ["data-cardchevron", "true"],
          ["class", ["transition-transform", "duration-500", "ease-out"]],
        ],
        children: [
          IconButton(Arrow, {
            ariaLabel: "Déplier la fiche",
            onClick: () => {
              const open = toggleProfileCard();
              if (onToggle) onToggle(open);
            },
            className: ["rounded-full", "w-[3.5rem]", "h-[3.5rem]"],
          }),
        ],
      },
    ],
  };
}
