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
