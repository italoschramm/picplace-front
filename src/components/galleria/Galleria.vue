<template>
    <!-- <h1>I'm alive</h1>
    <div style="padding: .5rem 0">
        <Button icon="pi pi-minus" @click="prev" class="p-button-secondary" />
        <Button icon="pi pi-plus" @click="next" class="p-button-secondary" style="margin-left: .5rem" />
    </div> -->

    <Galleria :value="images" v-model:activeIndex="activeIndex" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px">
        <template #item="slotProps">
            <img :src="slotProps.item.code"  style="width: 100%" alt="Image" width="250" height="400" />
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
            property: null,
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
    galleriaService: null,
	created() {
        this.getProperty();
	},
    methods: {
        async getProperty(){
            this.idProperty = this.$route.params.idProperty;
            await http.getPropertyById(this.idProperty).then(response  => {
			    this.property = response.data
                var i = 0;
                for(let pic of this.property.pictures){
                    this.images[i] = pic;
                    i++;
                    console.log(this.images)
                }
		    }).catch(error => {
                console.log(error);
            });
		    console.log(this.properties);
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