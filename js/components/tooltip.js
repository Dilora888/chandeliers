export function initTooltip() {
  if (typeof tippy === "undefined") {
    console.error("Ошибка: tippy.js не подключен!");
    return;
  }

  // Находим все элементы с классом .product-card__tooltip
  document.querySelectorAll('.product-card__tooltip').forEach((tooltip) => {
    const tooltipBtn = tooltip.querySelector('.tooltip__btn');
    const tooltipContent = tooltip.querySelector('.tooltip__content');

    if (!tooltipBtn || !tooltipContent) return;

    // Убираем контент из DOM, так как tippy будет его копировать
    const tooltipHTML = tooltipContent.innerHTML;
    tooltipContent.remove(); // Удаляем контент, чтобы избежать дублирования

    // Инициализируем tippy.js для кнопки
    tippy(tooltipBtn, {
      content: tooltipHTML,
      allowHTML: true,
      placement: 'top',
      arrow: false,
      interactive: true,
      trigger: 'mouseenter focus',
      onShow(instance) {
        // Добавляем класс к попапу tippy, чтобы применить стили
        instance.popper.querySelector('.tippy-box').classList.add('tooltip__content');
      },
      onHidden(instance) {
        // Убираем стили, когда подсказка скрыта
        instance.popper.querySelector('.tippy-box').classList.remove('tooltip__content');
      }
    });
  });
}
