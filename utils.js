/**
 *
 * File: utils.js
 * Author: Saroj Rai @CharichaSoftwares
 * Created On: Friday,  1 October 2021.
 *
 * Summary: This is for ...
 *
 * Copyright(c) 2021 All Rights Reserved for CharichaSoftwares
 */

/*
* @{players} - array [string, string]
* returns - array [{ home: string, away: string}, { home: string, away: string}, ...]
*/

function computeMatches(players, weeks){
  var matches = [];
  for(var i = 0; i < players.length; i++){
    var currentPlayer = players[i];
    for(var j = 0; j < players.length; j++){
      if(j == i) continue;
      matches.push({
        home: currentPlayer,
        away: players[j]
      });
    }
  }
  return matches;
}


function computeFixtures(players, weeks){
  var matches = computeMatches(shuffle(players), weeks);
  var matchesPerWeek = Math.ceil(matches.length / weeks);

  var playerMatchCount = [];
  var weekMatches = [];

  for(var j = 0; j < weeks; j++){
    var alreadyPlayedPlayers = [];
    weekMatches[j] = [];
    for(var i = 0;i < matches.length; i++){
      if(alreadyPlayedPlayers.includes(matches[i].home) ||
         alreadyPlayedPlayers.includes(matches[i].away)){
        continue;
       }
      weekMatches[j].push(matches[i]);
      alreadyPlayedPlayers.push(matches[i].home);
      alreadyPlayedPlayers.push(matches[i].away);      
      if(weekMatches.length >= matchesPerWeek)
        break;
    }
  }

}


function shuffle(array){
  for(var i = 0; i < array.length; i++){
    var randId = Math.floor(Math.random() * (array.length - i));
    var temp = array[i];
    array[i] = array[randId];
    array[randId] = temp;
  }
  return array;
}
