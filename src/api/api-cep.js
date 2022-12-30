import axios from 'axios'

const AXIOS = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
    timeout: 50000
  });

  export default {
    findByCep(cep) {
        return AXIOS.get(cep + '/json/');
    }
  }
