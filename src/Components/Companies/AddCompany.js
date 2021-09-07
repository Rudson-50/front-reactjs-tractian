import React from "react";
import api from "../../services/api";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import { Link } from "react-router-dom";
export class AddCompany extends React.Component {
  state = {
    name: "",
    errors: {},
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  formValidation = () => {
    const { name } = this.state;
    let isValid = true;
    const errors = {};
    if (name.trim().length < 6) {
      errors.nameLength = "O campo nome deve ter no mínimo 6 caracteres";
      isValid = false;
    }
    this.setState({ errors });
    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.formValidation();
    if(isValid) {
    const company = {
      name: this.state.name,
    };

    api.post(`/companies/`, { company }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }
  };

  render() {
    const {  errors  } = this.state;
    return (
      <div className="animeLeft container card">
        <div className="title"> Adicionar Compania </div>

        <div className="editInput">
          <form onSubmit={this.handleSubmit}>
            <Input
              label="Nome"
              type="text"
              name="name"
              size="30"
              onChange={this.handleChange}
            />
             <div className="Buttons">
              <Link className="editLink" to="/companies">
                {" "}
                Voltar
              </Link>
              <Button type="submit">Adicionar</Button>
            </div>
            {Object.keys(errors).map((key) =>{
                return <div style={{color:"yellow",margin:"0 0 0 10px"}} key={key}>{errors[key]}</div>
              })}
          </form>
        </div>
      </div>
    );
  }
}
