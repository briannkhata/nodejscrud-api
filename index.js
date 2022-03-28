const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const req = require('express/lib/request');

app.use(bodyparser.json);

var mysqlConnection  = mysql.createConnection({
    host : 'localhost',
    user:'root',
    password:'',
    database:'employeedb',
    multipleStatements:true
});

mysqlConnection.connect((err) =>{
    if(!err)
        console.log('DB connection succeded.')
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err,undefined,2));
});

app.listen(5000,() =>console.log("Express server is running at port no : 5000"));

//get all employees
app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee',(err,rows,fields)=>{
        if(!err)
         res.send(rows);
        else
         console.log(err);
    });
});

//get single employee
app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
         res.send(rows);
        else
         console.log(err);
    });
});

//delete an employee
app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM employee WHERE EmpID = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
         res.send('Delete Sucessful!');
        else
         console.log(err);
    });
});

//insert  employee
app.post('/employees',(req,res)=>{
    let emp = req.body;
    var sql ="SET @EmID=?,SET @Name=?,SET @EmpCode=?,SET @Salary=?, CALL EmployeeAddorEdit (@EmpID,@Name,@EmpCode,@Salary)";
    mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields)=>{
        if(!err)
         res.send(rows);
        else
         console.log(err);
    });
});


//insert  employee
app.put('/employees',(req,res)=>{
    let emp = req.body;
    var sql ="SET @EmID=?,SET @Name=?,SET @EmpCode=?,SET @Salary=?, CALL EmployeeAddorEdit (@EmpID,@Name,@EmpCode,@Salary)";
    mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields)=>{
        if(!err)
         res.send('Updated successfully');
        else
         console.log(err);
    });
});