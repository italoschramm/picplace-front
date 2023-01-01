<template>
    <Galleria :value="images" v-model:activeIndex="activeIndex" :numVisible="3" containerStyle="max-width: 100%">
        <template #item="slotProps">
            <img :src="slotProps.item.code" style="max-width: 100%; max-height: 100%;" alt="Image" />
            <!-- :alt="slotProps.item.alt" -->
        </template>
        <template #thumbnail="slotProps">
            <img :src="slotProps.item.code" alt="Image" width="100" height="100" />
        </template>
    </Galleria>

</template>

<script>
import http from '@/api/back-api.js';

export default {
    inheritAttrs:false,
    name: 'App',
    data() {
        return {
            images: [],
            idProperty: null,
            activeIndex: 2,
			responsiveOptions: [
				{
                    breakpoint: '1024px',
                    numVisible: 5
                },
                {
                    breakpoint: '768px',
                    numVisible: 3
                },
                {
                    breakpoint: '560px',
                    numVisible: 1
                }
			]
        }
        
    },
    props:{
        property: Object
    },
    watch: { 
        property: function(newVal, oldVal) { // watch it
            this.getPictures()
        }
    },
    galleriaService: null,
	created() {

	},
    methods: {
        getPictures(){
            var i = 0;
            for(let pic of this.property.pictures){
                this.images[i] = pic;
                i++;
            }
        },
        next() {
            this.activeIndex = (this.activeIndex === this.images.length - 1) ? 0 : this.activeIndex + 1;
        },
        prev() {
            this.activeIndex = (this.activeIndex === 0) ? 0 : this.images.length - 1;
        }
    }
}

</script>