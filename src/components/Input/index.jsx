import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

export default function Input({
  value, onChange, name,
  label, invalid, containerStyles,
  invalidText, invalidTextStyles, ...props
}) {
  return (
    <div className={cn(
      containerStyles,
      styles.container
    )}>
      { 
        !!label && (
          <label
            className={cn(
              styles.label,
              invalid && styles.invalid
            )}
            htmlFor={name}
          >
            {label}
          </label>
        )
      }
      <input
        className={cn(
          styles.input,
          invalid && styles.invalid
        )}
        id={name}
        name={name}
        value={value}
        onChange={event => onChange(event.target.value)}
        {...props}
      />
      {
        (invalid && invalidText) && (
          <p className={cn(
            styles.invalidText,
            invalidTextStyles
          )}>
            {invalidText}
          </p>
        )
      }
    </div>
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  invalid: PropTypes.bool,
  containerStyles: PropTypes.string,
  invalidText: PropTypes.string,
  invalidTextStyles: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  invalid: false,
  containerStyles: '',
  invalidText: '',
  invalidTextStyles: '',
};
