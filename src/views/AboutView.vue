<template>
  <div class="about">
    <Button label="Logout" @click="this.logout()"/>
  </div>
</template>

<script>
import Auth from '@/api/auth';

export default {
  name: 'App',
  data(){
          return{

          }
  },

  methods:{
          logout(){
              Auth.logout();
          }
  }
}

</script>

<style>
@media (min-width: 1024px) {
  .aaa {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
