import React, { useState, useEffect } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import { ReactComponent as GuitaristSVG } from 'images/guitarist.svg';
import { fetchGQL } from 'api';
import Melodies from 'components/Melodies';
import * as gql from './gql';
import styles from './styles.module.scss';

export default function MyMelodies() {
  const initialMelody = {
    isAdding: false,
    name: '',
    by: '',
  };

  const [newMelody, setNewMelody] = useState(initialMelody);
  const [melodies, setMelodies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGQL({
      operation: gql.getMelodies,
    })
      .then(({ data }) => {
        setMelodies(data.user.melodies);
        setIsLoading(false);
      });
  }, []);

  let content;

  const createMelody = event => {
    event.preventDefault();
    fetchGQL({
      operation: gql.createMelody,
      name: newMelody.name,
      by: newMelody.by,
    })
      .then(({ data }) => {
        setNewMelody(initialMelody);
        const melodiesUpdated = [...melodies];
        melodiesUpdated.push(data.createMelody);
        setMelodies(melodiesUpdated);
      });
  };

  if (isLoading) {
    return null;
  }

  if (newMelody.isAdding) {
    content = (
      <form className={styles.form} onSubmit={createMelody}>
        <Input
          value={newMelody.name}
          onChange={text => setNewMelody({ ...newMelody, name: text })}
          name="name"
          label="Назва мелодії"
          minLength="2"
          required
          containerStyles={styles.input}
        />
        <Input
          value={newMelody.by}
          onChange={text => setNewMelody({ ...newMelody, by: text })}
          name="by"
          label="Автор мелодії"
          minLength="2"
          required
          containerStyles={styles.input}
        />
        <div className={styles.buttons}>
          <Button
            type="submit"
            positive small auto
            extraStyles={styles.button}
          >
            Створити
          </Button>
          <Button
            negative small auto
            extraStyles={styles.button}
            onClick={() => setNewMelody(initialMelody)}         
          >
            Скасувати
          </Button>
        </div>
      </form>
    );
  } else {
    if (!melodies.length) {
      content = (
        <div className={styles.empty}>
          <GuitaristSVG className={styles.emptyImage} />
          <h2>Ваш список мелодій порожній.<br />Створіть мелодію прямо зараз!</h2>
        </div>
      );
    } else {
      content = (
        <Melodies melodies={melodies} />
      )
    }
  }
  return (
    <>
      <div className={styles.heading}>
        <h1 style={{ marginRight: "24px" }}>Мої мелодії</h1>
        <Button
          auto
          small
          positive
          onClick={() => setNewMelody({ ...newMelody, isAdding: true })}
        >
          Створити
        </Button>
      </div>
      { content }
    </>
  );
}
