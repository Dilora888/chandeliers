export default function initLocationSelector() {
    const locationContainer = document.querySelector('.location');
    if (!locationContainer) return;
  
    const cityButton = locationContainer.querySelector('.location__city');
    const cityName = cityButton.querySelector('.location__city-name');
    const sublist = locationContainer.querySelector('.location__sublist');
    const sublinks = locationContainer.querySelectorAll('.location__sublink');
  
    function toggleSublist() {
      cityButton.classList.toggle('location__city--active');
    }
  
    function selectCity(event) {
      const selectedCity = event.target.textContent;
      cityName.textContent = selectedCity;
      toggleSublist();
    }
  
    function closeSublist(event) {
      if (!locationContainer.contains(event.target)) {
        cityButton.classList.remove('location__city--active');
      }
    }
  
    cityButton.addEventListener('click', toggleSublist);
    sublinks.forEach((link) => link.addEventListener('click', selectCity));
    document.addEventListener('click', closeSublist);
  }