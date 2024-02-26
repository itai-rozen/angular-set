export enum SHAPE  {
  DIAMOND = 'diamond',
  OVAL = 'oval',
  SQUIGGLE = 'squiggle'
}
export enum FILL {
  SOLID = 'solid',
  STRIPED = 'striped',
  OPEN = 'open'
}
export enum COLOR {
  BLUE = 'blue',
  RED = 'red',
  GREEN = 'green'
}
export interface Card {
  shape: SHAPE,
  numOfShapes: 1|2|3,
  fill: FILL,
  color: COLOR,
  imgNumber: number,
  isClicked: boolean,
  isMatched: boolean
}
//TODO switch to single type (Room[])
export type RoomsObjType = {
  [key: string] : GameObjType 
}
export type GameObjType = {
  activePlayers: { [key: string]: string }, 
  cards: Card[],
  id: string
}

export type PlayersObjType = {
    _id: string,
    sets: number,
    gameId: string,
    isStartGame: boolean,
    isClickedSet: boolean,
    name?: string
}