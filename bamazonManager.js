
// ### Challenge #2: Manager View (Next Level)

// * Create a new Node application called `bamazonManager.js`. Running this application will:

//   * List a set of menu options:

//     * View Products for Sale
    
//     * View Low Inventory
    
//     * Add to Inventory
    
//     * Add New Product

//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs,
 // names, prices, and quantities.

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than 
// five.

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more"
 // of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the 
// store.

// - - -

// * If you finished Challenge #2 and put in all the hours you were willing to spend on this activity, 
// then rest easy! Otherwise continue to the next and final challenge.
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
  
  runSearch();

});

function runSearch(){
	inquirer.prompt({
		name: "action",
		type: "list",
		message: "What would you like to do?",
		choices: [
			"View Products for Sale",
			"View Low Inventory",
			"Add to Inventory",
			"Add a New Product"
		]
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

		}
	})
}

function productsForSale() {
	connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
		for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
      	+ res[i].price + " | " + res[i].stock_quantity);
    }				
	});
}

function lowInventory(){
	connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN ? and ?", 
			[0, 5], function(err, res){

				for(var i = 0; i < res.length; i++){
					console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
      	+ res[i].price + " | " + res[i].stock_quantity);
				}
	});
}

function addInventory(){
	productsForSale();
	inquirer.prompt([
		  {
		    type: "input",
		    message: "Type ID# for the item would you like to update the inventory for?",
		    name: "id"
		  }
		]).then(function(product) {
				console.log(product.id);

		    inquirer.prompt([
				  {
				    type: "input",
				    message: "How many units would you like to add?",
				    name: "amount"
				  }
				]).then(function(purchase) {
					var productSearchById = product.id; 
				  connection.query("SELECT * FROM products WHERE ID=?", [productSearchById], function(err, res) {
				    for (var i = 0; i < res.length; i++) {
				      var newQuantity = (parseInt(res[i].stock_quantity) + parseInt(purchase.amount));
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
						    }
						  );
				    	console.log("You have updated the quanity for the product: " + res[i].product_name);
				    	console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
		      	+ res[i].price + " | " + newQuantity);
				    }
				  }); 
				});
		});
}

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
			      console.log(res.affectedRows + " product inserted!\n");
			    }
			  );
		});
} 