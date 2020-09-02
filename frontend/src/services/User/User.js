import axios from 'axios';
import http from "../../http-common";

const API_URL = 'http://localhost:8080/';

class User {
  updateUserProfile(id) {
    return axios.put(API_URL + 'users/edit/' +id);
  }

  getUserData(id) {
    return http.get(`/users/profile/${id}`);
  }
}

export default new User();