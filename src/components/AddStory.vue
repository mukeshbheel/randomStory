<template>
  <div>
    <p>Random word for you: {{ randomWord }}</p>
    <p></p>

    <div>
      <!-- <input type="text" /> -->
      <input type="number" v-model="storyId" placeholder="
      Story number" required><br>
      <textarea name="" id="" cols="10%" rows="4" v-model="story"></textarea>
    </div>
    <div>
      <button @click="save()">Save Story</button>
      <button @click="nextWord()">Next word</button>
    </div>
  </div>
</template>

<script>
import randomWords from "random-words";
export default {
  data() {
    return {
      randomWord: "",
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
      this.randomWord = randomWords();
    },
    save() {
      this.$emit("save", {storyId:this.storyId, story: this.story});
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
  font-size: 22px;
}
button {
  width: 109px;
  height: 33px;
  background: cadetblue;
  color: floralwhite;
}
</style>