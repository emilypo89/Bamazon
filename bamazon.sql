-- delet database if it already exists
DROP DATABASE IF EXISTS bamazon_DB;
-- create database
CREATE DATABASE bamazon_DB;
-- apply the code below to the bamazon_DB
USE bamazon_DB;

-- creating a table of products
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(20) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

-- inserting rows into the table 
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


-- selecting all of the rows in the products table
SELECT*FROM products


