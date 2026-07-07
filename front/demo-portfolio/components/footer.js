// Footer : contact + rappel discret du moteur. Texte interpolé depuis le store.

export default function Footer() {
  return {
    type: "footer",
    attributes: [["class", ["site-footer"]]],
    children: [
      {
        type: "p",
        attributes: [["class", ["footer-contact"]]],
        children: ["Travaillons ensemble — {{ profil.email }}"],
      },
      {
        type: "p",
        attributes: [["class", ["footer-note"]]],
        children: ["Page rendue par Vanilla-Engine · aucun framework externe · {{ profil.prenom }} {{ profil.nom }}"],
      },
    ],
  };
}
