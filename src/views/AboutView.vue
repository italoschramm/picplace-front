<template>
  <div class="about">
    <Card style="width: 50rem; margin-bottom: 2em">
            <template #title>
              Chegamos para mudar o mercado imobiliário 
            </template>
            <template #content>
                <p>
                  Chegamos para mudar o mercado imobiliário 

                  Nossa missão é facilitar a vida de milhares de proprietários e corretores ao divulgar seus imóveis de forma gratuita. Levamos até você cliente, anúncios de qualidade, eficiente e que possam ajudar na decisão importante em sua vida, que é a aquisição de um novo imóvel. Estimamos que este seja um processo agradável, ágil e seguro.</p>
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
  justify-content: center;
  margin-top: 50px;
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
