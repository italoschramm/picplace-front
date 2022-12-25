<script setup lang="ts">

</script>

<template>
    <div class=".tabmenudemo-content">
        <div class="container">
            <div class="box">
                <div class="div-item">
                    <span class="p-float-label">
                        <InputText id="username" type="text" v-model="value2" />
                        <label for="username">Usuário</label>
                    </span>
                </div>
                <div class="div-item">
                    <span class="p-float-label">
                        <Password v-model="value3" toggleMask :feedback="false"></Password>
                        <label for="password">Senha</label>
                    </span>
                </div>
                <div class="div-item">
                    <Button label="Entrar" />
                </div>
                <div class="div-link">
                    <Button label="Esqueci minha senha" class="p-button-link" />
                </div>
                <div class="div-link">
                    <Button label="Cadastre-se aqui" class="p-button-link" />
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            value1: null,
            value2: null,
            value3: null,
            value4: null,
            value5: 'PrimeVue'
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