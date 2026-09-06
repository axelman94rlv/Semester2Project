// Logique du carrousel projets : placement des cartes et navigation.
// Le squelette vit dans ../components/carousel.js.

const SHIFT = 85;
const SIDE_SCALE = 0.5;
const SIDE_OPACITY = "0.5";

/**
 *
 * @param {Element} root
 * @returns {{root: Element, update: Function, step: Function, destroy: Function}}
 */
export function createCarousel(root) {
  const slides = [...root.querySelectorAll("[data-slide]")];
  const count = slides.length;
  let current = 0;

  const offsetOf = (i) => {
    const half = Math.floor(count / 2);
    return ((((i - current + half) % count) + count) % count) - half;
  };

  const update = () => {
    slides.forEach((slide, i) => {
      const o = offsetOf(i);
      const active = o === 0;
      const visible = Math.abs(o) <= 1;

      slide.style.transform =
        `translate(-50%, -50%) translateX(${o * SHIFT}%) ` +
        `scale(${active ? 1 : SIDE_SCALE})`;
      slide.style.opacity = active ? "1" : visible ? SIDE_OPACITY : "0";
      slide.style.zIndex = active ? "20" : "10";
      slide.style.pointerEvents = active ? "auto" : "none";
    });
  };

  const step = (delta) => {
    if (!count) return;
    current = (current + delta + count) % count;
    update();
  };

  const controls = [...root.querySelectorAll("[data-step]")];
  const onControlClick = (event) =>
    step(Number(event.currentTarget.dataset.step));
  controls.forEach((el) => el.addEventListener("click", onControlClick));

  update();

  return {
    root,
    update,
    step,
    destroy() {
      controls.forEach((el) => el.removeEventListener("click", onControlClick));
    },
  };
}

let mounted = null;

export function mountCarousel(selector = "[data-carousel]") {
  const attach = () => {
    const root = document.querySelector(selector);
    if (!root || mounted?.root === root) return;
    mounted?.destroy();
    mounted = createCarousel(root);
  };

  requestAnimationFrame(() => requestAnimationFrame(attach));
  setTimeout(attach, 100);
  setTimeout(attach, 400);
}

export function destroyCarousel() {
  mounted?.destroy();
  mounted = null;
}
