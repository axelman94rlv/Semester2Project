export default function AboutMe({
  id = "about",
  title = "À propos de moi",
  text = "",
  image,
  imageAlt = "",
} = {}) {
  const content = [
    {
      type: "div",
      attributes: [["class", ["flex-1"]]],
      children: [
        {
          type: "h2",
          attributes: [["class", ["text-3xl", "font-bold", "mb-4"]]],
          children: [title],
        },
        {
          type: "p",
          attributes: [
            [
              "class",
              ["text-gray-600", "leading-relaxed", "whitespace-pre-line"],
            ],
          ],
          children: [text],
        },
      ],
    },
  ];

  if (image) {
    content.unshift({
      type: "img",
      attributes: [
        ["src", image],
        ["alt", imageAlt],
        [
          "class",
          [
            "w-48",
            "h-48",
            "rounded-full",
            "object-cover",
            "shadow-md",
            "shrink-0",
          ],
        ],
      ],
    });
  }

  return {
    type: "section",
    attributes: [
      ["id", id],
      ["class", ["py-16", "px-8"]],
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
              "gap-10",
              "flex-wrap",
            ],
          ],
        ],
        children: content,
      },
    ],
  };
}
