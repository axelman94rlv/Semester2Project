import generateStructure from "../../lib/generate-structure.js";
import Finder from "./finder.js";

export const WINDOWS_LAYER_ID = "enzo-windows";

function positioned(windowStructure, { paddingTop = "8rem" } = {}) {
  return {
    type: "div",
    attributes: [
      ["class", ["w-full", "flex", "justify-center", "px-4"]],
      ["style", [["paddingTop", paddingTop]]],
    ],
    children: [windowStructure],
  };
}

const registry = {
  finder: () => positioned(Finder()),
};

export function registerApp(key, factory) {
  registry[key] = factory;
}

export function openApp(key) {
  const layer = document.getElementById(WINDOWS_LAYER_ID);
  if (!layer) return;

  const factory = registry[key];
  if (!factory) return;

  if (layer.querySelector(`[data-window="${key}"]`)) return;

  layer.appendChild(generateStructure(factory()));
}
