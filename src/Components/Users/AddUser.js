import React from "react";
import api from "../../services/api";
import { Input } from "../Form/Input";
import { Button } from "../Form/Button";
import { Link } from "react-router-dom";
export class AddUser extends React.Component {
  state = {
    name: "",
    email: "",
    errors: {},
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
    this.setState({ email: event.target.value });
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

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.formValidation();
    if(isValid) {
    const user = {
      name: this.state.name,
      email: this.state.email,
    };

    api.post(`/users/`, { user }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="animeLeft">
        <div className="container card">
          <div className="title"> Adicionar Usuário </div>

          <div className="editInput">
            <form onSubmit={this.handleSubmit}>
              <Input
                label="Nome"
                type="text"
                name="name"
                size="16"
                onChange={this.handleChange}
              />
              <Input
                label="Email"
                type="text"
                name="email"
                size="30"
                onChange={this.handleChange}
              />
              <div className="Buttons">
           <Link className="editLink" to="/users"> Voltar</Link>
            <Button type="submit">Adicionar</Button>   
            
            </div>
              {Object.keys(errors).map((key) =>{
                return <div style={{color:"yellow",margin:"0 0 0 10px"}} key={key}>{errors[key]}</div>
              })}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
