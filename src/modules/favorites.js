import renderFavorites from "./renderFavorites";
import postsData from "./postData";
import renderCart from "./renderCart";
import counter from "./counter";
const counters = counter()
const favorites = () => {
  const goodsWrapper = document.querySelector(".goods");
  const favoritesbtn = document.getElementById("favorites");
  const favoritesModal = document.querySelector(".favorites");
  const favoritesCloseBtn = favoritesModal.querySelector(".favorites-close");
  const favoritesWrapper = document.querySelector('.favorites-wrapper')
  const favoritesTotal = favoritesModal.querySelector(".favorites-total > span");
  const favoritesSendBtn = favoritesModal.querySelector(".favorites-confirm"); 

//отрывает избранное
  const openFavorites = () => {
    const favorites = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];
    
    favoritesModal.style.display = "flex";
    
    renderFavorites(favorites)
    
    favoritesTotal.textContent = favorites.reduce((sum, goodItem) => {
      return sum + goodItem.price;
    }, 0);
  };

  favoritesbtn.addEventListener("click", openFavorites);

  //закрывает избраное
  const closenCart = () => {
    favoritesModal.style.display = "";
  };
  favoritesCloseBtn.addEventListener("click", closenCart);


  goodsWrapper.addEventListener("click", (event) => {
    if (event.target.classList.contains('card-iconfavorites')) {
      const icon = event.target;
      const card = icon.closest('.card');
      const key = card.dataset.key;
      const goods = JSON.parse(localStorage.getItem("goods"));
      let favorites = localStorage.getItem("favorites")
        ? JSON.parse(localStorage.getItem("favorites"))
        : [];
      const goodsItem = goods.find((item) => item.id === +key);
      
      const isFavorite = favorites.some((item) => item.id === +key);
  
      if (isFavorite) {
        // Если товар уже есть в избранном, убираем его
        favorites = favorites.filter((item) => item.id !== +key);
        icon.classList.remove("favorite"); // Убираем класс
        icon.style.color = "white"; // Возвращаем белый цвет текста
        counters.updateFavoritesCounter(1);
      } else {
        // Иначе добавляем товар в избранное
        favorites.push(goodsItem);
        icon.classList.add("favorite"); // Добавляем класс
        icon.style.color = "red"; // Устанавливаем красный цвет текста
        counters.decreaseFavoritesCounter(1);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
      counters.updateFavoritesCounter(1);
    }
  });
  
  

  // favoritesWrapper.addEventListener('click', (event) => {
  //   console.log(event.target);
  //   if (event.target.classList.contains("btn-primary")) {
  //     const favorites = localStorage.getItem("favorites")
  //       ? JSON.parse(localStorage.getItem("favorites"))
  //       : [];
  //     const card = event.target.closest('.card');
  //     const key = card.dataset.key;
  //     const index = favorites.findIndex((item) => {
  //       return item.id === +key;
  //     });
  
  //     if (index !== -1) {
  //       // Извлекаем элемент из избранного
  //       const favoriteItem = favorites.splice(index, 1)[0];
  
  //       // Добавляем элемент в корзину
  //       const cart = localStorage.getItem("cart")
  //         ? JSON.parse(localStorage.getItem("cart"))
  //         : [];
  //       cart.push(favoriteItem);
  
  //       // Обновляем хранилище для корзины и избранного
  //       localStorage.setItem("favorites", JSON.stringify(favorites));
  //       localStorage.setItem("cart", JSON.stringify(cart));
  
  //       // Перерисовываем список избранных и корзину
  //       renderFavorites(favorites);
  //       renderCart(cart);
        
  //       cartCounter.textContent = cart.length.toString();
  //       counterFavorit--; // Уменьшаем счетчик "Избранное"
  //       updateCounterFavo(); // Обновляем счетчик
  //     }
  //   }
  // });
  
  favoritesWrapper.addEventListener('click',(event)=>{
    console.log(event.target);
    if(event.target.classList.contains('btn-primary')){
      const favorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [];
      const card = event.target.closest('.card')
      const key = card.dataset.key;
      const index = favorites.findIndex((item) => {
        return item.id === +key;
      });
      favorites.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(favorites));

      renderFavorites(favorites)
      favoritesTotal.textContent = favorites.reduce((sum, goodItem) => {
        return sum + goodItem.price;
      }, 0);

      // Уменьшаем счетчик "Избранное"
      counters.decreaseFavoritesCounter(); // Обновляем счетчик
    }
  })


  favoritesSendBtn.addEventListener("click", (event) => {
    const favorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [];
      const icon = event.target;
    postsData(favorites).then(() => {
      localStorage.removeItem("favorites");

      renderFavorites([]);
      favoritesTotal.textContent = 0;
      
      counters.decreaseFavoritesCounter(1)// Обновляем счетчи
    });
  });
  
};
export default favorites;
