<template>
    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                Endereço do Imóvel
            </template>
            <template v-slot:subtitle>
                Informe os dados do endereço do imóvel
            </template>
            <template v-slot:content>
                <div class="p-fluid">
                    <div class="field">
                        <label for="firstname">Cep</label>
                        <InputText id="zip" type="number" v-model="zip" v-on:keyup="onInputZip" :class="{'p-invalid': validationErrors.zip && submitted}" />
                        <small v-show="validationErrors.zip && submitted" class="p-error">Cep é obrigatório.</small> 
                    </div>
                    <div class="field">
                        <label for="address">Endereço</label>
                        <InputText id="address" v-model="address" :class="{'p-invalid': validationErrors.address && submitted}" />
                        <small v-show="validationErrors.address && submitted" class="p-error">Endereço é obrigatório</small>
                    </div>
                    <div class="field">
                        <label for="number">Número</label>
                        <InputText id="number" v-model="number" :class="{'p-invalid': validationErrors.number && submitted}" />
                        <small v-show="validationErrors.number && submitted" class="p-error">Número é obrigatório</small>
                    </div>
                    <div class="field">
                        <label for="complement">Complemento</label>
                        <InputText id="complement" v-model="complement"/>
                    </div>
                    <div class="field">
                        <label for="district">Bairro</label>
                        <InputText id="district" v-model="district" :class="{'p-invalid': validationErrors.district && submitted}" />
                        <small v-show="validationErrors.district && submitted" class="p-error">Bairro é obrigatório</small>
                    </div>
                    <div class="field">
                        <label for="state">Estado</label>
                        <Dropdown v-model="selectState" :change="getCities(this.selectState)" :options="states" :class="{'p-invalid': validationErrors.selectState && submitted}"/>
                        <small v-show="validationErrors.selectState && submitted" class="p-error">Estado é obrigatório</small>
                    </div>
                    <div class="field">
                        <label for="city">Cidade</label>
                        <Dropdown v-model="selectCity" :options="cities" :class="{'p-invalid': validationErrors.selectCity && submitted}"/>
                        <small v-show="validationErrors.selectCity && submitted" class="p-error">Cidade é obrigatório</small>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between">
                    <i></i>
                    <Button label="Next" @click="nextPage()" icon="pi pi-angle-right" iconPos="right" />
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import http from '@/api/api-cep.js';
import httpIbge from '@/api/api-ibge.js';

export default {
    data () {
        return {
            zip: '',
            address: '',
            number: '',
            complement: '',
            district: '',
            selectState: '',
            states: [],
            selectCity: '',
            cities: [],
            submitted: false,
            validationErrors: {}
        }
    },
    created(){
        this.getStates();
    },
    methods: {
        async onInputZip(){
             if(this.zip.length > 7){
                await http.findByCep(this.zip).then(response => {
                    this.address = response.data.logradouro;
                    this.district = response.data.bairro;
                }).catch(error=> {
                    console.log(error)
                });
             }
        },
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
                console.log(error)
            }); 
        },
        async getCities(selectState){
            await httpIbge.getCities(selectState).then(response => {
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
        nextPage() {
            this.submitted = true;
            if (this.validateForm() ) {
                this.$emit('next-page', {formData: {zip: this.zip, address: this.address, number: this.number, complement: this.complement,
                                                    district: this.district, state: this.selectState, city: this.selectCity 
                                                    }, pageIndex: 0});
            }
        },
        validateForm() {
            if (!this.zip.trim())
                this.validationErrors['zip'] = true;
            else
                delete this.validationErrors['zip'];

            if (!this.address.trim())
                this.validationErrors['address'] = true;
            else
                delete this.validationErrors['address'];

            if (!this.number.trim())
                this.validationErrors['number'] = true;
            else
                delete this.validationErrors['number'];

            if (!this.district.trim())
                this.validationErrors['district'] = true;
            else
                delete this.validationErrors['district'];

            if (!this.selectState.trim())
                this.validationErrors['selectState'] = true;
            else
                delete this.validationErrors['selectState'];

            if (!this.selectCity.trim())
                this.validationErrors['selectCity'] = true;
            else
                delete this.validationErrors['selectCity'];

            return !Object.keys(this.validationErrors).length;
        }
    }
}
</script>
