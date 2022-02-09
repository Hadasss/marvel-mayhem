const searchBtn = document.querySelector(".search-bttn");
let formInput = document.querySelector("#book-name");
const heroNameDisplay = document.querySelector(".hero-name-display");
let heroGif = document.querySelector(".hero-gif");
const extraInfoDiv = document.querySelector(".extra-info");
const buttonsDiv = document.querySelector(".buttons");
const comicsBtn = document.querySelector(".comics");
const moviesBtn = document.querySelector(".movie-appearances");
const eventsBtn = document.querySelector(".events");
let searchInput;
const heroNameTitle = document.createElement("h3");
const heroDescriptionP = document.createElement("p");
const buttonsContentDiv = document.createElement("div");
const teamsContainerDiv = document.querySelector(".teams-container");
const addHeroInput = document.querySelector(".add-hero");
const addHeroBtn = document.querySelector(".add-hero-btn");
const teamDiv = document.createElement("div");
teamDiv.setAttribute("id", "teamDiv");

const selectedHeroesContainer = document.querySelector(".selected-heroes");
const chooseHeroesContainer = document.querySelector(".choose-heroes");
const chooseTeamNameContainer = document.querySelector(".choose-team-name");
const addTeamBtn = document.querySelector(".add-team");
const teamNameInput = document.querySelector(".teamName");
const selectedHeroes = [];
let hero;

let teams = [];

if (localStorage.getItem("teams")) {
  teams = JSON.parse(localStorage.getItem("teams"));
}

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
          let gifRandomIndex = Math.floor(Math.random() * 50);
          let gifSrc = data.data[gifRandomIndex].images.original.url;
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
const comicsBtnDisplay = function () {
  let comicsUrl =
    "https://gateway.marvel.com/v1/public/characters?name=" +
    searchInput +
    "&apikey=3bc97c9b0187fdee4f75f60b267b51ad";

  fetch(comicsUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
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

// function for displaying movie search
const movieBtnDisplay = function (searchInput) {

  let movieUrl = "https://www.omdbapi.com/?apikey=6aedd9f1&type=movie&s=" + searchInput;

  fetch(movieUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          //console.log(data.Search[5]);
          let movieTitle = document.createElement("h3");
          movieTitle.textContent = "Your hero took part in these movies:";
          const movieUl = document.createElement("ul");

          for (let i = 0; i < 10; i++) {
            let movieLi = document.createElement("li");
            movieLi.textContent = `${data.Search[i].Title} (${data.Search[i].Year})`;
            movieUl.appendChild(movieLi);
          }
          buttonsContentDiv.appendChild(movieTitle);
          buttonsContentDiv.appendChild(movieUl);
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
    // movieBtnDisplay(searchInput);
    formInput.value = "";
  } else {
    // TODO change to pop up/modal later
    alert("Please type keywords.");
  }
};

const movieBtnHandler = function () {
  buttonsContentDiv.innerHTML = "";
  movieBtnDisplay(searchInput);
};
const comicsBtnHandler = function () {
  buttonsContentDiv.innerHTML = "";
  comicsBtnDisplay();
};

const eventsBtnHandler = function () {
  buttonsContentDiv.innerHTML = "";
  eventsBtnDisplay();
};

const addToSelectedHeroes = function (hero) {
  if (selectedHeroes.length >= 5) {
    return;
  }
  selectedHeroes.push(hero);
};

const addTeamMember = function () {
  // generate p element and assign it the input.value and push to array
  if (!addHeroInput.value) {
    alert("type something");
    return;
  }

  getHeroScore(addHeroInput.value).then(function (hero) {
    if (!hero) {
      alert("No hero");
      return;
    }

    addToSelectedHeroes(hero);
    addHeroInput.value = "";

    renderSelectedHeroes();

    if (selectedHeroes.length == 5) {
      displayChooseTeam();
    }
  });
};

const renderSelectedHeroes = function () {
  selectedHeroesContainer.innerHTML = "";
  for (const hero of selectedHeroes) {
    const heroNameLi = document.createElement("li");
    heroNameLi.textContent = hero.name;
    selectedHeroesContainer.appendChild(heroNameLi);
  }
};

const displayChooseTeam = function () {
  // when we have 5 members disable input + add title, input, btn to add team
  chooseHeroesContainer.classList.add("hidden");
  chooseTeamNameContainer.classList.remove("hidden");
};

const getHeroScore = function (heroName) {
  let url =
    "https://gateway.marvel.com/v1/public/characters?name=" +
    heroName +
    "&apikey=3bc97c9b0187fdee4f75f60b267b51ad";

  return fetch(url)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (results) {
      const hero = results.data.results[0];
      if (!hero) {
        return null;
      }

      return { name: hero.name, score: hero.comics.available };
    });
};

const saveTeam = function () {
  // create object for team for localStorage
  const addScores = function () {
    let sum = 0;
    for (let i = 0; i < selectedHeroes.length; i++) {
      sum += selectedHeroes[i].score;
    }
    return sum;
  };
  var team = {
    members: selectedHeroes,
    teamName: teamNameInput.value,
    totalScore: addScores(),
  };

  teams.push(team);

  localStorage.setItem("teams", JSON.stringify(teams));
  console.log(teams);
  teamNameInput.textContent = "";
};

const displayScoreBoard = function () {
  //
};

comicsBtn.addEventListener("click", comicsBtnHandler);
eventsBtn.addEventListener("click", eventsBtnHandler);
moviesBtn.addEventListener("click", movieBtnHandler);
searchBtn.addEventListener("click", InputHandler);
addHeroBtn.addEventListener("click", addTeamMember);
addTeamBtn.addEventListener("click", saveTeam);
