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

  function showLeagueTable(league){

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

