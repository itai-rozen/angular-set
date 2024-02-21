const cardImgNums = [...new Array(81).keys()]

const shuffle = arr  => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr
}

const createGame = () => {
  return new Promise((resolve, reject) => {
    const shuffledImgNums = shuffle(cardImgNums)
    console.log('shuffled: ', shuffledImgNums)
    resolve(shuffledImgNums)
  })
}

module.exports = {
  createGame
}