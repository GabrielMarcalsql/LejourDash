/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import lejour from './lejour.svg';
import './App.css';
import api from './api.js';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart'
import ChartVendors from './ChartVendors';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Users: [],
      Weddings: [],
      Invoices: [],
      Appointments: [],
      BudgetAverage: 0
    };
  }
  componentDidMount() {
    Promise.all([
      api.get("/user"),
      api.get("/wedding"),
      api.get("/invoice"),
      api.get("/appointment")
    ])
    .then((response) => {
      this.setState({
        Users: response[0].data,
        Weddings: response[1].data,
        Invoices: response[2].data,
        Appointments: response[3].data,
        BudgetAverage: this.calcBudgetAverage(response[1].data)
      });
    })
    .catch((err) => console.error("Exception " + err));
  }

  calcBudgetAverage(weddings)
  {
    var sum = 0;
    for(var i = 0; i < weddings.length; i++)
    {
      var value = Number(weddings[i].BUDGET);
      if(!isNaN(value))
        sum+= value;
    }
    return (sum/weddings.length);
  };

  render(){
    console.log(this.state);

    return (
  <div className="corpo">
    <div className="shadow-sm container-fluid">
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="#">
          <img src={lejour} loading="lazy" alt='logo' />
        </a>
        <ul className="navbar-nav mr-right">
          <li><button type="button" className="btn btn-light rounded-pill btn-sm"><i className="far fa-question-circle"></i>
              Ajuda</button></li>
          <li><button type="button" className="btn btn-light rounded-pill btn-sm">Menu</button></li>
        </ul>
      </nav>
    </div>

    <div className="container p-5">
      <h3 className="text-center textoTitulo">Booked View</h3>
    <div className="row">
      <div className="col-md-8">
        <div className="row teste1">
          <BarChart Weddings={this.state.Weddings} />
        </div>
        <hr/>
        <div className="row teste1">
            <LineChart Invoices={this.state.Invoices} />
        </div>
        <hr/>
      <ul className="list-group list-group-horizontal justify-content-center">

        <li className="list-group-item">Usuários
        <p className="text-center"><span>{this.state.Users.length.toLocaleString('pt-BR')}</span></p>
        </li>
        <li className="list-group-item">Casamentos Planejados
        <p className="text-center"><span>{this.state.Weddings.length.toLocaleString('pt-BR')}</span></p></li>
        <li className="list-group-item">Média Budget
        <p className="text-center"><span>{Math.round(this.state.BudgetAverage).toLocaleString('pt-BR')}</span></p></li>

      </ul>
      </div>
      <div className="col-md-4">
      <h3 className="text-center textoTitulo">Booked</h3>
      <div className="row teste1">
        <PieChart Weddings={this.state.Weddings} />
      </div>
      <h3 className="text-center textoTitulo">Fornecedor</h3>
        <div className="teste2">
        <ChartVendors Invoices={this.state.Invoices} />
        </div>
      </div>
    </div>
  </div>
   <footer className="footer"></footer>
    
  </div>
  );
  }
}


export default App;
