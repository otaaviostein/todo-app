import React, { Component } from "react";
import Auth from "../../services/Auth/Auth";
import { Link, Redirect } from "react-router-dom";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: Auth.getCurrentUser()
    };
  }
  render() {

    const { currentUser } = this.state;

    if(!currentUser) {
      return <Redirect to='/login' />
    } else {
      return (
        <div className="container">
          <header className="jumbotron">
            <h3>
              Perfil de <strong>{currentUser.username}</strong>
            </h3>
          </header>
          <p>
            <strong>Token:</strong>{" "}
            {currentUser.token.substring(0, 20)} ...{" "}
            {currentUser.token.substr(currentUser.token.length - 20)}
          </p>
          <p>
            <strong>Id:</strong>{" "}
            {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {currentUser.email}
          </p>
          <p>
            <strong>Nome de usuário:</strong>{" "}
            {currentUser.username}
          </p>
          <Link
            to={"/tasks"}
            className="btn btn-info float-right mr-4"
          >
            Minhas tarefas
          </Link>
        </div>
      );
    }
  }
}