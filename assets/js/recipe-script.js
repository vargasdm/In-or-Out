var whatCuisine = JSON.parse(localStorage.getItem("cuisine-name")); //"american";
var tester = document.querySelector("#tester");
var placeInfo = document.querySelector("#recipieList");
var foodName;
var foodLink;
var foodImg;
//get info from Edamam Api
function getRecipie() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e5a9a1f7a1msh68206fd4776cc64p1ae6c8jsnbf0c311b27bc",
      "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
    },
  };

  fetch(
    `https://edamam-recipe-search.p.rapidapi.com/search?q=${whatCuisine}`,
    options
  )
    //assign info to varaible
    .then((response) => response.json())
    .then((response) => {
      recipeInfo = response;
      console.log(recipeInfo);
      //console.log(response);
      foodName = recipeInfo.hits[0].recipe.label;
      foodLink = recipeInfo.hits[0].recipe.shareAs;
      foodImg = recipeInfo.hits[0].recipe.image;
      // console.log(foodName);
      // console.log(foodLink);
      // console.log(foodImg);
      populate(recipeInfo);
    });
}
getRecipie();
// loop through 3-5 recipies
function populate() {
  for (var i = 0; i < 5; i++) {
    var listInfo = document.createElement("li");
    listInfo.classList.add("m-3", "is-size-4", "has-text-weight-medium");
    listInfo.textContent = recipeInfo.hits[i].recipe.label;
    placeInfo.appendChild(listInfo);

    var imgInfo = document.createElement("img");
    imgInfo.setAttribute("src", recipeInfo.hits[i].recipe.image);
    imgInfo.classList.add("image" , "is-inline-block")
    placeInfo.appendChild(imgInfo);

    var recipeLink = document.createElement('a');
    var textNode = document.createTextNode("Recipe Prep Information");
    //recipeLink.setAttribute("href", recipeInfo.hits[i].recipe.shareAs);
    // Append the textNode as a child to recipeLink.
    recipeLink.href = recipeInfo.hits[0].recipe.shareAs;
    recipeLink.appendChild(textNode);
    recipeLink.classList.add("m-3", "is-size-4", "has-text-weight-medium");
    recipeLink.style.display = "center";
   // document.body.appendChild(recipeLink); 
    listInfo.appendChild(recipeLink);
  }
}
