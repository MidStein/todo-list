function sortByPriority(todoArr) {
  let medL = 0, medH = todoArr.length - 1;
  const resArr = [];
  for (let i = 0; i < todoArr.length; i++) {
    if (todoArr[i].priority == '1') {
      resArr[medL] = todoArr[i];
      medL++;
    } else if (todoArr[i].priority == '3') {
      resArr[medH] = todoArr[i];
      medH--;
    }
  }
  for (let i = 0; i < todoArr.length; i++) {
    if (todoArr[i].priority == '2') {
      resArr[medL] = todoArr[i];
      medL++;
    }
  }
  return resArr;
}

export default sortByPriority;