import React from "react";
import api from "../../services/api";
import { Input } from "../Form/Input";
import { Button } from "../Form/Button";
import styles from "./Assets.module.css";
import { Link } from "react-router-dom";
export class EditAsset extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    id: "",
    name: "",
    model: "",
    sensors: "",
    status: "",
    image: "",
    totalHour: "",
    maxTemp: "",
    rpm: "",
    power: "",
    lastCol: "",
    totalCol: "",
    unitId: "",
    companyId: "",
    errors: {},
  };

  componentDidMount() {
    const assetId = +this.props.match.params.id;
    if (assetId) {
      this.findAssetById(assetId);
    }
  }

  findAssetById = (assetId) => {
    api
      .get("/assets/" + assetId)
      .then((response) => {
        console.log(response);
        if (response.data != null) {
          this.setState({
            id: response.data.id,
            name: response.data.name,
            model: response.data.model,
            sensors: response.data.sensors,
            image: response.data.image,
            status: response.data.status,
            maxTemp: response.data.specifications.maxTemp,
            rpm: response.data.specifications.rpm,
            power: response.data.specifications.power,
            lastCol: response.data.metrics.lastUptimeAt,
            totalCol: response.data.metrics.totalCollectsUptime,
            totalHour: response.data.metrics.totalUptime,
            unitId: response.data.unitId,
            companyId: response.data.companyId,
          });
        }
      })
      .catch((error) => {
        console.error("error" + error);
      });
  };

  assetChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  formValidation = () => {
    const { status } = this.state;
    let isValid = true;
    const errors = {};
    if (status.trim().length < 6) {
      errors.statusLength = "O campo nome deve ter no mínimo 6 caracteres";
      isValid = false;
    }
    this.setState({ errors });
    return isValid;
  };

  assetUpdate = (event) => {
    event.preventDefault();
    const isValid = this.formValidation();
    if (isValid) {
      const asset = {
        id: this.state.id,
        status: this.state.status,
      };
      const assetId = +this.props.match.params.id;

      api.put(`/assets/${assetId}`, asset).then((res) => {
        console.log(res);
        console.log(res.data);
        setTimeout(() => this.assetList(), 1000);
      });
    }
  };
  assetList = () => {
    return this.props.history.push("/assets");
  };

  render() {
    const {
      name,
      model,
      sensors,
      status,
      image,
      totalHour,
      maxTemp,
      rpm,
      power,
      lastCol,
      totalCol,
      unitId,
      companyId,
      errors,
    } = this.state;
    return (
      <div className="animeLeft">
        <div className="container card">
          <div className="title"> Atualizar Ativo </div>

          <form onSubmit={this.assetUpdate}>
            <div className="editInput">
              <img className={styles.editImg} src={image} alt={name} />
            </div>
            <Input
              size="8"
              label="Status"
              type="text"
              name="status"
              value={status}
              onChange={this.assetChange}
            />
            <div className={styles.putAsset}>
              <div>Nome: {name}</div>
              <div>Modelo: {model}</div>
              <div>sensors: {sensors}</div>
              <div>Unidade: {unitId}</div>
              <div>Compania: {companyId}</div>
              <div>Temperatura Máxima: {maxTemp} ºC</div>
              <div>RPM: {rpm}</div>
              <div>Potência em kWh: {power}</div>
              <div>Data da Ultima Coleta(Ligada): {lastCol}</div>
              <div>Total de Coletas(Ligada): {totalCol}</div>
              <div>Total de Horas de Coletas(Ligada): {totalHour}</div>
            </div>
            <div className="Buttons">
              <Link className="editLink" to="/assets">
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
    );
  }
}
