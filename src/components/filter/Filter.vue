<template>
    <div>
        <div class="card">
            <div class="p-fluid grid">
                <div class="field col-12 md:col-3">
                    <span class="p-float-label">
                        <InputText id="inputtext" type="text" v-model="value1" />
                        <label for="inputtext">InputText</label>
                    </span>
                </div>
                <div class="field col-12 md:col-3">
                    <span class="p-float-label p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText id="inputtext-left" type="text" v-model="valueIconLeft" />
                        <label for="inputtext-left">Left Icon</label>
                    </span>
                </div>
                <div class="field col-12 md:col-3">
                    <span class="p-float-label p-input-icon-right">
                        <i class="pi pi-search" />
                        <InputText id="inputtext-right" type="text" v-model="valueIconRight" />
                        <label for="inputtext-right">Right Icon</label>
                    </span>
                </div>
                <div class="field col-12 md:col-3">
                    <span class="p-float-label p-input-icon-right">
                        <i class="pi pi-search" />
                        <InputText id="inputtext-right" type="text" v-model="valueIconRight" />
                        <label for="inputtext-right">Right Icon</label>
                    </span>
                </div>
            </div>
        </div>
    </div>                    

</template>

<script>
import http from '@/api/back-api.js';
import Contact from '@/components/Contact/ContactProp.vue'

export default {
    data() {
        return {
            
        }
        
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>

</style>