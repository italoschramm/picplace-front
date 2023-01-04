<template>
  <div class="main">
    <div class="props">
      <Fieldset legend="Imóveis">
        <div class="card">
        <OrderList v-model="properties" listStyle="height:auto" dataKey="id">
            <template #item="slotProps">
                <div class="product-item" @click="setProperty(slotProps.item)">
                    <div class="image-container">
                        <img :src="slotProps.item.pictures[0].code" :alt="slotProps.item.propertyTypeCategory.description" />
                    </div>
                    <div class="product-list-detail">
                        <h6 class="mb-2">{{slotProps.item.transactionType.description}}</h6>
                        <i class=""></i>
                        <span class="product-category">{{slotProps.item.propertyTypeCategory.description}}</span>
                    </div>
                    <div class="product-list-action">
                        <h6 class="mb-2">${{slotProps.item.price}}</h6>
                        <!-- <span :class="'product-badge status-'+slotProps.item.active">{{slotProps.item.active}}</span> -->
                    </div>
                </div>
            </template>
        </OrderList>
      </div>
      <div class='field'>
        <ConfirmPopup></ConfirmPopup>
        <ConfirmPopup group="demo">
            <template #message="slotProps">
                <div class="flex p-4">
                    <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
                    <p class="pl-2">{{slotProps.message.message}}</p>
                </div>
            </template>
        </ConfirmPopup>
        <Toast />
        <Button @click="confirm2($event)" icon="pi pi-times" label="Delete" class="p-button-danger p-button-outlined"></Button>
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
            property: null
          }
  },
  created(){
      Api.getUser(Auth.getUserId()).then(response  => {
        this.user = response.data;
        console.log(this.user)
        this.getProperties(this.user.customer.id);
			}).catch ((error)=> {
        console.log(error)
      });

  },
  methods:{
        confirm2(event) {
            this.$confirm.require({
                target: event.currentTarget,
                message: 'Deseja realmente excluir esse imóvel?',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    Api.deleteproperty(this.property.id).then(response =>{
                      this.$toast.add({severity:'info', summary:'Confirmed', detail:'Imóvel deletado', life: 3000});
                      this.getProperties(this.user.customer.id);
                    }).catch(error => {
                      this.$toast.add({severity:'error', summary:'Rejected', detail: error.message, life: 3000});
                    });
                    
                },
                reject: () => {
                    this.$toast.add({severity:'error', summary:'Rejected', detail:'Cancelado', life: 3000});
                }
            });
        },
          setProperty(property){
            this.property = property
          },
          logout(){
              Auth.logout();
          },
          getProperties(idCustomer){
            Api.getPropertyByIdCustomer(idCustomer).then(response => {
              console.log(response)
              this.properties = response.data;
            }).catch(error => {
              console.log(error)
            });

          }
  }
}

</script>

<style lang="scss" scoped>
.fieldset p {
    line-height: 1.5;
    margin: 50px;
}

.props{
  margin-top: 50px;
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
  flex-direction: row;
  position: relative;
  display: grid;
}

.profile{
  margin-top: 50px;
  align-items: center;
  justify-items: center;
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

