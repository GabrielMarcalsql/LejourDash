import React, { Component } from 'react';
import { ResponsiveLine  } from '@nivo/line'

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        DateInvoices: [],
        Invoices: []
    };
  }

  componentDidUpdate(){
    if(this.state.Invoices.length == 0 && this.props.Invoices.length > 0){
      this.setState({
          DateInvoices: this.consolidateDateInvoices(this.props.Invoices),
          Invoices: this.props.Invoices
      })
    }
}
  consolidateDateInvoices(invoices) {
    var months = [
        {
            "id": "Vendas",
            "color": "hsl(242, 70%, 50%)",
            "data": [
              {
                "x": "Jun",
                "y": 0
              },
              {
                "x": "Jul",
                "y": 0
              },
              {
                "x": "Ago",
                "y": 0
              },
              {
                "x": "Set",
                "y": 0
              },
              {
                "x": "Out",
                "y": 0
              }
            ]
          }
      ];  
      
    for(var i = 0; i < invoices.length; i++) {
        var invoice = invoices[i];
        if(typeof invoice.CREATED_AT !== 'undefined') {
            var yearMonth = invoice.CREATED_AT.substring(0, 7);
            switch(yearMonth){
                case '2020-06':
                    months[0].data[0].y++;
                    break;
                case '2020-07':
                    months[0].data[1].y++;
                    break;
                case '2020-08':
                    months[0].data[2].y++;
                    break;
                case '2020-09':
                    months[0].data[3].y++;
                    break
                case '2020-10':
                    months[0].data[4].y++;
                    break
                default:
                    break;

            }
        }
    }

    return months;
  }
  
  render(){
    return(
        <ResponsiveLine
        data={this.state.DateInvoices}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear'}}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Meses',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Vendas',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
    />
    );
  }

}

export default LineChart;