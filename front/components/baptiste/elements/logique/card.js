export function onCardEnter(event) {
    const card = event.currentTarget;
    const hoverContent = card.querySelector(".qualify-card-hover");

    if (!hoverContent) return;

    hoverContent.style.opacity = "1";
    hoverContent.style.transform = "scale(1)";
  }

 export function onCardLeave(event) {
    const card = event.currentTarget;
    const hoverContent = card.querySelector(".qualify-card-hover");

    if (!hoverContent) return;

    hoverContent.style.opacity = "0";
    hoverContent.style.transform = "scale(0.95)";
  }