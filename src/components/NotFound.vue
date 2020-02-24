<template>
  <div>
    <div class="flex mt-5">
      <h1 class="font">404 - PAGE NOT FOUND</h1>
    </div>
    <div class="flex mt-2">
      <p>
        Go back <router-link tag="a" to="/">Home</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.flex{
  display: flex;
  align-items: center;
  justify-content: center;
}
.font{
  font-size: 60px;
}
</style>
