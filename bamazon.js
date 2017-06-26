var mysql = require("mysql");
var inquirer = require("inquirer");
var bamazonManager = require("./bamazonManager.js");
var bamazonCustomer = require("./bamazonCustomer.js");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});
// connection to bamazon_DB
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  
  runProgram();

});
// eventually this will be the first thing that the user sees but I am having trouble importing the functions
// this function prompts the user if they are a customer or manager and then proceeds accordingly
function runProgram() {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "Are you a customer or a manager?",
    choices: [
      "Customer",
      "Manager",
      "End"
    ]
    // runs each function based on the users choice
  }).then(function(answer){
    debugger
    switch(answer.action){
      case "Customer":
        startOrQuit();
        break;
      case "Manager":
        bamazonManager.runSearch();
        break;
      case "End":
        connection.destroy();
        break;  
    }
  });
}