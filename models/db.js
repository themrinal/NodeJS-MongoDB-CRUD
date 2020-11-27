const mongoose = require('mongoose');
const URI = "mongodb+srv://mrinaldas:Mrinal2020@cluster0.dawn7.mongodb.net/EmployeeDB?retryWrites=true&w=majority";

mongoose.connect(URI, {useNewUrlParser : true, useUnifiedTopology : true}, function(err) {
  if(!err) {
    console.log('Successfully connected to MongoDB Atlas.');
  }
  else {
    console.log(`Error in connection. ${err}`);
  }
});

require('./employee.model');