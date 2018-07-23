import {first, inRange} from 'lodash';

export const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const defaultColorPallet = [
  '#15c621',
  '#73c615',
  '#abc615',
  '#c6c615',
  '#c6ab15',
  '#c69015',
  '#c66715',
  '#cb4015',
  '#c62e15',
  '#c61515'
];

export function generateMinMaxForColors(healthBarColors) {
  if (!healthBarColors instanceof Array) throw new Error('argument must be an array!');

  return healthBarColors.map((color, index) => ({
    color,
    max: (index === 0 ? 101 : 100) - ((100 / healthBarColors.length) * index),
    min: 100 - ((100 / healthBarColors.length) * (index + 1))
  }));
}

export function getHealthBarBackgroundColor(percentage, healthBarColors) {
  if (!healthBarColors instanceof Array) throw new Error('argument must be an array!');
  if (isNaN(percentage)) throw new Error('percentage must be a number!');

  return first(generateMinMaxForColors(healthBarColors)
    .filter(colorInfo => inRange(percentage, colorInfo.min, colorInfo.max))
  ).color;
}
