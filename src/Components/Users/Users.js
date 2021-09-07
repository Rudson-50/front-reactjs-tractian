import React, { Component } from "react";
import api from "../../services/api";
import { FaPencilAlt } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      
    };
  }

  async componentDidMount() {
    const response = await api.get("/users");
    this.setState({ users: response.data });
  }

  deleteUsers = (userId) => {
    api.delete("/users/" + userId).then((response) => {
      if (response.data != null) {
        alert("usuário excluído com sucesso.");
        this.setState({
          users: this.state.users.filter((user) => user.id !== userId),
        });
      }
    });
  };

  render() {
    const { users } = this.state;
    return (
      <div className="animeLeft card container">
        <div className="title"> Lista de Usuários </div>
        <div className="styleLink">
          <Link className="addLink" to="/adduser">
            Adicionar Usuário
          </Link>
        </div>
        <div className="responsiveTable">
        <table className="table">
          <tbody>
            <tr>
              <th>Código </th>
              <th>Nome</th>
              <th>Email</th>
              <th>Compania</th>
              <th>Opções</th>
            </tr>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{user.id} </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.companyId}</td>
                <td>
                  <span>
                    <Link to={"/edituser/" + user.id} className="iconPen">
                      <FaPencilAlt />
                    </Link>
                  </span>
                  <span
                    onClick={this.deleteUsers.bind(this, user.id)}
                    className="iconTrash"
                  >
                    <BsFillTrashFill />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}
