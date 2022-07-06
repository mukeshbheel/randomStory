<template>
  <div class="hello">
    <header>
      <div class="logo">
        <img
          src="https://us.123rf.com/450wm/sergeypykhonin/sergeypykhonin1809/sergeypykhonin180900041/108230283-registration-register-logo-or-label-diary-note-icon-vector-illustration.jpg?ver=6"
          alt=""
        />
      </div>
      <div class="title">Create Story With Random Words</div>
      <div>
        <div>
          <a href="">Login</a>
        </div>
      </div>
    </header>
    <main>
      <button @click="setDefault()" v-if="showWriteStory || showStories">
        go back
      </button>
      <div class="container" v-if="!showWriteStory && !showStories">
        <Card
          title="check Stories"
          image="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip"
          @click="showStories = true"
        />
      </div>
      <div class="container" v-if="!showWriteStory && !showStories">
        <Card
          title="Write new Story"
          image="https://miro.medium.com/max/1838/1*B6jGaFW6uFzIP7udHLZuCA.jpeg"
          @click="showWriteStory = true"
        />
      </div>
    </main>
    <div v-if="showStories && firebaseData != null">
      <!-- <div v-for="story in stories" :key="story.id">
        <p>{{ story.id }}</p>
        <p>{{ story.text }}</p>
      </div> -->
      <div v-for="story in getStories" :key="story" class="storyBlock">
        <div v-if="story">
          <p>{{ story.id }}</p>
          <p>{{ story.text }}</p>
          <button>Continue</button>
          <button @click="deleteStory(story.id)">Delete</button>
        </div>
        
      </div>
    </div>
    <AddStory v-if="showWriteStory" @save="save" />
    <!-- <button @click="getTest()">click</button>
    <p v-if="firebaseData">{{ firebaseData.length }}</p>
    <p v-if="firebaseData">{{ firebaseData }}</p> -->
  </div>
</template>

<script>
import Card from "./Card.vue";
import AddStory from "./AddStory.vue";
import { createStory, db } from '../firebase.js';
import { getDatabase, ref, set, get, child, remove } from "firebase/database";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    Card,
    AddStory,
  },
  data() {
    return {
      showWriteStory: false,
      showStories: false,
      firebaseData: [],
      stories: [],
      
      demoData: [
        {
          id: 345,
          text:
            "once i was a good friend with someone but we got separated.There were total four reasons for that. The most important was population in those.The construction rate was very very high because of the demanding population.we had very little space in our apartment.the interior was also not that good.I worte so many poems for someone.But i didnt expect what happend next.she was coming back from work using the usual transportation.",
        },
      ],
    };
  },
  computed:{
    getStories(){
      return this.firebaseData;
    }
  },
  methods: {
    setDefault() {
      this.showWriteStory = false;
      this.showStories = false;
    },
    save(event) {
      const story = {
        id: event.storyId,
        text: event.story,
      }
      this.firebaseData.push(story);
      createStory(story)
      this.showWriteStory = false;
    },

    // ..................get all the stories..............

    getTest() {
      const dbRef = ref(db);
      get(child(dbRef, `stories`)).then((snapshot) => {
        if (snapshot.exists()) {
          
          console.log(snapshot.val());

          // var data = snapshot.val();

          var data = Object.values(snapshot.val());

          console.log(data);

          this.firebaseData = data.filter( item => item != null);
          // this.firebaseData = data;

          // Object.keys(snapshot.val()).forEach(key => {
          // if (obj[key] === null) {
          // delete obj[key];
          // }
         // });

          
        } else {
          console.log("No data available");
          this.firebaseData = []
        }
      }).catch((error) => {
        console.error(error);
      });
    },

    // ........................Delete a story...............

    deleteStory(id) {
      // console.log(id)
      console.log(id);
      remove(ref(db, 'stories/'+id))
      .then(()=>{
        alert('data removed successfully')
        this.getTest();
      })
      .catch((error)=>{
        alert("unsuccessful, error"+error)
      })
    }
  },
  mounted(){
    this.getTest();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
header {
  display: flex;
  border-bottom: 3px solid rgb(53, 7, 7);
  box-shadow: 1px 5px 4px -1px;
  margin-top: -52px;
}
header div {
  margin: 0px auto;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo img {
  width: 80px;
}
.title {
  font-size: 18px;
  color: maroon;
}
main {
  display: flex;
  margin-top: 5%;
}
.container {
  margin: auto;
}
.container:hover {
  cursor: pointer;
}
p {
  padding: 9px 40px;
  line-height: 2;
  font-family: monospace;
  word-wrap: break-word;
}
button {
    width: 88px;
    height: 34px;
    margin: 5px;
    text-transform: capitalize;
}
.storyBlock {
    margin: 7%;
}
</style>
