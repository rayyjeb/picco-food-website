async function randomMeal() {
  let url1 = "https://www.themealdb.com/api/json/v1/1/random.php";

  try {
    let res = await axios.get(url1);
    let data = await res.data.meals[0];
    console.log("data: ", data);

    let output = "";
    output += `<div id="randomMeal">
        <h2>Fuel your day with a flavourful creation.</h2>
        <div><img src="${data.strMealThumb}" class="img" alt=""></div>
        <h3>${data.strMeal}</h3>
        <p id="suggestion">Click on the image to get the recipe</p>
        </div>`;

    document.getElementById("random").innerHTML = output;
    var id = `${data.idMeal}`;

    document.querySelector(".img").addEventListener("click", () => {
      getRecipe(id);
      document.getElementById("popUp").style.display = "block";
    });
  } catch (error) {
    console.log("error: ", error);
  }
}

randomMeal();

//displaying item on searched category

async function category(searchResult) {
  let url2 = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchResult}`;

  let searchedItem = "";
  searchedItem += `<h3>Search Result: <span id="orange">${searchResult}</span></h3>
    <p>Click on the image to get the recipe</p>`;
  document.getElementById("searchCategory").innerHTML = searchedItem;
  document.getElementById("searchCategory").style.display = "block";

  if (searchResult != "") {
    try {
      let errorDiv = "";
      document.getElementById("error").innerHTML = errorDiv;
      let response = await axios.get(url2);
      let data = await response.data.meals;
      console.log("data: ", data);

      let searchMeal = "";
      data.forEach((e) => {
        searchMeal += `<div class="element">
                <img src="${e.strMealThumb}" alt="" class="img" id="${e.idMeal}">
                <h3>${e.strMeal}</h3>
                </div>`;
      });
      document.getElementById("grid").innerHTML = searchMeal;

      var images = document.getElementsByClassName("img");
      for (let i of images) {
        i.addEventListener("click", () => {
          var id = i.id;
          getRecipe(id);
          document.getElementById("popUp").style.display = "block";
        });
      }
    } catch (err) {
      console.log("error: ", err);
      let errorDiv = "";
      errorDiv += `<div class="flex center">
            <img src="./assests/gif.gif" alt="" id="gif">
            </div>
             <h3>Oh no!! Food category not found</h3>`;
      document.getElementById("error").innerHTML = errorDiv;
      document.getElementById("error").style.display = "block";
      searchMeal = "";
      document.getElementById("grid").innerHTML = searchMeal;
    }
  } else {
    alert("Enter a meal category");
    document.getElementById("searchCategory").style.display = "none";
  }
}

// adding eventlistener to search button
document.getElementById("searchBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  var search = document.querySelector("#searchText");
  var searchResult = search.value;

  await category(searchResult);
  searchResult = "";
});

document.getElementById("searchText").addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    var search = document.querySelector("#searchText");
    var searchResult = search.value;
    category(searchResult);
  }
});

// displaying recipe
async function getRecipe(id) {
  let url3 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  try {
    let respond = await axios.get(url3);
    let data = await respond.data.meals[0];

    let arr = [
      data.strIngredient1,
      data.strIngredient2,
      data.strIngredient3,
      data.strIngredient4,
      data.strIngredient5,
      data.strIngredient6,
      data.strIngredient7,
      data.strIngredient8,
      data.strIngredient9,
      data.strIngredient10,
      data.strIngredient11,
      data.strIngredient12,
      data.strIngredient13,
      data.strIngredient14,
      data.strIngredient15,
      data.strIngredient16,
      data.strIngredient17,
      data.strIngredient18,
      data.strIngredient19,
      data.strIngredient20,
    ];

    let ingredients = arr.filter((e) => e !== "" && e !== null);

    let string = "";
    for (let i = 0; i < ingredients.length; i++) {
      string += "<li>" + ingredients[i] + "</li>";
    }

    let ytString;

    if (data.strYoutube == "") {
      ytString = "Not avaliable";
    } else {
      ytString = `${data.strYoutube}`;
    }

    console.log(ytString);

    let recipe = `
            <div id="recipe" class="flex column">
                <img src="./assests/cross.png" alt="" id="closeBtn">

                <img src="${data.strMealThumb}" alt="">
                <h3 id="mealName">${data.strMeal}</h3>
                <h2>Ingredients</h2>
                <ul>${string}</ul>
                <h2 >Instructions</h2>
                <h3 id="instruction">${data.strInstructions}</h3>
                <h2>YouTube Link</h2>
                <a id="link" href="${ytString}" target="_blank">${ytString}</a>
                </div>`;

    document.getElementById("popUp").innerHTML = recipe;

    // close button
    var closeBtn = document.getElementById("closeBtn");

    closeBtn.addEventListener("click", () => {
      document.getElementById("popUp").style.display = "none";
      document.getElementById("body").style.overflow = "scroll";
    });

    document.getElementById("body").style.overflow = "hidden";
  } catch (errorrr) {
    console.log("errorrr", errorrr);
  }
}

// displaying all the categories inside the category option

async function list() {
  url4 = "https://www.themealdb.com/api/json/v1/1/categories.php";

  try {
    let resp = await axios.get(url4);
    let data = await resp.data.categories;
    console.log("data", data);

    let listItem = "";
    for (i = 0; i < data.length; i++) {
      listItem += `<h3 class="categoryItem" id="${data[i].strCategory}">${data[i].strCategory}</h3>`;
    }

    document.getElementById("popDown").innerHTML = listItem;

    var pop = document.getElementsByClassName("categoryItem");
    for (let i of pop) {
      i.addEventListener("click", () => {
        var categoryName = i.id;
        console.log(categoryName);
        category(categoryName);
        window.location = "#searchCategory";
        document.getElementById("categoryBtn").style.backgroundColor =
          "transparent";
        document.getElementById("categoryBtn").style.color = "black";
        document.getElementById("popDown").style.display = "none";
      });
    }
  } catch (erorr) {
    console.log("erorr", erorr);
  }
}

// category button
let btnClicked = 0;

document.getElementById("categoryBtn").addEventListener("mouseenter", () => {
  // if (btnClicked % 2 === 0) {
  document.getElementById("popDown").style.display = "block";
  document.getElementById("categoryBtn").style.color = "white";
  document.getElementById("categoryBtn").style.backgroundColor = "#84A75F";
  list();
});
document.getElementById("popDown").addEventListener("mouseleave", () => {
  document.getElementById("popDown").style.display = "none";
  document.getElementById("categoryBtn").style.backgroundColor = "transparent";
  document.getElementById("categoryBtn").style.color = "black";
});

document.getElementById("randomBtn").addEventListener("click", () => {
  window.location.reload();
  window.location.hash = "#random";
});
