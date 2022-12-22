<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import TabMenuItems from './TabMenuItems.vue'

</script>

<template>
  <header>
    
  </header>
  <div class="div-header">
       

      <div class="div-nav">
        <nav>
          <TabMenuItems/>
        </nav>
      </div>

  </div>
    
</template>

<style>

.div-header { 
    width: 100%; 
} 

.div-logo { 
  float:left; 
  width:19%;
  margin-left: 40px;
  margin-top: 40px;
} 

.div-nav { 
  float:left; 
  width:50%;
  margin-top: 20px;
}

.div-avatar { 
  float:right;
  width:10%;
  margin-right: 40px;
  margin-top: 8px;
}

.menu-1{
  float:left;
  width:16%;
  margin-top: 27px;
  margin-left: 4px;
}

.menu-2{
  float:left;
  width:16%;
  margin-top: 25px;
}

.menu-3{
  float:left;
  width:16%;
  margin-top: 25px;
}


.menu-4{
  float:left;
  width:16%;
  margin-top: 25px;
}

.menu-5{
  float:left;
  width:16%;
  margin-top: 25px;
}

.menu-6{
  float:left;
  width:16%;
  margin-top: 25px;
}

</style>
