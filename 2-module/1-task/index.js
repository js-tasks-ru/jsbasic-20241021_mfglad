function sumSalary(salaries) {
  let sum = 0;
  for (key in salaries) {
    if (Number.isInteger(salaries[key])) {
      sum += salaries[key];
    }
  }
  return sum;
}
