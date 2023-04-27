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
                <p><b>Condomínio: </b> {{ this.formatAsCurrency(condominiumFEE) }}</p>
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
import { useHead } from '@vueuse/head'
import { onMounted, watchEffect  } from "vue"

export default {
    setup(props) {
    watchEffect(() => {
      if (props.property) {
        useHead({
          title: props.property.transactionType.description + ' de ' + props.property.propertyTypeCategory.description + " na cidade de " + props.property.city,
          meta: [
            {
              property: 'og:description',
              content: props.property.description
            },
            {
              property: 'og:image',
              content: props.property.pictures[0].code  
            },
            {
              property: 'og:title',
              content: props.property.transactionType.description + ' de ' + props.property.propertyTypeCategory.description
            },
            {
              property: 'og:url',
              content: 'http://www.picplace.com.br/prop/' + props.property.id
            }
          ],
        });
      }
    });
  },

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
            price: 0,
            condominiumFEE: 0,
            description: ''
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
            console.log('Iniciado 2')
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
            this.condominiumFEE = this.property.condominiumFEE;
            this.price = this.property.price;
            this.description = this.property.description;
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