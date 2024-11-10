function highlight(table) {
  for (let row of table.tBodies[0].rows) {
    let cells = row.cells;

    let age = parseInt(cells[1].textContent);
    let gender = cells[2].textContent;
    let status = cells[3].dataset.available;

    if (status === undefined) {
      row.hidden = true;
    } else if (status === 'true') {
      row.classList.add('available');
    } else if (status === 'false') {
      row.classList.add('unavailable');
    }

    if (gender === 'm') {
      row.classList.add('male');
    } else if (gender === 'f') {
      row.classList.add('female');
    }

    if (age < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
