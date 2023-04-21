
<template>
    <div class="form-demo">
        <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top" @click="redirect()">
            <div class="flex align-items-center flex-column pt-6 px-3">
                <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
                <h5>Sucesso!</h5>
                <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
<!--                     Your account is registered under name <b>{{name}}</b> ; it'll be valid next 30 days without activation. Please check <b>{{email}}</b> for activation instructions.-->                
                    Conta criada com sucesso!
                </p>
                        
            </div>
            <template #footer>
                <div class="flex justify-content-center">
                    <Button label="OK" @click="toggleDialog" class="p-button-text" />
                </div>
            </template>
        </Dialog>

        <div class="flex justify-content-center">
            <div class="card">
                <div class="msg-error">
                    <Message severity="error" v-show="showError == 'none' ? false : true">{{ messageError}}</Message>
                </div>
                <h4 class="text-center">Novo Cadastro</h4>
                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                    <div class="field">
                        <div class="p-float-label">
                            <InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" />
                            <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">Nome*</label>
                        </div>
                        <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">{{v$.name.required.$message.replace('Value', 'Name')}}</small>
                    </div>
                    <div class="field">
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
                    <div class="field">
                        <div class="p-float-label">
                            <Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask>
                                <template #header>
                                    <h6>Escolha uma senha</h6>
                                </template>
                                <template #footer="sp">
                                    {{sp.level}}
                                    <Divider />
                                    <p class="mt-2">Sugestões</p>
                                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                        <li>Pelo menos uma letra minúscula</li>
                                        <li>Pelo menos uma letra maiúscula</li>
                                        <li>Pelo menos um número</li>
                                        <li>Mínimo de 8 caracteres </li>
                                        </ul>
                                </template>
                            </Password>
                            <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Senha*</label>
                        </div>
                        <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
                    </div>
                    <!-- <div class="field">
                        <div class="p-float-label">
                            <Calendar id="date" v-model="date" :showIcon="true" />
                            <label for="date">Data de Nascimento</label>
                        </div>
                    </div> -->
                    <!-- <div class="field">
                        <div class="p-float-label">
                            <Dropdown id="country" v-model="country" :options="countries" optionLabel="name" />
                            <label for="country">Country</label>
                        </div>
                    </div> -->
                    <div class="field-checkbox">
                        <Checkbox id="accept" name="accept" value="Accept" v-model="v$.accept.$model" :class="{'p-invalid':v$.accept.$invalid && submitted}" />
                        <label for="accept" :class="{'p-error': v$.accept.$invalid && submitted}">Eu aceito os Termos de Uso e Política de privacidade*</label>
                    </div>
                    <Button type="submit" label="Registrar" class="mt-2" />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import router from '../router/index';
import http from '@/api/back-api';
import auth from '@/api/auth';
//import CountryService from './service/CountryService';

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            name: '',
            email: '',
            password: '',
            //date: null,
            //country: null,
            accept: null,
            submitted: false,
            //countries: null,
            showMessage: false,
            showError : 'none',
            messageError : ""
        }
    },
    countryService: null,
    validations() {
        return {
            name: {
                required
            },
            email: {
                required,
                email
            },
            password: {
                required
            },
            accept: {
                required
            }
        }
    },
    /* created() {
        this.countryService = new CountryService();
    },
    mounted() {
        this.countryService.getCountries().then(data => this.countries = data);
    }, */
    methods: {
        handleSubmit(isFormValid) {
            this.submitted = true;

            if (!isFormValid) {
                return;
            }

            var user = {
                username: this.email,
                password : this.password,
                active : true,
                customer: {
                    name : this.name,
                    email : this.email,
                }
            }

            //Register + Login
            http.saveUser(user).then(response => {
                var credentials = {
                    username: this.email,
                    password: this.password 
                }
                http.login(credentials).then(responseLogin => {
                    var loginData = {
                                    id_token: responseLogin.data.token,
                                    authorizations: responseLogin.data.user.authorizations,
                                    id: responseLogin.data.user.id
                    }
                    auth.saveLogin(loginData);
                }).catch ((error)=> {
                    this.messageError = error.message
                    this.showError = 'block' 
                });
                this.toggleDialog();
            }).catch((error) => {
                this.messageError = error.message
                if(error.message.toString().indexOf('409') > -1)
                    this.messageError = "Email informado já existe"
                this.showError = 'block' 
            });
            
            
        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
        
            if(!this.showMessage) {
                this.resetForm();
            }
        },
        resetForm() {
            this.name = '';
            this.email = '';
            this.password = '';
            //this.date = null;
            //this.country = null;
            this.accept = null;
            this.submitted = false;
        },
        redirect(){
            router.push('/advertise')
        }
    }
}
</script>

<style lang="scss" scoped>
    .card {
        min-width: 50%;

        form {
            margin-top: 2rem;
        }
    }

    .field {
            width: 100%;
            margin-bottom: 1.5rem;
        }

    @media screen and (max-width: 960px) {
        .card {
            width: 80%;
        }
}

</style>

