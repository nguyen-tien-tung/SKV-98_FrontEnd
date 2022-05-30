export default (money: number) =>
  money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
