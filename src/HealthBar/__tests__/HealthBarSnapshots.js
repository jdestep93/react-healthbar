import React from 'react';
import renderer from 'react-test-renderer';
import HealthBar from '../HealthBar'

describe('Health Bar Snapshots', () => {
  beforeEach(() => {
    // disable the console error so it doesnt appear in our tests
    jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());
  });

  it('should render correctly', () => {
    expect(
      renderer.create(
        <HealthBar
          percentage={100}
          width={200}
          height={30}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(
      renderer.create(
        <HealthBar
          percentage={0}
          width={100}
          height={10}
          colors={[
            '#9d1',
            '#ff1',
            '#c00'
          ]}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(
      renderer.create(
        <HealthBar
          percentage={55}
          width={100}
          height={200}
          colors={[
            '#9d1',
            '#ff1',
            '#c00',
            '#a00',
            '#b77',
            '#b42'
          ]}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it('should throw an error since theres no percentage', () => {
    expect(() =>
      renderer.create(
        <HealthBar
          width={100}
          height={200}
          colors={[
            '#9d1',
            '#ff1',
            '#c00',
            '#a00',
            '#b77',
            '#b42'
          ]}
        />
      )
    ).toThrow()
  });

  it('should throw if there is an invalid hex color', () => {
    try {
      renderer.create(
        <HealthBar
          percentage={32}
          width={100}
          height={200}
          colors={[
            '#9d1',
            '#ff1',
            '#c00',
            '#a00',
            '#b77',
            '#someinvalidhexcolor'
          ]}
        />
      )
    } catch (e) {
      expect(!!e).toBe(true);
    }
  });

  it('should throw if the percentage is below 0', () => {
    try {
      renderer.create(
        <HealthBar
          percentage={-1}
          width={100}
          height={200}
          colors={[
            '#9d1',
            '#ff1',
            '#c00',
            '#a00',
            '#b77',
            '#b42'
          ]}
        />
      )
    } catch (e) {
      expect(!!e).toBe(true);
    }
  });

  it('should throw if the percentage is above 100', () => {
    try {
      renderer.create(
        <HealthBar
          percentage={101}
          width={100}
          height={200}
          colors={[
            '#9d1',
            '#ff1',
            '#c00',
            '#a00',
            '#b77',
            '#b42'
          ]}
        />
      )
    } catch (e) {
      expect(!!e).toBe(true);
    }
  });
});
