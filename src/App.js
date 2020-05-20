import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from 'pages/Auth';

function App() {
  return (
    <Switch>
      <Route exact path="/signin">
        <Auth />
      </Route>
      <Route exact path="/signup">
        <Auth signup />
      </Route>
      <Redirect to="/signin" />
    </Switch>
  );
}

export default App;
