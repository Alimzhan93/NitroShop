const postsData = (cart, favorites) => {
  const data = {
    cart: cart,
    favorites: favorites,
  };

  return fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
};
export default postsData;

