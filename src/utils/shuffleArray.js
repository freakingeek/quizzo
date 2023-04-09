function shuffleArray(array) {
  let curId = array.length;

  while (curId) {
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;

    let tmp = array[curId];

    array[curId] = array[randId];
    array[randId] = tmp;
  }

  return array;
}

export default shuffleArray;
