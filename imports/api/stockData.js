import { Mongo } from 'meteor/mongo';

export const StockData = new Mongo.Collection('stockData');


// {companyData: {}, isActive: true, name: ""}