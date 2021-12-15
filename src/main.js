import { getLeagues, getLeague, addLeague, removeLeague} from './firebase.js';
import { getLeagueTableStats } from './league.js';

window.onload = () => {

  var PLAYERS = [
    "jayraj",
    "nugkha",
    "uJackal",
    "prison",
    "void",
    "subba"
  ];

  // var playerMatchesDiv = document.getElementById("playerMatches");

  function ShowAllFixtures(league){

    for(var i = 0; i < league.fixtures.length; i++){
      ShowFixtureTable(league.fixtures[i], "Fixture Week " + (i+1));
    }

  }

  function ShowFixtureTable(fixture, fixtureTitle="Fixture"){
    var tableHolderDiv = document.createElement("div");
    tableHolderDiv.classList.add("fixture-div");

    var table = document.createElement('table');
    table.classList.add("fixture-table");

    var title = document.createElement("h2");
    title.classList.add("fixture-title");
    title.innerHTML = fixtureTitle;

    tableHolderDiv.appendChild(title);
    tableHolderDiv.appendChild(table);

    var tableRow = document.createElement("tr");
    var homeHead = document.createElement("th");
    var awayHead = document.createElement("th");

    homeHead.innerHTML = "HOME";
    awayHead.innerHTML = "AWAY";

    tableRow.appendChild(homeHead);
    tableRow.appendChild(awayHead);    

    table.appendChild(tableRow);

    for(var i = 0; i< fixture.length; i++){
      tableRow = document.createElement("tr");
      var dataHome = document.createElement("td");
      var dataAway = document.createElement("td");


      dataHome.style.cssText = "text-align: right; padding-right: 5px;";
      dataAway.style.cssText = "text-align: left; padding-left: 5px;";      

      if(fixture[i].is_played){
        dataHome.innerHTML = `${fixture[i].home} -- | <b style="font-size: 1.2rem;">${fixture[i].home_goals.length}</b> |`;
        dataAway.innerHTML = `| <b style="font-size: 1.2rem;">${fixture[i].away_goals.length}</b> | -- ${fixture[i].away}`;
      } else {
        dataHome.innerHTML = fixture[i].home + " -- |  |";
        dataAway.innerHTML = " |  | -- " +  fixture[i].away;
      }

      tableRow.appendChild(dataHome);
      tableRow.appendChild(dataAway);
      table.appendChild(tableRow);

    }

    fixturesUI.appendChild(tableHolderDiv);
  } 


  function ShowLeagueTable(league, appendEl){

    var table = document.createElement("table");

    var tableRow = document.createElement("tr");

    var rank = document.createElement("th");
    var playerName = document.createElement("th");
    var MP = document.createElement("th");
    var GS = document.createElement("th");
    var GC = document.createElement("th");
    var Pts = document.createElement("th");


    rank.innerHTML = "rank";
    playerName.innerHTML = "Player Name";
    MP.innerHTML = "MP";
    GS.innerHTML = "GS";
    GC.innerHTML = "GC";
    Pts.innerHTML = "Pts";

    tableRow.appendChild(rank);
    tableRow.appendChild(playerName);
    tableRow.appendChild(MP);
    tableRow.appendChild(GS);
    tableRow.appendChild(GC);      
    tableRow.appendChild(Pts);

    table.appendChild(tableRow);


    var allPlayerStats = getLeagueTableStats(league);

    for(var i = 0;i < league.members.length; i++){
      tableRow = document.createElement("tr");
      rank = document.createElement("td");
      playerName = document.createElement("td");
      MP = document.createElement("td");
      GS = document.createElement("td");
      GC = document.createElement("td");
      Pts = document.createElement("td");

      rank.innerHTML = "" + (i+1);
      playerName.innerHTML = allPlayerStats[i].player;

      MP.innerHTML = allPlayerStats[i].matchesPlayed;
      GS.innerHTML = allPlayerStats[i].goals;
      GC.innerHTML = allPlayerStats[i].goalsConceded;
      Pts.innerHTML = allPlayerStats[i].pts;

      tableRow.appendChild(rank);
      tableRow.appendChild(playerName);
      tableRow.appendChild(MP);
      tableRow.appendChild(GS);
      tableRow.appendChild(GC);      
      tableRow.appendChild(Pts);
      table.appendChild(tableRow);
    }

    appendEl.appendChild(table);
  }

  async function start(){

    var league = await getLeague("Fifa S3");

    ShowLeagueTable(league, tablesUI);
    ShowAllFixtures(league);

  }

  start();

};
