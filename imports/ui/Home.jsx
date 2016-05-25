import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import { render } from 'react-dom'


export default class Home extends Component {

  render() {
    return (
      <div>
        Hi from Home
      </div>
    )
  }
}


/*Home.propTypes = {
  customCollection: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('customCollection');
  return {
    customCollection: CustomCollection.find({}).fetch()
  };
}, Home);*/