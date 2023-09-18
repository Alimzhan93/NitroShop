const counter = () => {
  let cartCounter = 0;
  let favoritesCounter = 0;
  let cartCounters = 0;

  function updateCartCounter(value) {
    cartCounter += value;
    // Обновите DOM-элемент счетчика корзины
    document.querySelector(".counter").textContent = cartCounter;
  }

  function updateFavoritesCounter(value) {
    favoritesCounter += value;
    // Обновите DOM-элемент счетчика избранного
    document.querySelector("#favorites .counter").textContent =
      favoritesCounter;
  }

  function decreaseCartCounter() {
    cartCounter--;
    // Обновите DOM-элемент счетчика корзины
    document.querySelector(".counter").textContent = cartCounter;
  }
  function decreaseCartCounters(newCartCount) {
    if (newCartCount <= 0) {
      newCartCount = 0;
    }
    // Обновите DOM-элемент счетчика корзины
    document.querySelector(".counter").textContent = newCartCount;
  }
  

  function decreaseFavoritesCounter() {
    favoritesCounter--;
    // Обновите DOM-элемент счетчика избранного
    document.querySelector("#favorites .counter").textContent =
      favoritesCounter;
  }

  return {
    updateCartCounter,
    updateFavoritesCounter,
    decreaseCartCounter,
    decreaseCartCounters,
    decreaseFavoritesCounter,
  };
};

export default counter;
