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
// connection to bamazon_DB
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  
  runSearch();

});
// prompts the user user for what they would like to do
function runSearch(){
	inquirer.prompt({
		name: "action",
		type: "list",
		message: "What would you like to do?",
		choices: [
			"View Products for Sale",
			"View Low Inventory",
			"Add to Inventory",
			"Add a New Product",
			"End"
		]
		// runs each function based on the users choice
	}).then(function(answer){
		switch(answer.action){
			case "View Products for Sale":
				productsForSale();
				break;
			case "View Low Inventory":
				lowInventory();
				break;
			case "Add to Inventory":
				addInventory();
				break;
			case "Add a New Product":
				addNewProduct();
				break;
			case "End":
				connection.destroy();
				break;	
		}
	})
}
// asks the user what else they would like to do
// if yes - shown the main menu options / if no - program ends
function restartOrQuit(){
	inquirer.prompt([
		{
			type: "confirm",
	    message: "Is there anything else you'd like to do?",
	    name: "confirm",
	    default: true
		}
		]).then(function(response){
				if (response.confirm == true){
					runSearch();
				}
				else{
					connection.destroy();
				}	
		});	
}

// shows a list of all of the products for sale
function productsForSale() {
	connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
		for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
      	+ res[i].price + " | " + res[i].stock_quantity);
    }			
    restartOrQuit();
	});
}

//  shows the items whose inventory is below 5
function lowInventory(){
	connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN ? and ?", 
			[0, 5], function(err, res){
				// console.log(res);
				if (err) throw err;
				if (res === []) {
					console.log("There are no items that have low inventory");
				}
				else{
					for(var i = 0; i < res.length; i++){
						console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
	      	+ res[i].price + " | " + res[i].stock_quantity);
					}
				}
	restartOrQuit();			
	});
}

// allows the user to add inventory to a particular item
function addInventory(){
	inquirer.prompt([
		  {
		    type: "input",
		    message: "Type ID# for the item would you like to update the inventory for?",
		    name: "id"
		  },
		  {
		    type: "input",
		    message: "How many units would you like to add?",
		    name: "amount"
		  }
	]).then(function(purchase) {
		console.log(purchase.id)
		// var productSearchById = product.id; 
	  connection.query("SELECT * FROM products WHERE ID=?", [purchase.id], function(err, res) {
	    for (var i = 0; i < res.length; i++) {
	      var newQuantity = (parseInt(res[i].stock_quantity) + parseInt(purchase.amount));
	    	connection.query(
			    "UPDATE products SET ? WHERE ?",
			    [
			      {
			        stock_quantity: newQuantity
			      },
			      {
			        id: purchase.id
			      }
			    ],
			    function(err, res) {
			    	if (err) throw err;
			    });
	    	console.log("You have updated the quanity for the product: " + res[i].product_name);
	    	console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
    	+ res[i].price + " | " + newQuantity);
	    ; 	
	    }
	   restartOrQuit(); 
	  }); 	
	});
}

// allows the user to add a new product to the database
function addNewProduct() {
		inquirer.prompt([
		  {
		    type: "input",
		    message: "What is the name of the product you would like to add?",
		    name: "name"
		  },
		  {
		    type: "input",
		    message: "What department is the product in?",
		    name: "department"
		  },
		  {
		    type: "input",
		    message: "How much does the product cost?",
		    name: "price"
		  },
		  {
		    type: "input",
		    message: "How many do you have in stock?",
		    name: "quantity"
		  }
		]).then(function(product) {
				connection.query(
			    "INSERT INTO products SET ?",
			    {
			      product_name: product.name,
			      department_name: product.department,
			      price: product.price,
			      stock_quantity: product.quantity
			    },
			    function(err, res) {
			    	if (err) throw err;
			      console.log(res.affectedRows + " product inserted!\n");
			    // }
			    restartOrQuit();
			  });
		});
} 

