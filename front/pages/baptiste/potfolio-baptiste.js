import Link from "../../components/router/link.js";


import { NavBar } from "../../components/baptiste/components/nav.js";
import { Intro } from "../../components/baptiste/intro.js";
import CreatifPart from "../../components/baptiste/creatif.js";
import QualitfyPart from "../../components/baptiste/qualify.js";
import  ProjectPart  from "../../components/baptiste/project.js";
import ContactForm from "../../components/baptiste/ContactForm.js";

export default async function PagePortfolioBaptiste() {
 
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
      await ProjectPart(),
      ContactForm(),
      
  
      
     
    ],
  };
}
