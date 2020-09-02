import axios from "axios";

const API_URL = "http://localhost:8080/";

class Auth {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        "email": email,
        "password": password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "register", {
      "userName": username,
      "userEmail": email,
      "userPassword": password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new Auth();