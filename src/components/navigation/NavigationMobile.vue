<template>
  <div id="navigation-mobile">
    <ul>
      <li @click="goToAdvertises">Anúncios</li>
      <li @click="goToAdvertise">Anuncie</li>
      <li @click="goToMyAdvertises">Meus Anúncios</li>
      <li @click="goToProfile">Perfil</li>
      <li @click="goToAbout">Sobre</li>
    </ul>
    <div class="social-media">
      <i class="fab fa-twitter"></i>
      <i class="fab fa-instagram"></i>
      <i class="fab fa-pinterest"></i>
    </div>
  </div>
</template>

<script>
import Router from '@/router/index';
export default {

  methods:{
    goToAdvertises(event){
      this.$emit('changePage', false)
      this.$router.push('/')
    },
    goToAdvertise(event){
      this.$emit('changePage', false)
      this.$router.push('/advertise')
    },
    goToMyAdvertises(event){
      this.$emit('changePage', false)
      this.$router.push('/myAdvertises')
    },
    goToProfile(event){
      this.$emit('changePage', false)
      this.$router.push('/profile')
    },
    goToAbout(event){
      this.$emit('changePage', false)
      this.$router.push('/about')
    }
  }

};
</script>

<style lang="scss" scoped>
#navigation-mobile {
  padding: 20px 0 0 0;
  ul {
    list-style: none;
    width: 200px;
    padding-left: 40px;
    li {
      color: #000;
      font-size: 1.2rem;
      margin-bottom: 20px;
      cursor: pointer;
      &:hover {
        color: #111;
      }
    }
  }
  .social-media {
    position: absolute;
    left: 40px;
    bottom: 20px;
    i {
      margin: 0 20px 0 0;
      color: #000;
      font-size: 2rem;
    }
  }
}
</style>