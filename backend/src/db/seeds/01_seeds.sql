INSERT INTO users (name, email, password)
VALUES ('Afreeda Mahesaniya', 'afreeda@email.com', '123');
INSERT INTO users (name, email, password)
VALUES ('Rora Alem', 'rora@email.com', '123');


INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Food/Drinks', 'Expense', 'logo1.png', 1);


-- INSERT INTO accounts(account_name, balance, user_id, note)
-- VALUES("Wallet", 2000, 1, "Wallet account");

-- INSERT INTO transactions(user_id,category_id, account_id, amount, notes)
-- VALUES(1, 1, 1, 200, 'Bought some clothes');
-- INSERT INTO transactions(user_id,category_id, account_id, amount, notes)
-- VALUES('Food', 1, 50, 'Groceries');
-- INSERT INTO transactions(user_id,category_id, account_id, amount)
-- VALUES('Dinning Out', 3, 100);
-- INSERT INTO transactions(user_id,category_id, account_id, amount, notes)
-- VALUES('Freelancing', 4, 5000, 'Recieved from client');
-- INSERT INTO transactions(user_id,category_id, account_id, amount, notes)
-- VALUES('Salary', 5, 1000, 'Monthly Income');