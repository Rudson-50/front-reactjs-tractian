import React, { Component } from "react";
import api from "../../services/api";
import { FaPencilAlt } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export class Companies extends Component {
  state = {
    companies: [],

  };
  
  async componentDidMount() {
    const response = await api.get("/companies");
    this.setState({ companies: response.data });
  };

  deleteCompanies = (companyid) => {
    api.delete("/companies/" + companyid)
    .then(response => {
      if(response.data != null) {
        alert('usuário excluído com sucesso.');
        this.setState({
          companies: this.state.companies.filter(company => company.id !== companyid)
        })
      }
    })

  };
  
  render() {
    const { companies } = this.state;
    return (
      <div className="animeLeft card container">
        <div className="title"> Lista de Companias </div>
        <div className="styleLink">
        <Link className="addLink" to="/addcompany"> Adicionar Compania</Link>
        </div>
        <div className="responsiveTable">
        <table className="table">
          <tbody>
            <tr>
              <th>Código </th>
              <th>Nome</th>
              <th>Opções</th>
            </tr>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>
                <span >
                    <Link to={"/editcompany/" +company.id} className="iconPen">
                      <FaPencilAlt />
                    </Link>
                  </span>
                  <span onClick={this.deleteCompanies.bind(this, company.id)} className="iconTrash">
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
