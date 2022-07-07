<template>
  <div>
    <p>Random word for you: <b>{{ randomWord }}</b></p>
    <p></p>

    <div>
      <!-- <input type="text" /> -->
      <input type="number" v-model="storyId" placeholder="
      Story number" required><br>
      <textarea name="" id="" cols="6%" rows="2" v-model="test"></textarea>
    </div>
    <div>
      <button @click="save()">Save Story</button>
      <button @click="nextWord()">Next word</button>
    </div>
    <div>
      <p v-html="story"></p>
    </div>
  </div>
</template>

<script>
import randomWords from "random-words";
export default {
  data() {
    return {
      randomWord: "",
      test: ' ',
      story: this.updateStory? this.updateStory.text:"",
      storyId: this.updateStory? this.updateStory.id:"",
    };
  },
  props:{
    updateStory:{
      type: Object,
      default: null,
    }
  },
  methods: {
    nextWord() {
      // console.log(this.story)
      // const test = this.story.includes()
      // this.story = this.story.replace(this.randomWord, '<b>'+this.randomWord+'</b>')
      if(this.test.includes(this.randomWord)){
        const boldString = this.test.replace(this.randomWord, this.randomWord.bold())
        this.story = this.story.concat(boldString);
        console.log(this.story)
        this.randomWord = randomWords();
        this.test = ' ';
      }else{
        alert('YOu need to use the given word in the sentence to see the next word')
      }
      
    },
    save() {
      if(this.storyId == ''){
        alert('Add an Id');
      }else if(!this.test.includes(this.randomWord)){
        alert('Use the random word given')
      }
      else{
        const boldString = this.test.replace(this.randomWord, this.randomWord.bold())
        this.story = this.story.concat(boldString);
        this.$emit("save", {storyId:this.storyId, story: this.story});
      }
    },
  },
  mounted() {
    this.randomWord = randomWords();
  },
};
</script>

<style scoped>
textarea {
  width: 53%;
  margin: 35px 0px;
  padding: 19px;
  font-size: 15px;
}
button {
  width: 109px;
  height: 33px;
  background: cadetblue;
  color: floralwhite;
}
</style>