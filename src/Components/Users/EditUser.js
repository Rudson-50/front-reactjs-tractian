import React from "react";
import api from "../../services/api";
import { Input } from "../Form/Input";
import { Button } from "../Form/Button";
import { Link } from "react-router-dom";
export class EditUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.initialState;
  }

  initialState = {
    id: "",
    name: "",
    email: "",
    errors: {},
  };

  componentDidMount() {
    const userId = +this.props.match.params.id;
    if (userId) {
      this.findUserById(userId);
    }
  }

  findUserById = (userId) => {
    api
      .get("/users/" + userId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
          });
        }
      })
      .catch((error) => {
        console.error("error" + error);
      });
  };

  userChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  formValidation = () => {
    const { name, email } = this.state;
    let isValid = true;
    const errors = {};
    if (name.trim().length < 6) {
      errors.nameLength = "O campo nome deve ter no mínimo 6 caracteres";
      isValid = false;
    }
    if (email.trim().length < 6) {
      errors.emailLength = "O campo email deve ter no mínimo 6 caracteres";
      isValid = false;
    }
    this.setState({ errors });
    return isValid;
  };

  userUpdate = (event) => {
    event.preventDefault();
    const isValid = this.formValidation();
    if (isValid) {
      const user = {
        id: this.state.id,
        name: this.state.name,
        email: this.state.email,
      };
      const userId = +this.props.match.params.id;

      api.put(`/users/${userId}`, user).then((res) => {
        console.log(res);
        console.log(res.data);
        setTimeout(() => this.userList(), 1000);
      });
    }
  };
  userList = () => {
    return this.props.history.push("/users");
  };

  render() {
    const { name, email, errors } = this.state;
    return (
      <div className="animeLeft">
        <div className="container card">
          <div className="title"> Atualizar Usuário </div>

          <div className="editInput">
            <form onSubmit={this.userUpdate}>
              <Input
                label="Nome"
                type="text"
                name="name"
                value={name}
                size="16"
                onChange={this.userChange}
              />
              <Input
                label="Email"
                type="text"
                name="email"
                value={email}
                size="30"
                onChange={this.userChange}
              />
              <div className="Buttons">
                <Link className="editLink" to="/units">
                  {" "}
                  Voltar
                </Link>
                <Button type="submit">Atualizar</Button>
              </div>
              {Object.keys(errors).map((key) => {
                return (
                  <div
                    style={{ color: "yellow", margin: "0 0 0 10px" }}
                    key={key}
                  >
                    {errors[key]}
                  </div>
                );
              })}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
