import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default function Melodies({ melodies }) {
  const formatDate = date => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };
  return (
    <div className={styles.container}>
      {
        melodies.map(melody => (
          <div
            key={melody.id}
            className={styles.melody}
          >
            <p className={styles.name}>
              {melody.name}
            </p>
            <p className={styles.by}>
              {melody.by}
            </p>
            <p className={styles.createdAt}>
              {formatDate(melody.createdAt)}
            </p>
          </div>
        ))
      }
    </div>
  );
  
}

Melodies.propTypes = {
  melodies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    by: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  })).isRequired,
}
