<template>
  <div class="content-null" >
    <div class="content-null-main">
      {{this.content}}  
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: "暂无"
    }
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.content-null{
  .content-null-main{
    display:flex;
    align-items: center;
    justify-content: center;
    color:#999999;
  }
}
</style>
