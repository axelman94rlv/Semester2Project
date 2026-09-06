import finderIcon from "../../../lib/img/enzo/dock-finder.png";
import mailIcon from "../../../lib/img/enzo/dock-mail.png";
import contactsIcon from "../../../lib/img/enzo/dock-contacts.png";
import vscodeIcon from "../../../lib/img/enzo/dock-vscode.svg";
import githubIcon from "../../../lib/img/enzo/dock-github.svg";
import linkedinIcon from "../../../lib/img/enzo/dock-linkedin.svg";
import stravaIcon from "../../../lib/img/enzo/dock-strava.svg";
import { openApp } from "../windowManager.js";
import { API_BASE_URL } from "../../../api/config.js";

let linksCache = null;
let linksPromise = null;

async function fetchLinks() {
  try {
    const response = await Promise.race([
      fetch(API_BASE_URL + "/globals/links-enzo?t=" + Date.now()),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 5000),
      ),
    ]);
    if (!response.ok) return {};
    return await response.json();
  } catch {
    return {};
  }
}

function loadLinks() {
  if (!linksPromise) {
    linksPromise = fetchLinks().then((links) => {
      linksCache = links;
      return links;
    });
  }
  return linksPromise;
}

function openSocial(key) {
  const open = (links) => {
    const url = links && links[key];
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };
  if (linksCache) {
    open(linksCache);
  } else {
    loadLinks().then(open);
  }
}

loadLinks();

function DockIcon({ src, alt, app = null, onClick = null }) {
  if (app && !onClick) {
    onClick = () => openApp(app);
  }

  const image = {
    type: "img",
    attributes: [
      ["src", src],
      ["alt", alt],
      [
        "class",
        [
          "block",
          "w-[60px]",
          "h-[60px]",
          "object-contain",
          "origin-bottom",
          "transition-transform",
          "duration-150",
          "ease-out",
          "hover:scale-[1.35]",
          "hover:-translate-y-[12px]",
        ],
      ],
    ],
  };

  const events = [];
  if (onClick) events.push(["click", onClick]);

  return {
    type: "button",
    attributes: [
      ["type", "button"],
      ["title", alt],
      ["aria-label", alt],
      ["class", ["shrink-0", "cursor-pointer"]],
      ...(app ? [["data-app", app]] : []),
    ],
    events,
    children: [image],
  };
}

export function Dock() {
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
          "bottom-[12px]",
          "z-40",
          "flex",
          "items-end",
          "gap-[12px]",
          "px-[12px]",
          "py-[10px]",
          "rounded-[24px]",
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
        onClick: () => openSocial("github"),
      }),
      DockIcon({
        src: linkedinIcon,
        alt: "LinkedIn",
        onClick: () => openSocial("linkedin"),
      }),
      DockIcon({
        src: stravaIcon,
        alt: "Strava",
        onClick: () => openSocial("strava"),
      }),
    ],
  };
}

export default Dock;
