
CREATE TABLE IF NOT EXISTS user (
  userid INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  restaurantname TEXT,
  address TEXT,
  location TEXT,
  contact TEXT
);

CREATE TABLE IF NOT EXISTS foodcategory (
  categoryid INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
  categoryname TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS fooditem (
  itemid INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
  userid INTEGER NOT NULL, 
  foodCategoryid INTEGER NOT NULL, 
  name TEXT NOT NULL,
  quantity REAL NOT NULL,
  unit TEXT NOT NULL,
  timestamp TEXT NOT NULL, 
  batchnumber TEXT NOT NULL,
  expirydate TEXT NOT NULL, 
  pricePerUnit REAL NOT NULL,
  FOREIGN KEY (userid) REFERENCES user (userid) ON DELETE CASCADE,
  FOREIGN KEY (foodCategoryid) REFERENCES foodcategory (categoryid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transactionlog (
  transctionid INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
  userid INTEGER NOT NULL, 
  foodItemid INTEGER NOT NULL, 
  quantity REAL NOT NULL,
  unit TEXT NOT NULL, -- e.g., 'kg'
  priceperunit REAL NOT NULL,
  timestamp TEXT NOT NULL, 
  act TEXT NOT NULL, 
  newexpirydate TEXT, 
  FOREIGN KEY (userid) REFERENCES user (userid) ON DELETE CASCADE,
  FOREIGN KEY (fooditemid) REFERENCES fooditem (itemid) ON DELETE CASCADE
);

INSERT INTO user (username, password, restaurantname, address, location, contact) VALUES
('user1', 'pass1', 'Restaurant 1', 'Address 1', 'Location 1', 'Contact 1'),
('user2', 'pass2', 'Restaurant 2', 'Address 2', 'Location 2', 'Contact 2'),
('user3', 'pass3', 'Restaurant 3', 'Address 3', 'Location 3', 'Contact 3'),
('user4', 'pass4', 'Restaurant 4', 'Address 4', 'Location 4', 'Contact 4'),
('user5', 'pass5', 'Restaurant 5', 'Address 5', 'Location 5', 'Contact 5'),
('user6', 'pass6', 'Restaurant 6', 'Address 6', 'Location 6', 'Contact 6'),
('user7', 'pass7', 'Restaurant 7', 'Address 7', 'Location 7', 'Contact 7'),
('user8', 'pass8', 'Restaurant 8', 'Address 8', 'Location 8', 'Contact 8'),
('user9', 'pass9', 'Restaurant 9', 'Address 9', 'Location 9', 'Contact 9'),
('user10', 'pass10', 'Restaurant 10', 'Address 10', 'Location 10', 'Contact 10'),
('user11', 'pass11', 'Restaurant 11', 'Address 11', 'Location 11', 'Contact 11'),
('user12', 'pass12', 'Restaurant 12', 'Address 12', 'Location 12', 'Contact 12'),
('user13', 'pass13', 'Restaurant 13', 'Address 13', 'Location 13', 'Contact 13'),
('user14', 'pass14', 'Restaurant 14', 'Address 14', 'Location 14', 'Contact 14'),
('user15', 'pass15', 'Restaurant 15', 'Address 15', 'Location 15', 'Contact 15');

INSERT INTO foodcategory (categoryname, description) VALUES
('Meat', 'All types of meat'),
('Vegetables', 'Fresh vegetables'),
('Fruits', 'Various kinds of fruits'),
('Dairy', 'Milk, cheese, and other dairy products'),
('Bakery', 'Bread, cakes, and pastries'),
('Seafood', 'Fish and shellfish'),
('Drinks', 'Beverages of all kinds'),
('Snacks', 'Quick bites and snacks'),
('Condiments', 'Sauces, spices, and seasonings'),
('Frozen', 'Frozen food items'),
('Canned', 'Canned goods'),
('Desserts', 'Sweet desserts and pastries'),
('Grains', 'Rice, wheat, and other grains'),
('Pasta', 'Different types of pasta'),
('Organic', 'Organic food items');

INSERT INTO fooditem (userid, foodCategoryid, name, quantity, unit, timestamp, batchnumber, expirydate, pricePerUnit) VALUES
(1, 1, 'Chicken', 100.0, 'kg', '2023-12-01 10:00:00', 'BN001', '2024-01-01', 10.0),
(2, 2, 'Carrots', 50.0, 'kg', '2023-12-02 11:00:00', 'BN002', '2023-12-15', 3.0),
(3, 3, 'Apples', 75.0, 'kg', '2023-12-03 09:00:00', 'BN003', '2023-12-20', 5.0),
(4, 4, 'Milk', 200.0, 'liters', '2023-12-04 08:00:00', 'BN004', '2024-01-10', 2.0),
(5, 5, 'Bread', 40.0, 'kg', '2023-12-05 07:00:00', 'BN005', '2023-12-25', 1.5),
(6, 6, 'Salmon', 60.0, 'kg', '2023-12-06 06:00:00', 'BN006', '2024-01-20', 15.0),
(7, 7, 'Coffee', 30.0, 'kg', '2023-12-07 05:00:00', 'BN007', '2024-02-01', 20.0),
(8, 8, 'Chips', 50.0, 'kg', '2023-12-08 04:00:00', 'BN008', '2023-12-30', 2.0),
(9, 9, 'Ketchup', 25.0, 'liters', '2023-12-09 03:00:00', 'BN009', '2024-02-15', 3.0),
(10, 10, 'Frozen Peas', 100.0, 'kg', '2023-12-10 02:00:00', 'BN010', '2024-03-01', 4.0),
(11, 11, 'Canned Beans', 120.0, 'kg', '2023-12-11 01:00:00', 'BN011', '2024-04-01', 2.5),
(12, 12, 'Cheesecake', 35.0, 'kg', '2023-12-12 12:00:00', 'BN012', '2024-01-05', 7.0),
(13, 13, 'Rice', 150.0, 'kg', '2023-12-13 11:00:00', 'BN013', '2024-05-01', 1.0),
(14, 14, 'Spaghetti', 80.0, 'kg', '2023-12-14 10:00:00', 'BN014', '2024-06-01', 2.2),
(15, 15, 'Organic Tomatoes', 45.0, 'kg', '2023-12-15 09:00:00', 'BN015', '2024-01-15', 6.0);

INSERT INTO transactionlog (userid, foodItemid, quantity, unit, priceperunit, timestamp, act, newexpirydate) VALUES
(1, 1, 10.0, 'kg', 10.0, '2023-12-01 12:00:00', 'ADD', '2024-02-01'),
(2, 2, 5.0, 'kg', 3.0, '2023-12-02 13:00:00', 'USE', NULL),
(3, 3, 7.0, 'kg', 5.0, '2023-12-03 14:00:00', 'ADD', '2024-03-01'),
(4, 4, 20.0, 'liters', 2.0, '2023-12-04 15:00:00', 'WASTE', NULL),
(5, 5, 4.0, 'kg', 1.5, '2023-12-05 16:00:00', 'USE', NULL),
(6, 6, 6.0, 'kg', 15.0, '2023-12-06 17:00:00', 'WASTE', NULL),
(7, 7, 10.0, 'kg', 20.0, '2023-12-07 18:00:00', 'ADD', '2024-04-01'),
(8, 8, 5.0, 'kg', 2.0, '2023-12-08 19:00:00', 'USE', NULL),
(9, 9, 2.5, 'liters', 3.0, '2023-12-09 20:00:00', 'WASTE', NULL),
(10, 10, 15.0, 'kg', 4.0, '2023-12-10 21:00:00', 'ADD', '2024-05-01'),
(11, 11, 12.0, 'kg', 2.5, '2023-12-11 22:00:00', 'USE', NULL),
(12, 12, 3.5, 'kg', 7.0, '2023-12-12 23:00:00', 'WASTE', NULL),
(13, 13, 20.0, 'kg', 1.0, '2023-12-13 24:00:00', 'ADD', '2024-06-01'),
(14, 14, 8.0, 'kg', 2.2, '2023-12-14 01:00:00', 'USE', NULL),
(15, 15, 4.5, 'kg', 6.0, '2023-12-15 02:00:00', 'WASTE', NULL);