import { Card, COLOR, SHAPE, FILL } from "../types/types"

const deck: number[] = [...new Array(81).keys()]

const getColor = (num: number): Card['color'] => {
  let chosenColor : Card['color'] = COLOR.BLUE
  if (num < 27)
    chosenColor = COLOR.RED
  if (num > 26 && num < 54)
    chosenColor = COLOR.GREEN
  return chosenColor
}

const getFill = (num:number): Card['fill'] => {
  let chosenFill : Card['fill'] = FILL.STRIPED 
  const newNum = num % 27
  if (newNum < 9)
    chosenFill = FILL.OPEN
  if (newNum > 17)
    chosenFill = FILL.SOLID
  return chosenFill
}

const getShape = (num : number): Card['shape'] => {
  let chosenShape = SHAPE.OVAL
  const newNum = num % 9
  if (newNum < 3)
    chosenShape = SHAPE.DIAMOND
  if (newNum > 5)
    chosenShape = SHAPE.SQUIGGLE
  return chosenShape
}   

const getNumberOfShapes = (num: number): Card['numOfShapes'] => {
  return (num % 3 + 1) as Card['numOfShapes']
}



export const getCardsFromImgNumbers = (imgNums : number[]) => {
  return imgNums.map(imgNum => {
    return {
      shape: getShape(imgNum) as Card['shape'], 
      numOfShapes: getNumberOfShapes(imgNum) as Card['numOfShapes'], 
      fill: getFill(imgNum) as Card['fill'], 
      color: getColor(imgNum) as Card['color'],
      imgNumber: +imgNum,
      isClicked: false,
      isMatched: false
    }
  })
} 

export const cards: Card[] = getCardsFromImgNumbers(deck)

export const shuffle = (arr : Card[]):Card[] => {
  const shuffledArray = [...arr]; 

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }
  return shuffledArray;
}
