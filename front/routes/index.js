import PageGallery from "../pages/gallery-page.js";
import PageTable from "../pages/table-page.js";
import PortfolioEnzo from "../pages/portfolio_enzo.js";
import Page404 from "../pages/not-found-page.js";

export default {
  "/": PageGallery,
  "/table": PageTable,
  "/gallery": PageGallery,
  "/portfolio": PortfolioEnzo,
  "*": Page404,
};
