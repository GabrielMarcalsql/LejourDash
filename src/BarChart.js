import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar'

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        DateWeddings: [],
        Weddings: []
    };
  }

  componentDidUpdate(){
      if(this.state.Weddings.length == 0 && this.props.Weddings.length > 0){
        this.setState({
            DateWeddings: this.consolidateDateWeddings(this.props.Weddings),
            Weddings: this.props.Weddings
        })
      }
  }
  consolidateDateWeddings(weddings) {
    var consolidate = [
        {
          month: "Nov",
          weddings: 0
        },
        {
          month: "Dez",
          weddings: 0
        },
        {
          month: "Jan",
          weddings: 0
        },
        {
          month: "Fev",
          weddings: 0
        },
        {
          month: "Mar",
          weddings: 0
        },
      ];

    for(var i = 0; i < weddings.length; i++) {
      var wedding = weddings[i];
      if(typeof wedding.WEDDING_DATE !== 'undefined') {
         var yearMonth = wedding.WEDDING_DATE.substring(0, 7);
         switch(yearMonth){
           case '2020-11':
             consolidate[0].weddings++;
             break;
            case '2020-12':
                consolidate[1].weddings++;
              break;
            case '2021-01':
                consolidate[2].weddings++;
              break;
            case '2021-02':
                consolidate[3].weddings++;
              break
            case '2021-03':
                consolidate[4].weddings++;
              break
            default:

         }
      }
    }
  
      return consolidate;
    }
  
  render(){
      const dataWddings = this.state.DateWeddings;
    return(
        <ResponsiveBar
        data={dataWddings}
        keys={[ 'weddings']}
        indexBy="month"
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
    );
  }

}

export default BarChart;