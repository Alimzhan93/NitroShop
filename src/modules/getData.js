const getData = () => {
  return fetch("https://testtt-4afe6-default-rtdb.firebaseio.com/goods.json").then((response) =>
    response.json()
  );
};
export default getData;
