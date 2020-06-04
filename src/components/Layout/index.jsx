import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from 'components/Header';

export default function Layout({ content: Content, authProtected }) {
  const isAuth = !!localStorage.getItem('authToken');
  if (authProtected && !isAuth) {
    return <Redirect to="/signin" />;
  }

  return (
    <>
      <Header isAuth={isAuth} />
      <div className="maxWidth">
        <Content />
      </div>
    </>
  )
}

Layout.propTypes = {
  content: PropTypes.func.isRequired,
  authProtected: PropTypes.bool,
};

Layout.defaultProps = {
  authProtected: true,
};
