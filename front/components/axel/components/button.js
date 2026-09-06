const BASE = [
  "group",
  "inline-flex",
  "items-center",
  "justify-center",
  "gap-[0.75rem]",
  "h-[3.375rem]",
  "px-[1.5rem]",
  "border-[4px]",
  "border-[#C86BFA]",
  "text-[#C86BFA]",
  "font-['AudiowideCustom']",
  "text-[1.125rem]",
  "tracking-[0.02em]",
  "leading-none",
  "cursor-pointer",
  "transition-colors",
  "duration-200",
  "hover:border-[#FFEE32]",
  "hover:text-[#FFEE32]",
];

/**
 * @param {string|null} label   texte du bouton (null = icône seule)
 * @param {object} options
 *   href       si fourni → <a>, sinon <button>
 *   download   true pour forcer le téléchargement
 *   icon       src d'une icône (rendue en masque → suit la couleur au survol)
 *   onClick    handler (ignoré si href)
 *   ariaLabel  libellé accessible quand il n'y a pas de texte
 *   className  classes additionnelles (largeur, marges…)
 */
export default function Button(label, options = {}) {
  const {
    href = null,
    download = false,
    icon = null,
    onClick = null,
    ariaLabel = null,
    className = [],
  } = options;

  const attributes = [["class", [...BASE, ...className]]];

  if (href) {
    attributes.push(["href", href]);
    if (download) {
      attributes.push(["download", ""]);
    } else {
      attributes.push(["target", "_blank"], ["rel", "noopener noreferrer"]);
    }
  } else {
    attributes.push(["type", "button"]);
  }

  if (ariaLabel) attributes.push(["aria-label", ariaLabel]);

  const children = [];
  if (label) children.push(label);
  if (icon) children.push(MaskedIcon(icon));

  return {
    type: href ? "a" : "button",
    attributes,
    events: !href && onClick ? [["click", onClick]] : [],
    children,
  };
}

export function MaskedIcon(src, size = "1.4rem") {
  const url = `url("${src}")`;

  return {
    type: "span",
    attributes: [
      ["class", ["block", "shrink-0", "bg-current"]],
      [
        "style",
        [
          ["width", size],
          ["height", size],
          ["maskImage", url],
          ["WebkitMaskImage", url],
          ["maskRepeat", "no-repeat"],
          ["WebkitMaskRepeat", "no-repeat"],
          ["maskPosition", "center"],
          ["WebkitMaskPosition", "center"],
          ["maskSize", "contain"],
          ["WebkitMaskSize", "contain"],
        ],
      ],
    ],
  };
}

/** Bouton carré pour une icône seule (le carré download 40.8×40.8) */
export function IconButton(icon, options = {}) {
  return Button(null, {
    ...options,
    icon,
    className: [
      "w-[3.375rem]",
      "h-[3.375rem]",
      "px-0",
      "shrink-0",
      ...(options.className ?? []),
    ],
  });
}
