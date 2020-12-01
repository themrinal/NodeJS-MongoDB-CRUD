const mongoose = require('mongoose');
const URI = "mongodb+srv://mrinaldas:Mrinal2020@cluster0.dawn7.mongodb.net/EmployeeDB?retryWrites=true&w=majority";

mongoose.connect(URI, {useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify : false}, (err) => {
  if(err) {
    console.log(`Could not connect to MongoDB Atlas : ${err}`);
  }
  else {
    console.log('Connected to MongoDB Atlas successfully.');
  }
});

require('./employee.model');