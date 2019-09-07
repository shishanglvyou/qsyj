<template>
  <div class="title-view">
    <h3>
      <van-icon :name="icon" />
      {{name}}
    </h3>
  </div>
</template>

<script>
  export default {
    name: "titleView",
    props:['name','icon']
  }
</script>

<style scoped>
  .title-view{
    height: 3rem;
    line-height: 3rem;
  }
  .title-view h3{
    font-size: 18px;
    text-align: center;
  }
</style>
