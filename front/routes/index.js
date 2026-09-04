import PageGallery from "../pages/gallery-page.js";
import PageTable from "../pages/table-page.js";
import PagePortfolioBaptiste from "../pages/baptiste/potfolio-baptiste.js";
import PagePortfolioEnzo from "../pages/enzo/portfolio-enzo.js";
import Page404 from "../pages/not-found-page.js";

export default {
  "/": PageGallery,
  "/table": PageTable,
  "/gallery": PageGallery,
  "/baptiste/portfolio": PagePortfolioBaptiste,
  "/enzo/portfolio": PagePortfolioEnzo,
  "*": Page404,
};
