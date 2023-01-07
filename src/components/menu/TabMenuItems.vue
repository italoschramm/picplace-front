<template>
    <div>
        <div class="div-logo">
            <img alt="Vue logo" class="logo-app" src="@/assets/picplace.png" width="200" height="100" @click="goHome()"/>
        </div>
        <div class="card">
            <TabMenu :model="items" />
        </div>
        <router-view/>
    </div>
</template>

<script>
import Avatar from './Avatar.vue';
import Router from '@/router/index';

export default {
    data() {
        return {
            active: 3,
            items: [
                {
                    label: 'Anúncios',
                    to: "/"
                },
                {
                    label: 'Anuncie',
                    to: "/advertise"
                },
                {
                    label: 'Publicado',
                    to: "/myAdvertises"
                },
                {
                    label: 'Perfil',
                    to: "/profile"
                },
                {
                    label: 'Sobre',
                    to: "/about"
                }
            ]
        }
    },
    methods: {
        goHome(){
            this.$router.push('/')
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
    width: 100%;
}

.div-logo { 
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
} 

</style>