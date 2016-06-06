import React, { Component, PropTypes } from 'react'


export default class SingleTile extends Component {

  constructor(props) {
    super(props);

    this.removeStock = this.removeStock.bind(this);
  }

  removeStock() {
    Meteor.call("remove", this.props.d._id)
  }

  render() {
    let o = this.props.d.companyData.query.results.quote;
    let colors = ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"];
    return (
      <div className="single-tile" style={{"color" : colors[this.props.i % colors.length],
      "border": "2px solid " + colors[this.props.i % colors.length]}}>
        <div className="info-text">
          {this.props.d.name}
          <br />
          <span>Starting Volume: {o[o.length - 1].Volume}</span>
          <br />
          <span>Volume Now: {o[0].Volume}</span>
        </div>
        <button className="x-button" onClick={this.removeStock}> X </button>
      </div>
    )
  }

}