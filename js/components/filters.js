import { renderPagination, renderProducts } from "./render.js";

export function setupFilters(products) {
  const form = document.querySelector(".catalog-form");
  if (!form) return;

  form.addEventListener("change", () => {
    let filteredProducts = filterProducts(products);
    renderProducts(filteredProducts, 1);
    renderPagination(filteredProducts, 1);
    updateFilterCounts(products, filteredProducts);
  });
}

export function filterProducts(products) {
  let filteredProducts = [...products];
  const checkedTypes = [...document.querySelectorAll(".custom-checkbox__field:checked")].map(input => input.value);
  if (checkedTypes.length > 0) {
    filteredProducts = filteredProducts.filter(product => product.type.some(type => checkedTypes.includes(type)));
  }
  const status = document.querySelector("input[name='status']:checked")?.value;
  if (status === "instock") {
    filteredProducts = filteredProducts.filter(product => 
      product.availability && Object.values(product.availability).some(count => count > 0));
  }
  return filteredProducts;
}

export function updateFilterCounts(allProducts, filteredProducts) {
  const typeCounts = { pendant: 0, overhead: 0, point: 0, ceiling: 0, nightlights: 0 };
  allProducts.forEach(product => {
    product.type.forEach(type => {
      if (typeCounts.hasOwnProperty(type)) {
        typeCounts[type]++;
      }
    });
  });
  document.querySelectorAll(".custom-checkbox__field").forEach(input => {
    const countElement = input.closest(".custom-checkbox").querySelector(".custom-checkbox__count");
    if (countElement) {
      countElement.textContent = typeCounts[input.value] || 0;
    }
  });
}