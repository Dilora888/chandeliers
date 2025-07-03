import { renderPagination, renderProducts } from "./render.js";

export function setupSorting(products) {
    const sortSelect = document.querySelector(".catalog__sort-select");
    if (!sortSelect) return;
  
    sortSelect.addEventListener("change", () => {
      let sortedProducts = [...products];
      const sortBy = sortSelect.value;
  
      if (sortBy === "price-min") {
        sortedProducts.sort((a, b) => a.price.new - b.price.new);
      } else if (sortBy === "price-max") {
        sortedProducts.sort((a, b) => b.price.new - a.price.new);
      } else if (sortBy === "rating-max") {
        sortedProducts.sort((a, b) => b.rating - a.rating);
      }
  
      renderProducts(sortedProducts, 1);
      renderPagination(sortedProducts, 1);
    });
  }