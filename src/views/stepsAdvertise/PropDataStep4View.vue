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
            message: ''
        }
    },

    props: {
        formData: Object
    },
    created(){
        console.log(this.formObject)
    },
    methods: {
        prevPage() {
            this.$emit('prev-page', {pageIndex: 3});
        },
        complete() {
            this.saveProperty();
                                                    
        },
        formatAsCurrency:  function(value) {
			var number = parseFloat(value).toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' });
  			return number;
		},
        async saveProperty(){
            console.log(this.formData)
            await http.saveProperty(this.formData).then(response => {
                console.log(response)
                this.$emit('next-page', {formData: {aaa: ''}, pageIndex: 3});
            }).catch(error=> {
                console.log(error)
                alert(error.message)
                /* console.log(error)
                this.message = error.message;
                this.showError = 'block';  */
            }); 
        }
    }
}
</script>