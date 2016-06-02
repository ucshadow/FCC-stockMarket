import React, { Component, PropTypes } from 'react';


export default class AddStock extends Component {

  constructor() {
    super();
    this.addStock = this.addStock.bind(this);
  }

  addStock() {
    Meteor.call("isPresentAndUpToDate", $("#add-stock").val(), function(err, res) {
      if(err) {console.log(err)}
      if(!res) {
        let url = 'https://query.yahooapis.com/v1/public/yql?q= select * from yahoo.finance.historicaldata where symbol = "' +
          $("#add-stock").val() + '" and startDate = "' + ((new Date().getYear() + 1899) + "-" +
          (new Date().getMonth() < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-" +
          (new Date().getDay() < 10 ? "0" + new Date().getDay() : new Date().getDay())) + '" and endDate = "' +
          ((new Date().getYear() + 1900) + "-" +
          (new Date().getMonth() < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-" +
          (new Date().getDay() < 10 ? "0" + new Date().getDay() : new Date().getDay())) + '" &format=json &diagnostics=true &env=store://datatables.org/alltableswithkeys';

        $.getJSON(url, function(res) {
          let name = res.query.results.quote[0].Symbol;
          Meteor.call("stockData.add", res, name)
        })

      }
    })
  }

  render() {
    return (
      <div>
        <input id="add-stock" className="add-stock"/>
        <button onClick={this.addStock}> Add </button>
      </div>
    )
  }

}