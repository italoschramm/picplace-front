import axios from 'axios'

let baseURL;

if (process.env.NODE_ENV === 'production') {
    baseURL = 'https://34.235.73.241:8090';
  } else {
    // desenvolvimento
    baseURL = 'http://localhost:8090';
  }

const AXIOS = axios.create({
    baseURL: baseURL,
    timeout: 50000
  });

  var headersPost = {
    headers : {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
    }
    }

    var headersPostWithoutToken = {
        headers : {
            'Content-Type': 'application/json'
        }
}

var headersGet = {
    headers : {
        'Authorization': localStorage.getItem('id_token')
    
    }
}

export default {
    getHeaders(){
       return {headers : 
        {'Authorization': localStorage.getItem('id_token')} 
       }
    },
    getHeadersPost(){
        return {headers :
            {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')}
        }
    },
    getHeadersPostWithouToken(){
        return {headers :
            {'Content-Type': 'application/json'}
        }
    },
    login(login) {
        return AXIOS.post('/login', login);
    },
    saveUser(user) {
        return AXIOS.post('/user/save', user);
    },
    getUser(userId) {
        return AXIOS.get(`/user/getById/` + userId, this.getHeaders());
    },
    getAllProperties(){
        return AXIOS.get('/property/getAllActives');
    },
    getPropertyTypesActives(){
        return AXIOS.get('/propertyType/getAllActives', this.getHeaders());
    },
    getActivesByProductTypeId(idPropertyType){
        return AXIOS.get('/propertyTypeCategory/getActivesByProductTypeId/' + idPropertyType, this.getHeaders());
    },
    getTransactionActives(){
        return AXIOS.get('/transactionType/getAllActives', this.getHeaders());
    },
    saveProperty(property){
        return AXIOS.post('/property/save', property, this.getHeadersPost());
    },
    getPropertyById(idProperty){
        return AXIOS.get('/property/getById/' + idProperty, this.getHeaders());
    },
    getPropertiesByFilters(filter){
        return AXIOS.post('/property/getByFilters', filter, this.getHeaders());
    },
    deleteproperty(idProperty){
        return AXIOS.delete('/property/deleteById/' + idProperty, this.getHeaders());
    },
    getPropertyByIdCustomer(idCustomer){
        return AXIOS.get('/property/getByIdCustomer/' + idCustomer, this.getHeaders());
    },
    saveContact(contact){
        return AXIOS.post('/contact/save', contact, this.getHeadersPostWithouToken());
    },
    saveCustomer(customer){
        return AXIOS.post('/customer/save', customer, this.getHeadersPostWithouToken());
    },
    getSecured(user, password) {
        return AXIOS.get(`/secured/`,{
            auth: {
                username: user,
                password: password
            }});
    }
}