import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Auth from "./services/Auth/Auth";

import AddTask from "./components/Tasks/AddTask";
import Task from "./components/Tasks/Task";
import ListTask from "./components/Tasks/ListTask";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined
    };
  }
  componentDidMount() {
    const user = Auth.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    Auth.logout();
  }
  render() {
    const { currentUser } = this.state;
    console.log(currentUser);
    return (
      	<Router>
        	<div>
          		<nav className="navbar navbar-expand navbar-dark bg-dark">
            	<a href="/tasks" className="navbar-brand">
              Minhas Tarefas
            </a>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                <Link to={"/tasks"} className="nav-link">
                  Tarefas
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Nova tarefa
                </Link>
              </li>
                <li className="nav-item">
                  <Link to={"/users/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Sair
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Entrar
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Cadastrar-se
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/login"]} component={Login} />
              <Route exact path="/add" component={AddTask} />
              <Route exact path="/tasks/:id" component={Task} />
              <Route exact path="/tasks" component={ListTask} />
              <Route exact path="/users/profile" component={Profile} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;