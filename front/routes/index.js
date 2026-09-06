import HomePage from "../pages/home.js";
import PagePortfolioBaptiste from "../pages/baptiste/potfolio-baptiste.js";
import PagePortfolioEnzo from "../pages/enzo/portfolio-enzo.js";
import Page404 from "../pages/not-found-page.js";
import PagePortfolioAxel from "../pages/axel/portfolio-axel.js";

export default {
  "/": HomePage,
  "/baptiste/portfolio": PagePortfolioBaptiste,
  "/enzo/portfolio": PagePortfolioEnzo,
  "/axel/portfolio": PagePortfolioAxel,
  "*": Page404,
};
