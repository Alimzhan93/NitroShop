import renderCart from "./renderCart";
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
  const cartTotal = cartModal.querySelector(".cart-total > span");
  const cartSendBtn = document.querySelector(".cart-confirm");
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
  const openFavorites = () => {
    favoritesModal.style.display = "flex";
  };

  favoritesbtn.addEventListener("click", openFavorites);

  const closenCart = () => {
    cartModal.style.display = "";
    favoritesModal.style.display = "";
  };
  cartCloseBtn.addEventListener("click", closenCart);
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
