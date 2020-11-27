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
  insertRecord(req, res);
});

function insertRecord(req, res) {
  var emp = new employee();
  emp.fullName = req.body.fullName;
  emp.email = req.body.email;
  emp.mobile = req.body.mobile;
  emp.city = req.body.city;

  emp.save(function(err) {
    if(!err) {
      res.redirect('employee/list');
    }
    else {
      console.log(`Can not save the records ! ${err}`);   
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
  employee.findById(req.params.id, function(err, doc) {
    if(!err) {
      res.render('employee/addOrEdit', {
        viewTitle : 'Update Employee',
        emplo : doc
      })
    }
  });
});

module.exports = router;