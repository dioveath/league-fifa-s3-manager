window.onload = () => {

  var PLAYERS = [
    "jayraj",
    "nugkha",
    "uJackal",
    "prison",
    "void",
    "subba"
  ];

  var playerMatchesDiv = document.getElementById("playerMatches");


  function ShowAllFixtures(league){

    for(var i = 0; i < league.fixtures.length; i++){
      ShowFixtureTable(league.fixtures[i], "Fixture Week " + (i+1));
    }

  }

  function ShowFixtureTable(fixture, fixtureTitle="Fixture"){
    var title = document.createElement("b");
    title.innerHTML = fixtureTitle;

    var table = document.createElement('table');
    table.appendChild(title);
    table.border = "1px";
    table.style = `margin: 20px;`;

    for(var i = 0; i< fixture.length; i++){
      var tableRow = document.createElement("tr");
      var dataHome = document.createElement("td");
      var dataAway = document.createElement("td");

      dataHome.innerHTML = fixture[i].home;
      dataAway.innerHTML = fixture[i].away;

      if(fixture.is_played){
        dataHome.innerHTML += " - " + fixture[i].home_goals.length;
        dataAway.innerHTML += " - " + fixture[i].away_goals.length;
      } else {
        dataHome.innerHTML += " - N/A";
        dataAway.innerHTML += " - N/A";
      }

      tableRow.appendChild(dataHome);
      tableRow.appendChild(dataAway);
      table.appendChild(tableRow);

    }

    playerMatchesDiv.appendChild(table);
  } 


  function start(){

    // ShowAllFixtures(createLeague("Fifa S3", "Fifa S3 Charicha League", PLAYERS, 4));

  }

  start();

};
