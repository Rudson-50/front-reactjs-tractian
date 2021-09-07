import React from "react";
import api from "../../services/api";
import { Input } from "../Form/Input";
import { Button } from "../Form/Button";
import { Link } from "react-router-dom";
export class EditCompany extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.initialState;
  }

  initialState = {
    id: "",
    name: "",
    errors: {},
  };

  componentDidMount() {
    const companyId = +this.props.match.params.id;
    if (companyId) {
      this.findCompanyById(companyId);
    }
  }

  findCompanyById = (companyId) => {
    api
      .get("/companies/" + companyId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            id: response.data.id,
            name: response.data.name,
          });
        }
      })
      .catch((error) => {
        console.error("error" + error);
      });
  };

  companyChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
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

  companyUpdate = (event) => {
    event.preventDefault();
    const isValid = this.formValidation();
    if (isValid) {
      const company = {
        id: this.state.id,
        name: this.state.name,
      };
      const companyId = +this.props.match.params.id;

      api.put(`/companies/${companyId}`, company).then((res) => {
        console.log(res);
        console.log(res.data);
        setTimeout(() => this.companyList(), 1000);
      });
    }
  };
  companyList = () => {
    return this.props.history.push("/companies");
  };

  render() {
    const { name, errors } = this.state;
    return (
      <div className="animeLeft">
        <div className="container card">
          <div className="title"> Atualizar Unidade </div>

          <div className="editInput">
            <form onSubmit={this.companyUpdate}>
              <Input
                size="16"
                label="Nome"
                type="text"
                name="name"
                value={name}
                onChange={this.companyChange}
              />
              <div className="Buttons">
                <Link className="editLink" to="/companies">
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
