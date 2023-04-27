<script setup lang="ts">
import Logo from './components/logo/Logo.vue';
import Nav from './components/navigation/Nav.vue';
import { computed, reactive } from 'vue';
import { useHead } from '@vueuse/head';

const siteData = reactive({
  title: 'PicPlace',
  description: 'Especialistas em Soluções Imobiliárias, para que você tenha uma experiência agradável. PicPlace, o melhor caminho para encontrar seu lugar no mundo.',
})

useHead({
  // Can be static or computed
  title: computed(() => siteData.title),
  meta: [
    {
      name: `description`,
      content: computed(() => siteData.description),
    },
    {
      property: 'og:description',
      content: siteData.description
    },
    {
      property: 'og:image',
      content: '' 
    },
    {
      property: 'og:title',
      content: ''
    }
  ],
})
</script>

<template>
  <header>
  </header>
    <Logo />
    <Nav />
</template>

<style>

</style>

