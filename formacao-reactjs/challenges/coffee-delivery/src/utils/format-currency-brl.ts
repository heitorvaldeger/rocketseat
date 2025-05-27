export const formatCurrencyBRL = (value: number) => value.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).slice(3);
