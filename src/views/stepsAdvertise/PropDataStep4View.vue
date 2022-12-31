<template>
    <div class="stepsdemo-content">
        <Card>

            <template v-slot:title>
                Confirmação
            </template>
            <div class="box">
            <div class="msg-error">
                    <Message severity="error" :key="id" v-show="showError == 'none' ? false : true">{{ messageError}}</Message>
            </div>
        </div>

            <template v-slot:content>
                <div class="field col-12">
                    <label for="class">Endereço</label>
                    <b>{{formData.address ? formData.address : '-'}} - {{formData.city ? formData.city : '-'}} - {{formData.state ? formData.state : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="bedrooms">Quartos</label>
                    <b>{{formData.bedrooms ? formData.bedrooms : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="bedroom">Suítes</label>
                    <b>{{formData.suites ? formData.suites : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="parkingSpaces">Vagas de estacionamento</label>
                    <b>{{formData.parkingSpaces ? formData.parkingSpaces : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="usableArea">Área Útil</label>
                    <b>{{formData.usableArea ? formData.usableArea : '-'}} m²</b>
                </div>
                <div class="field col-12">
                    <label for="totalArea">Área Total</label>
                    <b>{{formData.totalArea ? formData.totalArea : '-'}} m²</b>
                </div>
                <div class="field col-12">
                    <label for="price">Valor</label>
                    <b>{{this.formatAsCurrency(formData.price) ? this.formatAsCurrency(formData.price) : '-'}}</b>
                </div>
            </template>
            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between">
                    <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
                    <Button label="Complete" @click="complete()" icon="pi pi-check" iconPos="right" class="p-button-success"/>
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import http from '@/api/back-api.js';

export default {
    data(){
        return {
            message: '',
            pictures: [],
            property:[]
        }
    },

    props: {
        formData: Object
    },
    created(){

    },
    methods: {
        convertFilesToBase64(){
            let p = Promise.resolve();
            p = p.then(async () => this.readAsDataURL(this.formData.files).then(result => {
                    if (result){
                        this.saveProperty();   
                    } 
            }));
        }, 
        readAsDataURL: function(files) {
            var i = 0;
            return new Promise((resolve, reject) => {
                for(let file of files){
                    const fr = new FileReader();
                    fr.onerror = reject;
                    fr.onload = () => {
                        this.pictures[i] = fr.result.split(',')[1];;
                        console.log(this.pictures)
                        i++
                        console.log(files.length)
                        if(files.length == i){
                            resolve(true);
                        }
                    }
                    fr.readAsDataURL(file);
                    
                }
            });
        },
        prevPage() {
            this.$emit('prev-page', {pageIndex: 3});
        },
        async complete() {
            this.pictures = [];
            await this.convertFilesToBase64(); 
            //this.$emit('next-page', {formData: {aaa: ''}, pageIndex: 3});                                            
        },
        formatAsCurrency:  function(value) {
			var number = parseFloat(value).toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' });
  			return number;
		},
        async saveProperty(){
            this.property = {zipcode: this.formData.zipcode, address: this.formData.address, number: this.formData.number, complement: this.formData.complement,
                                                    district: this.formData.district, state: this.formData.state, city: this.formData.city, bedrooms: this.formData.bedrooms,
                                                    suites: this.formData.suites, parkingSpaces: this.formData.parkingSpaces, usableArea: this.formData.usableArea, totalArea: this.formData.totalArea,
                                                    description: this.formData.description, idTransactionType: this.formData.idTransactionType, idPropertyType: this.formData.idPropertyType,
                                                    idPropertyTypeCategory: this.formData.idPropertyTypeCategory, salePrice: this.formData.salePrice, pictures: this.pictures, active: true
                            }
            
            await http.saveProperty(this.property).then(response => {
                console.log(response.data)
                this.$emit('next-page', {formData: {aaa: ''}, pageIndex: 3});
            }).catch(error=> {
                console.log(error)
                alert(error.message)
                //console.log(error)
                //this.message = error.message;
                //this.showError = 'block';  
            }); 
        }
    }
}
</script>