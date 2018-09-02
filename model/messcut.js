const mongoose = require('mongoose');

var messCutSchema = new mongoose.Schema(
  {
    messNumber: {
      type: Number,
      required: true
    },
    fromDate: {
      type: String,
      required: true
    },
    toDate: {
      type: String,
      required: true
    }
  },
  {
    collection: 'OBCMessCuts'
  }
);

module.exports = mongoose.model('MessCut', messCutSchema);
