import Link from "../../components/router/link.js";
import { getCollection } from "../../api/payload.js";
import { NavBar } from "../../components/baptiste/nav.js";

export default async function PagePortfolioBaptiste() {
  const payloadData = await getCollection("projects");

  const projects = payloadData?.docs ?? [];

  console.log("Projects Payload :", projects);

  return {
    type: "main",
    attributes: [
      ["class", ["min-h-screen", "bg-[#171717]", "text-white", "p-8"]],
    ],
    children: [
      NavBar()
    ],
  };
}