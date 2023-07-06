<template>
  <div>
    <div class="landing">
      <div>
        <h1>GET EVERYTHING SORTED IN NO TIME</h1>
        <h2>You can manage all your school activities here.</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "website",
});
</script>

<style scoped>
.landing {
  background-image: url("@/assets/img/background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 3rem);
}

.landing div {
  background-color: #fff;
  padding: 0.5rem 3rem;
  border-radius: 1rem;
  opacity: 0.8;
}

.landing div > h1 {
  color: #436af1;
  margin: 0;
  font-size: 3rem;
}

.landing div > h2 {
  color: #436af1;
  margin: 0.8rem 0;
  text-align: center;
  font-weight: 600;
}
@media (max-width: 767px) {
  .landing div > h1 {
    font-weight: 400;
    font-size: 2rem;
  }
  .landing div > h2 {
    font-size: 0.8rem;
  }
}
</style>
