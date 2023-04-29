<template>
    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                Detalhes do imóvel
            </template>
            <template v-slot:subtitle>
                Informe os detalhes do imóvel
            </template>
            <template v-slot:content>
                <div class="p-fluid">
                    <div class="field">
                        <label for="selectTransaction">Tipo do anúncio</label>
                        <Dropdown v-model="selectTransaction" :options="transactions" optionLabel="description" :class="{'p-invalid': validationErrors.selectTransaction && submitted}"/>
                        <small v-show="validationErrors.selectTransaction && submitted" class="p-error">Tipo é obrigatório</small>
                    </div>
                    <div class="field">
                        <label for="selectPropertyType">Tipo do imóvel</label>
                        <Dropdown v-model="selectPropertyType" :change="getCategories(this.selectPropertyType)" :options="propertyTypes" optionLabel="description" :class="{'p-invalid': validationErrors.selectPropertyType && submitted}"/>
                        <small v-show="validationErrors.selectPropertyType && submitted" class="p-error">Tipo do imóvel é obrigatório</small>
                    </div>
                    <div class="field">
                        <label for="selectCategory">Categoria</label>
                        <Dropdown v-model="selectCategory" :options="categories" optionLabel="description" :class="{'p-invalid': validationErrors.selectCategory && submitted}"/>
                        <small v-show="validationErrors.selectCategory && submitted" class="p-error">Categoria do imóvel é obrigatório</small>
                    </div>
                    <div class="field">
                        <label for="selectBedrooms">Quartos</label>
                        <Dropdown v-model="selectBedrooms" :options="bedrooms" :class="{'p-invalid': validationErrors.selectBedrooms && submitted}"/>
                        <small v-show="validationErrors.selectBedrooms && submitted" class="p-error">Quartos é obrigatório</small>
                    </div>
                    <div class="field">
                        <label for="suites">Quantos desses quartos são Suítes?</label>
                        <Dropdown v-model="selectSuites" :options="suites" ></Dropdown>
                    </div>
                    <div class="field">
                        <label for="selectParkingSpaces">Vagas de estacionamento</label>
                        <Dropdown v-model="selectParkingSpaces" :options="parkingSpaces" :class="{'p-invalid': validationErrors.selectParkingSpaces && submitted}"/>
                        <small v-show="validationErrors.selectParkingSpaces && submitted" class="p-error">Vagas de estacionamento é obrigatório</small>
                    </div>
                    <div class="field">
                        <label for="usableArea">Área Útil em m²</label>
                        <InputText id="usableArea" v-model="usableArea" :class="{'p-invalid': validationErrors.usableArea && submitted}" />
                        <small v-show="validationErrors.usableArea && submitted" class="p-error">Área útil é obrigatório</small>
                    </div>
                    <div class="field">
                        <label for="totalArea">Área Total em m²</label>
                        <InputText id="totalArea" v-model="totalArea" :class="{'p-invalid': validationErrors.totalArea && submitted}" />
                        <small v-show="validationErrors.totalArea && submitted" class="p-error">Área total é obrigatório</small>
                    </div>
                    <div class="field">
                        <label for="description">Outras informações sobre o imóvel</label>
                        <InputText id="description" v-model="description"/>
                        <small v-show="validationErrors.descriptionLengh && submitted" class="p-error">Não pode conter mais do que 1000 caracteres. Quantidade atual: {{ this.description.length }}</small>
                    </div>
                    <div class="field">
                        <label for="price">Valor</label>
                        <InputNumber id="price" v-model="price" mode="currency" currency="BRL" :class="{'p-invalid': validationErrors.price && submitted}" />
                        <small v-show="validationErrors.price && submitted" class="p-error">Valor é obrigatório </small>
                    </div>
                    <div class="field">
                        <label for="condominiumFEE">Taxa de Condomínio</label>
                        <InputNumber id="condominiumFEE" v-model="condominiumFEE" mode="currency" currency="BRL" />
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
import httpIbge from '@/api/api-ibge.js';
import http from '@/api/back-api.js';

export default {
    data () {
        return {
            bedrooms:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
            selectBedrooms: null,
            suites:[0,1,2,3,4,5,6,7,8,9],
            selectSuites: null,
            parkingSpaces:[1,2,3,4,5,6,7,8,9],
            selectParkingSpaces: null,
            usableArea: '',
            totalArea: '',
            description: '',
            transactions: [],
            selectTransaction: null,
            propertyTypes: [],
            selectPropertyType: null,
            categories: [],
            selectCategory: null,
            nameType: 'Valor',
            price: 0,
            condominiumFEE: 0,
            submitted: false,
            validationErrors: {},
            qtyCharDescription: 0
        }
    },
    props: {
            formData: Object
    },
    created(){
        this.getPropertyTypes();
        this.getTransactionTypes();
    },
    methods: {
        async getPropertyTypes(){
            await http.getPropertyTypesActives().then(response => {
                var i = 0;
                for (let n of  response.data) {
                    this.propertyTypes[i] = {description: n.description, id: n.id};
                    i++;
                }
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
        async getCategories(selectPropertyType){
            if(selectPropertyType == null)
                return;

            await http.getActivesByProductTypeId(selectPropertyType.id).then(response => {
                this.categories = [];
                var i = 0;
                for (let n of  response.data) {
                    this.categories[i] = {description: n.description, id: n.id};
                    i++;
                }    
                this.categories.sort((a, b) => a.description.localeCompare(b.description));
            }).catch(error=> {
                console.log(error)
            });  
        },
        nextPage() {
            this.submitted = true;
            if (this.validateForm() ) {
                this.$emit('next-page', {formData: {zipcode: this.formData.zip, address: this.formData.address, number: this.formData.number, complement: this.formData.complement,
                                                    district: this.formData.district, state: this.formData.state, city: this.formData.city, bedrooms: this.selectBedrooms,
                                                    suites: this.selectSuites, parkingSpaces: this.selectParkingSpaces, usableArea: this.usableArea, totalArea: this.totalArea,
                                                    description: this.description, idTransactionType: this.selectTransaction.id, idPropertyType: this.selectPropertyType.id,
                                                    idPropertyTypeCategory: this.selectCategory.id, price: this.price, condominiumFEE: this.condominiumFEE
                                                    }, pageIndex: 1});
            }
        },
        validateForm() {
            if (this.selectTransaction == null)
                this.validationErrors['selectTransaction'] = true;
            else
                delete this.validationErrors['selectTransaction'];

            if (this.selectPropertyType == null)
                this.validationErrors['selectPropertyType'] = true;
            else
                delete this.validationErrors['selectPropertyType'];

            if (this.selectCategory == null)
                this.validationErrors['selectCategory'] = true;
            else
                delete this.validationErrors['selectCategory'];

            if (this.selectBedrooms == null)
                this.validationErrors['selectBedrooms'] = true;
            else
                delete this.validationErrors['selectBedrooms'];

            if (this.selectParkingSpaces == null)
                this.validationErrors['selectParkingSpaces'] = true;
            else
                delete this.validationErrors['selectParkingSpaces'];

            if (!this.usableArea.trim())
                this.validationErrors['usableArea'] = true;
            else
                delete this.validationErrors['usableArea'];

            if (!this.totalArea.trim())
                this.validationErrors['totalArea'] = true;
            else
                delete this.validationErrors['totalArea'];
            
            if (!this.price  > 0)
                this.validationErrors['price'] = true;
            else
                delete this.validationErrors['price'];

            if (this.description.length > 1000)
                this.validationErrors['descriptionLengh'] = true;
            else 
                delete this.validationErrors['descriptionLengh'];

            return !Object.keys(this.validationErrors).length;
        }
    }
}
</script>
