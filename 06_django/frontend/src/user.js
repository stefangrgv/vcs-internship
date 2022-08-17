import { apiUserLogout } from "./apiRequests";

export class User {
    constructor () {
      this.loadUser();
    }

    setUserCredentials (username, token) {
        localStorage.setItem('kodjalinkUsername', username);
        localStorage.setItem('kodjalinkUserToken', token);
        this.loadUser();
    }
  
    loadUser () {
      this.username = localStorage.getItem('kodjalinkUsername');
      this.token = localStorage.getItem('kodjalinkUserToken');
    }
  
    async logout () {
      localStorage.removeItem('kodjalinkUsername');
      localStorage.removeItem('kodjalinkUserToken');
      this.loadUser();
      
      return await apiUserLogout();
    }
  }
