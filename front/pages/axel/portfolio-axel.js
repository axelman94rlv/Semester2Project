import { NavBar } from "../../components/axel/components/nav.js";
import HeroPart from "../../components/axel/hero.js";
import AboutPart from "../../components/axel/about.js";
import Description from "../../components/axel/components/description.js";

export default async function PagePortfolioAxel() {
  const description = await Description();

  return {
    type: "main",
    attributes: [["class", ["min-h-screen", "bg-[#3d0066]", "text-[#C86BFA]"]]],
    children: [NavBar(), HeroPart(), AboutPart([description])],
  };
}
