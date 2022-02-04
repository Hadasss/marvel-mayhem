const searchBtn = document.querySelector(".search-bttn");
let formInput = document.querySelector("#book-name");
const heroNameDisplay = document.querySelector(".hero-name-display");
let heroGif = document.querySelector("hero-gif");
const buttonsDiv = document.querySelector(".buttons");
const comicsBtn = document.querySelector(".comics");
const storiesBtn = document.querySelector(".stories");
const eventsBtn = document.querySelector(".events");

// fetch request to display hero by search key. Marvel API.
// dynamically generating elements to display user choice.
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

          getHeroGif(searchInput);

          heroNameDisplay.appendChild(heroNameTitle);
          heroNameDisplay.appendChild(heroDescriptionP);
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

// function to generate hero gif. GIPHY API
const getHeroGif = function (searchInput) {
  let gifUrl =
    "https://api.giphy.com/v1/gifs/search?api_key=S3HuUjpb6Y7vXd6wE7kLLaqZ5hY4QeZC&q=" +
    searchInput;

  fetch(gifUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data, searchInput);
          // heroNameDisplay.appendChild(gifContainerDiv); // BUG!!
          let gifRandomIndex = Math.floor(Math.random() * 50);
          console.log(gifRandomIndex);
          let gifSrc = `${data.data[gifRandomIndex].url}.gif`;
          console.log(gifSrc);
          heroGif.setAttribute("src", gifSrc);
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

//  function to fetch data for hero additional info: comics, stories, events. data retrieved from Matvel API.
// dynamically generating elements for display.
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

// function to handle user input for first fetch.
const InputHandler = function (event) {
  event.preventDefault();
  // heroNameDisplay.innerHTML = "";
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
