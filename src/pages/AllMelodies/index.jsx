import React, { useEffect, useState } from 'react';
import { fetchGQL } from 'api';
import Melodies from 'components/Melodies';
import * as gql from './gql';

export default function AllMelodies() {
  const [melodies, setMelodies] = useState(null);

  useEffect(() => {
    fetchGQL({
      operation: gql.getMelodies
    }).then(({ data }) => {
      setMelodies(data.getMelodies);
    });
  }, []);

  return (
    <>
      <h1>Усі мелодії</h1>
      { melodies && <Melodies melodies={melodies} /> }
    </>
  );
}
