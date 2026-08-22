import { apiPost } from "../../api/payload.js";
import line from "../../lib/img/baptiste/line_contact.svg";

export default function ContactForm() {
  return {
    type: "section",

    attributes: [
      [
        "class",
        [
          "w-full",
          "min-h-screen",
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "gap-[4rem]",
          "px-[4rem]",
          "py-[6rem]",
          "text-[#f5f1d8]",
          "font-['InconsolataCustom']",
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
              "w-full",
              "max-w-[72rem]",
              "flex",
              "justify-center",
              "pointer-events-none",
              "select-none",
            ],
          ],
        ],
        children: [
          {
            type: "img",
            attributes: [
              ["src", line],
              ["alt", ""],
              [
                "class",
                [
                  "w-full",
                  "h-auto",
                  "block",
                ],
              ],
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
              "relative",
              "w-full",
              "max-w-[72rem]",
              "px-[4.5rem]",
              "py-[3.5rem]",
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
                  "absolute",
                  "top-0",
                  "left-0",
                  "right-0",
                  "h-px",
                  "bg-[linear-gradient(to_right,_#f5f1d8_0_64px,_transparent_64px_92px)]",
                  "bg-[length:92px_1px]",
                  "bg-repeat-x",
                  "pointer-events-none",
                ],
              ],
            ],
          },

          {
            type: "div",
            attributes: [
              [
                "class",
                [
                  "absolute",
                  "bottom-0",
                  "left-0",
                  "right-0",
                  "h-px",
                  "bg-[linear-gradient(to_right,_#f5f1d8_0_64px,_transparent_64px_92px)]",
                  "bg-[length:92px_1px]",
                  "bg-repeat-x",
                  "pointer-events-none",
                ],
              ],
            ],
          },

          {
            type: "div",
            attributes: [
              [
                "class",
                [
                  "absolute",
                  "top-0",
                  "bottom-0",
                  "left-0",
                  "w-px",
                  "bg-[linear-gradient(to_bottom,_#f5f1d8_0_64px,_transparent_64px_92px)]",
                  "bg-[length:1px_92px]",
                  "bg-repeat-y",
                  "pointer-events-none",
                ],
              ],
            ],
          },

          {
            type: "div",
            attributes: [
              [
                "class",
                [
                  "absolute",
                  "top-0",
                  "bottom-0",
                  "right-0",
                  "w-px",
                  "bg-[linear-gradient(to_bottom,_#f5f1d8_0_64px,_transparent_64px_92px)]",
                  "bg-[length:1px_92px]",
                  "bg-repeat-y",
                  "pointer-events-none",
                ],
              ],
            ],
          },

          {
            type: "form",

            attributes: [
              ["action", "javascript:void(0)"],
              ["method", "post"],
              [
                "class",
                [
                  "relative",
                  "z-10",
                  "w-full",
                  "min-h-[28rem]",
                  "flex",
                  "flex-col",
                  "justify-between",
                  "text-[#f5f1d8]",
                  "font-['InconsolataCustom']",
                ],
              ],
            ],

            events: [
              [
                "submit",
                async function (event) {
                  event.preventDefault();

                  const form = event.target;
                  const formData = new FormData(form);

                  const data = {
                    name: formData.get("name"),
                    email: formData.get("email"),
                    company: formData.get("company"),
                    message: formData.get("message"),
                  };

                  console.log("Données envoyées à Payload :", data);

                  const result = await apiPost("/contacts", data);

                  if (!result) {
                    alert("Erreur lors de l'envoi du formulaire.");
                    return;
                  }

                  alert("Formulaire envoyé avec succès.");
                  form.reset();
                },
              ],
            ],

            children: [
              {
                type: "h2",

                attributes: [
                  [
                    "class",
                    [
                      "text-[2.1rem]",
                      "leading-none",
                      "font-light",
                      "mb-[3.5rem]",
                    ],
                  ],
                ],

                children: ["Contact"],
              },

              {
                type: "div",

                attributes: [
                  [
                    "class",
                    [
                      "text-[1.55rem]",
                      "leading-[2.4]",
                      "font-light",
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
                          "flex",
                          "flex-wrap",
                          "items-baseline",
                          "gap-x-4",
                        ],
                      ],
                    ],

                    children: [
                      "Your name is",

                      {
                        type: "input",
                        attributes: [
                          ["name", "name"],
                          ["type", "text"],
                          ["required", true],
                          ["autocomplete", "name"],
                          [
                            "class",
                            [
                              "w-[18rem]",
                              "bg-transparent",
                              "border-0",
                              "border-b",
                              "border-[#f5f1d8]",
                              "outline-none",
                              "px-2",
                              "text-[#f5f1d8]",
                              "font-['InconsolataCustom']",
                              "text-[1.55rem]",
                            ],
                          ],
                        ],
                      },

                      ". An email we can contact",
                    ],
                  },

                  {
                    type: "p",

                    attributes: [
                      [
                        "class",
                        [
                          "flex",
                          "flex-wrap",
                          "items-baseline",
                          "gap-x-4",
                        ],
                      ],
                    ],

                    children: [
                      "you at is",

                      {
                        type: "input",
                        attributes: [
                          ["name", "email"],
                          ["type", "email"],
                          ["required", true],
                          ["autocomplete", "email"],
                          [
                            "class",
                            [
                              "w-[18rem]",
                              "bg-transparent",
                              "border-0",
                              "border-b",
                              "border-[#f5f1d8]",
                              "outline-none",
                              "px-2",
                              "text-[#f5f1d8]",
                              "font-['InconsolataCustom']",
                              "text-[1.55rem]",
                            ],
                          ],
                        ],
                      },

                      ". The company you associate",
                    ],
                  },

                  {
                    type: "p",

                    attributes: [
                      [
                        "class",
                        [
                          "flex",
                          "flex-wrap",
                          "items-baseline",
                          "gap-x-4",
                        ],
                      ],
                    ],

                    children: [
                      "with is called",

                      {
                        type: "input",
                        attributes: [
                          ["name", "company"],
                          ["type", "text"],
                          ["autocomplete", "organization"],
                          [
                            "class",
                            [
                              "w-[18rem]",
                              "bg-transparent",
                              "border-0",
                              "border-b",
                              "border-[#f5f1d8]",
                              "outline-none",
                              "px-2",
                              "text-[#f5f1d8]",
                              "font-['InconsolataCustom']",
                              "text-[1.55rem]",
                            ],
                          ],
                        ],
                      },

                      ". Your message is",
                    ],
                  },

                  {
                    type: "p",

                    attributes: [
                      [
                        "class",
                        [
                          "flex",
                          "flex-wrap",
                          "items-baseline",
                          "gap-x-4",
                        ],
                      ],
                    ],

                    children: [
                      {
                        type: "textarea",
                        attributes: [
                          ["name", "message"],
                          ["required", true],
                          ["rows", "1"],
                          [
                            "class",
                            [
                              "w-[42rem]",
                              "min-h-[3rem]",
                              "bg-transparent",
                              "border-0",
                              "border-b",
                              "border-[#f5f1d8]",
                              "outline-none",
                              "px-2",
                              "text-[#f5f1d8]",
                              "font-['InconsolataCustom']",
                              "text-[1.55rem]",
                              "resize-none",
                              "leading-normal",
                            ],
                          ],
                        ],
                      },

                      ".",
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
                      "flex",
                      "justify-center",
                      "mt-[3.5rem]",
                    ],
                  ],
                ],

                children: [
                  {
                    type: "button",

                    attributes: [
                      ["type", "submit"],
                      [
                        "class",
                        [
                          "px-[2.5rem]",
                          "py-[1rem]",
                          "border",
                          "border-[#f5f1d8]",
                          "bg-transparent",
                          "text-[#f5f1d8]",
                          "font-['InconsolataCustom']",
                          "text-[1.2rem]",
                          "cursor-pointer",
                          "transition-all",
                          "duration-300",
                          "hover:bg-[#f5f1d8]",
                          "hover:text-black",
                        ],
                      ],
                    ],

                    children: ["Envoyer"],
                  },
                ],
              },
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
              "w-full",
              "max-w-[72rem]",
              "flex",
              "justify-center",
              "pointer-events-none",
              "select-none",
            ],
          ],
        ],
        children: [
          {
            type: "img",
            attributes: [
              ["src", line],
              ["alt", ""],
              [
                "class",
                [
                  "w-full",
                  "h-auto",
                  "block",
                  "rotate-180",
                ],
              ],
            ],
          },
        ],
      },
    ],
  };
}