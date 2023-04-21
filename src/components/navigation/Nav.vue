<template>
    <div id="app-content">
      <NavigationMobile @changePage="changePage($event)"/>
      <div class="content" :class="{'open':showNav}">
        <div class="top-bar">
          <div id="navigation-icon" v-if="mobileView"
            @click="showNav = !showNav">
            <i class="fas fa-bars"></i>
          </div>
          <Navigation v-if="!mobileView" />
        </div>
        <router-view/>
        <Footer class="footer"/>
      </div>
      
    </div>
  </template>
  
  <script>
  import Navigation from "./Navigation.vue";
  import NavigationMobile from "./NavigationMobile.vue";
  import Router from '@/router/index';
  import Footer from '@/components/footer/Footer.vue'

  export default {
    data: () => {
      return {
        mobileView: true,
        showNav: false
      };
    },
    methods: {
      handleView() {
        this.mobileView = window.innerWidth <= 990;
      },
      changePage(value){
        this.showNav = value
      }
    },
    components: {
      Navigation,
      NavigationMobile,
      Footer
    },
    created() {
      this.handleView();
      window.addEventListener('resize', this.handleView);
    }
  };
  </script>
  
  <style lang="scss">
  @import url("https://use.fontawesome.com/releases/v5.9.0/css/all.css");
  * {
    font-size: 1rem;
  }
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Segoe UI", Tahoma;
    background-color: #fff;
  }
  .app-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    color: #333;
    overflow: hidden;
  }
  .top-bar {
    display: absolute;
    width: 100%;
  }
  #navigation-icon {
    padding: 10px 10px 20px;
    margin-right: 10px;
    cursor: pointer;
    i {
      font-size: 2rem;
    }
  }
  .content {
    position: absolute;
    top: 120px;
    bottom: 100px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    transition: 1s transform cubic-bezier(0,.12,.14,1);
  }
  .open {
    transform: translateX(260px);
  }

  .footer{
    margin-bottom: 50px;
  }
  </style>