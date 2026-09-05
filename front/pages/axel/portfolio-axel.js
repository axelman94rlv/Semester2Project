import { NavBar } from "../../components/axel/components/nav.js";
import HeroPart from "../../components/axel/hero.js";
import AboutPart from "../../components/axel/about.js";
import Description from "../../components/axel/components/description.js";
import Carousel from "../../components/axel/components/carousel.js";

export default async function PagePortfolioAxel() {
  const [description, carousel] = await Promise.all([
    Description(),
    Carousel(),
  ]);

  return {
    type: "main",
    attributes: [["class", ["min-h-screen", "bg-[#3d0066]", "text-[#C86BFA]"]]],
    children: [NavBar(), HeroPart(), AboutPart([description, carousel])],
  };
}
