import finderIcon from "../../../lib/img/enzo/dock-finder.png";
import mailIcon from "../../../lib/img/enzo/dock-mail.png";
import contactsIcon from "../../../lib/img/enzo/dock-contacts.png";
import vscodeIcon from "../../../lib/img/enzo/dock-vscode.svg";
import githubIcon from "../../../lib/img/enzo/dock-github.svg";
import linkedinIcon from "../../../lib/img/enzo/dock-linkedin.svg";
import stravaIcon from "../../../lib/img/enzo/dock-strava.svg";
import { openApp } from "../windowManager.js";
import { API_BASE_URL } from "../../../api/config.js";

const GITHUB_DEFAULT = "https://github.com";
const LINKEDIN_DEFAULT = "https://www.linkedin.com/in/enzo-moita-a8479424a/";
const STRAVA_DEFAULT = "https://www.strava.com/athletes/116644708";

async function fetchLinks() {
  try {
    const response = await fetch(
      API_BASE_URL + "/globals/links-enzo?t=" + Date.now(),
    );
    if (!response.ok) return {};
    return await response.json();
  } catch (error) {
    console.error("Payload : impossible de charger les liens", error);
    return {};
  }
}

function DockIcon({ src, alt, app = null, href = null, onClick = null }) {
  if (app && !href && !onClick) {
    onClick = () => openApp(app);
  }

  const iconClasses = [
    "block",
    "w-[45px]",
    "h-[45px]",
    "object-contain",
    "origin-bottom",
    "transition-transform",
    "duration-150",
    "ease-out",
    "hover:scale-[1.35]",
    "hover:-translate-y-[10px]",
  ];

  const image = {
    type: "img",
    attributes: [
      ["src", src],
      ["alt", alt],
      ["class", iconClasses],
    ],
  };

  const attributes = [
    ["class", ["shrink-0", "cursor-pointer"]],
    ["title", alt],
  ];

  if (app) attributes.push(["data-app", app]);

  const events = [];
  if (onClick) events.push(["click", onClick]);

  if (href) {
    return {
      type: "a",
      attributes: [
        ...attributes,
        ["href", href],
        ["target", "_blank"],
        ["rel", "noopener noreferrer"],
      ],
      events,
      children: [image],
    };
  }

  return {
    type: "button",
    attributes: [...attributes, ["type", "button"]],
    events,
    children: [image],
  };
}

export async function Dock() {
  const links = await fetchLinks();
  return {
    type: "nav",
    attributes: [
      ["aria-label", "Dock"],
      [
        "class",
        [
          "fixed",
          "left-1/2",
          "-translate-x-1/2",
          "bottom-[10px]",
          "z-40",
          "flex",
          "items-end",
          "gap-[9px]",
          "px-[8px]",
          "py-[8px]",
          "rounded-[18px]",
          "border",
          "border-[rgba(217,217,217,0.36)]",
          "bg-white/10",
          "backdrop-blur-2xl",
          "shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]",
        ],
      ],
    ],
    children: [
      DockIcon({ src: finderIcon, alt: "Finder", app: "finder" }),
      DockIcon({ src: mailIcon, alt: "Mail", app: "mail" }),
      DockIcon({ src: contactsIcon, alt: "Contacts", app: "contact" }),
      DockIcon({ src: vscodeIcon, alt: "VSCode", app: "launchpad" }),
      DockIcon({
        src: githubIcon,
        alt: "GitHub",
        href: links.github || GITHUB_DEFAULT,
      }),
      DockIcon({
        src: linkedinIcon,
        alt: "LinkedIn",
        href: links.linkedin || LINKEDIN_DEFAULT,
      }),
      DockIcon({
        src: stravaIcon,
        alt: "Strava",
        href: links.strava || STRAVA_DEFAULT,
      }),
    ],
  };
}

export default Dock;
