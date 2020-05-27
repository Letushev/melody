import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Name from 'components/Name';
import Input from 'components/Input';
import Button from 'components/Button';
import { fetchGQL } from 'api';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';
import { isPasswordCorrect } from './helpers';
import * as gql from './gql';

export default function Auth({ signup }) {
  let history = useHistory();
  const baseConfig = {
    value: '',
    invalid: false
  };

  const [nickname, setNickname] = useState(baseConfig);
  const [password, setPassword] = useState(baseConfig);
  const [isChecking, setChecking] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState([]);

  useEffect(() => {
    setPassword(baseConfig);
    setNickname(baseConfig);
    setChecking(false);
    setErrorMsgs([]);
  }, [signup]);

  useEffect(() => {
    onChangeNickname(nickname.value);
    onChangePassword(password.value);
  }, [isChecking]);


  const onChangeNickname = text => {
    const n = { ...nickname };
    n.invalid = signup && isChecking && text.length < 4;
    n.value = text;
    setNickname(n);
  };

  const onChangePassword = text => {
    const p = { ...password };
    p.invalid = signup && isChecking && !isPasswordCorrect(text);
    p.value = text;
    setPassword(p);
  };

  const onSubmitForm = event => {
    event.preventDefault();
    setChecking(true);

    if (signup && (nickname.value.length < 4 || !isPasswordCorrect(password.value))) {
      return;
    }

    const credentials = {
      nickname: nickname.value,
      password: password.value,
    };

    const type = signup ? 'signup' : 'login';

    fetchGQL({
      operation: gql[type],
      ...credentials,
    })
      .then(({ data, errors }) => {
        if (errors) {
          setErrorMsgs(errors.map(e => e.message));
        } else {
          localStorage.setItem('authToken', data[type].token);
          history.push('/my-melodies');
        }
      });
  };

  if (!!localStorage.getItem('authToken')) {
    return <Redirect to="/my-melodies" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.auth}>
        <NavLink exact to="/" className={styles.name}>
          <Name />
        </NavLink>
        <form
          className={styles.form}
          onSubmit={onSubmitForm}
        >
          <Input
            value={nickname.value}
            onChange={onChangeNickname}
            invalid={nickname.invalid}
            invalidText="Має містити як мінімум 4 літери"
            name="nickname"
            label="Нікнейм"
            minLength="4"
            maxLength="48"
            containerStyles={styles.inputContainer}
            invalidTextStyles={styles.invalidText}
          />
          <Input
            type="password"
            value={password.value}
            onChange={onChangePassword}
            invalid={password.invalid}
            invalidText="Має містити як мінімум 8 літер: принаймні одну цифру, одну маленьку літеру та одну велику літеру"
            name="password"
            label="Пароль"
            minLength="8"
            maxLength="48"
            containerStyles={styles.inputContainer}
            invalidTextStyles={styles.invalidText}
          />
          <Button type="submit">
            { signup ? 'Зареєструватися' : 'Увійти' }
          </Button>
          <p className={styles.subtext}>
            { signup 
                ? (
                  <>
                    {'Уже маєте акаунт? '}
                    <Link to="/signin">Увійти</Link> 
                  </>
                )
                : (
                  <>
                    {'Не маєте акаунту? '}
                    <Link to="/signup">Зареєструватися</Link> 
                  </>
                )
            }
          </p>
          {
            !!errorMsgs.length && (
              <ul className={styles.errors}>
                {
                  errorMsgs.map((error, i) => (
                    <li key={i}>
                      {error}
                    </li>
                  ))
                }
              </ul>
            )
          }
        </form>
      </div>
    </div>
  );
}

Auth.propTypes = {
  signup: PropTypes.bool,
};

Auth.defaultProps = {
  signup: false,
};
