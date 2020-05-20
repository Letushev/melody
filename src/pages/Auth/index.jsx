import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Name from 'components/Name';
import Input from 'components/Input';
import Button from 'components/Button';
import styles from './styles.module.scss';
import { isPasswordCorrect } from './helpers';

export default function Auth({ signup }) {
  const baseConfig = {
    value: '',
    invalid: false
  };

  const [nickname, setNickname] = useState(baseConfig);
  const [password, setPassword] = useState(baseConfig);
  const [isChecking, setChecking] = useState(false);

  useEffect(() => {
    setPassword(baseConfig);
    setNickname(baseConfig);
    setChecking(false);
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
    // try to signin or signup
    setChecking(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.auth}>
        <Name />
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
