<template>
    <div>
        <div>
            <p><h4>Soliciar contato do anunciante</h4></p>
        </div>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
            <div class="div-item">
                <div class="p-float-label p-input-icon-right">
                            <i class="pi pi-envelope" />
                            <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"/>
                            <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email*</label>
                </div>
                <span v-if="v$.email.$error && submitted">
                    <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                        <small class="p-error">{{error.$message}}</small>
                    </span>
                </span>
                <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'Email')}}</small>
            </div>
            <div class="div-item">
                <label for="basic">Telefone para contato</label>
                <InputMask id="basic" mask="99-99999-9999" v-model="phoneNumber" placeholder="99-99999-9999" />
            </div>
        <Button type="submit" label="Enviar" class="mt-2" />
    </form>
    <Message :severity="severity" v-show="showMessage == 'none' ? false : true">{{ message }}</Message>
    <div class="share">
        <ShareNetwork
            network="whatsapp"
            :url="currentUrl"
            :title="whatsTitle"
            :description="whatsDescription"
            quote=""
            hashtags="">
            <img src='@/assets/whatsapp.svg' width="50" height="50"/> 
        </ShareNetwork>
    </div>
     
    </div>
</template>

<script>
import http from '@/api/back-api.js';
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            submitted: false,
            email: '',
            phoneNumber: '',
            message: '',
            showMessage : 'none',
            severity: 'success',
            contact: null,
            currentUrl: '',
            whatsTitle: '',
            whatsDescription: ''
        }
        
    },
    validations() {
        return {
            email: {
                required,
                email
            }
        }
    },
    props:{
        property: Object
    },
    watch: { 
        property: function(newVal, oldVal) { 
            this.getTitleWhats();
            this.getDescriptionWhats();
        }
    },
    created(){
        this.currentUrl = window.location.href + "/";
    },
    methods:{
        getTitleWhats(){
            if(this.property.transactionType == 1)
                this.whatsTitle= this.property.propertyTypeCategory.description + " para Alugar"
            else
                this.whatsTitle= this.property.propertyTypeCategory.description + " para Vender"
        },  
        getDescriptionWhats(){
            if(this.property.transactionType == 1)
                this.whatsDescription= this.property.propertyTypeCategory.description + " para Alugar "
            else
                this.whatsDescription= this.property.propertyTypeCategory.description + " para Vender "

            this.whatsDescription = this.whatsDescription + this.property.bedrooms + " quarto(s)"
        },    
        async submit(){
            
            this.contact = {
                email: this.email,
                phoneNumber: this.phoneNumber,
                status: 0
            }
            console.log(this.contact)
            http.saveContact(this.contact).then(response => {
                    this.message = 'Solicitação de contato enviada. Em breve o proprietário ou corretor entrará em contato.'
                    this.showMessage = 'block';
                    this.severity = 'success'; 
                }).catch ((error)=> {
                    this.message = error.message
                    this.severity = 'error'
                    console.log(error)
                    this.showMessage = 'block'; 
                });                 
        },
        handleSubmit(isFormValid) {
            this.submitted = true;

            if (!isFormValid) {
                return;
            }

           this.submit();
            
            
        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
        
            if(!this.showMessage) {
                this.resetForm();
            }
        },
        resetForm() {
            this.email = '';
            this.phoneNumber = '';
            this.submitted = false;
        }    
            
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}

.share{
    margin-top: 25px;
}

.div-item{
    margin-top: 10px;
}

.div-button{
    margin-top: 10px;
}
</style>