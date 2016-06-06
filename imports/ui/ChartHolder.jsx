import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import { render } from 'react-dom';

import { StockData } from '../api/stockData.js';
import GenerateChart from './GenerateChart.jsx';
import SingleTile from './SingleTile.jsx';


export default class ChartHolder extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.stockData);

    this.displayTiles = this.displayTiles.bind(this);
  }

  displayTiles(){
    return this.props.stockData.map((s) => {
      return <SingleTile key={s.name} d={s} i={this.props.stockData.indexOf(s)}/>
    })
  }

  render() {
    return (
      <div>
        <GenerateChart key={Math.random()} stockData={this.props.stockData} />
        <div className="all-tiles">
          {this.displayTiles()}
        </div>
      </div>
    )
  }
}

