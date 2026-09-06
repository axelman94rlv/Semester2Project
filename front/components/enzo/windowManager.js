import generateStructure from "../../lib/generate-structure.js";
import Finder from "./finder.js";
import Mail from "./mail.js";
import Contact from "./contact.js";
import Launchpad from "./launchpad.js";
import { projects, ProjectDetail } from "./projectDetail.js";

export const WINDOWS_LAYER_ID = "enzo-windows";

const minWidth = 340;
const minHeight = 260;

let highestZIndex = 1;
let openedWindows = 0;

const apps = {
  finder: { build: () => Finder(), width: 1120, height: 620 },
  mail: { build: () => Mail(), width: 900, height: 640 },
  contact: { build: () => Contact(), width: 760, height: 470 },
  launchpad: { build: () => Launchpad(), fullscreen: true },
};

for (const project of projects) {
  apps["project-" + project.key] = {
    build: () => ProjectDetail(project),
    width: 1150,
    height: 700,
  };
}

export function registerApp(name, build, width = 820, height = 520) {
  apps[name] = { build, width, height };
}

function getDesktopSize(layer) {
  let width = layer.clientWidth;
  let height = layer.clientHeight;
  if (width < 200) width = window.innerWidth || 1200;
  if (height < 200) height = window.innerHeight || 800;
  return { width, height };
}

function putOnTop(frame) {
  highestZIndex = highestZIndex + 1;
  frame.style.zIndex = highestZIndex;
}

function applyStartSize(frame, layer, width, height) {
  const desktop = getDesktopSize(layer);

  let finalWidth = Math.min(width, desktop.width - 16);
  let finalHeight = Math.min(height, desktop.height - 16);
  if (finalWidth < minWidth) finalWidth = minWidth;
  if (finalHeight < minHeight) finalHeight = minHeight;

  frame.style.width = finalWidth + "px";
  frame.style.height = finalHeight + "px";

  const win = frame.querySelector("[data-window]");
  if (win) {
    win.style.width = "100%";
    win.style.height = "100%";
    win.style.maxWidth = "none";
    win.style.maxHeight = "none";
    win.style.minWidth = "0";
    win.style.minHeight = "0";
  }
}

function placeInCascade(frame, layer) {
  if (layer.querySelectorAll(".enzo-window-frame").length <= 1)
    openedWindows = 0;
  const shift = (openedWindows % 6) * 34;
  openedWindows = openedWindows + 1;

  const desktop = getDesktopSize(layer);
  const width = frame.offsetWidth || 820;
  const height = frame.offsetHeight || 480;

  let left = Math.round((desktop.width - width) / 2) - 40 + shift;
  let top = 56 + shift;

  if (left < 8) left = 8;
  if (left > desktop.width - width - 8)
    left = Math.max(8, desktop.width - width - 8);
  if (top < 40) top = 40;

  frame.style.left = left + "px";
  frame.style.top = top + "px";
}

function enableDragging(frame) {
  frame.addEventListener("mousedown", (event) => {
    if (event.button !== 0) return;

    putOnTop(frame);

    const titleBar = event.target.closest(".enzo-drag-handle");
    if (!titleBar) return;
    if (
      event.target.closest("button, a, input, textarea, select, .enzo-resize")
    )
      return;

    event.preventDefault();

    const layer = frame.parentElement;
    const startMouseX = event.clientX;
    const startMouseY = event.clientY;
    const startLeft = frame.offsetLeft;
    const startTop = frame.offsetTop;

    function onMouseMove(moveEvent) {
      let left = startLeft + (moveEvent.clientX - startMouseX);
      let top = startTop + (moveEvent.clientY - startMouseY);

      const maxLeft = layer.clientWidth - frame.offsetWidth;
      const maxTop = layer.clientHeight - frame.offsetHeight;
      if (left < 0) left = 0;
      if (top < 0) top = 0;
      if (left > maxLeft) left = maxLeft;
      if (top > maxTop) top = maxTop;

      frame.style.left = left + "px";
      frame.style.top = top + "px";
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.userSelect = "";
    }

    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
}

const resizeHandles = [
  {
    direction: "n",
    style: {
      top: "-3px",
      left: "10px",
      right: "10px",
      height: "8px",
      cursor: "ns-resize",
    },
  },
  {
    direction: "s",
    style: {
      bottom: "-3px",
      left: "10px",
      right: "10px",
      height: "8px",
      cursor: "ns-resize",
    },
  },
  {
    direction: "e",
    style: {
      top: "10px",
      bottom: "10px",
      right: "-3px",
      width: "8px",
      cursor: "ew-resize",
    },
  },
  {
    direction: "w",
    style: {
      top: "10px",
      bottom: "10px",
      left: "-3px",
      width: "8px",
      cursor: "ew-resize",
    },
  },
  {
    direction: "ne",
    style: {
      top: "-4px",
      right: "-4px",
      width: "16px",
      height: "16px",
      cursor: "nesw-resize",
    },
  },
  {
    direction: "nw",
    style: {
      top: "-4px",
      left: "-4px",
      width: "16px",
      height: "16px",
      cursor: "nwse-resize",
    },
  },
  {
    direction: "se",
    style: {
      bottom: "-4px",
      right: "-4px",
      width: "16px",
      height: "16px",
      cursor: "nwse-resize",
    },
  },
  {
    direction: "sw",
    style: {
      bottom: "-4px",
      left: "-4px",
      width: "16px",
      height: "16px",
      cursor: "nesw-resize",
    },
  },
];

function enableResizing(frame, layer) {
  for (const handle of resizeHandles) {
    const element = document.createElement("div");
    element.className = "enzo-resize";
    element.style.position = "absolute";
    element.style.zIndex = "60";
    Object.assign(element.style, handle.style);

    element.addEventListener("mousedown", (event) => {
      startResizing(event, frame, layer, handle.direction);
    });

    frame.appendChild(element);
  }
}

function startResizing(event, frame, layer, direction) {
  if (event.button !== 0) return;
  event.preventDefault();
  event.stopPropagation();
  putOnTop(frame);

  const desktop = getDesktopSize(layer);
  const startMouseX = event.clientX;
  const startMouseY = event.clientY;
  const startWidth = frame.offsetWidth;
  const startHeight = frame.offsetHeight;
  const startLeft = frame.offsetLeft;
  const startTop = frame.offsetTop;

  function onMouseMove(moveEvent) {
    const deltaX = moveEvent.clientX - startMouseX;
    const deltaY = moveEvent.clientY - startMouseY;

    let width = startWidth;
    let height = startHeight;
    let left = startLeft;
    let top = startTop;

    if (direction.includes("e")) width = startWidth + deltaX;
    if (direction.includes("s")) height = startHeight + deltaY;
    if (direction.includes("w")) {
      width = startWidth - deltaX;
      left = startLeft + deltaX;
    }
    if (direction.includes("n")) {
      height = startHeight - deltaY;
      top = startTop + deltaY;
    }

    if (width < minWidth) {
      if (direction.includes("w")) left = startLeft + (startWidth - minWidth);
      width = minWidth;
    }
    if (height < minHeight) {
      if (direction.includes("n")) top = startTop + (startHeight - minHeight);
      height = minHeight;
    }

    if (left < 0) {
      width = width + left;
      left = 0;
    }
    if (top < 0) {
      height = height + top;
      top = 0;
    }
    if (left + width > desktop.width) width = desktop.width - left;
    if (top + height > desktop.height) height = desktop.height - top;

    frame.style.width = Math.round(width) + "px";
    frame.style.height = Math.round(height) + "px";
    frame.style.left = Math.round(left) + "px";
    frame.style.top = Math.round(top) + "px";
  }

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.body.style.userSelect = "";
  }

  document.body.style.userSelect = "none";
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

function createFrame(windowStructure) {
  return {
    type: "div",
    attributes: [
      ["class", ["enzo-window-frame", "enzo-window-open", "absolute", "top-0", "left-0"]],
    ],
    children: [windowStructure],
  };
}

export function openApp(name) {
  const layer = document.getElementById(WINDOWS_LAYER_ID);
  if (!layer) return;

  const app = apps[name];
  if (!app) return;

  const alreadyOpen = layer.querySelector(`[data-window="${name}"]`);
  if (alreadyOpen) {
    putOnTop(alreadyOpen.closest(".enzo-window-frame") || alreadyOpen);
    return;
  }

  if (app.fullscreen) {
    const overlay = generateStructure(app.build());
    overlay.classList.add("enzo-launchpad-open");
    layer.appendChild(overlay);
    putOnTop(overlay);
    return;
  }

  const frame = generateStructure(createFrame(app.build()));
  layer.appendChild(frame);

  applyStartSize(frame, layer, app.width, app.height);
  placeInCascade(frame, layer);
  putOnTop(frame);

  enableDragging(frame);
  enableResizing(frame, layer);
}
