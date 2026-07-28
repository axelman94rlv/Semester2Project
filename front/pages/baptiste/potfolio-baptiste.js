import Link from "../../components/router/link.js";
import { getCollection } from "../../api/payload.js";


import { NavBar } from "../../components/baptiste/nav.js";
import { Intro } from "../../components/baptiste/intro.js";
import CreatifPart from "../../components/baptiste/creatif.js";
import QualitfyPart from "../../components/baptiste/qualify.js";

export default async function PagePortfolioBaptiste() {
  const payloadData = await getCollection("projects");

  const projects = payloadData?.docs ?? [];

  console.log("Projects Payload :", projects);

  return {
    type: "main",
    attributes: [
      ["class", ["min-h-screen", "h-[1000rem]", "bg-[#171717]", "text-white"]],
    ],
    children: [
      NavBar(),
      Intro(),
      CreatifPart(),
      QualitfyPart(),
  
      
     
    ],
  };
}
