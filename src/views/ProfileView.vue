<template>
  <div class="main">
    <Toast />
    <div class="profile">
        <Fieldset legend="Dados">
          <div class='field'>
            <span class="p-float-label">
              <InputText id="name" type="text" v-model="user.customer.name" />
              <label for="name">Nome</label>
            </span>
          </div>
          <div class='field'>
            <label for="name">Trocar Senha</label>
            <span class="p-float-label">
              <Password v-model="user.password">
                <template #header>
                  <h6>Trocar Senha</h6>
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
            </span>
          </div>
          <div class='field'>
            <Button label="Salvar" class="btn-salvar" @click="salvar()"/>
            <Button label="Logout" class="btn-logout" @click="logout()"/>
          </div>
        </Fieldset>
    </div>
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
            },
            properties: null,
            value1: null,
            value2: null,
            value3: null,
            value4: null
          }
  },
  created(){
      Api.getUser(Auth.getUserId()).then(response  => {
        this.user = response.data;
        this.getProperties(this.user.customer.id);
			}).catch ((error)=> {
        console.log(error)
      });

  },
  methods:{
          logout(){
              Auth.logout();
          },
          getProperties(idCustomer){
            Api.getPropertyByIdCustomer(idCustomer).then(response => {
              this.properties = response.data;
            }).catch(error => {
              console.log(error)
            });
          },
          validations(){
            var isOk = true;
            if(this.user.password  == null){
              this.$toast.add({severity:'error', summary:'Rejected', detail: "Campo senha é obrigatório.", life: 3000});
              isOk = false;
            }

            if(this.user.customer.name  == null){
              this.$toast.add({severity:'error', summary:'Rejected', detail: "Campo nome é obrigatório.", life: 3000});
              isOk = false;
            }
            
            return isOk;

          },
          salvar(){

            if(!this.validations())
              return;

            console.log(user)
              var user= {
                    customer: {
                        id: this.user.customer.id,
                        name: this.user.customer.name,
                        lastName: this.user.customer.lastname,
                    },
                    id: this.user.id,
                    password: this.user.password,
                    username: this.user.username,
                    active: true
              }

              Api.saveUser(user).then(response => {
                this.$toast.add({severity:'info', summary:'Confirmed', detail:'Imóvel deletado', life: 3000});
              }).catch(error => {
                var message = error.message
                this.$toast.add({severity:'error', summary:'Rejected', detail: error.message, life: 3000});
              });
          }
  }
}

</script>

<style lang="scss" scoped>

::v-deep(.p-password input) {
    width: 15rem
}

.fieldset p {
    line-height: 1.5;
    margin: 50px;
}

.props{
  margin-top: 50px;
}

.main{
  margin-top: 50px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  position: relative;
  display: grid;
}

.profile{
  margin-top: 50px;
  display: flex;
  width: 100%;
  height: 100%;
  align-content: center;
  justify-content: center;
}

.field{
  margin-top: 20px;
}



.btn-salvar{
  margin-right: 20px;
}

.card {
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
}
.product-item {
	display: flex;
	align-items: center;
	padding: .5rem;
	width: 100%;

	img {
		width: 75px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        margin-right: 1rem;
	}

	.product-list-detail {
		flex: 1 1 0;
	}

	.product-list-action {
		display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .product-category-icon {
        vertical-align: middle;
        margin-right: .5rem;
        font-size: .875rem;
    }

    .product-category {
        vertical-align: middle;
        line-height: 1;
        font-size: .875rem;
    }
}

@media screen and (max-width: 576px) {
    .product-item {
        flex-wrap: wrap;

        .image-container {
            width: 100%;
            text-align: center;
        }

        img {
            margin: 0 0 1rem 0;
            width: 100px;
        }
    }
}
</style>

