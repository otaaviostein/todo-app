import http from "../../http-common";

class Task {
  getAll() {
    return http.get("/tasks/");
  }

  get(id) {
    return http.get(`/tasks/get/${id}`);
  }

  create(data) {
    return http.post("/tasks/create", data);
  }

  update(id, data) {
    return http.put(`/tasks/edit/${id}`, data);
  }

  updateStatus(id, data) {
    return http.put(`/tasks/edit/status/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tasks/delete/${id}`);
  }
}

export default new Task();