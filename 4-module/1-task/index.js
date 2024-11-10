function makeFriendsList(friends) {
  let list = document.createElement('ul');
  for (let obj of friends) {
    let li = document.createElement('li');
    li.textContent = `${obj.firstName} ${obj.lastName}`;
    list.append(li);
  }
  return list;
}
