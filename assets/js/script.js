const searchBtn = document.querySelector(".search-bttn");
let formInput = document.querySelector("#book-name");
const heroNameDisplay = document.querySelector(".hero-name-display");
let heroGif = document.querySelector(".hero-gif");
const extraInfoDiv = document.querySelector(".extra-info");
const buttonsDiv = document.querySelector(".buttons");
const comicsBtn = document.querySelector(".comics");
// const storiesBtn = document.querySelector(".stories");
const eventsBtn = document.querySelector(".events");
let searchInput;
const heroNameTitle = document.createElement("h3");
const heroDescriptionP = document.createElement("p");
const buttonsContentDiv = document.createElement("div");
const teamsContainerDiv = document.querySelector(".teams-container");
let teamMemberInput = document.querySelector(".add-hero");
const addHeroBtn = document.querySelector(".add-hero-btn");
const teamDiv = document.createElement("div");
teamDiv.setAttribute("id", "teamDiv");
let teamTitle = document.createElement("h3");
let teams = [];

// fetch request to display hero by search key. Marvel API.
// dynamically generating elements to display user choice.
const getHeroName = function (searchInput) {
  let url =
    "https://gateway.marvel.com/v1/public/characters?name=" +
    searchInput +
    "&apikey=3bc97c9b0187fdee4f75f60b267b51ad";

  fetch(url)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data, searchInput);
          heroNameTitle.textContent = data.data.results[0].name;
          heroDescriptionP.textContent = data.data.results[0].description;
          getHeroGif(searchInput);

          heroNameDisplay.appendChild(heroNameTitle);
          heroNameDisplay.appendChild(heroDescriptionP);
          heroNameDisplay.setAttribute("class", "visible");
          buttonsDiv.setAttribute("class", "visible");
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
          let gifRandomIndex = Math.floor(Math.random() * 50);
          console.log(gifRandomIndex);
          let gifSrc = data.data[gifRandomIndex].images.original.url;
          console.log(gifSrc);
          heroGif.setAttribute("src", gifSrc);
          heroGif.setAttribute("class", "visible");
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
  let comicsUrl =
    "https://gateway.marvel.com/v1/public/characters?name=" +
    searchInput +
    "&apikey=3bc97c9b0187fdee4f75f60b267b51ad";

  fetch(comicsUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data, searchInput);
          let comicsTitle = document.createElement("h3");
          comicsTitle.textContent = "Your hero appeared in these issues:";
          const comicsUl = document.createElement("ul");

          for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * 20);
            let comicBookLi = document.createElement("li");
            comicBookLi.textContent =
              data.data.results[0].comics.items[randomIndex].name;
            comicsUl.appendChild(comicBookLi);
          }

          buttonsContentDiv.appendChild(comicsTitle);
          buttonsContentDiv.appendChild(comicsUl);
          buttonsDiv.appendChild(buttonsContentDiv);
          extraInfoDiv.appendChild(buttonsDiv);
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

const eventsBtnDisplay = function () {
  let eventsUrl =
    "https://gateway.marvel.com/v1/public/characters?name=" +
    searchInput +
    "&apikey=3bc97c9b0187fdee4f75f60b267b51ad";

  fetch(eventsUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          let eventsTitle = document.createElement("h3");
          eventsTitle.textContent = "Your hero took part in these events:";
          const eventsUl = document.createElement("ul");

          for (let i = 0; i < 10; i++) {
            let randomIndex = Math.floor(Math.random() * 20);
            let eventsLi = document.createElement("li");
            eventsLi.textContent =
              data.data.results[0].events.items[randomIndex].name;
            eventsUl.appendChild(eventsLi);
          }

          buttonsContentDiv.appendChild(eventsTitle);
          buttonsContentDiv.appendChild(eventsUl);
          buttonsDiv.appendChild(buttonsContentDiv);
          extraInfoDiv.appendChild(buttonsDiv);
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

// function to handle user input for first fetch.
const InputHandler = function () {
  buttonsContentDiv.innerHTML = "";
  searchInput = formInput.value.trim();

  if (searchInput) {
    getHeroName(searchInput);
    formInput.value = "";
  } else {
    // TODO change to pop up/modal later
    alert("Please type keywords.");
  }
};

const comicsBtnHandler = function () {
  buttonsContentDiv.innerHTML = "";
  comicsBtnDisplay();
};

const eventsBtnHandler = function () {
  buttonsContentDiv.innerHTML = "";
  eventsBtnDisplay();
};

// dream team game
const createTeam = function () {
  // clear teamDiv from previous user
  teamDiv.innerHTML = "";
  // append new teamDiv to main din
  // addMember();
  // take input for team name
  // TODO when all 5 team members were added - create object for localStorage
  // TODO display team on score board
};

// functionality to add each hero and grab his score from the API
const addMember = function () {
  // create elements to display chosen hero
  if (teamMemberInput) {
    // for (let i = 0; i < 5; i++) {}
    var member = document.createElement("p");
    member.textContent = teamMemberInput.value.trim();
    console.log(member.textContent);

    teamDiv.appendChild(member);
    // clear inpur
    teamMemberInput.value = "";
  }
  // disable add button after 5 team members
  var count = teamDiv.childElementCount;
  if (count >= 5) {
    addHeroBtn.disabled = true;

    let teamNameInput = document.createElement("input");
    let teamNameTitle = document.createElement("h3");
    teamDiv.appendChild(teamNameInput);
    teamNameTitle.textContent = teamNameInput.value.trim();

    teamDiv.appendChild(teamNameTitle);
  }

  teamsContainerDiv.appendChild(teamDiv);

  // TODO store name+score in an array of key:value objects
  // TODO build objects for each team with total score and team name and store in array
  // TODO set up local storage for hero teams
};

comicsBtn.addEventListener("click", comicsBtnHandler);
eventsBtn.addEventListener("click", eventsBtnHandler);
searchBtn.addEventListener("click", InputHandler);
addHeroBtn.addEventListener("click", addMember);
