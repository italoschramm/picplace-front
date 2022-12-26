import router from '../router/index';
import url from './back-api';

export default {

  user: {
    authenticated: false,
    authorizations : []
  },

   login : function(creds) {
      var message = "";
      url.login(creds).then(response => {
      localStorage.setItem('id_token', response.data.token);
      localStorage.setItem('authorizations', response.data.user.authorizations);
      this.user.authenticated = true  
      this.user.authorizations = response.data.user.authorizations;
      return message;
    }).catch ((error)=> {
      message = error.message
      console.log(message);
      return message;
    });
  },

  saveLogin(login){
    localStorage.setItem('id_token', login.id_token);
    localStorage.setItem('authorizations', login.authorizations);
    this.user.authenticated = true  
    this.user.authorizations = login.authorizations;
  },

  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('authorizations')
    this.user.authenticated = false
    router.push('/Login')
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
      this.user.authorizations = localStorage.getItem('authorizations')
      console.log("True")
    }
    else {
      console.log("Not")
      this.user.authenticated = false      
    }
  },


  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
