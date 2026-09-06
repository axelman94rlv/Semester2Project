
import { NavBar } from "../../components/baptiste/components/nav.js";
import { Intro } from "../../components/baptiste/intro.js";
import CreatifPart from "../../components/baptiste/creatif.js";
import QualitfyPart from "../../components/baptiste/qualify.js";
import  ProjectPart  from "../../components/baptiste/project.js";
import ContactForm from "../../components/baptiste/contactForm.js";
import Footer from "../../components/baptiste/footer.js";

export default async function PagePortfolioBaptiste() {
 
  return {
    type: "main",
    attributes: [
      ["class", ["min-h-screen", "bg-[#171717]", "text-white"]],
    ],
    children: [
      NavBar(),
      Intro(),
      CreatifPart(),
      QualitfyPart(),
      await ProjectPart(),
      ContactForm(),
      Footer(),
      
  
      
     
    ],
  };
}
