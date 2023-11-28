export const getCategoryNameById = (id, categories) => {
  const result = categories.find(category => category.id === id);

  return result.category_name;
};

export const getCategoryIconById = (id, categories) => {
  const result = categories.find(category => category.id === id);

  return result.logo_url;
};

export const getCategoryTypeById = (id, categories) => {
  const result = categories.find(category => category.id === id);

  return result.type;
};

export const getAccountNameById = (id, accounts) => {
  const result = accounts.find(account => account.id === id);

  return result.account_name;
};
