import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

export default function Button({ 
  children, auto, negative,
  ...props 
}) {
  return (
    <button
      className={cn(
        styles.button,
        auto && styles.auto,
        negative && styles.negative,
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
};

Button.defaultProps = {
  auto: false,
  negative: false,
};
