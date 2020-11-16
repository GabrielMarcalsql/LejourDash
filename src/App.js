import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis';
import lejour from './lejour.svg';
import './App.css';

class App extends Component {
render(){

  return (
<div>
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
    <div id="teste1" className="row">
      
      
    </div>
  </div>



  <footer className="footer"></footer>
  
</div>
);
  }
}


export default App;