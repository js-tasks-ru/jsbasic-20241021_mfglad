function getMinMax(str) {
  let numbers = str.split(/[^0-9.+-]+/)
    .map(Number)
    .filter(n => !isNaN(n));

  return { min: Math.min(...numbers), max: Math.max(...numbers) };
}