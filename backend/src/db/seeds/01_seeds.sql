INSERT INTO users (name, email, password)
VALUES ('Rora Alem', 'rora@email.com', '123');


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
VALUES ('Rental Income', 'Income', 'appartment.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Gifts', 'Income', 'gift.png');
INSERT INTO categories(category_name, type, logo_url)
VALUES ('Transfer', 'Transfer', 'transfer.png');



INSERT INTO accounts(account_name, balance, user_id, note)
VALUES('Chequing', 2000, 1, 'Bank chequing account');
INSERT INTO accounts(account_name, balance, user_id, note)
VALUES('Savings', 2000, 1, 'Bank savings account');
INSERT INTO accounts(account_name, balance, user_id, note)
VALUES('Cash Wallet', 2000, 1, 'Cash in wallet');


INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 2, 1, 200, '2023-01-20', 'Bought some clothes');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 2, 1, 150, '2023-11-15', 'Groceries');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 1, 3, 40,'2023-10-05', 'Dinning Out');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 1, 2, 5000, '2023-11-15', 'Recieved from client');
INSERT INTO transactions(user_id,category_id, account_id, amount, transaction_date, notes)
VALUES(1, 14, 1, 1000, '2023-10-30', 'Monthly Income');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 3, 2, 30, '2023-10-10', 'Gas refill for the car');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 5, 1, 200, '2023-09-25', 'Textbooks for the semester');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 11, 3, 100, '2023-08-15', 'Electricity bill payment');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 18, 2, 300, '2023-07-20', 'Rental income received');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 4, 1, 50, '2023-06-10', 'Movie night with friends');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 7, 3, 80, '2023-05-05', 'Family dinner');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 13, 2, 150, '2023-04-12', 'Train tickets for travel');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 16, 1, 500, '2023-03-18', 'Royalties received from a book sale');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 14, 3, 70, '2023-02-22', 'Earned from part-time job');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 8, 1, 120, '2023-01-10', 'Health checkup expenses');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 6, 2, 120, '2023-09-10', 'Home decor items');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 12, 3, 80, '2023-08-05', 'Mobile phone bill payment');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 9, 1, 50, '2023-07-18', 'Sports equipment');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 10, 2, 25, '2023-06-22', 'Pet supplies');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 15, 3, 200, '2023-05-12', 'Dividend from investments');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 17, 1, 300, '2023-04-08', 'Rental income from a property');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 2, 1, 180, '2023-03-15', 'Clothing shopping');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 11, 2, 90, '2023-02-20', 'Internet bill payment');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 3, 3, 40, '2023-01-05', 'Bus fare');
INSERT INTO transactions(user_id, category_id, account_id, amount, transaction_date, notes)
VALUES(1, 14, 1, 1200, '2023-11-30', 'Consulting fee from a project');
INSERT INTO transactions(user_id, category_id, account_id, account_id_to, amount, transaction_date, notes)
VALUES(1, 20, 1, 2, 150, '2023-11-15', 'Transfer from Chequing to Saving');
