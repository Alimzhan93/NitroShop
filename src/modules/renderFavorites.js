const renderFavorites = (goods) => {
    const favoritesWrapper = document.querySelector(".favorites-wrapper");

    favoritesWrapper.innerHTML = "";
  if (goods.length === 0) {
    favoritesWrapper.insertAdjacentHTML(
      "beforeend",
      `<div id="cart-empty">
           Избраное пока пуста
      </div> 
      `
    );
  } else {
    goods.forEach((goodsItem) => {
        favoritesWrapper.insertAdjacentHTML(
        "beforeend",
        `
          <div class="card" data-key="${goodsItem.id}">
          ${goodsItem.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ""}
            <div class="card-img-wrapper">
              <span
                class="card-img-top"
                style="background-image: url('${goodsItem.img}');"
              ></span>
            </div>
            <div class="card-body justify-content-between">
              <div class="card-price">${goodsItem.price} ₽</div>
              <h5 class="card-title">
              ${goodsItem.title}
              </h5>
              <button class="btn btn-primary">Удалить</button>
            </div>
          </div>
          `
      );
    });
  }
  };
  export default renderFavorites;