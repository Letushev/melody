import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from 'components/Input';
import Button from 'components/Button';
import { fetchGQL } from 'api';
import * as gql from './../gql';
import styles from './settingsStyles.module.scss';

export default function Settings({ melody: initialMelody, saveSettings, cancelSettings }) {
  let history = useHistory();
  const [melody, setMelody] = useState(initialMelody);
  const levels = [
    { value: 'low', label: 'Легка' },
    { value: 'medium', label: 'Середня' },
    { value: 'hard', label: 'Складна' },
  ];

  const save = event => {
    event.preventDefault();
    saveSettings(melody);
    cancelSettings();
  }

  return (
    <div className={styles.settingsContainer}>
      <h2 style={{ textAlign: 'center' }}>Налаштування</h2>
      <form onSubmit={save}>
        <p className={styles.checkContainer}>
          <input
            type="checkbox"
            id="public"
            name="public"
            checked={melody.public}
            onChange={e => setMelody({ ...melody, public: e.target.checked })}
          />
          <label
            className={styles.checkLabel}
            htmlFor="public"
          >
            Публічна
          </label>
        </p>
        <Input
          value={melody.name}
          onChange={text => setMelody({ ...melody, name: text })}
          required
          minLength="2"
          name="name"
          placeholder="Назва мелодії"
        />
        <br />
        <Input
          value={melody.by}
          onChange={text => setMelody({ ...melody, by: text })}
          required
          minLength="2"
          name="by"
          placeholder="Автор мелодії"
        />
        {
          levels.map(level => (
            <p className={styles.checkContainer} key={level.value}>
              <input
                type="radio"
                id={level.value}
                name="level"
                value={level.value}
                checked={level.value === melody.level}
                onChange={() => setMelody({ ...melody, level: level.value })}
              />
              <label
                className={styles.checkLabel}
                htmlFor={level.value}
              >
                {level.label}
              </label>
            </p>
          ))
        }
        <div className={styles.buttons}>
          <Button
            auto small positive
            type="submit"
          >
            Зберегти
          </Button>
          <Button
            auto small neutral
            onClick={() => cancelSettings()}
          >
            Скасувати
          </Button>
        </div>
        <span
          className={styles.delete}
          onClick={() => {
            fetchGQL({
              operation: gql.deleteMelody,
              id: melody.id,
            }).then(() => history.push('/my-melodies'));
          }}
        >
          Видалити
        </span>
      </form>
    </div>
  );
}
