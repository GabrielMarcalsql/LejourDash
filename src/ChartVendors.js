import React, { Component } from 'react';
import { ResponsivePie } from '@nivo/pie'

class ChartVendors extends Component {
  constructor(props) {
    super(props);this.state = {
        InvoicesCategory: [],
        Invoices: []
    };
  }

  componentDidUpdate(){
    if(this.state.Invoices.length == 0 && this.props.Invoices.length > 0){
      this.setState({
        InvoicesCategory: this.consolidateInvoicesCategory(this.props.Invoices),
          Invoices: this.props.Invoices
      })
    }
}

consolidateInvoicesCategory(invoices){
    var consolidate = [];
    for(var i = 0; i < invoices.length; i++) {
        var invoice = invoices[i];

        var index = consolidate.findIndex(x => x.id == invoice.VENDOR_CATEGORY);
        if(typeof index != "undefined" && index != -1){
            consolidate[index].value++;
        }else {
            consolidate.push({
                "id": invoice.VENDOR_CATEGORY,
                "label": invoice.VENDOR_CATEGORY,
                "value": 1
            });
        }
    }

    console.log(consolidate);
    return consolidate;
}
  
  render(){
    return(
      <ResponsivePie
            data={this.state.InvoicesCategory}
<<<<<<< HEAD
            margin={{ top: 40, right: 70, bottom: 100, left: 130 }}
            innerRadius={0}
=======
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
>>>>>>> 9656214394852fbb4ec2d6545d9f24d797448652
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
        />
    );
  }

}

export default ChartVendors;