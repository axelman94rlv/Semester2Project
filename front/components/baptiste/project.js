import { getCollection } from "../../api/payload";

export default async function ProjectPart() {
  const payloadData = await getCollection("projects");

  const projects = payloadData?.docs ?? [];

  return {
    type: "section",
    attributes: [["class", ["w-full", "mt-[12rem]"]]],
    children: [
      {
        type: "ul",
        attributes: [["class", ["flex", "flex-col"]]],
        children: projects.map((project, index) => {
          const projectNumber = `p/${String(index + 1).padStart(3, "0")}`;
          const competences = project.competences ?? [];

          return {
            type: "li",
            attributes: [["class", ["list-none"]]],
            children: [
              {
                type: "article",
                attributes: [
                  [
                    "class",
                    [
                      "group",
                      "relative",
                      "overflow-hidden",

                      "flex",
                      "flex-col",
                      "justify-center",

                      "px-[8.4rem]",
                      "py-[1rem]",
                      "w-full",
                      "min-h-[10.5rem]",

                      "text-white",
                      "cursor-pointer",
                      "transition-all",
                      "duration-500",
                      "ease-out",

                      "group-hover:min-h-[18rem]",

                      "before:content-['']",
                      "before:absolute",
                      "before:left-0",
                      "before:top-0",
                      "before:w-full",
                      "before:h-px",
                      "before:bg-[linear-gradient(to_right,_white_0_12px,_transparent_12px_20px)]",
                      "before:bg-[length:24px_1px]",

                      "after:content-['']",
                      "after:absolute",
                      "after:left-0",
                      "after:bottom-0",
                      "after:w-full",
                      "after:h-px",
                      "after:bg-[linear-gradient(to_right,_white_0_12px,_transparent_12px_20px)]",
                      "after:bg-[length:24px_1px]",
                    ],
                  ],
                ],
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
                          "gap-8",
                          "w-full",
                          "transition-all",
                          "duration-500",
                          "ease-out",

                          "group-hover:flex-col",
                          "group-hover:items-start",
                          "group-hover:justify-start",
                        ],
                      ],
                    ],
                    children: [
                      {
                        type: "p",
                        attributes: [
                          [
                            "class",
                            [
                              "font-['InconsolataCustom']",
                              "text-xl",
                              "uppercase",
                              "tracking-[0.2em]",
                              "text-white/70",
                            ],
                          ],
                        ],
                        children: [projectNumber],
                      },

                      {
                        type: "h2",
                        attributes: [
                          [
                            "class",
                            [
                              "font-['InconsolataCustom']",
                              "text-xl",
                              "uppercase",
                              "leading-none",
                              "transition-all",
                              "duration-500",
                              "ease-out",

                              "group-hover:mt-2",
                            ],
                          ],
                        ],
                        children: [project.title ?? "Projet sans titre"],
                      },
                    ],
                  },

                  {
                    type: "div",
                    attributes: [
                      [
                        "class",
                        [
                          "max-h-0",
                          "overflow-hidden",
                          "opacity-0",
                          "pt-0",

                          "flex",
                          "flex-col",
                          "gap-4",

                          "transition-all",
                          "duration-500",
                          "ease-out",

                          "group-hover:max-h-[20rem]",
                          "group-hover:opacity-100",
                          "group-hover:pt-4",
                        ],
                      ],
                    ],
                    children: [
                      {
                        type: "p",
                        attributes: [
                          [
                            "class",
                            [
                              "max-w-[48rem]",
                              "text-sm",
                              "leading-relaxed",
                              "text-white/70",
                            ],
                          ],
                        ],
                        children: [
                          project.description ??
                            "Aucune description disponible.",
                        ],
                      },

                      {
                        type: "div",
                        attributes: [
                          [
                            "class",
                            [
                              "flex",
                              "items-center",
                              "gap-6",
                              "font-['InconsolataCustom']",
                              "text-xs",
                              "uppercase",
                              "tracking-[0.18em]",
                              "text-white/50",
                            ],
                          ],
                        ],
                        children: [
                          project.year
                            ? {
                                type: "p",
                                children: [`year/ ${project.year}`],
                              }
                            : "",

                          project.role
                            ? {
                                type: "p",
                                children: [`role/ ${project.role}`],
                              }
                            : "",

                          project.liveUrl
                            ? {
                                type: "a",
                                attributes: [
                                  ["href", project.liveUrl],
                                  ["target", "_blank"],
                                  ["rel", "noopener noreferrer"],
                                  [
                                    "class",
                                    [
                                      "pointer-events-auto",
                                      "text-white/70",
                                      "hover:text-white",
                                      "transition-colors",
                                      "duration-300",
                                    ],
                                  ],
                                ],
                                children: ["voir le projet"],
                              }
                            : "",
                        ],
                      },

                      {
                        type: "ul",
                        attributes: [
                          [
                            "class",
                            [
                              "flex",
                              "flex-wrap",
                              "items-center",
                              "gap-2",
                            ],
                          ],
                        ],
                        children: competences.map((competence) => ({
                          type: "li",
                          attributes: [
                            [
                              "class",
                              [
                                "list-none",
                                "font-['InconsolataCustom']",
                                "text-xs",
                                "uppercase",
                                "tracking-[0.15em]",
                                "text-white/80",
                                "border",
                                "border-white/20",
                                "px-3",
                                "py-1",
                              ],
                            ],
                          ],
                          children: [competence.name ?? "Compétence"],
                        })),
                      },
                    ],
                  },
                ],
              },
            ],
          };
        }),
      },
    ],
  };
}