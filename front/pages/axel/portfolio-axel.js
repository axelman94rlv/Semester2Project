import { NavBar } from "../../components/axel/components/nav.js";
import HeroPart from "../../components/axel/hero.js";

export default function PagePortfolioAxel() {
  return {
    type: "main",
    attributes: [["class", ["min-h-screen", "bg-[#03071E]", "text-[#C86BFA]"]]],
    children: [
      NavBar(),
      HeroPart(),
      {
        type: "section",
        attributes: [
          ["id", "a-propos"],
          [
            "class",
            [
              "min-h-screen",
              "bg-[#03071E]",
              "flex",
              "items-center",
              "justify-center",
              "text-4xl",
            ],
          ],
        ],
        children: ["Section suivante (test)"],
      },
    ],
  };
}
