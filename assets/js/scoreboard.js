const teamsScoreList = document.querySelector(".teams-list");

const sortScoresArr = function () {
  const teamArray = JSON.parse(localStorage.getItem("teams"));
  sortedArr = teamArray.sort(function (objOne, objTwo) {
    let numOne = objOne.totalScore;
    let numTwo = objTwo.totalScore;

    if (numOne < numTwo) {
      return 1;
    }
    if (numOne > numTwo) {
      return -1;
    }
    return 0;
  });
};

let sortedArr;

const displayScoreBoard = function () {
  sortScoresArr();

  console.log(sortedArr);
  for (let i = 0; i < sortedArr.length; i++) {
    const teamScoreLi = document.createElement("li");
    let scoreSpan = document.createElement("span");

    teamScoreLi.textContent = `${sortedArr[i].teamName} ${sortedArr[i].totalScore}`;

    teamScoreLi.appendChild(scoreSpan);

    teamsScoreList.appendChild(teamScoreLi);
  }
};

displayScoreBoard();
