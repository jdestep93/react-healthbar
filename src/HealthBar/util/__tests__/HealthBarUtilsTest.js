import {
  getHealthBarBackgroundColor,
  generateMinMaxForColors,
  hexColorRegex
} from '../HealthBarUtils';

describe('Health Bar Utilities', () => {
  it('should match the hex color regex', () => {
    expect(hexColorRegex.test('#FFFFFF')).toBe(true);
    expect(hexColorRegex.test('#cccccc')).toBe(true);
    expect(hexColorRegex.test('#2d3f4d')).toBe(true);
    expect(hexColorRegex.test('#1a2d3f')).toBe(true);
    expect(hexColorRegex.test('#222')).toBe(true);
    expect(hexColorRegex.test('#c00')).toBe(true);
    expect(hexColorRegex.test('#DDDDDD')).toBe(true);
    expect(hexColorRegex.test('#4e2f1a')).toBe(true);

    expect(hexColorRegex.test('#00000')).toBe(false);
    expect(hexColorRegex.test('#333e')).toBe(false);
    expect(hexColorRegex.test('#2d4gds')).toBe(false);
    expect(hexColorRegex.test('#somestring')).toBe(false);
  });

  it('should generate the min and maxes for the color pallet', () => {
    expect(generateMinMaxForColors(['#CCCCCC'])).toEqual([{color: '#CCCCCC', max: 101, min: 0}]);
    expect(generateMinMaxForColors(['#CCCCCC', '#FFFFFF'])).toEqual([
      {color: '#CCCCCC', max: 101, min: 50},
      {color: '#FFFFFF', max: 50, min: 0}
    ]);
    expect(generateMinMaxForColors(['#CCCCCC', '#FFFFFF', '#AAAAAA'])).toEqual([
      {color: '#CCCCCC', max: 101, min: 66.66666666666666},
      {color: '#FFFFFF', max: 66.66666666666666, min: 33.33333333333333},
      {color: '#AAAAAA', max: 33.33333333333333, min: 0}
    ]);
    expect(generateMinMaxForColors(['#CCCCCC', '#FFFFFF', '#AAAAAA', '#DDDDDD'])).toEqual([
      {color: '#CCCCCC', max: 101, min: 75},
      {color: '#FFFFFF', max: 75, min: 50},
      {color: '#AAAAAA', max: 50, min: 25},
      {color: '#DDDDDD', max: 25, min: 0}
    ]);
    expect(generateMinMaxForColors([
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
    ])).toEqual([
      {color: '#15c621', max: 101, min: 90},
      {color: '#73c615', max: 90, min: 80},
      {color: '#abc615', max: 80, min: 70},
      {color: '#c6c615', max: 70, min: 60},
      {color: '#c6ab15', max: 60, min: 50},
      {color: '#c69015', max: 50, min: 40},
      {color: '#c66715', max: 40, min: 30},
      {color: '#cb4015', max: 30, min: 20},
      {color: '#c62e15', max: 20, min: 10},
      {color: '#c61515', max: 10, min: 0}
    ]);
  });

  it('should get the health bar color', () => {
    const healthBarColors = [
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

    expect(getHealthBarBackgroundColor(100, healthBarColors)).toBe('#15c621');
    expect(getHealthBarBackgroundColor(90, healthBarColors)).toBe('#15c621');
    expect(getHealthBarBackgroundColor(89, healthBarColors)).toBe('#73c615');
    expect(getHealthBarBackgroundColor(80, healthBarColors)).toBe('#73c615');
    expect(getHealthBarBackgroundColor(79, healthBarColors)).toBe('#abc615');
    expect(getHealthBarBackgroundColor(70, healthBarColors)).toBe('#abc615');
    expect(getHealthBarBackgroundColor(69, healthBarColors)).toBe('#c6c615');
    expect(getHealthBarBackgroundColor(60, healthBarColors)).toBe('#c6c615');
    expect(getHealthBarBackgroundColor(59, healthBarColors)).toBe('#c6ab15');
    expect(getHealthBarBackgroundColor(50, healthBarColors)).toBe('#c6ab15');
    expect(getHealthBarBackgroundColor(49, healthBarColors)).toBe('#c69015');
    expect(getHealthBarBackgroundColor(40, healthBarColors)).toBe('#c69015');
    expect(getHealthBarBackgroundColor(39, healthBarColors)).toBe('#c66715');
    expect(getHealthBarBackgroundColor(30, healthBarColors)).toBe('#c66715');
    expect(getHealthBarBackgroundColor(29, healthBarColors)).toBe('#cb4015');
    expect(getHealthBarBackgroundColor(20, healthBarColors)).toBe('#cb4015');
    expect(getHealthBarBackgroundColor(19, healthBarColors)).toBe('#c62e15');
    expect(getHealthBarBackgroundColor(10, healthBarColors)).toBe('#c62e15');
    expect(getHealthBarBackgroundColor(9, healthBarColors)).toBe('#c61515');
    expect(getHealthBarBackgroundColor(0, healthBarColors)).toBe('#c61515');
  });

  it('should throw an error if the argument is not an array', () => {
    expect(() => getHealthBarBackgroundColor(80, {not: {an: 'array'}})).toThrow(Error);
    expect(() => generateMinMaxForColors(80)).toThrow(Error);
  });

  it('should throw an error if argument is not a number', () => {
    expect(() => getHealthBarBackgroundColor('not a number', [])).toThrow(Error);
  })
});
