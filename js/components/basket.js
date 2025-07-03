export class Basket {
  constructor() {
      this.basketButton = document.querySelector('.header__user-btn');
      this.basketElement = document.querySelector('.header__basket');
      this.basketEmptyMessage = this.basketElement.querySelector('.basket__empty-block');
      this.basketCount = document.querySelector('.header__user-count');
      this.basketItemsContainer = this.basketElement.querySelector('.basket__list');
      this.items = [];

      this._updateItemCount();
      this._init();
  }

  _init() {
      if (this.basketButton && this.basketElement) {
          this.basketButton.addEventListener('click', () => {
              this.basketElement.classList.toggle('basket--active');
              console.log("Корзина активирована:", this.basketElement.classList.contains('basket--active'));
          });
      }

      this.basketItemsContainer.addEventListener('click', (event) => {
          const button = event.target.closest('.basket__close');
          if (!button) return;

          const item = event.target.closest('.basket__item');
          console.log("Удаляем товар:", item);

          if (item) {
              const itemIndex = item.dataset.index;
              this.removeItem(itemIndex);
          }
      });
  }

  addItem(item) {
    // Используем уникальный ключ - комбинация name + price
    const itemKey = `${item.name}_${item.price}`;
    const existingItemIndex = this.items.findIndex(i => `${i.name}_${i.price}` === itemKey);

    if (existingItemIndex !== -1) {
        this.items[existingItemIndex].quantity += 1;
    } else {
        this.items.push({ ...item, quantity: 1 });
    }

    console.log("Список товаров после добавления:", this.items); 

    this._renderItems();
    this._updateItemCount();
    this._updateBasketState();
}




removeItem(index) {
    this.items.splice(index, 1);
    this._renderItems();
    this._updateItemCount();
    this._updateBasketState();
}



_renderItems() {
    console.log("Отрисовка корзины, товары:", this.items);

    // Очищаем только список товаров, но НЕ сам контейнер корзины
    this.basketItemsContainer.innerHTML = '';

    this.items.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('basket__item');
        listItem.dataset.index = index;

        listItem.innerHTML = `
            <div class="basket__img">
                <img src="${item.img}" alt="${item.name}" height="60" width="60">
            </div>
            <span class="basket__name">${item.name}</span>
            <span class="basket__price">${item.price} руб</span>
            <button class="basket__close " type="button">
                <svg width="24" height="24" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-close"></use>
                </svg>
            </button>
        `;

        this.basketItemsContainer.appendChild(listItem);
    });

    // Проверяем, есть ли в корзине товары, если да, добавляем кнопку "Перейти к оформлению"
    let checkoutButton = document.querySelector('.basket__link');
    if (this.items.length > 0) {
        if (!checkoutButton) {
            checkoutButton = document.createElement('a');
            checkoutButton.classList.add('basket__link', 'btn');
            checkoutButton.href = '#';
            checkoutButton.textContent = 'Перейти к оформлению';

            this.basketElement.appendChild(checkoutButton);
        }
    } else {
        if (checkoutButton) {
            checkoutButton.remove();
        }
    }

    console.log("Корзина отрисована", this.basketItemsContainer.innerHTML);
}


  _updateItemCount() {
      this.basketCount.textContent = this.items.reduce((total, item) => total + item.quantity, 0);
  }

  _updateBasketState() {
      this.basketEmptyMessage.style.display = this.items.length === 0 ? 'block' : 'none';
  }
}


export function initBasket() {
  return new Basket();
}
