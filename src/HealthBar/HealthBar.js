import React from 'react';
import PropTypes from 'prop-types';
import {
  getHealthBarBackgroundColor,
  defaultColorPallet,
  hexColorRegex
} from './util/HealthBarUtils';

export default function HealthBar({
  percentage,
  colors = defaultColorPallet,
  width = 150,
  height = 24
}) {
  return (
    <div
      style={{
        borderRadius: '3px',
        border: '1px solid black',
        maxWidth: width,
        height
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: '100%',
          minHeight: height,
          backgroundColor: getHealthBarBackgroundColor(percentage, colors)
        }}
      >
        &nbsp;
      </div>
    </div>
  );
}

HealthBar.propTypes = {
  percentage: PropTypes.between({gte: 0, lte: 100}).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  colors: PropTypes.arrayOf((propValue, key, componentName) => {
    if (!hexColorRegex.match(propValue[key])) {
      return new Error(
        `Invalid color code ${propValue[key]} supplied to ${componentName}`
      );
    }
  })
};
