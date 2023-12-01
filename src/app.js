// FUNCTION TO CHANGE THE BACKGROUNDS DYNAMICALLY IN EQUAL INTERVALS OF TIME
document.addEventListener("DOMContentLoaded", function () {
  // Array of background images
  const backgrounds = [
    "url('/Asssets/Frame 3.png')",
    "url('/Asssets/Frame 3(1).png')",
    "url('/Asssets/Frame 3(2).png')",
  ];

  let currentBackgroundIndex = 0;

  function changeBackground() {
    document.body.style.backgroundImage = backgrounds[currentBackgroundIndex];
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
  }
  setInterval(changeBackground, 2000);
});

// FUNCTION TO GET DATA FOR MEALS
const url = "https://www.themealdb.com/api/json/v1/1/random.php";
let mealData;
async function getData() {
  try {
    let res = await axios.get(url);
    let data = await res.data;
    mealData = data.meals[0];
    let output = `
      <div id="mainRandomCard">
        <div class="mainRandomCard" >
          <div class="randomCard">
            <div> 
              <img src="${mealData.strMealThumb}" class="randomImage">
            </div>
            <div class="textscard">
              <div class="foodTextGrandParent">
                <div class="foodTextParent">
                  <H1 id="foodText">${mealData.strMeal}</H1>
                </div>
              </div>
              <div class="btnDiv">
              <a href=""><button class="knowMoreBtn"> Know More</button></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    let output2 = `
      <div class="modalchildDiv"> 
        <div class="imgModalDiv">
          <img src="${mealData.strMealThumb}" class="imgModal" id="imageModal">
        </div>
        <div class="modalTextContent">
          <div class="modalHeader">
            <span class="close">&times;</span>
            <h1 id="modalHeader">${mealData.strMeal}</h1>
            <hr>
          </div>
          <div class="ingredients" id="ingredients">
            <h1> INGREDIENTS</h1>
            ${generateIngredientsList(mealData)}
          </div>
          <div class="watchBtnModalMain">
            <a href="${
              mealData.strYoutube
            }" target="_blank"><button id="watchBtnModal"> Watch </button></a>
          </div>
        </div>
      </div>
    `;
    document.getElementById("modalDiv").innerHTML = output2;
    document.getElementById("mainRandomCard").innerHTML = output;
  } catch (err) {
    console.error(`Error: ${err}`);
    alert("Please type a valid Category");
  }
}
// CLICK FUNCTION FOR RANDOMCARD
document.getElementById("mainRandomCard").addEventListener("click", (e) => {
  e.preventDefault();
  displayrandomdish(mealData);
  console.log("entering in the mainrandom");
});
// FUNCTION FOR GENERATING INGREDIENTS FROM API
function generateIngredientsList(mealData) {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = mealData[`strIngredient${i}`];
    if (ingredient) {
      ingredientsList += `<p class="ingredientsList">${ingredient}</p>`;
    }
  }
  return ingredientsList;
}
getData();

// SECTION 2- SEARCH RESULTS
async function search(foodName) {
  const url1 = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodName}`;
  try {
    let res = await axios.get(url1);
    const data = await res.data.meals;
    console.log("data: ", data);
    document.getElementById("searchResultsCardMain").innerHTML = "";
    if (!data || data.length === 0) {
      alert("No search results found");
      return;
    }
    let output = "";
    data.forEach((meal) => {
      output += `
        <div class="searchResultsCard" >
          <div>
            <img src="${meal.strMealThumb}" id="searchResultImage" alt="${meal.strMeal}">
          </div>
          <div class="searchResultNameParent" onclick="displaydish(this)">
            <h1 id="searchResultName">${meal.strMeal}</h1>
          </div>
        </div>`;
    });

    document.getElementById("searchResultsCardMain").innerHTML = output;
  } catch (err) {
    alert("Please type a valid Category");
    output, (style.display = "none");
    console.error(err);
  }
}
// FUNCTION TO DISPLAY THE MODAL CORRESPONDING TO THE CLICKED CARD
function displayrandomdish(mealdata) {
  console.log("dishName: ", mealdata);
  let title = document.getElementById("modalHeader");
  let dishName = mealdata.strMeal;
  title.innerHTML = dishName;
  getDishDetails(dishName);
  var modal = document.getElementById("modalDiv");
  modal.style.display = "block";
}

// FUNCTION TO  DISPLAY THE MODAL FOR THE SEARCH RESULTS
function displaydish(element) {
  var dishName = element.querySelector("#searchResultName").innerText;
  console.log("dishName: ", dishName);
  let title = document.getElementById("modalHeader");
  title.innerHTML = dishName;
  getDishDetails(dishName);
  var modal = document.getElementById("modalDiv");
  modal.style.display = "block";
}
// FUNCTION TO DISPLAY THE IMAGE AND INGREDIENTS INSIDE THE MODAL
async function getDishDetails(query) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  let response = await axios
    .get(url)
    .then((res) => {
      data = res.data.meals[0];
      console.log("name: ", data);
      let imageModal = document.getElementById("imageModal");
      imageModal.src = data.strMealThumb;
      card = `
      ${generateIngredientsList(data)}
    `;
      document.getElementById("ingredients").innerHTML = "";
      document.getElementById("ingredients").innerHTML = card;
    })
    .catch((err) => {
      console.log(err);
    });
}
// FUNCTION TO SUBMIT THE SEARCH BAR
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let foodName = document.getElementById("searchBox").value.trim();
  if (!foodName) {
    search();
    alert("Please type something to search");
  } else {
    search(foodName);
  }
  const searchResultsSection = document.getElementById("searchResultsCardMain");
  searchResultsSection.scrollIntoView({ behavior: "smooth" });
});
// MODAL FUNCTION
var modal = document.getElementById("modalDiv");
var btn = document.getElementById("mainRandomCard");
var btn1 = document.getElementById("searchResultsCardMain");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};
document.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// MAKING THE POPULAR CATEGORIES FUNCTIONAL
let categoryClick1 = document
  .getElementById("category1")
  .addEventListener("click", (e) => {
    e.preventDefault();
    search("Seafood");
    const searchResultsSection = document.getElementById(
      "searchResultsCardMain"
    );
    searchResultsSection.scrollIntoView({ behavior: "smooth" });
  });
let categoryClick2 = document
  .getElementById("category2")
  .addEventListener("click", (e) => {
    e.preventDefault();
    search("Chicken");
    const searchResultsSection = document.getElementById(
      "searchResultsCardMain"
    );
    searchResultsSection.scrollIntoView({ behavior: "smooth" });
  });
let categoryClick3 = document
  .getElementById("category3")
  .addEventListener("click", (e) => {
    e.preventDefault();
    search("Breakfast");
    const searchResultsSection = document.getElementById(
      "searchResultsCardMain"
    );
    searchResultsSection.scrollIntoView({ behavior: "smooth" });
  });
let categoryClick4 = document
  .getElementById("category4")
  .addEventListener("click", (e) => {
    e.preventDefault();
    search("Vegan");
    const searchResultsSection = document.getElementById(
      "searchResultsCardMain"
    );
    searchResultsSection.scrollIntoView({ behavior: "smooth" });
  });

// GO TO TOP BUTTON
const goToTopBtn = document.getElementById("goToTopBtn");
window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTopBtn.style.display = "block";
  } else {
    goToTopBtn.style.display = "none";
  }
};
function goToTop() {
  document.documentElement.scrollTop = 0;
}
