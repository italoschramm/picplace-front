import axios from 'axios'

const AXIOS = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/',
    timeout: 50000
  });

  export default {
    getStates() {
        return AXIOS.get('localidades/estados/');
    },
    getCities(uf){
        return AXIOS.get('localidades/estados/' + uf + '/municipios');
    }
  }