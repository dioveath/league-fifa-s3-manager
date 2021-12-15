var DEBUG_PLAYERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F"
];

// var PLAYERS = [
//   "jayraj",
//   "nugkha",
//   "uJackal",
//   "prison",
//   "void",
//   "subba"
// ];

function createLeague(title, description, players, week=4){
  var league = {
    title: title,
    description: description,
    members: players,
    fixtures: createFixtures(players, week)
  };

  return league;
}


// TODO: fixture matches player shouldn't played directly after the last match if
// there are other matches
function createFixtures(players, week){

  var matches = createMatches(players);
  var totalMatches = matches.length * matches[0].length;

  var matchesPerFixture = Math.ceil(totalMatches/week);

  var fixtures = [];
  var mCount = 0;
  var fixtureIndex = -1;
  var matchIndex = 0;

  for(var i = 0; i < matches.length; i++){
    for(var j = 0; j < matches[i].length; j++){
      if(mCount == 0) {
        fixtures.push([]);
        fixtureIndex++;
      }

      var x = matchIndex % matches[i].length;
      var y = matchIndex % matches.length;

      fixtures[fixtureIndex].push(matches[y][x]);

      if(fixtures[fixtureIndex].length == matchesPerFixture) {
        mCount = 0;
      } else {
        mCount++;
      }

      matchIndex++;
    }
  }

  return fixtures;
}

function createMatches(players){
  var matches = [];
  for(var i = 0; i < players.length; i++){
    var currentPlayer = players[i];
    var currentPlayerMatches = [];
    for(var j = 0; j < players.length; j++){
      if(j == i) continue;
      currentPlayerMatches.push({
        home: currentPlayer,
        away: players[j],
        is_played: false,
        home_goals: [],
        away_goals: [],
      });
    }
    matches.push(currentPlayerMatches);
  }
  return matches;    
}

function getPlayerStatsLeague(league, player){
  // goals, goalsconceded, pts, 
  var fixtures = league.fixtures;

  var goals = 0;
  var goalsConceded = 0;
  var pts = 0;
  var matchesPlayed = 0;

  console.log(fixtures);
  for(var i = 0; i < fixtures.length; i++){
    for(var j = 0; j < fixtures[i].length; j++){
      var match = fixtures[i][j];
      if(match.is_played && (player == match.home || player == match.away)){
        var goalsPlayer;
        var goalsOpp;

        if(player == match.home) {
          goalsPlayer = match.home_goals.length;
          goalsOpp = match.away_goals.length;          
        } else if(player == match.away) {
          goalsPlayer = match.away_goals.length;
          goalsOpp = match.home_goals.length;          
        }

        goals += goalsPlayer;
        goalsConceded += goalsOpp;
        pts += (goalsPlayer > goalsOpp ? 3 : (goalsPlayer == goalsOpp ? 1 : 0));
        matchesPlayed++;
      } // match.is_played == true
    }
  }

  return {
    player,
    matchesPlayed,
    goals,
    goalsConceded,
    pts
  };
    
}

function getLeagueTableStats(league){
  var allPlayerStats = [];

  for(var i = 0;i < league.members.length; i++){
    allPlayerStats.push(getPlayerStatsLeague(league, league.members[i]));
  }

  allPlayerStats.sort(leagueTableCompareFunc);

  return allPlayerStats;
}


function leagueTableCompareFunc(a, b){
  if(a.pts > b.pts) return -1;
  else if(a.pts < b.pts) return 1;
  else { 
    if(a.goals > b.goals) return -1;
    else if(a.goals < b.goals) return 1;
    else {
      if(a.goalsConceded < b.goalsConceded) return -1;
      else if(a.goalsConceded > b.goalsConceded) return 1;
      else 
        return (a.player > b.player ? 1 : a.player < b.player ? -1 : 0);
    }
  }  
}


function fact(n){
  if(n == 0 || n == 1) return 1;
  var r = 1;
  n++;
  while(--n)
    r *= n;
  return r;
} 




// function test(){
//   console.log(createLeague("FIFA S3", "Charicha League Fifa S3", DEBUG_PLAYERS, 4));
// }
// test();

export { createLeague, createFixtures, createMatches, getLeagueTableStats};
