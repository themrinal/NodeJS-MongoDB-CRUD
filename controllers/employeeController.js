const express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const employee = mongoose.model('Employee');

router.get('/', function(req, res) {
  res.render('employee/addOrEdit', {
    viewTitle : 'Insert Employee'
  });
});

router.post('/', (req, res) => {
  if(req.body._id == '') {
    insertRecord(req, res);
  }
  else {
    updateRecord(req, res);
  }
  
});

function insertRecord(req, res) {
  var emp = new employee();
  emp.fullName = req.body.fullName;
  emp.email = req.body.email;
  emp.mobile = req.body.mobile;
  emp.city = req.body.city;

  emp.save(function(err) {
    if(!err) {
      res.redirect('list');
    }
    else {
      console.log(`Can not save the records ! ${err}`);   
    }      
  });
}

function updateRecord(req, res) {
  employee.findOneAndUpdate({_id : req.body._id}, req.body, {new : true}, (err, doc) => {
    if(!err) {
      res.redirect('/list')
    }
    else {
      console.log(`Error during update. ${err}`);
    }
  });
}

router.get('/list', (req, res) => {
  employee.find((err, docs) => {
    if(!err) {
      res.render('employee/list', {
        viewTitle : 'Employee List',
        list : docs
      });
    }
    else {
      console.log(`Error retrieving employee data. ${err}`);
    }
  });
});

router.get('/:id', (req, res) => {
  employee.findById(req.params.id, function(err, docs) {
    if(!err) {
      res.render('employee/addOrEdit', {
        viewTitle : 'Update Employee',
        emplo : docs
      })
    }
  });
});

module.exports = router;