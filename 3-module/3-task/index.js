function camelize(str) {
  return str
    .split('-')
    .map((s, index) => index === 0 ? s : s[0].toUpperCase() + s.slice(1))
    .join('');
}