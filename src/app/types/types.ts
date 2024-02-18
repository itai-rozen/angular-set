enum SHAPE  {
  DIAMOND = 'diamond',
  OVAL = 'oval',
  SQUIGGLE = 'squiggle'
}
enum FILL {
  SOLID = 'solid',
  STRIPED = 'striped',
  OPEN = 'open'
}
enum COLOR {
  BLUE = 'blue',
  RED = 'red',
  GREEN = 'green'
}
export interface Card {
  shape: SHAPE,
  numOfShapes: 1|2|3,
  fill: FILL,
  color: COLOR
}