export function initAccordion() {
    // Используем делегирование событий для всех аккордеонов
    document.querySelector(".faq__accordion").addEventListener("click", function (event) {
      // Проверяем, был ли клик по кнопке аккордеона
      if (event.target.closest(".accordion__btn")) {
        const button = event.target.closest(".accordion__btn");
        const accordion = button.closest(".accordion__element");
        const content = accordion.querySelector(".accordion__content");
        const icon = accordion.querySelector(".accordion__btn-icon");
    
        const isActive = accordion.classList.contains("active");
    
        // Закрываем все аккордеоны
        document.querySelectorAll(".accordion__element").forEach((el) => {
          el.classList.remove("active");
          el.querySelector(".accordion__content").style.display = "none";
          el.querySelector(".accordion__btn-icon").classList.remove("open");
        });
    
        // Если текущий аккордеон не активен, открываем его
        if (!isActive) {
          accordion.classList.add("active");
          content.style.display = "block";
          icon.classList.add("open"); // Добавляем класс для смены иконки на минус
        }
      }
    });
  }    