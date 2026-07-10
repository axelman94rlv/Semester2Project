import LegalLayout from "../components/portfolio/legal-layout.js";

const EMAIL = "moitaenzo@gmail.com";

const FOOTER_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
];

export default function MentionsLegales() {
  return LegalLayout({
    title: "Mentions légales",
    updated: "juillet 2026",
    footerLinks: FOOTER_LINKS,
    sections: [
      {
        heading: "Éditeur du site",
        paragraphs: [
          "Ce site est édité par Enzo Moïta, à titre personnel.",
          "Contact : " + EMAIL,
        ],
      },
      {
        heading: "Directeur de la publication",
        paragraphs: ["Enzo Moïta."],
      },
      {
        heading: "Hébergement",
        paragraphs: [
          "Nom et adresse de l'hébergeur : [à compléter].",
        ],
      },
      {
        heading: "Propriété intellectuelle",
        paragraphs: [
          "L'ensemble des contenus présents sur ce site (textes, images, code) est la propriété d'Enzo Moïta, sauf mention contraire. Toute reproduction ou représentation, totale ou partielle, sans autorisation préalable est interdite.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Pour toute question relative au site, vous pouvez écrire à " + EMAIL + ".",
        ],
      },
    ],
  });
}
