import React from "react";
import api from "../../services/api";
import { Input } from "../Form/Input";
import { Button } from "../Form/Button";
import { Link } from "react-router-dom";
export class EditUnit extends React.Component {
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
    const unitId = +this.props.match.params.id;
    console.log(unitId);
    if (unitId) {
      this.findUnitById(unitId);
    }
  }

  findUnitById = (unitId) => {
    api
      .get("/units/" + unitId)
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

  unitChange = (event) => {
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

  unitUpdate = (event) => {
    event.preventDefault();
    const isValid = this.formValidation();
    if(isValid) {
    const unit = {
      id: this.state.id,
      name: this.state.name,
    };
    const unitId = +this.props.match.params.id;

    api.put(`/units/${unitId}`, unit).then((res) => {
      console.log(res);
      console.log(res.data);
      setTimeout(() => this.unitList(), 1000);
    });
  }
  };
  unitList = () => {
    return this.props.history.push("/units");
  };

  render() {
    const { name,  errors } = this.state;
    return (
      <div className="animeLeft">
        <div className="container card">
          <div className="title"> Atualizar Unidade </div>

          <div className="editInput">
            <form onSubmit={this.unitUpdate}>
              <Input
                size="16"
                label="Nome"
                type="text"
                name="name"
                value={name}
                onChange={this.unitChange}
              />
              <div className="Buttons">
           <Link className="editLink" to="/units"> Voltar</Link>
            <Button type="submit">Atualizar</Button>   
            
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
