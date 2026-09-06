import Window, { TrafficLights } from "./components/window.js";
import { getCollection } from "../../api/payload.js";
import { API_BASE_URL } from "../../api/config.js";

const PAYLOAD_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");
const IMG_SHADOW = "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]";

function mediaUrl(image) {
  const url =
    image?.url || image?.sizes?.large?.url || image?.sizes?.medium?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : PAYLOAD_ORIGIN + url;
}

function normalizeProject(doc) {
  return {
    id: doc.id,
    title: doc.title || "Projet",
    lieu: doc.lieu || "",
    year: doc.year != null ? String(doc.year) : "",
    logo: mediaUrl(doc.logo),
    description: doc.description || "",
    stack: Array.isArray(doc.stack)
      ? doc.stack.map((s) => s.name).filter(Boolean)
      : [],
    images: Array.isArray(doc.images)
      ? doc.images.map((item) => mediaUrl(item.image)).filter(Boolean)
      : [],
  };
}

export async function fetchEnzoProjects() {
  try {
    const data = await Promise.race([
      getCollection("enzo-projects?depth=2&limit=100&t=" + Date.now()),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 4000),
      ),
    ]);
    return (data?.docs ?? []).map(normalizeProject);
  } catch (error) {
    console.error("Payload : impossible de charger les projets", error);
    return [];
  }
}

function galleryImage(src, alt) {
  return {
    type: "img",
    attributes: [
      ["src", src],
      ["alt", alt],
      ["class", ["w-full", "h-auto", "rounded-[10px]", IMG_SHADOW]],
    ],
  };
}

function buildPreview(project) {
  const children =
    project.images.length > 0
      ? project.images.map((src) => galleryImage(src, project.title))
      : [
          {
            type: "p",
            attributes: [["class", ["text-black/40", "text-[14px]"]]],
            children: ["Aucune image"],
          },
        ];

  return {
    type: "div",
    attributes: [
      ["class", ["flex-[1.4]", "min-w-0", "overflow-y-auto", "bg-[#f3f3f5]"]],
    ],
    children: [
      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "min-h-full",
              "flex",
              "flex-col",
              "items-center",
              "justify-center",
              "gap-[16px]",
              "p-[24px]",
            ],
          ],
        ],
        children,
      },
    ],
  };
}

function stackTag(name) {
  return {
    type: "span",
    attributes: [
      [
        "class",
        [
          "inline-flex",
          "items-center",
          "px-[12px]",
          "py-[5px]",
          "rounded-full",
          "border",
          "border-black/15",
          "bg-black/[0.03]",
          "text-[12px]",
          "font-medium",
          "text-black/70",
        ],
      ],
    ],
    children: [name],
  };
}

export function ProjectDetail(project) {
  const subtitle = [project.lieu, project.year].filter(Boolean).join(" · ");

  return Window({
    name: "project-" + project.id,
    title: project.title,
    trafficLights: false,
    className: ["enzo-sf"],
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
              "px-[16px]",
              "py-[13px]",
              "border-b",
              "border-black/10",
            ],
          ],
        ],
        children: [TrafficLights()],
      },

      {
        type: "div",
        attributes: [["class", ["flex-1", "min-h-0", "flex", "items-stretch"]]],
        children: [
          buildPreview(project),
          {
            type: "div",
            attributes: [
              [
                "class",
                [
                  "w-[380px]",
                  "shrink-0",
                  "flex",
                  "flex-col",
                  "gap-[18px]",
                  "p-[32px]",
                  "overflow-y-auto",
                ],
              ],
            ],
            children: [
              {
                type: "div",
                attributes: [["class", ["flex", "flex-col", "gap-[4px]"]]],
                children: [
                  {
                    type: "h1",
                    attributes: [
                      [
                        "class",
                        [
                          "text-[26px]",
                          "leading-[30px]",
                          "font-bold",
                          "text-black",
                        ],
                      ],
                    ],
                    children: [project.title],
                  },
                  {
                    type: "p",
                    attributes: [["class", ["text-[13px]", "text-black/50"]]],
                    children: [subtitle],
                  },
                ],
              },

              {
                type: "p",
                attributes: [
                  ["class", ["text-[14px]", "leading-[1.7]", "text-black/70"]],
                ],
                children: [project.description],
              },

              project.stack.length > 0
                ? {
                    type: "div",
                    attributes: [
                      ["class", ["flex", "flex-col", "gap-[10px]", "mt-[4px]"]],
                    ],
                    children: [
                      {
                        type: "p",
                        attributes: [
                          [
                            "class",
                            [
                              "text-[11px]",
                              "font-bold",
                              "uppercase",
                              "tracking-[0.12em]",
                              "text-black/45",
                            ],
                          ],
                        ],
                        children: ["Stack"],
                      },
                      {
                        type: "div",
                        attributes: [
                          ["class", ["flex", "flex-wrap", "gap-[8px]"]],
                        ],
                        children: project.stack.map(stackTag),
                      },
                    ],
                  }
                : null,
            ],
          },
        ],
      },
    ],
  });
}

export default ProjectDetail;
