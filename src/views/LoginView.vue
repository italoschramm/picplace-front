<template>
    <div class=".tabmenudemo-content">
        <div class="container">
            <div class="box">
                <div class="div-item">
                    <Message severity="error" :key="id" v-show="showError == 'none' ? false : true">{{ messageError}}</Message>
                </div>
                <div class="div-item">
                    <span class="p-float-label">
                        <InputText id="username" type="text" v-model="credentials.username" />
                        <label for="username">Usuário</label>
                    </span>
                </div>
                <div class="div-item">
                    <span class="p-float-label">
                        <Password v-model="credentials.password" toggleMask :feedback="false"></Password>
                        <label for="password">Senha</label>
                    </span>
                </div>
                <div class="div-item">
                    <Button label="Entrar" @click="login()"/>
                </div>
<!--                 <div class="div-link">
                    <Button label="Esqueci minha senha" class="p-button-link"/>
                </div> -->
                <div class="div-link">
                    <Button label="Cadastre-se aqui" class="p-button-link" @click="register()"/>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import auth from '@/api/auth';
import http from '@/api/back-api';
import router from '../router/index';
import axios from 'axios';

const AXIOS = axios.create({
    baseURL: 'http://localhost:8090',
    timeout: 50000
  });

export default {
    name: 'App',
    data() {
        return {
            credentials: {
                          username: '',
                          password: ''
                        },
             id : 1,
             showError : 'none',
             messageError : ""
        }
        
    },
    methods: {
        async login(){
            var credentials = {
                                username: this.credentials.username,
                                password: this.credentials.password
            }
            
                await http.login(credentials).then(response => {
                    var loginData = {
                                    id_token: response.data.token,
                                    authorizations: response.data.user.authorizations,
                                    id: response.data.user.id

                    }
                    auth.saveLogin(loginData);
                    router.push('/advertise')
                }).catch ((error)=> {
                    var message = error.message
                    if(message.toString().indexOf('403') > -1)
                        this.messageError = "Login e senha inválidos"
                    else {
                        this.messageError = "Erro desconhecido."
                    }
                    this.showError = 'block'; 
                });             
        },
        register(){
            router.push('/register')
        }
    }   
}

</script>

<style scoped lang="scss">

::v-deep(.tabmenudemo-content) {
    padding: 2rem 1rem;
}

::v-deep(.p-password input) {
    width: 16rem
}

::v-deep(.p-button) {
    width: 16rem
}

::v-deep(.p-inputtext) {
    width: 16rem
}

.sizes {
    .p-inputtext {
        display: block;
        margin-bottom: .5rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

.field * {
    display: block;
}

.container{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;

}

.box {
    width: 600px;
    height: 400px;
    margin-top: 100px;
    justify-content: center;
}

.div-item {
    justify-content: center;
    align-items: center;
    display: flex;
    margin-top: 30px;
}

.div-link {
    justify-content: center;
    align-items: center;
    display: flex;
    width: 600px;
    margin-top: 10px;
}

  </style>