const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const employee = mongoose.model('Employee');

//showing employee page for inserting employee data
router.get('/', function(req, res) {
  res.render('employee/addOrEdit', {
    viewTitle : 'Insert Student'
  });
});

//showing all employee list form
router.get('/list', function(req, res){
  employee.find(function(err, docs) {
    res.render('employee/list', {
      viewTitle : 'Employee List',
      allEmpData : docs
    });
  });
});

//showing employee page for editing empployee data
router.get('/:id', function(req, res) {
  employee.findById(req.params.id, function(err, docs) {
    res.render('employee/addOrEdit', {
      viewTitle : 'Edit Employee',
      editEmpData : docs
    });
  });
});

//deleting employee data
router.get('/delete/:id', function(req, res) {
  employee.findOneAndRemove({_id : req.params.id}, function(err) {
    if(!err) {
      res.redirect('/list');
    }
  })
});

//insert and update employee data
router.post('/', function(req, res) {
  if(req.params._id == '') {
    insertEmployee(req, res);
  } 
  else {
    updateEmployee(req, res);
  }  
});

//insert employee reord
function insertEmployee(req, res){
  var emp = new employee();
  emp.fullName = req.body.fullName;
  emp.email = req.body.email;
  emp.mobile = req.body.mobile;
  emp.city = req.body.city;

  emp.save(function(err) {
    if(!err) {
      res.redirect('list');
      console.log('Data inserted.');
    }
    else {
      console.log(err);
    }
  });
}

//update employee reord
function updateEmployee(req, res) {
  employee.findOneAndUpdate({_id : req.body._id}, req.body, function(err) {
    if(!err) {
      res.redirect('/list');
    }
    else {
      console.log(err);
    }
  });
}

//exporting this module to be used by app.js
module.exports = router;