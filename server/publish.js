import { StockData } from '../imports/api/stockData.js'


Meteor.publish('stockData', function dataPublish() {
  return StockData.find();
});