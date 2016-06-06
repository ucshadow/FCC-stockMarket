import React from 'react'
import { render } from 'react-dom'

import { Link } from 'react-router'
import AccountsUIWrapper from './AccountsUIWrapper.jsx';


export default class App extends React.Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}