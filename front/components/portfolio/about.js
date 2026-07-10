export default function About({
  id = "about",
  title = "About me",
  text = "",
} = {}) {
  return {
    type: "section",
    attributes: [
      ["id", id],
      ["class", ["py-16", "px-6", "md:px-8", "border-b", "border-zinc-800"]],
    ],
    children: [
      {
        type: "div",
        attributes: [["class", ["max-w-4xl", "mx-auto"]]],
        children: [
          {
            type: "h2",
            attributes: [
              ["class", ["text-2xl", "font-bold", "text-white", "mb-4"]],
            ],
            children: [title],
          },
          {
            type: "p",
            attributes: [
              [
                "class",
                ["text-zinc-400", "leading-relaxed", "whitespace-pre-line"],
              ],
            ],
            children: [text],
          },
        ],
      },
    ],
  };
}
