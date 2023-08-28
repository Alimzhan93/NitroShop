import getData from "./getData";
import renderGoods from "./renderGoods";
import postsData from "./postData";
import deleteData from "./deleteData";
const load = () => {
  const cartBtn = document.getElementById("cart");
  const favoritesbtn = document.getElementById("favorites");

  getData().then((data) => {
    renderGoods(data);
  });
  // cartBtn.addEventListener("click", () => {
  //   postsData().then((data) => {
  //     console.log(data);
  //   });
  // });
  // favoritesbtn.addEventListener('click',()=>{
  //   deleteData().then((data) => {
  //     console.log(data);
  //   });
  // })
};
export default load;
