<template>
  
    <div class="content" >
   <null-result  ></null-result>
    </div>

</template>

<script>
import NullResult from 'components/null_result'
export default {
    components:{
        NullResult
    }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.content{
    .content-wrapper{
        display:flex;
        align-items: center;
        justify-content: center;
        color:#999999;
    }
}
</style>
