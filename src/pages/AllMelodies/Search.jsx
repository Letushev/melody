import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';
import Button from 'components/Button';
import styles from './styles.module.scss';

export default function Search({ search }) {
  const [text, setText] = useState('');

  return (
    <div className={styles.searchContainer}>
      <Input
        value={text}
        onChange={updated => setText(updated)}
        name="searchMelody"
        placeholder="Введіть назву мелодію / автора"
        containerStyles={styles.searchInput}
      />
      <Button
        small auto
        onClick={() => search(text.trim())}
      >
        Пошук
      </Button>
    </div>
  );
}

Search.propTypes = {
  search: PropTypes.func.isRequired,
};
