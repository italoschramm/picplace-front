<template>
  <div class="about">
    <Card style="width: 50rem; margin-bottom: 2em">
            <template #title>
              Chegamos para mudar o mercado imobiliário 
            </template>
            <template #content>
                <p>
                  Nossa missão é facilitar a vida de milhares de proprietários e corretores ao divulgar seus imóveis. Levando até você cliente, anúncios de qualidade, eficiente e que possam ajudar na decisão mais importante de sua vida, que ao adquirir seu imóvel, este seja um processo agradável e seguro.</p>
            </template>
    </Card>
  </div>
</template>

<script>
import Auth from '@/api/auth';

export default {
  name: 'App',
  data(){
          return{

          }
  },

  methods:{
          logout(){
              Auth.logout();
          }
  }
}

</script>

<style>
.about{
  margin-top: 50px;
  align-items: center;
  justify-items: center;
  display: flex;
  width: 100%;
  height: 100%;
  align-content: center;
  justify-content: center;
}
</style>
