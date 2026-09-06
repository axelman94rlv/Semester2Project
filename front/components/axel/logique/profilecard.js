// Logique de la fiche profil : le pli/dépli de la colonne de droite.
// Le squelette vit dans ../components/profilecard.js.
export const WIDTH_CLOSED = "22.375rem"; // 358px
export const WIDTH_OPEN = "48.625rem"; // 778px

let cardOpen = false;

export function toggleProfileCard() {
  const root = document.querySelector("[data-profilecard]");
  if (!root) return cardOpen;

  const body = root.querySelector("[data-cardbody]");
  const panel = root.querySelector("[data-cardpanel]");
  const chevron = root.querySelector("[data-cardchevron]");
  if (!body || !panel) return cardOpen;

  cardOpen = !cardOpen;
  body.style.width = cardOpen ? WIDTH_OPEN : WIDTH_CLOSED;
  panel.style.opacity = cardOpen ? "1" : "0";
  if (chevron) chevron.style.transform = cardOpen ? "rotate(180deg)" : "";
  return cardOpen;
}

export function closeProfileCard() {
  if (cardOpen) toggleProfileCard();
}
