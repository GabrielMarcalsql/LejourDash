/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import lejour from './lejour.svg';
import './App.css';
import api from './api.js';
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Users: [],
      Weddings: [],
      Invoices: [],
      Appointments: [],
      BudgetAverage: 0,
      DateWeddings: []
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
        BudgetAverage: this.calcBudgetAverage(response[1].data),
        DateWeddings: this.consolidateDateWeddings(response[1].data)
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

  consolidateDateWeddings(weddings)
  {
    var months = {
      Nov: 0,
      Dez: 0,
      Jan: 0,
      Fev: 0,
      Mar: 0
    };

    for(var i = 0; i < weddings.length; i++) {
      var wedding = weddings[i];
      if(typeof wedding.WEDDING_DATE !== 'undefined') {
         var yearMonth = wedding.WEDDING_DATE.substring(0, 7);
         switch(yearMonth){
           case '2020-11':
             months.Nov++;
             break;
            case '2020-12':
              months.Dez++;
              break;
            case '2021-01':
              months.Jan++;
              break;
            case '2021-02':
              months.Fev++;
              break
            case '2021-03':
              months.Mar++;
              break
            default:

         }
      }
    }

    var consolidate = [
      {
        month: "Nov",
        weddings: months.Nov
      },
      {
        month: "Dez",
        weddings: months.Dez
      },
      {
        month: "Jan",
        weddings: months.Jan
      },
      {
        month: "Fev",
        weddings: months.Fev
      },
      {
        month: "Mar",
        weddings: months.Mar
      },
    ];
    

    return consolidate;
  }

  

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
        <ResponsiveBar
        data={this.state.DateWeddings}
        keys={[ 'weddings']}
        indexBy="month"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#68BFB7',
                size: 4,
                padding: 1,
                stagger: true
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#EA8079',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              }
        ]}
        fill={[
          {
            match: {
                    id: 'fries'
                  },
                  id: 'dots'
            },
            {
                match: {
                  id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Próximos casamentos',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
        </div>
        <div className="row teste1">
          <div className="col-md-4 text-center">
            grafico 2
          </div>
          <div className="col-md-4 text-center">
            grafico 3
          </div>
        </div>
      </div>
      <div className="col-md-4">
      <h3 className="text-center textoTitulo">Booked</h3>
      <div className="row teste1">
      <ResponsivePie
          data={[
            {
              "id": "Part",
              "label": "Part wedding",
              "value": (this.state.Users.length/3),
              "color": "hsl(132, 70%, 50%)"
            },
            {
              "id": "Full",
              "label": "Full wedding",
              "value": (this.state.Users.length/3)*2,
              "color": "hsl(138, 70%, 50%)"
            }]}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: 'nivo' }}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextColor="#333333"
          radialLabelsLinkColor={{ from: 'color' }}
          sliceLabelsSkipAngle={10}
          sliceLabelsTextColor="#333333"
          defs={[
              {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  size: 4,
                  padding: 1,
                  stagger: true
              },
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
              }
          ]}
          fill={[
              {
                  match: {
                      id: 'ruby'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'c'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'go'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'python'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'scala'
                  },
                  id: 'lines'
              },
              {
                  match: {
                      id: 'lisp'
                  },
                  id: 'lines'
              },
              {
                  match: {
                      id: 'elixir'
                  },
                  id: 'lines'
              },
              {
                  match: {
                      id: 'javascript'
                  },
                  id: 'lines'
              }
          ]}
          legends={[
              {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: '#000'
                          }
                      }
                  ]
              }
          ]}
      />
      </div>
        <h6 className="text-center textoTitulo">Usuários</h6>
        <p className="text-center"><span>{this.state.Users.length.toLocaleString('pt-BR')}</span></p>
        <h6 className="text-center textoTitulo">Casamentos Marcados</h6>
        <p className="text-center"><span>{this.state.Weddings.length.toLocaleString('pt-BR')}</span></p>
        <h6 className="text-center textoTitulo">Média Budget</h6>
        <p className="text-center"><span>{Math.round(this.state.BudgetAverage).toLocaleString('pt-BR')}</span></p>

        
      </div>
    </div>
  </div>

    <footer className="footer"></footer>
    
  </div>
  );
  }
}


export default App;
