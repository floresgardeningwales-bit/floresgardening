export function formatGBP(pence = 0) {
  return new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:0}).format(Number(pence||0)/100);
}
