import HomePage from "../pages/home-page.js";
import PageGallery from "../pages/gallery-page.js";
import PageTable from "../pages/table-page.js";
import PortfolioEnzo from "../pages/portfolio_enzo.js";
import MentionsLegales from "../pages/mentions-legales.js";
import PolitiqueConfidentialite from "../pages/politique-confidentialite.js";
import Page404 from "../pages/not-found-page.js";

export default {
  "/": HomePage,
  "/gallery": PageGallery,
  "/table": PageTable,
  "/portfolio": PortfolioEnzo,
  "/mentions-legales": MentionsLegales,
  "/politique-confidentialite": PolitiqueConfidentialite,
  "*": Page404,
};
