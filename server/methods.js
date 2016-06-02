import { StockData } from '../imports/api/stockData.js'
import { Mongo } from 'meteor/mongo';


Meteor.methods({

  'stockData.update'(elementId, value) {

    // code here

  },

  'stockData.add'(data, name) {
    let d = StockData.find({companyData: data}).fetch();
    if(d.length <= 0) {
      StockData.insert({companyData: data, active: true, name: name})
    }
  },

  'isPresentAndUpToDate'(elem) {
    let e = StockData.find({name: elem}).fetch();
    if(e.length === 0) {
      return false
    }
  }

});
