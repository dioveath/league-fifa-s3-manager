import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { firebaseConfig } from '../credentials.js';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);


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

async function getLeague(leagueTitle){
  const docRef = doc(db, "leagues", leagueTitle);
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()) {
    var league =  docSnap.data();

    var fixturesSaved = league.fixtures;
    var arrayFixtures = [];
    for(var fixtureProp in fixturesSaved) {
      arrayFixtures.push(league.fixtures[fixtureProp]);
    }

    league.fixtures = arrayFixtures;
    return league;
  } else {
    console.log(`No League with title: ${leagueTitle}`);
    return undefined;
  }
  
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


export { getLeagues, getLeague, addLeague, removeLeague };
