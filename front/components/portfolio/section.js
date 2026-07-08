export default function Section({
  id,
  title = "",
  text = "",
  image,
  imageAlt = "",
  reverse = false,
} = {}) {
  const textBlock = {
    type: "div",
    attributes: [["class", ["flex-1", "min-w-[240px]"]]],
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
  };

  const blocks = [textBlock];

  if (image) {
    const imageBlock = {
      type: "img",
      attributes: [
        ["src", image],
        ["alt", imageAlt],
        [
          "class",
          [
            "flex-1",
            "min-w-[240px]",
            "rounded-lg",
            "object-cover",
            "shadow-md",
          ],
        ],
      ],
    };
    if (reverse) blocks.unshift(imageBlock);
    else blocks.push(imageBlock);
  }

  const attributes = [["class", ["py-16", "px-8", "odd:bg-gray-50"]]];
  if (id) attributes.unshift(["id", id]);

  return {
    type: "section",
    attributes,
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
        children: blocks,
      },
    ],
  };
}
