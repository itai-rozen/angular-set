import { Card } from "./types/types"
const configs = {
  shape: ['diamond', 'oval', 'squiggle'],
  number: [1,2,3],
  fill: ['solid', 'striped', 'open'],
  color: ['red', 'green', 'blue']
}

const getCards = () => {
  const cards = [];
  for (let i = 0; i < configs.shape.length; i++) {
    for (let j = 0; j < configs.number.length; j++) {
      for (let k = 0; k < configs.fill.length; k++) {
        for (let l = 0; l < configs.color.length; l++){
          const card: Card = {
            shape: configs.shape[i] as  Card['shape'],
            numOfShapes: configs.number[j] as Card['numOfShapes'],
            fill: configs.fill[k] as Card['fill'],
            color: configs.color[l] as Card['color']
          }
          cards.push(card)
        }
      }
    }
  }
  return cards;
} 

// export const cards: Card[] = getCards().sort(() => 0.5 - Math.random());
export const cards: Card[] = [{
  shape:'squiggle' as Card['shape'], 
  numOfShapes: 3 as Card['numOfShapes'], 
  fill:'striped' as Card['fill'], 
  color: 'red' as Card['color']
}];
