import React, { useEffect, useState } from 'react';
import { fetchGQL } from 'api';
import Melodies from 'components/Melodies';
import localforage from 'localforage';
import Button from 'components/Button';
import * as gql from './gql';
import Search from './Search';
import styles from './styles.module.scss';

export default function AllMelodies() {
  const [melodies, setMelodies] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchGQL({
      operation: gql.getMelodies,
      first: 10,
    }).then(({ data }) => {
      setMelodies(data.getMelodies.melodies);
      setCount(data.getMelodies.count);
      localforage.setItem('all-melodies', data.getMelodies.melodies.map(m => m.id));
    })
      .catch(() => {
        localforage.getItem('all-melodies', (_, list) => {
          if (list) {
            Promise.all(
              list.map(id => {
                return caches.match(`/melody/${id}`)
                  .then(r => {
                    if (r) return r.json();
                  });
              })).then(response => {
                const mapped = response
                  .filter(o => !!o)
                  .map(o => {
                    if (o) {
                      return o.data.getMelody;
                    }
                  });
                setMelodies(mapped);
              })
          }
        })
      })
  }, []);

  const onSearch = text => {
    fetchGQL({
      operation: gql.getMelodies,
      text,
    }).then(({ data }) => {
      setMelodies(data.getMelodies.melodies);
      setCount(data.getMelodies.count);
    })
  };

  const getMoreMelodies = () => {
    fetchGQL({
      operation: gql.getMelodies,
      first: 10,
      skip: melodies.length,
    }).then(({ data }) => {
      const more = data.getMelodies.melodies;
      setMelodies([
        ...melodies,
        ...more,
      ]);
    });
  }

  return (
    <>
      <h1>Усі мелодії</h1>
      <Search search={onSearch} />
      { melodies && <p>Знайдено <b>{count}</b> мелодій (відображено <b>{melodies.length}</b>)</p> }
      { melodies && <Melodies melodies={melodies} /> }
      {
        melodies && count > melodies.length && (
          <Button
            auto
            extraStyles={styles.moreButton}
            onClick={getMoreMelodies}
          >
            Завантажити ще
          </Button>
        )
      }
    </>
  );
}
