<template>
    <div class="card-main">
            <div class="p-fluid grid">
                <div class="field col-12 md:col-6" style="display:flex; justify-content: center;" >
                    <Galleria :property="property" class="div-galleria"/>
                </div>
                <div class="field col-12 md:col-6">
                    <PropDetails :property="property"/>
                </div>
            </div>
    </div>
</template>

<script>
import Galleria from '@/components/galleria/Galleria.vue'
import PropDetails from '@/components/details/PropDetails.vue'
import http from '@/api/back-api.js';

export default {
    data(){
        return{
            property: null,
            idProperty: null
        }
    },
    components: {
        Galleria,
        PropDetails
    },
    created(){
        this.getProperty();
    },
    methods:{
        async getProperty(){
            this.idProperty = this.$route.params.idProperty;
            await http.getPropertyById(this.idProperty).then(response  => {
			    this.property = response.data
		    }).catch(error => {
                console.log(error);
            });
            
        },
    }
}

</script>

<style>

.card-main {
  margin-top: 100px;

}

/* .div-galleria{
    height: 100px;
} */

</style>