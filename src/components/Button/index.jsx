import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

export default function Button({ 
  children, auto, negative,
  positive, small, extraStyles,
  ...props 
}) {
  return (
    <button
      className={cn(
        styles.button,
        auto && styles.auto,
        negative && styles.negative,
        positive && styles.positive,
        small && styles.small,
        extraStyles && extraStyles,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  auto: PropTypes.bool,
  negative: PropTypes.bool,
  positive: PropTypes.bool,
  small: PropTypes.bool,
  extraStyles: PropTypes.string,
};

Button.defaultProps = {
  auto: false,
  negative: false,
  positive: false,
  small: false,
  extraStyles: '',
};
