import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import Name from 'components/Name';
import { ReactComponent as MenuSVG } from 'images/menu.svg';
import { ReactComponent as CloseSVG } from 'images/close.svg';
import styles from './styles.module.scss';

export default function Header() {
  const nav = [
    { link: '/all-melodies', label: 'Усі мелодії' },
    { link: '/my-melodies', label: 'Мої мелодії' },
    { link: '/profile', label: 'Профіль' },
  ];

  const [sidebar, setSidebar] = useState(false);

  return (
    <header className={styles.header}>
      <div className={cn(styles.inner, "maxWidth")}>
        <MenuSVG
          className={styles.menu}
          onClick={() => setSidebar(true)}
        />
        <Name />
        <nav className={cn(
          styles.nav,
          sidebar && styles.sidebar
        )}>
          { 
            sidebar && (
              <CloseSVG
                className={styles.close} 
                onClick={() => setSidebar(false)}
              />
            ) 
          }
          <ul className={styles.list}>
            {
              nav.map(el => (
                <li key={el.link}>
                  <NavLink
                    to={el.link}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                    onClick={() => setSidebar(false)}
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
