import renderCart from "./renderCart";
import renderFavorites from "./renderFavorites";
import postsData from "./postData";
const cart = () => {
  const cartBtn = document.getElementById("cart");
  const cartModal = document.querySelector(".cart");
  const cartCloseBtn = cartModal.querySelector(".cart-close");
  const goodsWrapper = document.querySelector(".goods");
  const favoritesbtn = document.getElementById("favorites");
  const favoritesModal = document.querySelector(".favorites");
  const favoritesCloseBtn = document.querySelector(".favorites-close");
  const cartWrapper = document.querySelector(".cart-wrapper");
  const favoritesWrapper = document.querySelector('.favorites-wrapper')
  const cartTotal = cartModal.querySelector(".cart-total > span");
  const favoritesTotal = favoritesModal.querySelector(".favorites-total > span");
  const cartSendBtn = document.querySelector(".cart-confirm");
  const iconFavorites = document.querySelector(".card-iconfavorites");
 
 //отрывает корзину
  const openCart = () => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
      cartModal.style.display = "flex";
    
    renderCart(cart);
    

    cartTotal.textContent = cart.reduce((sum, goodItem) => {
      return sum + goodItem.price;
    }, 0);
  };
  cartBtn.addEventListener("click", openCart);
//отрывает избраное

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

  const closenCart = () => {
    cartModal.style.display = "";
    favoritesModal.style.display = "";
  };
  //закрывает корзину
  cartCloseBtn.addEventListener("click", closenCart);
  //закрывает избраное
  favoritesCloseBtn.addEventListener("click", closenCart);


  goodsWrapper.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-primary")) {
      const card = event.target.closest(".card");
      const key = card.dataset.key;
      const goods = JSON.parse(localStorage.getItem("goods"));
      const cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      const goodsItem = goods.find((item) => {
        return item.id === +key;
      });
      cart.push(goodsItem);
      localStorage.setItem("cart", JSON.stringify(cart));
    }else if(event.target.classList.contains('card-iconfavorites')){
      const card = event.target.closest('.card')
      const key = card.dataset.key;
      const goods = JSON.parse(localStorage.getItem("goods"));
      const favorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [];
      const goodsItem = goods.find((item) => {
        return item.id === +key;
      });
      favorites.push(goodsItem);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  });

  
  cartWrapper.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-primary")) {
      const cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      const card = event.target.closest(".card");
      const key = card.dataset.key;
      const index = cart.findIndex((item) => {
        return item.id === +key;
      });
      cart.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(cart));

      renderCart(cart);

      cartTotal.textContent = cart.reduce((sum, goodItem) => {
        return sum + goodItem.price;
      }, 0);
    }
  });

  favoritesWrapper.addEventListener('click',(event)=>{
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
    }
  })

  cartSendBtn.addEventListener("click", () => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    postsData(cart).then(() => {
      localStorage.removeItem("cart");

      renderCart([]);
      cartTotal.textContent = 0;
    });
  });
  
};
export default cart;
