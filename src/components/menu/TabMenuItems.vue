<template>
    <div>
        <div class="div-logo">
            <img alt="Vue logo" class="logo-app" src="@/assets/quintoAndar.svg" width="184" height="25" />
        </div>
        <div class="card">
            <TabMenu :model="items" />
            <router-view/>
        </div>
    </div>
</template>

<script>
import Avatar from './Avatar.vue';

export default {
    data() {
        return {
            active: 3,
            items: [
                {
                    label: 'Home',
                    to: "/"
                },
                {
                    label: 'Aluguel',
                    to: "/about"
                },
                {
                    label: 'Venda',
                    to: "/about2"
                },
                {
                    label: 'Sobre',
                    to: "/about3"
                }
            ]
        }
    }
}
</script>

<style scoped lang="scss">
::v-deep(.tabmenudemo-content) {
    padding: 2rem 1rem;
}

.card { 
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.div-logo { 
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
} 

</style>