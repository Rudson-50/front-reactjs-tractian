import React, { Component } from "react";
import api from "../../services/api";
import { FaPencilAlt } from "react-icons/fa";
import { BsFillTrashFill} from "react-icons/bs";
import { Link } from "react-router-dom";

export class Units extends Component {
  state = {
    units: [],

  };
  async componentDidMount() {
    const response = await api.get("/units");
    console.log(response.data);
    this.setState({ units: response.data });
  }

  deleteUnits = (unitid) => {
    api.delete("/units/" + unitid).then((response) => {
      if (response.data != null) {
        alert("usuário excluído com sucesso.");
        this.setState({
          units: this.state.units.filter((unit) => unit.id !== unitid),
        });
      }
    });
  };
  render() {
    const { units } = this.state;
    return (
      <div className="animeLeft card container">
        <div className="title">Lista de Unidades</div>
        <div className="styleLink">
        <Link className="addLink" to="/addunit"> Adicionar Unidade</Link>
        </div>
        <div className="responsiveTable">
        <table className="table">
          <tbody>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Compania</th>
              <th>Opções</th>
            </tr>
            {units.map((unit) => (
              <tr key={unit.id}>
                <td>{unit.id} </td>
                <td>{unit.name}</td>
                <td>{unit.companyId} </td>
                <td>
                <span >
                    <Link to={"/editunit/" + unit.id} className="iconPen">
                      <FaPencilAlt />
                    </Link>
                  </span>
                  <span
                    onClick={this.deleteUnits.bind(this, unit.id)}
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
