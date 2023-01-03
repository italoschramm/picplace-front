<template>
  <div class="main">
    <div class="profile">
        <Fieldset legend="Dados">
          <div class='field'>
            <span class="p-float-label">
              <InputText id="name" type="text" v-model="user.customer.name" />
              <label for="name">Nome</label>
            </span>
          </div>
          <div class='field'>
            <span class="p-float-label">
              <InputText id="lastname" type="text" v-model="user.customer.lastname" />
              <label for="lastname">Sobrenome</label>
            </span>
          </div>
          <div class='field'>
            <span class="p-float-label">
              <InputText id="password" type="text" v-model="user.customer.lastname" />
              <label for="password">Nova senha</label>
            </span>
          </div>
          <div class='field'>
            <Button label="Salvar" class="btn-salvar"/>
            <Button label="Logout" class="btn-logout" @click="logout()"/>
          </div>
        </Fieldset>
    </div>
  <button @click="logout()"></button>
  </div>
</template>

<script>
import Auth from '@/api/auth';
import Api from '@/api/back-api'

export default {
  name: 'App',
  data(){
          return{
            user: {
              customer:{

              }
            }
          }
  },
  created(){
      Api.getUser(Auth.getUserId()).then(response  => {
        this.user = response.data;
        console.log(this.user)
			}).catch ((error)=> {
        console.log(error.data)
      });

  },
  methods:{
          logout(){
              Auth.logout();
          }
  }
}

</script>

<style lang="scss" scoped>
.fieldset p {
    line-height: 1.5;
    margin: 50px;
}

.main{
  margin-top: 50px;
  align-items: center;
  justify-items: center;
  display: flex;
  width: 100%;
  height: 100%;
  align-content: center;
  justify-content: center;
}

.profile{
  margin-top: 50px;
  align-items: center;
  justify-items: center;
  display: flex;
  width: 80%;
  height: 80%;
  align-content: center;
  justify-content: center;
}

.field{
  margin-top: 20px;
}



.btn-salvar{
  margin-right: 20px;
}
</style>

