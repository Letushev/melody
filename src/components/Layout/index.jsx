import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from 'components/Header';

export default function Layout({ content: Content, authProtected }) {
  if (authProtected && !localStorage.getItem('authToken')) {
    return <Redirect to="/auth" />;
  }

  return (
    <>
      <Header />
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
