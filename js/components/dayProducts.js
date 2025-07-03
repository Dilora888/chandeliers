// import-функция для загрузки данных
export async function loadDayProducts(url) {
  try {
    const response = await fetch("./data/data.json");
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status}`);
    }

    const data = await response.json();
    return data.filter((product) => product.goodsOfDay);
  } catch (error) {
    console.error("Ошибка при получении товаров дня:", error);
    return [];
  }
}

// Функция рендера товаров дня
export function renderDayProducts(products, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Контейнер ${containerSelector} не найден`);
    return;
  }

  container.innerHTML = products
    .map(
      (product) => `
      <li class="day-products__item swiper-slide">
          <div class="product-card product-card--small">
              <div class="product-card__visual">
                  <img class="product-card__img" src="${product.image}" height="344" width="290" alt="${product.name}">
                  <div class="product-card__more">
                      <a href="#" class="product-card__link btn btn--icon">
                          <span class="btn__text">В корзину</span>
                          <svg width="24" height="24" aria-hidden="true">
                              <use xlink:href="images/sprite.svg#icon-basket"></use>
                          </svg>
                      </a>
                      <a href="#" class="product-card__link btn btn--secondary">
                          <span class="btn__text">Подробнее</span>
                      </a>
                  </div>
              </div>
              <div class="product-card__info">
                  <h2 class="product-card__title">${product.name}</h2>
                  <span class="product-card__old">
                      <span class="product-card__old-number">${product.price.old} ₽</span>
                  </span>
                  <span class="product-card__price">
                      <span class="product-card__price-number">${product.price.new} ₽</span>
                  </span>
              </div>
          </div>
      </li>
  `
    )
    .join("");

  // Инициализация Swiper
  new Swiper(".day-products__slider", {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: ".day-products__navigation-btn--next",
      prevEl: ".day-products__navigation-btn--prev",
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
  });
}
