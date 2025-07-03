import initMenu from "./components/menu.js";
import initLocationSelector from "./components/location.js";
import initCatalog from "./components/catalog.js";
import { initAccordion } from "./components/accordion.js";
import { initBasket } from "./components/basket.js";
import { loadDayProducts, renderDayProducts } from './components/dayProducts.js';


document.addEventListener("DOMContentLoaded", function () {
  initMenu();
  initLocationSelector();
  initCatalog();
  initAccordion();
  const basket = initBasket();
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart"); 
    if (!button) return;

    event.preventDefault();
    
    console.log("Добавление в корзину:", button);

    const name = button.getAttribute("data-name");
    const price = button.getAttribute("data-price");
    const img = button.getAttribute("data-img");

    if (name && price && img) {
      basket.addItem({ name, price, img });
    } else {
      console.error("Ошибка: отсутствуют данные товара");
    }
  });

  (async () => {
      const products = await loadDayProducts('data.json');
      renderDayProducts(products, '.day-products__list');
  })();
  
});
