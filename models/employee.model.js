const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
  fullName: {
    type : String
  },
  email: {
    type : String,
    required : 'This field is required.'
  },
  mobile: {
    type : String
  },
  city: {
    type : String
  }
});

mongoose.model('Employee', employeeSchema);