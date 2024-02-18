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
}