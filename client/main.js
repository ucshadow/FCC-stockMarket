import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import '../imports/startup/accounts-config.js';
//import { YourCustomCollection } from '../imports/api/yourCustomCollection.js';
import App from '../imports/ui/App.jsx';
import Home from '../imports/ui/Home.jsx';
import About from '../imports/ui/About.jsx';
import NotFound from '../imports/ui/NotFound.jsx';


export const renderRoutes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="*" component={ NotFound } />
    </Route>
  </Router>
);


Meteor.startup(() => {

  /*Meteor.subscribe('voteData', {
    onReady: function(){
      //onSubscriptionReady trigger
    }
  });*/

  render(renderRoutes(), document.getElementById('app'));

});

Tracker.autorun(function(c) {
  // needed to make a trigger for login events because the Blaze template
  // is not interacting with React and so login and logout wont trigger anything
  // like a rerender of a React component.
  // ugly, but only triggers a refresh of the current page on login and logout.
  var userId = Meteor.userId();
  if (c.firstRun){
    return;
  }
  userId ? location.reload() : location.reload()
});