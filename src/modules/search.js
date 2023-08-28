import getData from "./getData";
import renderGoods from "./renderGoods";
import { searchFilter, funcFilter } from "./filters";
import { debounce } from "./helpers";
const search = () => {
  const searchInput = document.querySelector(".search-wrapper_input");

  const minInp = document.getElementById("min");
  const maxInp = document.getElementById("max");
  const checkInp = document.getElementById("discount-checkbox");
  const checkMark = document.querySelector(".filter-check_checkmark");

  // const debounceSearch = debounce((event) => {
  //   getData().then((data) => {
  //     renderGoods(searchFilter(data, event.target.value));
  //   });
  // });

  const debounceFunc = debounce(
    (min = "", max = "", checkValue = false, searchValue = "") => {
      getData().then((data) => {
        renderGoods(funcFilter(data, min, max, checkValue, searchValue));
      });
    }
  );

  searchInput.addEventListener("input", () => {
    debounceFunc(
      minInp.value,
      maxInp.value,
      checkInp.checked,
      searchInput.value
    );
  });

  minInp.addEventListener("input", () => {
    debounceFunc(
      minInp.value,
      maxInp.value,
      checkInp.checked,
      searchInput.value
    );
  });

  maxInp.addEventListener("input", () => {
    debounceFunc(
      minInp.value,
      maxInp.value,
      checkInp.checked,
      searchInput.value
    );
  });

  checkInp.addEventListener("input", () => {
    if (checkInp.checked) {
      checkMark.classList.add("checked");
    } else {
      checkMark.classList.remove("checked");
    }
    debounceFunc(
      minInp.value,
      maxInp.value,
      checkInp.checked,
      searchInput.value
    );
  });
};
export default search;
