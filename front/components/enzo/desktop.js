import Wallpaper from "./components/wallpaper.js";
import MenuBar from "./components/menuBar.js";
import Dock from "./components/dock.js";
import Notification from "./components/notification.js";

export default function Desktop({ children = [], notification = true } = {}) {
  return {
    type: "div",
    attributes: [
      [
        "class",
        [
          "enzo-desktop",
          "relative",
          "w-full",
          "min-h-screen",
          "overflow-hidden",
          "bg-black",
        ],
      ],
    ],
    children: [
      Wallpaper(),
      MenuBar(),

      {
        type: "div",
        attributes: [
          [
            "class",
            ["relative", "z-10", "w-full", "min-h-screen", "pt-[32px]"],
          ],
        ],
        children,
      },

      notification ? Notification() : null,
      Dock(),
    ],
  };
}
