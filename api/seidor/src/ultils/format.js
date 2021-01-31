export const formatToCurrency = amount => {
    return "R$" + amount.replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };