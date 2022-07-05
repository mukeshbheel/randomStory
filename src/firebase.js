import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

const firebaseConfig = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://storyrandom-f57b0-default-rtdb.firebaseio.com/",
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  
  // Initialize Realtime Database and get a reference to the service
  export const db = getDatabase(app);
//   const stories = db.collection('stories') 

//   const storiesRef = db.ref('stories')

  export const createStory = story => {
    set(ref(db, 'stories/' + story.id), {
        id: story.id,
        text: story.text,
      });
  }

  export const getStory = async => {
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, `stories`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          return snapshot.val()
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
  }