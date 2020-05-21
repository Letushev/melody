import React from 'react';
import { NavLink } from 'react-router-dom';
import Name from 'components/Name';
import cn from 'classnames';
import styles from './styles.module.scss';

export default function Header() {
  const nav = [
    { link: '/all-melodies', label: 'Усі мелодії' },
    { link: '/my-melodies', label: 'Мої мелодії' },
    { link: '/profile', label: 'Профіль' },
  ];

  return (
    <header className={styles.header}>
      <div className={cn(styles.inner, "maxWidth")}>
        <Name />
        <nav>
          <ul className={styles.nav}>
            {
              nav.map(el => (
                <li key={el.link}>
                  <NavLink
                    to={el.link}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                  >
                    {el.label}
                  </NavLink>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}
