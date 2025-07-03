export default function initMenu() {
    const catalogBtn = document.querySelector(".header__catalog-btn");
    const mainMenu = document.querySelector(".header__catalog");
    const closeBtn = document.querySelector(".main-menu__close");
  
    if (!catalogBtn || !mainMenu || !closeBtn) {
      console.error("Не найдены элементы меню!");
      return;
    }
  
    // Открытие меню
    catalogBtn.addEventListener("click", function () {
      mainMenu.classList.add("main-menu--active");
    });
  
    // Закрытие меню
    closeBtn.addEventListener("click", function () {
      mainMenu.classList.remove("main-menu--active");
    });
  
    // Закрытие при клике вне меню
    document.addEventListener("click", function (event) {
      if (
        mainMenu.classList.contains("main-menu--active") &&
        !mainMenu.contains(event.target) &&
        !catalogBtn.contains(event.target)
      ) {
        mainMenu.classList.remove("main-menu--active");
      }
    });
  }