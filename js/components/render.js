import { initTooltip } from "./tooltip.js";

export function renderProducts(products, page) {
    const catalogList = document.querySelector(".catalog__list");
    if (!catalogList) return;
    catalogList.innerHTML = "";
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
    const currentPageProducts = products.slice(startIndex, endIndex);
  
    currentPageProducts.forEach(product => {
      catalogList.innerHTML += `
        <li class="catalog__item">
          <div class="product-card">
            <div class="product-card__visual">
              <img class="product-card__img" src="${product.image}" alt="${product.name}">
              <div class="product-card__more">
                <a href="#" class="product-card__link btn btn--icon add-to-cart" 
                   data-name="${product.name}" data-price="${product.price.new}" data-img="${product.image}">
                  <span class="btn__text">В корзину</span>
                </a>
                <a href="#" class="product-card__link btn btn--secondary">
                  <span class="btn__text">Подробнее</span>
                </a>
              </div>
            </div>
            <div class="product-card__info">
              <h2 class="product-card__title">${product.name}</h2>
              <span class="product-card__old">
                <span class="product-card__old-number">${product.price.old}</span> ₽
              </span>
              <span class="product-card__price">
                <span class="product-card__price-number">${product.price.new}</span> ₽
              </span>
              <div class="product-card__tooltip tooltip">
                <button class="tooltip__btn" aria-label="Показать подсказку">
                  <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-i"></use>
                  </svg>
                </button>
                <div class="tooltip__content">
                  <span class="tooltip__text">Наличие товара по городам:</span>
                  <ul class="tooltip__list">
                    <li class="tooltip__item"><span class="tooltip__text">Москва: <span class="tooltip__count" data-city="moscow">${product.availability.moscow}</span></span></li>
                    <li class="tooltip__item"><span class="tooltip__text">Оренбург: <span class="tooltip__count" data-city="orenburg">${product.availability.orenburg}</span></span></li>
                    <li class="tooltip__item"><span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count" data-city="saintPetersburg">${product.availability.saintPetersburg}</span></span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>`;
    });
  
    // Инициализация тултипов после рендера товаров
    initTooltip();
  }
  
  export function renderPagination(products, currentPage) {
    const paginationContainer = document.querySelector(".catalog__pagination");
    if (!paginationContainer) return;
    const totalPages = Math.ceil(products.length / 6);
    paginationContainer.innerHTML = "";
    
    for (let i = 1; i <= totalPages; i++) {
      const paginationItem = document.createElement("li");
      paginationItem.classList.add("catalog__pagination-item");
      const paginationLink = document.createElement("button");
      paginationLink.classList.add("catalog__pagination-link");
      paginationLink.textContent = i;
      if (i === currentPage) paginationLink.classList.add("active");
      paginationLink.addEventListener("click", () => {
        renderProducts(products, i);
        renderPagination(products, i);
      });
      paginationItem.appendChild(paginationLink);
      paginationContainer.appendChild(paginationItem);
    }
  }