<template>
    <div>
        <Card style="max-width: 50rem; margin-bottom: 2em">
            <template #title>
                <label v-if="transactionType=1">{{propertyTypeCategory}} para alugar</label>
                <label v-else>{{propertyTypeCategory}} para comprar</label> 
            </template>
            <template #content>
                <p><b>Endereço: </b> {{ address }}</p> 
                <p><b>Bairro: </b> {{ district }}</p> 
                <p><b>Cidade: </b> {{ city }} - {{ state }}</p> 
                <p v-if="suites === 0"> <b>Quartos: </b> {{ bedrooms }} - ({{ suites }} suítes)</p>
                <p v-else-if="suites === 1"><b>Quartos: </b> {{ bedrooms }} - ({{ suites }} suíte)</p>   
                <p v-else><b>Quartos: </b> {{ bedrooms }} - ({{ suites }} suítes)</p>
                <p><b>Vagas de estacionamento: </b> {{ parkingSpaces }}</p> 
                <p><b>Área útil: </b> {{ usableArea }}m²</p> 
                <p><b>Área total: </b> {{ totalArea }}m²</p>
                <p><b>Preço: </b> {{ this.formatAsCurrency(price) }}</p>
            </template>
            <template #footer>
                <Contact :property="property"></Contact>
            </template>
        </Card>
    </div>
</template>

<script>
import http from '@/api/back-api.js';
import Contact from '@/components/Contact/ContactProp.vue'

export default {
    data() {
        return {
            address: '',
            district: '',
            city: '',
            state: '',
            bedrooms: 0,
            suites: 0,
            parkingSpaces: 0,
            usableArea: 0,
            totalArea: 0,
            transactionType: 0,
            propertyTypeCategory: '',
            price: 0
        }
        
    },
    components: {
        Contact
    },
    props:{
        property: Object
    },
    watch: { 
        property: function(newVal, oldVal) { 
            this.fillData()
            this.$emit('setProperty', this.properties)
        }
    },
    methods:{
        fillData(){
            this.address = this.property.address;
            this.district = this.property.district;
            this.city = this.property.city;
            this.state = this.property.state;
            this.bedrooms = this.property.bedrooms;
            this.suites = this.property.suites;
            this.parkingSpaces = this.property.parkingSpaces;
            this.usableArea = this.property.usableArea;
            this.totalArea = this.property.totalArea;
            this.transactionType = this.transactionType.id
            this.propertyTypeCategory = this.property.propertyTypeCategory.description;
            this.price = this.property.price;
        },
        formatAsCurrency:  function(value) {
			var number = parseFloat(value).toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' });
  			return number;
		}
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>