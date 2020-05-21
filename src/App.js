import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from 'pages/Auth';
import Layout from 'components/Layout';
import MyMelodies from 'pages/MyMelodies';

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
      <Redirect to="/signin" />
    </Switch>
  );
}

export default App;
