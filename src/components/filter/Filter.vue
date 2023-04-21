<template>
        <div class="card">
            <div class="p-fluid grid">
                <div class="field col-12 md:col-2">
                    <Dropdown v-model="selectedState" :options="states" :change="getCities(this.selectedState)" placeholder="Estado" />
                </div>
                <div class="field col-12 md:col-2">
                    <Dropdown v-model="selectedCity" :options="cities" placeholder="Cidade" />
                </div>
                <div class="field col-12 md:col-2">
                    <Dropdown v-model="selectTransaction" :options="transactions" optionLabel="description" placeholder="Tipo"  />
                </div>
                <div class="field col-12 md:col-2">
                    <InputNumber id="price" v-model="priceMinimum" mode="currency" currency="BRL" placeholder="Cidade"/>
                </div>
                <div class="field col-12 md:col-2">
                    <InputNumber id="price" v-model="priceMaximum" mode="currency" currency="BRL" placeholder="Cidade" />
                </div>
                <div class="field col-12 md:col-2">
                    <Button type="button" icon="pi pi-search"  @click="filter" />
                </div>
            </div>
        </div>             

</template>

<script>
import httpIbge from '@/api/api-ibge.js';
import http from '@/api/back-api.js';

export default {
    data() {
        return {
                states: [],
                selectedState: '',
                cities: [],
                selectedCity: '',
                transactions: [],
                selectTransaction: 0,
                priceMinimum: 0,
                priceMaximum: 999999,
                properties: []
        }
        
    },
    created(){
        this.getStates();
        this.getTransactionTypes();
    },
    methods:{
        async getStates(){
            await httpIbge.getStates().then(response => {
                var i = 0;
                for (let n of  response.data) {
                    this.states[i] = n.sigla;
                    i++;
                } 
                this.states.sort(function(a,b){
                    return a.localeCompare(b);
                })
            }).catch(error=> {
                console.log(error.data)
            }); 
        },
        async getCities(selectedState){
            await httpIbge.getCities(selectedState).then(response => {
                var i = 0;
                for (let n of  response.data) {
                    this.cities[i] = n.nome;
                    i++;
                }    
                this.cities.sort(function(a,b){
                    return a.localeCompare(b);
                })
            }).catch(error=> {
                console.log(error)
            });  
        },
        async getTransactionTypes(){
            await http.getTransactionActives().then(response => {
                var i = 0;
                for (let n of  response.data) {
                    this.transactions[i] = {description: n.description, id: n.id};
                    i++;
                }
            }).catch(error=> {
                console.log(error)
            }); 
        },
        filter(){
            var objFilter = {
                            state: this.selectedState,
                            city: this.selectedCity,
                            priceMinimum: this.priceMinimum,
                            priceMaximum: this.priceMaximum,
                            transactionType: this.selectTransaction
            }
            console.log(objFilter)
            http.getPropertiesByFilters(objFilter).then(response  => {
			    this.properties = response.data
                this.$emit('filter', this.properties)
			});
        }
    }
}
</script>

<style lang="scss" scoped>

</style>