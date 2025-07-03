import { renderProducts, renderPagination } from "./render.js";
import { setupSorting } from "./sorting.js";
import { setupFilters, updateFilterCounts } from "./filters.js";
import { initTooltip } from "./tooltip.js";

export default async function initCatalog() {
  let products = [];
  let currentPage = 1;
  const itemsPerPage = 6;

  try {
    const response = await fetch('data/data.json');
    products = await response.json();

    renderProducts(products, currentPage);
    renderPagination(products, currentPage);
    setupFilters(products);
    setupSorting(products);
    updateFilterCounts(products);

    // Инициализация тултипов после рендера товаров
    initTooltip();
  } catch (error) {
    console.error("Ошибка загрузки каталога:", error);
  }
}

document.addEventListener("DOMContentLoaded", initCatalog);