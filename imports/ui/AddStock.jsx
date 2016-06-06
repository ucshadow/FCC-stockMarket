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
        $("#fetching").text("Fetching Data From Yahoo API");
        let url = 'https://query.yahooapis.com/v1/public/yql?q= select * from yahoo.finance.historicaldata where symbol = "' +
          $("#add-stock").val() + '" and startDate = "' + ((new Date().getYear() + 1899) + "-" +
          (new Date().getMonth() < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-" +
          (new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate())) + '" and endDate = "' +
          ((new Date().getYear() + 1900) + "-" +
          (new Date().getMonth() < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-" +
          (new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate())) + '" &format=json &diagnostics=false &env=store://datatables.org/alltableswithkeys';

        $.getJSON(url, function(res) {
          if(res.query.results) {
            let name = res.query.results.quote[0].Symbol;
            Meteor.call("stockData.add", res, name);
            $("#fetching").text("...")
          } else {
            $("#fetching").text("No result found for " + $("#add-stock").val())
          }
        })

      } else {
        // stock already in database, no need to query
        console.log($("#add-stock").val() + " already present")
      }
    })
  }

  render() {
    return (
      <div className="add-field">
        <input id="add-stock" className="add-stock"/>
        <button onClick={this.addStock} className="add-button"> Add </button>
        <button id="fetching" className="fetching-data" disabled> ... </button>
      </div>
    )
  }

}