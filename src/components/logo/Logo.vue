<template>
    <div>
        <div class="div-logo">
            <img alt="Vue logo" class="logo-app" src="@/assets/picplace.png" width="200" height="100" @click="goHome()"/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
    
        }
    }
}
</script>

<style scoped lang="scss">
::v-deep(.tabmenudemo-content) {
    padding: 2rem 1rem;
}

.div-logo { 
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
} 

</style>