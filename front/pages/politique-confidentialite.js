import LegalLayout from "../components/portfolio/legal-layout.js";

const EMAIL = "moitaenzo@gmail.com";

const FOOTER_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
];

export default function PolitiqueConfidentialite() {
  return LegalLayout({
    title: "Politique de confidentialité",
    updated: "juillet 2026",
    footerLinks: FOOTER_LINKS,
    sections: [
      {
        heading: "Responsable du traitement",
        paragraphs: [
          "Les données éventuellement traitées le sont par Enzo Moïta.",
          "Contact : " + EMAIL,
        ],
      },
      {
        heading: "Données collectées",
        paragraphs: [
          "Ce site est un site vitrine : il ne collecte aucune donnée personnelle, n'utilise pas de cookies de suivi ni d'outil de mesure d'audience. Aucun formulaire n'enregistre vos informations ; le bouton de contact ouvre simplement votre logiciel de messagerie.",
        ],
      },
      {
        heading: "Contact par email",
        paragraphs: [
          "Si vous choisissez de m'écrire, votre adresse email et le contenu de votre message servent uniquement à vous répondre. Ils ne sont ni cédés ni revendus à des tiers.",
        ],
      },
      {
        heading: "Vos droits (RGPD)",
        paragraphs: [
          "Conformément au Règlement général sur la protection des données, vous disposez d'un droit d'accès, de rectification et de suppression des données que vous m'auriez communiquées. Pour l'exercer, écrivez à " + EMAIL + ".",
        ],
      },
    ],
  });
}
