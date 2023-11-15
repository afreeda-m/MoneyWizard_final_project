INSERT INTO users (name, email, password)
VALUES ('Afreeda Mahesaniya', 'afreeda@email.com', '123');
INSERT INTO users (name, email, password)
VALUES ('Rora Alem', 'rora@email.com', '123');


INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Food/Drinks', 'Expense', 'food.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Shopping', 'Expense', 'shopping.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Transportation', 'Expense', 'transportation.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Entertainment', 'Expense', 'entertainment.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Education', 'Expense', 'education.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Home', 'Expense', 'house.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Family', 'Expense', 'family.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('HealthCare', 'Expense', 'healthcare.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Sports', 'Expense', 'sports.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Pets', 'Expense', 'pets.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Bills', 'Expense', 'phone.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Travels', 'Expense', 'travel.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Salary/Wages', 'Income', 'salary.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Odd Jobs', 'Income', 'jobs.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Royalties', 'Income', 'royalties.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Pension', 'Income', 'pension.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Investment', 'Income', 'investment.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Rental Income', 'Income', 'appartment.png', 1);
INSERT INTO categories(category_name, type, logo_url, user_id)
VALUES ('Gifts', 'Income', 'gift.png', 1);



INSERT INTO accounts(account_name, balance, user_id, note)
VALUES('Wallet', 2000, 1, 'Wallet account');
INSERT INTO accounts(account_name, balance, user_id, note)
VALUES('Piggy-Bank', 2000, 1, 'bank account');
INSERT INTO accounts(account_name, balance, user_id, note)
VALUES('Cash', 2000, 1, 'cash account');


INSERT INTO transactions(user_id,category_id, account_id, amount, notes)
VALUES(1, 2, 1, 200, 'Bought some clothes');
INSERT INTO transactions(user_id,category_id, account_id, amount, notes)
VALUES(1, 2, 1, 150, 'Groceries');
INSERT INTO transactions(user_id,category_id, account_id, amount, notes)
VALUES(1, 1, 3, 40,'Dinning Out');
INSERT INTO transactions(user_id,category_id, account_id, amount, notes)
VALUES(1, 1, 2, 5000, 'Recieved from client');
INSERT INTO transactions(user_id,category_id, account_id, amount, notes)
VALUES(1, 14, 1, 1000, 'Monthly Income');

