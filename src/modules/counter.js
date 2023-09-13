const counter = () => {
    let cartCounter = 0;
    let favoritesCounter = 0;
  
    function updateCartCounter(value) {
      cartCounter += value;
      // Обновите DOM-элемент счетчика корзины
      document.querySelector('.counter').textContent = cartCounter;
    }
  
    function updateFavoritesCounter(value) {
      favoritesCounter += value;
      // Обновите DOM-элемент счетчика избранного
      document.querySelector('.counter').textContent = favoritesCounter;
      document.querySelector('#favorites .counter').textContent = favoritesCounter;
    }
  
    function decreaseCartCounter() {
      cartCounter--;
      // Обновите DOM-элемент счетчика корзины
      document.querySelector('.counter').textContent = cartCounter;
    }
  
    function decreaseFavoritesCounter() {
      favoritesCounter--;
      // Обновите DOM-элемент счетчика избранного
      document.querySelector('#favorites .counter').textContent = favoritesCounter;
    }
  
    return {
      updateCartCounter,
      updateFavoritesCounter,
      decreaseCartCounter,
      decreaseFavoritesCounter,
    };
  };
  
  export default counter;
  
  