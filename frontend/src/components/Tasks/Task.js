import React, { Component } from "react";
import Task from "../../services/Tasks/Task";
import Auth from "../../services/Auth/Auth";
import { Link, Redirect } from "react-router-dom";

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeCreatedDate = this.onChangeCreatedDate.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.getTask = this.getTask.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      currentTask: {
        taskId: null,
        taskName: "",
        taskDueDate: "", 
        taskCreatedDate: "", 
        taskStatus: 0
      },
      message: "",
      currentUser: Auth.getCurrentUser()
    };
  }

  componentDidMount() {
    this.getTask(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          taskName: title
        }
      };
    });
  }

  onChangeCreatedDate(e) {
    const createdDate = e.target.value.split("/").reverse().join("-");
    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          taskCreatedDate: createdDate
        }
      };
    });
  }

  onChangeDueDate(e) {
    const dueDate = e.target.value.split("/").reverse().join("-");

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          taskDueDate: dueDate
        }
      };
    });
  }


  getTask(id) {
    Task.get(id)
      .then(response => {
        this.setState({
          currentTask: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      taskStatus: status
    };

    Task.updateStatus(this.state.currentTask.taskId, data)
      .then(response => {
        this.setState(prevState => ({
          currentTask: {
            ...prevState.currentTask,
            taskStatus: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTask() {
    Task.update(
      this.state.currentTask.taskId,
      this.state.currentTask
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Tarefa atualizada com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {    
    Task.delete(this.state.currentTask.taskId)
      .then(response => {
        this.props.history.push('/tasks');
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTask, currentUser } = this.state;
    
    if(!currentUser) {
      return <Redirect to='/login' />
    } else {
      return (
        <div>
          {currentTask ? (
            <div className="edit-form">
              <h4>Editar tarefa # {currentTask.taskId}</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="title">Tarefa</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={currentTask.taskName}
                    onChange={this.onChangeTitle}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="createdDate">Data de Criação</label>
                  <input
                    type="text"
                    className="form-control"
                    id="createdDate"
                    value={currentTask.taskCreatedDate.split("-").reverse().join("/")}
                    onChange={this.onChangeCreatedDate}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dueDate">Data de Criação</label>
                  <input
                    type="text"
                    className="form-control"
                    id="dueDate"
                    value={currentTask.taskDueDate.split("-").reverse().join("/")}
                    onChange={this.onChangeDueDate}
                  />
                </div>
  
                <div className="form-group">
                  <label>
                    <strong>Status:</strong>
                  </label>
                  {currentTask.taskStatus === "0" ? "Em aberto" : "Resolvida"}
                </div>
              </form>
  
              {currentTask.taskStatus === "0" ? (
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => this.updateStatus("1")}
                >
                  Marcar como resolvida
                </button>
              ) : (
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => this.updateStatus("0")}
                >
                  Reabrir
                </button>
              )}
  
              <button
                className="btn btn-danger mr-2"
                onClick={this.deleteTask}
              >
                Apagar
              </button>
  
              <button
                type="submit"
                className="btn btn-success"
                onClick={this.updateTask}
              >
                Atualizar
              </button>
              <Link
                to={"/tasks/"}
                className="btn btn-info mt-1"
              >
              Voltar
              </Link>
              {this.state.message ? (
                <div className="alert alert-success p-10 mt-5" role="alert">
                  {this.state.message}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div>
              <br />
              <div className="alert alert-danger p-10" role="alert">
                Você deve selecionar uma tarefa válida para editar
              </div>
              <br />
              <Link
                  to={"/tasks/"}
                  className="btn btn-info float-right"
                >
                  Voltar
              </Link>
            </div>
          )}
        </div>
      );
    }

    
  }
}