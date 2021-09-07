import { Component } from "react";
import api from "../../services/api";
import styles from "./Assets.module.css";
import HighchartsReact from "highcharts-react-official";
import highcharts from "highcharts";
import { Link } from "react-router-dom";
export class Assets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const response = await api.get("/assets");

    this.setState({ products: response.data });

  }

  render() {
    const { products } = this.state;
  
    return (
      <div className="animeLeft">
        <div className="container card">
          <div className="title"> Ativos </div>

          <div className={styles.assets}>
            {products.map((product, index) => (
              <div key={product.id}>
                <Link className={styles.editAsset}to={"/editasset/" + product.id}> Atualizar Ativo</Link>
                <div className={styles.assetModel}>
                  
                  <img
                    src={product.image}
                    className={styles.assetsImage}
                    alt={product.name}
                  />
                  <div className={styles.assetModel}>
                    <div>Nome: {product.name}</div>
                    <div>Modelo: {product.model}</div>
                    <div>Modelo do Sensor: {product.sensors} </div>
                    <div >Estado atual: {product.status}</div>
                    <div>Unidade: {product.unitId} </div>
                    <div>Número da compania: {product.companyId}</div>
                  </div>
                </div>
                <div className={styles.assetSub}>
                  <div>
                    Data da Ultima Coleta(Ligada):{" "}
                    {product.metrics.lastUptimeAt}
                  </div>
                  <div>
                    Total de Coletas(Ligada):{" "}
                    {product.metrics.totalCollectsUptime}
                  </div>
                  <div>
                    Total de Horas de Coletas(Ligada):{" "}
                    {product.metrics.totalUptime } Horas
                  </div>
                  
                </div>
                
              
                <div className={styles.highcharts}>
                  
                    <div className={styles.highchart}>
                      <HighchartsReact
                        highcharts={highcharts}
                        options={{
                          chart: {
                            type: "column",
                            backgroundColor: '#8baefa',
                          },
                          yAxis: {
                            title: {
                                text: null
                            }
                        },
                          colors: ["#cc0000"],
                          title: {
                            text: "Saúde",
                          },
                          series: [
                            {
                              name: "Saúde",
                              data: [product.healthscore],
                            },
                          ],
                        }}
                      />
                    </div>
                    <div className={styles.highchart}>
                      <HighchartsReact
                        highcharts={highcharts}
                        options={{
                          chart: {
                            type: "column",
                            backgroundColor: '#8baefa',
                          },
                          yAxis: {
                            title: {
                                text: null
                            }
                        },
                          colors: ["#FF3333"],
                          
                          
                          title: {
                            text: "Temperatura Máxima",
                          },
                          series: [
                            {
                              name: "Temperatura Máxima",
                              data: [product.specifications.maxTemp],
                            },
                          ],
                        }}
                      />
                    </div>
                    <div className={styles.highchart}>
                      <HighchartsReact
                        highcharts={highcharts}
                        options={{
                          chart: {
                            type: "column",
                            backgroundColor: '#8baefa',
                          },
                          yAxis: {
                            title: {
                                text: null
                            }
                        },
                          colors: ["#536896"],
                          title: {
                            text: "RPM",
                          },
                          series: [
                            {
                              name: "RPM",
                              data: [product.specifications.rpm],
                            },
                          ],
                        }}
                      />
                    </div>
                
                    <div className={styles.highchart}>
                      <HighchartsReact
                        highcharts={highcharts}
                        
                        options={{
                          chart: {
                            type: "column",
                            backgroundColor: '#8baefa',
                          },
                          yAxis: {
                            title: {
                                text: null
                            }
                        },
                          colors: ["#cc0000"],
                          title: {
                            text: "Potência em kWh",
                          },
                          series: [
                            {
                              name: "Potência em kWh",
                              data: [product.specifications.power],
                            },
                          ],
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.assetStatus}>
                  <div>Saúde: {product.healthscore}%</div>
                  <div>Potência em kWh: {product.specifications.power= null?? '0'}</div>
                  <div>RPM: {product.specifications.rpm= null?? '0'}</div>
                  <div>
                    Temperatura Máxima: {product.specifications.maxTemp} ºC
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
