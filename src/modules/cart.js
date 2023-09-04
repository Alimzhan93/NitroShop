import renderCart from "./renderCart";
import postsData from "./postData";
const cart = () => {
  const cartBtn = document.getElementById("cart");
  const cartModal = document.querySelector(".cart");
  const cartCloseBtn = cartModal.querySelector(".cart-close");
  const goodsWrapper = document.querySelector(".goods");
  const cartWrapper = document.querySelector(".cart-wrapper");
  const cartTotal = cartModal.querySelector(".cart-total > span");
  const cartSendBtn = document.querySelector(".cart-confirm");
  const cartCounter = document.querySelector('.counter')
 
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
//закрывает корзину
  const closenCart = () => {
    cartModal.style.display = "";
  };
  cartCloseBtn.addEventListener("click", closenCart);

  let counter = 0; // Изначальное значение счетчика

  function updateCounter() {
    cartCounter.textContent = counter;
  }
 
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
      counter++;
      updateCounter();
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
      
      counter--;
       updateCounter();
    
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
      counter  = 0;
       updateCounter();
    });
  });
  
};
export default cart;
