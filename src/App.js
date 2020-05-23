import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from 'pages/Auth';
import Layout from 'components/Layout';
import MyMelodies from 'pages/MyMelodies';
import Profile from 'pages/Profile';
import Melody from 'pages/Melody';
import AllMelodies from 'pages/AllMelodies';

function App() {
  return (
    <Switch>
      <Route exact path="/signin">
        <Auth />
      </Route>
      <Route exact path="/signup">
        <Auth signup />
      </Route>
      <Route exact path="/my-melodies">
        <Layout content={MyMelodies} />
      </Route>
      <Route exact path="/profile">
        <Layout content={Profile} />
      </Route>
      <Route exact path="/melody/:id">
        <Layout content={Melody} />
      </Route>
      <Route exact path="/all-melodies">
        <Layout content={AllMelodies} />
      </Route>
      <Redirect to="/signin" />
    </Switch>
  );
}

export default App;
