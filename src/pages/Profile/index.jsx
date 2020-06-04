import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ProfileSVG } from 'images/profile.svg';
import { fetchGQL } from 'api';
import Button from 'components/Button';
import * as gql from './gql';
import styles from './styles.module.scss';

export default function Profile() {
  let history = useHistory();
  const [nickname, setNickname] = useState(null);
  const [avatar, setAvatar] = useState('');

  useEffect(() => { 
    fetchGQL({
      operation: gql.user,
    })
      .then(({ data }) => {
        setNickname(data.user.nickname);
        setAvatar(data.user.image);
      });
  }, []);

  const changeImage = target => {
    if (!target.files) {
      return;
    }

    const file = target.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      fetchGQL({
        operation: gql.changeAvatar,
        image: result,
      })
        .then(() => {
          setAvatar(result);
        });
    };

    reader.readAsDataURL(file);
  }
  
  if (!nickname) {
    return null;
  }

  return (
    <div className={styles.container}>
      <label htmlFor="avatar" className={styles.avatar}>
        {
          avatar
            ? <img src={avatar} alt={nickname} />
            : <ProfileSVG />
        }       
      </label>
      <h1 className={styles.nickname}>{nickname}</h1>
      <Button
        negative
        onClick={() => {
          localStorage.removeItem('authToken');
          history.push('/signin');
        }}
      >
        Вийти
      </Button>
      <input
        id="avatar"
        type="file"
        onChange={event => changeImage(event.target)}
        accept=".png, .jpg, .jpeg"
        hidden
      />
    </div>
  );
}
