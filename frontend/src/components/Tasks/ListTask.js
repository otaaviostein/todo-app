import React, { Component } from "react";
import Task from "../../services/Tasks/Task";
import { Link, Redirect } from "react-router-dom";
import Auth from "../../services/Auth/Auth";

export default class ListTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);

    this.state = {
      tasks: [],
      currentTask: null,
      currentIndex: -1,
      currentUser: Auth.getCurrentUser()
    };
  }

  componentDidMount() {
    this.retrieveTasks();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTasks() {
    Task.getAll()
      .then(response => {
        this.setState({
          tasks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTasks();
    this.setState({
      currentTask: null,
      currentIndex: -1
    });
  }

  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: index
    });
  }


  render() {

    
    const { tasks, currentTask, currentIndex, currentUser } = this.state;
    if(!currentUser) {
      return <Redirect to='/login'  />
    } else {
      return (
        <div className="list row">
          <div className="col-md-6">
            <h4 className="mb-5">Minhas Tarefas</h4>
  
            <ul className="list-group">
              {tasks &&
                tasks.map((task, index) => (
                  
                  <li
                    className={
                      "list-group-item pointer " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveTask(task, index)}
                    key={index}
                  >
                    {task.taskName}
                    {task.taskStatus === "1" ? (
                      <span className="badge badge-success p-2 float-right">resolvido</span>
                    ) : (
                      <span className="badge badge-info p-2 float-right">em aberto</span>
                    )}
                  </li>
                ))}
            </ul>
  
          </div>
          <div className="col-md-6">
            {currentTask ? (
              <div className="ml-5">
                <h4>Tarefa #{currentTask.taskId}</h4>
                <div>
                  <label>
                    <strong>Tarefa:</strong>
                  </label>{" "}
                  {currentTask.taskName}
                </div>
                <div>
                  <label>
                    <strong>Data de criação:</strong>
                  </label>{" "}
                  {currentTask.taskCreatedDate.split("-").reverse().join("/")}
                </div>
                <div>
                  <label>
                    <strong>Resolver até:</strong>
                  </label>{" "}
                  {currentTask.taskDueDate.split("-").reverse().join("/")}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentTask.taskStatus === "0" ? "Em aberto" : "Resolvida"}
                </div>
  
                <Link
                  to={"/tasks/" + currentTask.taskId}
                  className="btn btn-warning mt-4"
                >
                  Editar
                </Link>
              </div>
            ) : (
              <div>
                <div className="alert alert-info p-10 mt-4" role="alert">
                  Selecione uma tarefa ao lado para visualizar os detalhes
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}