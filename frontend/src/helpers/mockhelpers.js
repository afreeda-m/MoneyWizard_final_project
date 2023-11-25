import categories from "../mocks/categories";
import transactions from "../mocks/transactions";

export const getCategoryNameById = (id, categories) => {
  const result = categories.find(category => category.id === id);

  return result.category_name;
};

export const getCategoryIconById = (id, categories) => {
  const result = categories.find(category => category.id === id);

  return result.logo_url;
};

export const getAccountNameById = (id, accounts) => {
  const result = accounts.find(account => account.id === id);

  return result.account_name;
};
// Calculate income distribution by category
export const calculateIncomeDistribution = () => {
  const totalIncome = transactions
    .filter(transaction => {
      const category = categories.find(cat => cat.id === transaction.category_id);
      return category && category.type === 'Income';
    })
    .reduce((total, transaction) => total + transaction.amount, 0);

  const incomeByCategory = categories
    .filter(category => category.type === 'Income')
    .map(incomeCategory => {
      const categoryIncome = transactions
        .filter(transaction => transaction.category_id === incomeCategory.id)
        .reduce((total, transaction) => total + transaction.amount, 0);

      // Calculate percentage
      const percentage = ((categoryIncome / totalIncome) * 100).toFixed();

      return {
        label: incomeCategory.category_name,
        value: percentage,
      };
    });

  return incomeByCategory;
};


// Calculate expense distribution by category
export const calculateExpenseDistribution = () => {
  const totalExpenses = transactions
    .filter(transaction => {
      const category = categories.find(cat => cat.id === transaction.category_id);
      return category && category.type === 'Expense';
    })
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenseByCategory = categories
    .filter(category => category.type === 'Expense')
    .map(expenseCategory => {
      const categoryExpense = transactions
        .filter(transaction => transaction.category_id === expenseCategory.id)
        .reduce((total, transaction) => total + transaction.amount, 0);

      // Calculate percentage
      const percentage =((categoryExpense / totalExpenses) * 100).toFixed();

      return {
        label: expenseCategory.category_name,
        value: percentage,
      };
    });

  return expenseByCategory;
};
