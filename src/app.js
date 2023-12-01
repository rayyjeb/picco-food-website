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

    // Increment index for the next background
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
  }

  setInterval(changeBackground, 2000);
});

const url = "https://www.themealdb.com/api/json/v1/1/random.php";

async function getData() {
  try {
    let res = await axios.get(url);
    let data = await res.data;
    let mealData = data.meals[0];

    let output = `
      <div id="mainRandomCard">
        <div class="mainRandomCard">
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
                <button class="knowMoreBtn"> Know More</button>
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
            <a href=""><button id="watchBtnModal"> Watch </button></a>
          </div>
        </div>
      </div>
    `;

    document.getElementById("modalDiv").innerHTML = output2;
    document.getElementById("mainRandomCard").innerHTML = output;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
document.getElementById("mainRandomCard").addEventListener("click", (e) => {
  e.preventDefault();
  getData();
});
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

    // let output3 = `
    //     <div class="modalchildDiv">
    //       <div class="imgModalDiv">
    //         <img src="${meal.strMealThumb}" class="imgModal">
    //       </div>
    //       <div class="modalTextContent">
    //         <div class="modalHeader">
    //           <span class="close">&times;</span>
    //           <h1 id="modalHeader">${meal.strMeal}</h1>
    //           <hr>
    //         </div>
    //         <div class="ingredients">
    //           <h1> INGREDIENTS</h1>
    //           ${generateIngredientsList(meal)}
    //         </div>
    //         <div class="watchBtnModalMain">
    //           <a href=""><button id="watchBtnModal"> Watch </button></a>
    //         </div>
    //       </div>
    //     </div>
    //   `;
    // document.getElementById("modalDiv").innerHTML = output3;
    document.getElementById("searchResultsCardMain").innerHTML = output;
  } catch (err) {
    console.error(err);
  }
}
function displaydish(element) {
  var dishName = element.querySelector("#searchResultName").innerText;
  console.log("dishName: ", dishName);
  let title = document.getElementById("modalHeader");
  title.innerHTML = dishName;
  getDishDetails(dishName);
  var modal = document.getElementById("modalDiv");
  modal.style.display = "block";
}

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
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let foodName = document.getElementById("searchBox").value.trim(); // Trim the input value to handle whitespace
  if (!foodName) {
    // If the input is empty, call search with no argument
    search();
  } else {
    search(foodName);
  }
});

var modal = document.getElementById("modalDiv");
var btn = document.getElementById("mainRandomCard");
var btn1 = document.getElementById("searchResultsCardMain");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
};
// btn1.onclick = function () {
//   modal.style.display = "block";
// };
span.onclick = function () {
  modal.style.display = "none";
};
document.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
