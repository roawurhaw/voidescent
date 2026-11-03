// All prices are integer euro cents. Format the Dutch way: €14,99.
export function euro(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(Math.round(cents));
  const whole = Math.floor(abs / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const fraction = (abs % 100).toString().padStart(2, "0");
  return `${sign}€${whole},${fraction}`;
}
