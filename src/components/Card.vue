<template>
  <div class="card">
    <img :src="image" alt="Denim Jeans" style="width: 100%" />
    <p class="price">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.price {
  color: grey;
  font-size: 22px;
  padding-bottom: 22px;
}

.card button {
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

.card button:hover {
  opacity: 0.7;
}
</style>
