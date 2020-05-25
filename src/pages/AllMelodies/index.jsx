import React, { useEffect, useState } from 'react';
import { fetchGQL } from 'api';
import Melodies from 'components/Melodies';
import localforage from 'localforage';
import * as gql from './gql';

export default function AllMelodies() {
  const [melodies, setMelodies] = useState(null);

  useEffect(() => {
    fetchGQL({
      operation: gql.getMelodies
    }).then(({ data }) => {
      setMelodies(data.getMelodies);
      localforage.setItem('all-melodies', data.getMelodies.map(m => m.id))
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

  return (
    <>
      <h1>Усі мелодії</h1>
      { melodies && <Melodies melodies={melodies} /> }
    </>
  );
}
