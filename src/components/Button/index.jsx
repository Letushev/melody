import React from 'react';
import styles from './styles.module.scss';

export default function Button({ children, ...props }) {
  return (
    <button
      className={styles.button}
      {...props}
    >
      {children}
    </button>
  )
}
