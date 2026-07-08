export default function Hero({
  id = "home",
  greeting = "Hi there",
  avatar,
  onAvatarError,
  tagline = "",
  tags = [],
} = {}) {
  const left = [];

  if (avatar) {
    left.push({
      type: "img",
      attributes: [
        ["src", avatar],
        ["alt", greeting],
        [
          "class",
          [
            "w-24",
            "h-24",
            "md:w-28",
            "md:h-28",
            "rounded-2xl",
            "object-cover",
            "ring-1",
            "ring-zinc-700",
          ],
        ],
      ],
      ...(onAvatarError ? { events: [["error", onAvatarError]] } : {}),
    });
  }

  return {
    type: "section",
    attributes: [
      ["id", id],
      [
        "class",
        ["py-14", "md:py-20", "px-6", "md:px-8", "border-b", "border-zinc-800"],
      ],
    ],
    children: [
      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "max-w-4xl",
              "mx-auto",
              "flex",
              "items-center",
              "gap-8",
              "flex-wrap",
            ],
          ],
        ],
        children: [
          ...left,
          {
            type: "div",
            attributes: [["class", ["flex-1", "min-w-[240px]"]]],
            children: [
              {
                type: "h1",
                attributes: [
                  [
                    "class",
                    [
                      "text-3xl",
                      "md:text-4xl",
                      "font-bold",
                      "text-white",
                      "mb-3",
                    ],
                  ],
                ],
                children: [greeting],
              },
              {
                type: "p",
                attributes: [["class", ["text-zinc-400", "text-lg", "mb-5"]]],
                children: [tagline],
              },
              {
                type: "div",
                attributes: [["class", ["flex", "gap-2", "flex-wrap"]]],
                children: tags.map((tag) => ({
                  type: "span",
                  attributes: [
                    [
                      "class",
                      [
                        "px-3",
                        "py-1",
                        "text-sm",
                        "rounded-full",
                        "bg-zinc-800",
                        "text-zinc-300",
                        "border",
                        "border-zinc-700",
                      ],
                    ],
                  ],
                  children: [tag],
                })),
              },
            ],
          },
        ],
      },
    ],
  };
}
