function getMinMax(str) {
  let result = { min: Infinity, max: -Infinity };

  str.split(/[^0-9.+-]+/)
    .map(Number)
    .filter(n => !isNaN(n))
    .forEach((n) => {
      if (n < result.min) result.min = n;
      if (n > result.max) result.max = n;
    });

  return result;
}