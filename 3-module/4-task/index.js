function showSalary(users, age) {
  return users
    .filter(u => u.age <= age)
    .map(u => `${u.name}, ${u.balance}`)
    .join("\n");
}