<script setup lang="ts">
import Logo from './components/logo/Logo.vue';
import Nav from './components/navigation/Nav.vue';
import { computed, reactive } from 'vue';
import { useHead } from '@vueuse/head';

const siteData = reactive({
  title: 'PicPlace Teste Aqui',
  description: 'Especialistas em Soluções Imobiliárias, para que você tenha uma experiência agradável. PicPlace, o melhor caminho para encontrar seu lugar no mundo.',
})

useHead({
  // Can be static or computed
  title: computed(() => siteData.title),
  meta: [
    {
      name: 'description',
      content: computed(() => siteData.description),
    },
    {
      property: 'og:type',
      content: "website"
    },
    {
      name: "title",
      content: "PicPlace",
    },
    {
      property: 'og:title',
      content: "PicPlace"
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
      property: 'og:url',
      content: 'https://www.picplace.com.br/'
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

