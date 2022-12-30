<template>
     
      <div class="card">
          <Steps :model="items" :readonly="false" aria-label="Form Steps" />
      </div>

      <div class="main-div">
        <router-view v-slot="{Component}" :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)" @complete="complete">
          <keep-alive>
              <component :is="Component" />
          </keep-alive>
      </router-view>
     </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import PropertyData from '@/views/stepsAdvertise/PropDataStepView.vue'
import router from '@/router/index';

export default {
  data() {
      return {
          items: [{
              label: 'Localização',
              to: '/stepPropertyData'
          },
          {
              label: 'Dados Imóvel',
              to: '/stepPropertyData2'
          },
          {
              label: 'Fotos',
              to: '/stepPropertyData3'
          },
          {
              label: 'Confirmação',
              to: '/stepPropertyData4'
          },
          {
              label: 'Publicação',
              to: '/stepPropertyData5'
          }],
          formObject: {}
      }
  },
  created(){
    router.push('/stepPropertyData');
  },
  methods: {
      nextPage(event) {
          for (let field in event.formData) {
              this.formObject[field] = event.formData[field];
          }

          this.$router.push(this.items[event.pageIndex + 1].to);
      },
      prevPage(event) {
          this.$router.push(this.items[event.pageIndex - 1].to);
      },
      complete() {
          this.$toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + this.formObject.firstname + ' ' + this.formObject.lastname + ' your order completed.'});
      }
  }
}
</script>

<style scoped lang="scss">
::v-deep(b) {
  display: block;
}

::v-deep(.p-card-body) {
  padding: 2rem;
}

.main-div { 
    //display: flex;
    //flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-top: 50px;
    align-self: center;
    width: 80%;
}
</style>
                  
