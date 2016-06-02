import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import { render } from 'react-dom'

import { StockData } from '../api/stockData.js'
import AddStock from './AddStock.jsx'


export default class ChartHolder extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.stockData)
  }

  render() {
    return (
      <div>
        Chart Holder
        <SingleCompany key={Math.random()} stockData={this.props.stockData} />
      </div>
    )
  }
}

class SingleCompany extends Component {

  constructor() {
    super();
    this.parseDB = this.parseDB.bind(this);
  }

  parseDB() {
    let allStocks = [];
    if(this.props.stockData.length >= 1) {
      console.log(this.props.stockData);
      this.props.stockData.map((d) => {
        let title = "";
        let parsed = [];
        d.companyData.query.results.quote.map((elem) => {
          parsed.push([parseFloat(Date.parse(elem.Date)), parseFloat(elem.Close)]);
          if(title === "") {
            title = elem.Symbol;
          }
        });
        allStocks.push({name: title, data: parsed.sort()})
      });
    } else {
      return <div> Loading... </div>
    }
    return this.createChart(allStocks);
  }

  createChart(seriesOptions) {
    $('#container').highcharts('StockChart', {
      rangeSelector: {
          selected: 4
      },
      yAxis: {
        labels: {
          formatter: function () {
            return (this.value > 0 ? ' + ' : '') + this.value + '%';
          }
        },
        plotLines: [{
          value: 0,
          width: 2,
          color: 'silver'
        }]
      },
      plotOptions: {
        series: {
          compare: 'percent'
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
        valueDecimals: 2
      },
      series: seriesOptions
    });
  }

  render() {
    return (
      <div>
        {this.parseDB()}
        <AddStock key={Math.random()} />
      </div>
    )
  }

}

