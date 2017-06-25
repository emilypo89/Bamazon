var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});
// connection to the bamazon_DB
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  startOrQuit();
});

function startOrQuit(){
	inquirer.prompt({
		name: "action",
		type: "list",
		message: "What would you like to do?",
		choices: [
			"Purchase an Item",
			"End"
		]
		}).then(function(response){
			if (response.action == "Purchase an Item"){
				purchaseItem();
			}
			else {
				connection.destroy();
			}
		});
}

// function to have user purchase an item
function purchaseItem() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
		for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
      	+ res[i].price + " | " + res[i].stock_quantity);
    }
    // prompting the user to choose an item
    inquirer.prompt([
		  {
		    type: "input",
		    message: "Type ID# for the item would you like to bid on?",
		    name: "id"
		  }
		]).then(function(product) {
				console.log(product.id);
				// prompting the user for how many of that item they would like to purchase
		    inquirer.prompt([
				  {
				    type: "input",
				    message: "How many units would you like to buy?",
				    name: "amount"
				  }
				]).then(function(purchase) {
					var productSearchById = product.id;
				  //selecting the stock quantity by the id and then check that quantity
				 	connection.query("SELECT * FROM products WHERE ID=?", [productSearchById], function(err, res) {
				    for (var i = 0; i < res.length; i++) {
				    	// console logging the item chosen
				      console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
				      	+ res[i].price + " | " + res[i].stock_quantity);
				      // if the stock_quantity is greater than 0 then let the person purchase the item
				      // then send back to beginning
				      	if (res[i].stock_quantity > 0) {
						    	console.log("We have that in stock!");
						    	var newQuantity = (res[i].stock_quantity - purchase.amount);
						    	console.log(newQuantity);
						    	updateStockQuantity(newQuantity, productSearchById);
						    	console.log("You will be charged $" + res[i].price + ".\n Thank you for shopping at Bamazon!");
						    	console.log("------------------------------------");
						    	console.log("------------------------------------");
						    	startOrQuit();
						    }
						    // if the item is out of stock, notify the customer and send them back to the beginning
						    else{
						    	console.log("I'm sorry that item is out of stock!");
						    	// send back to the beginning
						    	console.log("------------------------------------");
						    	console.log("------------------------------------");
						    	startOrQuit();
						    }
				    }

				  });

				  
				});
		});
	});
}
function updateStockQuantity(newQuantity, productSearchById) {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: newQuantity
      },
      {
        id: productSearchById
      }
    ],
    function(err, res) {
    	if (err) throw err;
      // console.log(res.affectedRows + " products updated!\n");
 
    }
  });
}


