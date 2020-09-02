import React, { Component } from "react";
import Task from "../../services/Tasks/Task";
import { Link, Redirect } from "react-router-dom";
import Auth from "../../services/Auth/Auth";

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.onChangeCreatedDate = this.onChangeCreatedDate.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);

    this.state = {
      taskId: null,
      taskName: "",
      taskDueDate: "", 
      taskCreatedDate: "", 
      taskStatus: false,

      currentUser: Auth.getCurrentUser(),
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      taskName: e.target.value
    });
  }

  onChangeDueDate(e) {
    this.setState({
      taskDueDate: e.target.value.split("/").reverse().join("-")
    });
  }

  onChangeCreatedDate(e) {
    this.setState({
      taskCreatedDate: e.target.value.split("/").reverse().join("-")
    });
  }

  onChangeStatus(e) {
    this.setState({
      taskStatus: "0"
    });
  }

  saveTask() {
    var data = {
      taskName: this.state.taskName,
      taskUserId: 1,
      taskDueDate: this.state.taskDueDate,
      taskCreatedDate: this.state.taskDueDate,
      taskStatus: this.state.taskStatus
    };

    Task.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTask() {
    this.setState({
      taskId: null,
      taskUserId: 1,
      taskName: "",
      taskDueDate: "",
      taskCreatedDate: "",
      taskStatus: 0,

      submitted: false
    });
  }

  render() {

    const { currentUser } = this.state;
    
    if(!currentUser) {
      return <Redirect to='/login'  />
    } else {
      return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <div className="alert alert-success p-10 mt-4" role="alert">
                  Tarefa Criada com sucesso
                </div>
              <button className="btn btn-success" onClick={this.newTask}>
                Cadastrar
              </button>
              <Link
                  to={"/tasks"}
                  className="btn btn-info ml-2"
                >
                Voltar
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Tarefa</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={this.state.taskName}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="createdDate">Criada em</label>
                <input
                  type="text"
                  className="form-control"
                  id="createdDate"
                  placeholder="00/00/0000"
                  value={this.state.createdDate}
                  onChange={this.onChangeCreatedDate}
                  name="createdDate"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="dueDate">Prazo</label>
                <input
                  type="text"
                  className="form-control"
                  id="dueDate"
                  placeholder="00/00/0000"
                  value={this.state.dueDate}
                  onChange={this.onChangeDueDate}
                  name="dueDate"
                />
              </div>
              <button onClick={this.saveTask} className="btn btn-success float-right">
                Criar
              </button>
            </div>
          )}
        </div>
      );
    }
    
  }
}