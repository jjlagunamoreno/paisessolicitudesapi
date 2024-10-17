import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import './styles.css';  // Importamos el archivo CSS

export default class SeleccionarContinente extends Component {

    selectContinente = React.createRef();

    state = {
        paises: [],          // Todos los países
        continentes: [],     // Continentes únicos
        paisesFiltrados: []  // Países filtrados por continente seleccionado
    }

    // Cargar los países y extraer continentes únicos
    loadPaises = () => {
        axios.get(Global.urlPaises).then(response => {
            const paises = response.data;

            // Extraer los continentes sin repetir usando un Set
            const continentesUnicos = [...new Set(paises.map(pais => pais.continents[0]))];

            this.setState({
                paises: paises,
                continentes: continentesUnicos,
                paisesFiltrados: paises // Inicialmente, mostrar todos los países
            });
        });
    }

    // Filtrar los países por el continente seleccionado
    paisesFiltradosContinentes = (e) => {
        const continenteSeleccionado = e.target.value;
        console.log("Continente seleccionado: " + continenteSeleccionado);

        // Filtrar los países por el continente seleccionado
        const paisesFiltrados = this.state.paises.filter(pais => pais.continents.includes(continenteSeleccionado));

        // Actualizar el estado con los países filtrados
        this.setState({
            paisesFiltrados: paisesFiltrados
        });
    }

    componentDidMount = () => {
        this.loadPaises();
    }

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <h1>Seleccionar Continente</h1>
                <hr />

                <label>Selecciona continente: </label>
                <select ref={this.selectContinente} onChange={this.paisesFiltradosContinentes}>
                    {
                        this.state.continentes.map((continente, index) => {
                            return (<option key={index} value={continente}>{continente}</option>)
                        })
                    }
                </select>

                <ul>
                    {
                        this.state.paisesFiltrados.map((pais, index) => {
                            return (
                                <li key={index} value={pais.name.common}>
                                    <img src={pais.flags.png} style={{ width: "100px", height: "50px" }} alt={pais.name.common} />
                                    <b>{pais.name.common}</b>
                                </li>
                            )
                        })
                    }
                </ul>

            </div>
        )
    }
}
