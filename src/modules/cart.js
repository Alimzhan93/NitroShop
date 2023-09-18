import renderCart from "./renderCart";
import postsData from "./postData";
import counter from "./counter";
const counters = counter()
const cart = () => {
  const cartBtn = document.getElementById("cart");
  const cartModal = document.querySelector(".cart");
  const cartCloseBtn = cartModal.querySelector(".cart-close");
  const goodsWrapper = document.querySelector(".goods");
  const cartWrapper = document.querySelector(".cart-wrapper");
  const cartTotal = document.querySelector(".cart-total > span");
  const cartSendBtn = document.querySelector(".cart-confirm");

 
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
      counters.updateCartCounter(1);
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
  
      if (index !== -1) { // Проверяем, найден ли элемент в корзине
        cart.splice(index, 1);
  
        localStorage.setItem("cart", JSON.stringify(cart));
  
        renderCart(cart);
  
        cartTotal.textContent = cart.reduce((sum, goodItem) => {
          return sum + goodItem.price;
        }, 0);
  
        counters.decreaseCartCounter();
      }
    }
  });

  let counter = 0
  function decreaseCartCounterss(count) {
    counter = count
   document.querySelector("#cart .counter").textContent = counter
   
  }
  cartSendBtn.addEventListener("click", () => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  
    postsData(cart).then(() => {
      localStorage.removeItem("cart");
      renderCart([]);
      cartTotal.textContent = 0; 
      decreaseCartCounterss(0)     
    })
  });
  
  
  
};
export default cart;
