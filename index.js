var name;
var allResults = [];

function connect() {
  var searchTerm = document.getElementById("searchBox").value;
  var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data && data.meals && data.meals.length > 0) {
        display(data.meals.slice(0, 5)); // Display only the first 5 results
        allResults = data.meals;
        if (data.meals.length > 5) {
          // If there are more than 5 results, create and display the "Show All" button
          createShowAllButton();
        }
      } else {
        console.error("No data found for the provided search term.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  console.log("Button clicked");
}
function createShowAllButton() {
  var showAllButton = document.createElement("button");
  showAllButton.textContent = "Show All";
  showAllButton.id = "showAllButton";
  showAllButton.classList.add("btn", "btn-lg", "btn-success", "btn-custom");
  showAllButton.addEventListener("click", showAll);

  var form = document.querySelector("form");
  form.appendChild(showAllButton);
}
function showAll() {
  display(allResults);
  var showAllButton = document.getElementById("showAllButton");
  showAllButton.parentNode.removeChild(showAllButton);
}

function display(items) {
  var oldContent = document.getElementById("content_holder");
  oldContent.textContent = "";

  for (var i = 0; i < items.length; i++) {
    var newDiv = document.createElement("div");
    newDiv.innerHTML = `<div class="card mb-3" style="max-width: 1300px; margin: 0 auto"><div class="row g-0"><div class="col-md-4"><img src="${items[i].strMealThumb}" class="img-fluid rounded-start" alt="..." style="object-fit: cover; width: 100%; height: 100%"/></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">${items[i].strMeal}</h5><p class="card-text">${items[i].strInstructions}</p><p class="card-body"><small class="text-body-secondary">ID: ${items[i].idMeal}, Category: ${items[i].strCategory}</small></p></div></div></div></div>`;
    oldContent.appendChild(newDiv);
  }
}
