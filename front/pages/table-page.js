import Link from "../components/router/link.js";
import { getCollection } from "../api/payload.js";

export default async function PageTable() {
  const dataStringified = sessionStorage.getItem("zaza");
  const tableData = dataStringified ? JSON.parse(dataStringified) : {};

  const payloadData = await getCollection("posts");
    const posts = payloadData?.docs ?? [];

  console.log("Payload data :", payloadData);

  function onTdClick(event) {
    const td = event.currentTarget;
    const textNode = td.childNodes[0];
    const text = textNode?.textContent ?? "";

    const input = document.createElement("input");
    input.value = text;

    td.innerHTML = "";
    td.appendChild(input);
    input.focus();

    input.addEventListener("blur", function (event) {
      const input = event.currentTarget;
      const text = input.value;
      const textNode = document.createTextNode(text);
      const td = input.parentNode;

      td.innerHTML = "";
      td.appendChild(textNode);

      const key = td.dataset.key;
      tableData[key] = text;

      sessionStorage.setItem("zaza", JSON.stringify(tableData));

      td.addEventListener("click", onTdClick);
    });

    td.removeEventListener("click", onTdClick);
  }

  return {
    type: "div",
    children: [
      Link("/gallery", "Gallery Page"),

      {
        type: "p",
        children: [`Posts récupérés : ${payloadData?.docs?.length ?? 0}`],
      },
      ...posts.map((post) => ({
        type: "p",
        children: [post.title ?? "Sans titre"],
      })),
    

      {
        type: "table",
        children: [
          {
            type: "tbody",
            children: Array.from({ length: 20 }, (_, i) => ({
              type: "tr",
              children: Array.from({ length: 20 }, (_, j) => ({
                type: "td",
                events: [["click", onTdClick]],
                attributes: [
                  ["data-key", `${i},${j}`],
                  ["class", ["bg-red-500", "text-white", "p-4", "border"]],
                ],
                children: [tableData[`${i},${j}`] ?? "Default"],
              })),
            })),
          },
        ],
      },
    ],
  };
}