-- ### Challenge #1: Customer View (Minimum Requirement)

-- 1. Create a MySQL Database called `bamazon`.

-- 2. Then create a Table inside of that database called `products`.

-- 3. The products table should have each of the following columns:

--    * item_id (unique id for each product)

--    * product_name (Name of product)

--    * department_name

--    * price (cost to customer)

--    * stock_quantity (how much of the product is available in stores)

-- 4. Populate this database with around 10 different products. 
-- (i.e. Insert "mock" data rows into this database and table).
DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(20) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Harry Potter Series", "books", 75.50, 33), 
("selfie stick", "electronics", 35.00, 90), 
("sweatshirt", "clothing", 25.50, 104),
("hose", "gardening", 33.99, 150), 
("cheese", "food", 15.25, 23),
("computer", "electronics", 800.00, 47), 
("baby pool", "outdoor", 56.23, 67),
("cat food", "pet supplies", 18.00, 220), 
("sunglass", "eyewear", 85.50, ),
("crocks", "footwear", 23.99, 12);

SELECT*FROM products


