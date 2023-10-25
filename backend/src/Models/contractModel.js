const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the contract
const contractSchema = new Schema({
  doctorName: {
    type: String,
    required: true,
  },
  employerName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

// Create the Contract model
const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;
