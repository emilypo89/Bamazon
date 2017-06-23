// -- 5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display 
// all of the items available for sale. Include the ids, names, and prices of products for sale.

// -- 6. The app should then prompt users with two messages.

// --    * The first should ask them the ID of the product they would like to buy.
// --    * The second message should ask how many units of the product they would like to buy.

// -- 7. Once the customer has placed the order, your application should check if your store has enough of the 
// product to meet the customer's request.

// --    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going
 // through.

// -- 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
// --    * This means updating the SQL database to reflect the remaining quantity.
// --    * Once the update goes through, show the customer the total cost of their purchase.

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

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  selectAllItems();
  // queryStockQuantity();
});

function selectAllItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
		for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
      	+ res[i].price + " | " + res[i].stock_quantity);
    }
    inquirer.prompt([
		  {
		    type: "input",
		    message: "Type ID# item would you like to bid on?",
		    name: "id"
		  }
		]).then(function(product) {
				console.log(product.id);

		    inquirer.prompt([
				  {
				    type: "input",
				    message: "How many units would you like to buy?",
				    name: "amount"
				  }
				]).then(function(purchase) {
					var productSearchById = product.id;
					// console.log(productSearchById);
				  // checking the user input to the correct answer
				  // console.log(purchase.amount);
				  // need to get this so that it will select the stock quantity by the id and then check that quantity
				 // if the quantity is greater than zero then 
				  connection.query("SELECT * FROM products WHERE ID=?", [productSearchById], function(err, res) {
				    for (var i = 0; i < res.length; i++) {
				      console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
				      	+ res[i].price + " | " + res[i].stock_quantity);
				      	if (res[i].stock_quantity > 0) {
						    	console.log("We have that in stock!");
						    	var newQuantity = (res[i].stock_quantity - purchase.amount);
						    	console.log(newQuantity);
						    	updateStockQuantity(newQuantity, productSearchById);
						    	console.log("You will be charged $" + res[i].price + ".\n Thank you for shopping at Bamazon!");
						    }
						    else{
						    	console.log("I'm sorry that item is out of stock!");
						    	// send back to the beginning
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
  );
}


