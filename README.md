# Bamazon

Bamazon is an application that allows either a customer to purchase items or a manager to update information.

The CLI application uses a mySQL database to store the product information.

There are two parts to the application. Either it can be run as a customer or as a manager. 

The user is prompted with how they would like to run the program when they begin.

![bamazon](/images/bamazon.png)


## Customer View

If the user chooses to run the program as a customer they will first be shown the objects they can choose from.

They are then given the opportunity to pick a product by typing in the items ID number.

They are then prompted to enter in how many of that item they would like to buy.

If that item is in stock the user is told how much they will be charged.

If the item chosen is not in stock, the user is told that the item is no longer in stock.

After each of these the user is asked if they would like to search for another item or exit the program.

![bamazonCustomer](/images/bamazonCustomer.png)

## Manager View

If the user decided to run the program as a manager they are give five options: view all items, check inventory, add to the inventory, add a new product, and exit the program.

*View all of the items*

For this option is shown a list of all of the items that are for sale and information about them.

The user is then prompted if they would like to do something else. If yes it brings them back to the main menu. If no the program ends.

![bamazon](/images/bamazonManagerProductList.png)

*Check Inventory*

If the user chooses this option they are shown all of the items that have a stock quantity of less than 5. 

If there are no items that are under 5, the user is told that there are no items that are low in stock.

The user is then prompted if they would like to do something else. If yes it brings them back to the main menu. If no the program ends.

![bamazon](/images/bamazonManagerLowInventory.png)

*Add Inventory*

Here the user is given the opportunity to add to the amount of a particular item there is.

The user is told to choose an item based on its ID number. 

They are then asked how many more of that item they would like to add to the quantity. 

That quantity is then updated in the database. 

The user is then prompted if they would like to do something else. If yes it brings them back to the main menu. If no the program ends.

![bamazon](/images/bamazonManagerAddItem.png)

*Add a New Product*

For this the user can add a new item to the database.

The user is told to enter in the name, department, price, and quantity of the product.

That item is then added to the database.

The user is then prompted if they would like to do something else. If yes it brings them back to the main menu. If no the program ends.

![bamazon](/images/bamazonManagerAddItem.png)

*End of the Program*

If the user choose "end" at any point, the program will end.
