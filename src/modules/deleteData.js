const deleteData = () => {
  return fetch("http://localhost:3000/goods/24", {
    method: "DELETE",
  }).then((res) => res.json());
};
export default deleteData;
