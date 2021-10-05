import { app, analytics, db, initializeApp, getAnalytics, getFirestore, collection, doc, getDocs, setDoc, deleteDoc} from './credentials.js';


async function getLeagues(){
  const leaguesCol = collection(db, 'leagues');
  const leagueSnapshot = await getDocs(leaguesCol);
  const leagueList = leagueSnapshot.docs.map(doc => doc.data());


  // NOTE: Converting Saved db fixtures as map to array 
  for(var i = 0;i < leagueList.length; i++){
    var fixturesSaved = leagueList[i].fixtures; 

    var arrayFixtures = [];
    for(var fixtureProp in fixturesSaved){
      arrayFixtures.push(leagueList[i].fixtures[fixtureProp]);
    }

    leagueList[i].fixtures = arrayFixtures;
  }
 
  return leagueList;
}

async function addLeague(league){
  var fixtureSavable = {}; 
  for(var i = 0; i < league.fixtures.length; i++){
    fixtureSavable["" + i] = league.fixtures[i];
  }

  await setDoc(doc(db, "leagues", league.title), {
    title: league.title,
    description: league.description,
    members: league.members,
    fixtures: fixtureSavable
  });
}

async function removeLeague(leagueTitle){
  await deleteDoc(doc(db, "leagues", leagueTitle));
}


export { getLeagues, addLeague, removeLeague };
