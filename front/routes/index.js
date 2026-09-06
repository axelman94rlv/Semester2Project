import PageGallery from "../pages/gallery-page.js";
import PageTable from "../pages/table-page.js";
import PagePortfolioBaptiste from "../pages/baptiste/potfolio-baptiste.js";
import PagePortfolioEnzo from "../pages/enzo/portfolio-enzo.js";
import Page404 from "../pages/not-found-page.js";
import PagePortfolioAxel from "../pages/axel/portfolio-axel.js";

export default {
  "/": PageGallery,
  "/table": PageTable,
  "/gallery": PageGallery,
  "/baptiste/portfolio": PagePortfolioBaptiste,
  "/enzo/portfolio": PagePortfolioEnzo,
  "/axel/portfolio": PagePortfolioAxel,
  "*": Page404,
};
