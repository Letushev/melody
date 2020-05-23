import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDate } from 'helpers';
import cn from 'classnames';
import styles from './styles.module.scss';

export default function Melodies({ melodies }) {
  return (
    <div className={styles.container}>
      {
        melodies.map(melody => (
          <Link
            to={`/melody/${melody.id}`}
            key={melody.id}
            className={cn(
              styles.melody,
              melody.level && styles[melody.level]
            )}
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
          </Link>
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
