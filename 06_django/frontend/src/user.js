import { apiLogoutUser } from './apiRequests';

class User {
  constructor (serverAddress) {
    this.serverAddress = serverAddress;
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
  
  logout () {
    localStorage.removeItem('kodjalinkUsername');
    localStorage.removeItem('kodjalinkUserToken');
    this.loadUser();
    
    return apiLogoutUser(this.serverAddress);
  }
}

export default User;