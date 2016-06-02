import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import { render } from 'react-dom'

import { StockData } from '../api/stockData.js'
import SingleDataObject from './SingleDataObject.jsx';
import ChartHolder from './ChartHolder.jsx';


class Home extends Component {

  constructor(props) {
    super(props);

    function loadScript() {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "highstock.js";
      script.async = true;
      document.head.appendChild(script);
    }
    loadScript();

  }

  render() {
    return (
      <div>
        <ChartHolder key={Math.random()} stockData={this.props.stockData} />
      </div>
    )
  }
}



Home.propTypes = {
  stockData: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('stockData');
  return {
    stockData: StockData.find({}).fetch()
  };
}, Home);