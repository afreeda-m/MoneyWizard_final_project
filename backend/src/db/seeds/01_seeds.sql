INSERT INTO users (name, email, password)
VALUES ('Admin', 'admin', '123');



INSERT INTO categories(category_name, type, logo_url)
VALUES ('Food/Drinks', 'Expense', 'food.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Shopping', 'Expense', 'shopping.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Transportation', 'Expense', 'transportation.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Entertainment', 'Expense', 'entertainment.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Education', 'Expense', 'education.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Home', 'Expense', 'house.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Family', 'Expense', 'family.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('HealthCare', 'Expense', 'healthcare.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Sports', 'Expense', 'sports.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Pets', 'Expense', 'pets.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Bills', 'Expense', 'phone.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Travels', 'Expense', 'travel.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Salary/Wages', 'Income', 'salary.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Odd Jobs', 'Income', 'jobs.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Royalties', 'Income', 'royalties.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Pension', 'Income', 'pension.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Investment', 'Income', 'investment.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Rental Income', 'Income', 'apartment.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Gifts', 'Income', 'gift.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Transfer', 'Transfer', 'transfer.png');



INSERT INTO accounts(account_name, balance, user_id, note)
VALUES('Chequing', 10000, 1, 'Bank chequing account');
INSERT INTO accounts(account_name, balance, user_id, note)
VALUES('Retirement Savings', 2000, 1, 'Retirement savings from work');
INSERT INTO accounts(account_name, balance, user_id, note)
VALUES('Cash', 500, 1, 'Cash in Wallet');
INSERT INTO accounts(account_name, balance, user_id, note)
VALUES('Vacation Savings', 3000, 1, 'For vacation travel expenses');
INSERT INTO accounts(account_name, balance, user_id, note)
VALUES('Emergency Fund', 4000, 1, 'Emergency fund for unexpected expenses');



INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 11, 3, 100, '2023-09-15', 'Electricity bill payment');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 12, 3, 80, '2023-09-05', 'Mobile phone bill payment');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 6, 2, 120, '2023-09-10', 'Home decor items');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 5, 1, 200, '2023-09-25', 'Textbooks for the semester');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 1, 3, 40,'2023-09-09', 'Dinning Out');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 14, 1, 1000, '2023-09-30', 'Monthly Income');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 2, 1, 150, '2023-09-12', 'Groceries');
INSERT INTO transactions(user_id,category_id, account_id, account_id_to, amount, transaction_date, notes)
VALUES(1, 20, 1, 2, 150, '2023-09-01', 'Transfer from Chequing to Saving');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 14, 1, 1200, '2023-09-20', 'Consulting fee from a project');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 3, 3, 40, '2023-09-02', 'Bus fare');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 2, 1, 200, '2023-10-20', 'Bought some clothes');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 2, 1, 150, '2023-10-15', 'Groceries');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 1, 3, 40,'2023-10-05', 'Dinning Out');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 14, 1, 5000, '2023-10-01', 'Recieved from client');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 14, 1, 2000, '2023-10-30', 'Monthly Income');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 3, 2, 30, '2023-10-10', 'Gas refill for the car');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 11, 3, 100, '2023-10-15', 'Electricity bill payment');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 18, 2, 300, '2023-10-29', 'Rental income received');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 4, 1, 50, '2023-10-07', 'Movie night with friends');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 7, 3, 80, '2023-10-19', 'Family dinner');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 13, 2, 150, '2023-04-12', 'Train tickets for travel');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 15, 1, 500, '2023-11-18', 'Royalties received from a book sale');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 14, 3, 70, '2023-11-22', 'Earned from part-time job');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 8, 1, 120, '2023-11-10', 'Health checkup expenses');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 6, 2, 120, '2023-11-28', 'Home decor items');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 12, 3, 80, '2023-11-05', 'Mobile phone bill payment');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 9, 1, 50, '2023-11-14', 'Sports equipment');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 10, 2, 25, '2023-11-22', 'Pet supplies');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 15, 3, 200, '2023-11-25', 'Dividend from investments');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 17, 1, 300, '2023-11-08', 'Rental income from a property');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 2, 1, 180, '2023-11-15', 'Clothing shopping');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 11, 2, 90, '2023-11-21', 'Internet bill payment');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 3, 3, 40, '2023-11-01', 'Bus fare');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 14, 1, 1200, '2023-11-30', 'Consulting fee from a project');
INSERT INTO transactions(user_id, category_id, account_id, account_id_to, amount, transaction_date, notes)
VALUES(1, 20, 1, 2, 150, '2023-11-29', 'Transfer from Chequing to Saving');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 12, 3, 300, '2023-12-03', 'Travel expenses for holiday getaway');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 2, 1, 300, '2023-12-02', 'Christmas gifts shopping');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 2, 3, 50, '2023-12-03', 'Purchase of holiday decorations');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 7, 1, 200, '2023-12-06', 'Christmas dinner with family');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 13, 3, 1500, '2023-12-01', 'Year-end bonus received');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 13, 1, 2000, '2023-12-01', 'Monthly Income');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 18, 1, 800, '2023-12-04', 'Tenant rent received');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 19, 1, 100, '2023-12-06', 'Gift from grandma and grandpa');

INSERT INTO icons (logo_url)
VALUES
  ('food.png'),
  ('shopping.png'),
  ('transportation.png'),
  ('entertainment.png'),
  ('education.png'),
  ('house.png'),
  ('family.png'),
  ('healthcare.png'),
  ('sports.png'),
  ('pets.png'),
  ('phone.png'),
  ('travel.png'),
  ('salary.png'),
  ('jobs.png'),
  ('royalties.png'),
  ('pension.png'),
  ('investment.png'),
  ('apartment.png'),
  ('gift.png'),
  ('shopping-basket.png'),
  ('transfer.png');
