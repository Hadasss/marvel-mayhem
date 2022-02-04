const searchBtn = document.querySelector(".hero-search");
let formInput = document.querySelector(".hero-search-input");
const heroNameDisplay = document.querySelector(".hero-name-display");

const getfetchResponse = function (searchInput) {
  let url =
    "https://gateway.marvel.com:443/v1/public/characters?name=" +
    searchInput +
    "&apikey=3bc97c9b0187fdee4f75f60b267b51ad";

  fetch(url)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data, searchInput);
          let heroNameTitle = document.createElement("h3");
          // heroNameTitle.setAttribute("class", "");
          heroNameTitle.textContent = data.data.results[0].name.text;
          const heroNameDiv = document.createElement("div");
          // heroNameDiv.setAttribute("class", "");

          let heroDescriptionP = document.createElement("p");
          heroDescriptionP.textContent = data.data.results[0].description.value;

          heroNameDiv.appendChild(heroNameTitle);
          heroNameDiv.appendChild(heroDescriptionP);
          heroNameDisplay.appendChild(heroNameDiv);
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

const InputHandler = function (event) {
  event.preventDefault();
  let searchInput = formInput.value.trim();

  if (searchInput) {
    getfetchResponse(searchInput);
    formInput.value = "";
  } else {
    // TODO change to pop up later
    alert("Please type keywords.");
  }
};

searchBtn.addEventListener("click", InputHandler);
