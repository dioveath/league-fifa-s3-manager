import { getLeagues, addLeague, removeLeague} from './firebase.js';
import { createLeague, createFixtures, createMatches } from './league.js';

window.onload = () => {

  createLeagueButton.addEventListener("click", (e) => {
    e.preventDefault();

    var players = [];
    for(var i = 0; i < totalPlayerFields; i++){
      players.push(document.getElementById("playerInputField" + i).value);
    }

    var league = createLeague(leagueTitle.value, leagueDesc.value, players, totalFixtures.value);

    addLeague(league);
  });


  var totalPlayerFields = 0;
  totalPlayers.addEventListener("change", (e) => {
    e.preventDefault();

    for(var i = totalPlayerFields; i < totalPlayers.value; i++){
      var divEl = document.createElement("div");
      divEl.setAttribute("id", "playerDiv" + i);
      
      var playerInputField = document.createElement("input");
      var label = document.createElement("label");
      playerInputField.setAttribute("id", "playerInputField" + i);
      label.setAttribute("for", "playerInputField" + i);
      label.innerHTML = "Player " + (i+1);
      divEl.appendChild(label);      
      divEl.appendChild(playerInputField);
      endOfFields.before(divEl);
      totalPlayerFields++;
    }

    while(totalPlayerFields > totalPlayers.value) {
      totalPlayerFields--;
      document.getElementById("playerDiv" + totalPlayerFields).remove();
    }

  });


  function ShowAllFixtures(league, appendEl){

    var allFixturesEl = document.createElement("div");
    allFixturesEl.style.cssText = "display: flex; flex-wrap: wrap";
    for(var i = 0; i < league.fixtures.length; i++){
      var fixtureEl = document.createElement("div");
      ShowFixtureTable(league.fixtures[i], "Fixture Week " + (i+1), fixtureEl);
      allFixturesEl.appendChild(fixtureEl);
    }
    appendEl.appendChild(allFixturesEl);

  }

  function ShowFixtureTable(fixture, fixtureTitle="Fixture", appendEl){
    var title = document.createElement("b");
    title.innerHTML = fixtureTitle;

    var table = document.createElement('table');
    table.appendChild(title);
    table.border = "1px";
    table.style = `margin: 20px; border: 2px solid; min-width: 400px`;


    for(var i = 0; i< fixture.length; i++){
      var tableRow = document.createElement("tr");
      table.appendChild(tableRow);


      var dataHome = document.createElement("td");
      var dataAway = document.createElement("td");
      tableRow.appendChild(dataHome);
      tableRow.appendChild(dataAway);      

      tableRow.style.cssText = "display: flex; justify-content: space-between;";

      dataHome.style.cssText = "display: flex; justify-content: space-between";
      dataAway.style.cssText = "display: flex; justify-content: space-between";      

      var homeText = document.createElement("p");
      homeText.innerHTML = fixture[i].home;
      var inputHomeEl = document.createElement("input");
      inputHomeEl.setAttribute("type", "number");

      var awayText = document.createElement("p");
      awayText.innerHTML = fixture[i].away;
      var inputAwayEl = document.createElement("input");
      inputAwayEl.setAttribute("type", "number");      


      if(fixture[i].is_played){
        tableRow.style.cssText = "background-color: green";
        inputHomeEl.value = fixture[i].home_goals.length;
        inputAwayEl.value = fixture[i].away_goals.length;        
      } else {
        tableRow.style.cssText = "background-color: gray";
        // inputHomeEl.setAttribute("disabled", true);
        // inputAwayEl.
      }

      dataHome.appendChild(homeText);      
      dataHome.appendChild(inputHomeEl);

      dataAway.appendChild(awayText);
      dataAway.appendChild(inputAwayEl);      

    }

    appendEl.appendChild(table);
  }


  function LeagueChangeListener(e){
    e.preventDefault();
    
    console.log(e.target);

  }


  async function init(){
    
    var leagues = await getLeagues();

    console.log(leagues);

    for(var i = 0;i < leagues.length; i++){
      var divEl = document.createElement("div");
      divEl.setAttribute("id", "League" + i);
      
      var titleEl = document.createElement("h2");
      titleEl.innerHTML = "League: " + leagues[i].title;
      divEl.appendChild(titleEl);

      ShowAllFixtures(leagues[i], divEl);

      divEl.addEventListener("change", LeagueChangeListener);
      allLeagues.appendChild(divEl);

    }
    

  }



  init();


};
