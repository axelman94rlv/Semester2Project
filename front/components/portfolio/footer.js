export default function Footer({
  id = "contact",
  title = "Me contacter",
  text = "N'hésitez pas à me joindre :",
  contacts = [],
  author = "",
} = {}) {
  const year = new Date().getFullYear();

  return {
    type: "footer",
    attributes: [
      ["id", id],
      ["class", ["bg-gray-900", "text-white", "py-12", "px-8"]],
    ],
    children: [
      {
        type: "div",
        attributes: [["class", ["max-w-4xl", "mx-auto", "text-center"]]],
        children: [
          {
            type: "h2",
            attributes: [["class", ["text-2xl", "font-bold", "mb-3"]]],
            children: [title],
          },
          {
            type: "p",
            attributes: [["class", ["text-gray-400", "mb-6"]]],
            children: [text],
          },
          {
            type: "ul",
            attributes: [
              [
                "class",
                ["flex", "justify-center", "gap-6", "flex-wrap", "mb-8"],
              ],
            ],
            children: contacts.map((contact) => ({
              type: "li",
              children: [
                {
                  type: "a",
                  attributes: [
                    ["href", contact.href],
                    [
                      "class",
                      [
                        "text-gray-300",
                        "hover:text-white",
                        "underline",
                        "transition-colors",
                      ],
                    ],
                  ],
                  children: [contact.label + " : " + contact.value],
                },
              ],
            })),
          },
          {
            type: "p",
            attributes: [["class", ["text-sm", "text-gray-500"]]],
            children: ["© " + year + (author ? " " + author : "")],
          },
        ],
      },
    ],
  };
}
