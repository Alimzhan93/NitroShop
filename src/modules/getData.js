const getData = () => {
  return fetch("https://nitro769-a337f-default-rtdb.firebaseio.com/goods.json").then((response) =>
    response.json()
  );
};
export default getData;
