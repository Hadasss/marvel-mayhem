<<<<<<< HEAD
// bookSearchBtn.addEventListener("click", bookInputHandler);
const searchBtn = document.querySelector(".search-bttn");
let formInput = document.querySelector("#book-name");
const heroNameDisplay = document.querySelector(".hero-name-display");
const buttonsDiv = document.querySelector(".buttons");
const comicsBtn = document.querySelector(".comics");
const storiesBtn = document.querySelector(".stories");
const eventsBtn = document.querySelector(".events");

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
          heroNameTitle.textContent = data.data.results[0].name;
          let heroDescriptionP = document.createElement("p");
          // heroDescriptionP.setAttribute("class", "");
          heroDescriptionP.textContent = data.data.results[0].description;
          heroNameDisplay.appendChild(heroNameTitle);
          heroNameDisplay.appendChild(heroDescriptionP);
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

const comicsBtnDisplay = function () {
  const comicsDiv = document.createElement("div");
  // comicsDiv.setAttribute("class", "");
  const comicsTitle = document.createElement("h3");
  comicsTitle.textContent = "Your hero appeared in these issues:";
  const comicsUl = document.createElement("ul");

  // create a for loop to loop through array of comic books. display first 10 results.
  let comicBookLi = document.createElement("li");

  comicsTitle.appendChild(comicsDiv);
  comicsDiv.appendChild(comicsUl);

  buttonsDiv.appendChild(comicsDiv);
};

const InputHandler = function (event) {
  event.preventDefault();
  console.log("clicked");
  let searchInput = formInput.value.trim();

  if (searchInput) {
    getfetchResponse(searchInput);
    formInput.value = "";
  } else {
    // TODO change to pop up later
    alert("Please type keywords.");
  }
};

comicsBtn.addEventListener("click", comicsBtnDisplay);
searchBtn.addEventListener("click", InputHandler);
=======
// google books api
// api key: AIzaSyAmDINk08vcyJZKB48vQpUzPvBoI01-2qQ
>>>>>>> 47a7c112959fddce619de0901c2da22723f5892c
