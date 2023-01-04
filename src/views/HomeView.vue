<script setup lang="ts">
 import DataView from '../components/dataview/DataView.vue';
 import Filter from '@/components/filter/Filter.vue';
</script>

<template>
    <div class="filter"><Filter/></div>
    <DataView/>
</template>

<style>

.filter{
    margin-top: 30px;
    height: 100%;
    width: 90%;
    align-content: center;
    justify-content: center;
    display: flex;
}

</style>
