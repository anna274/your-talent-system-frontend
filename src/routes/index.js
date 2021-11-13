import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from 'routes/privateRoute';
import customHistory from 'customHistory';
import { PATHS } from 'consts';
import { Navigation, Login, Logout } from 'containers';

function Routes() {
  return (
    <Router history={customHistory}>
      <Route path={PATHS.login} exact component={Login} />
      <PrivateRoute path="/" component={Navigation} />
      {/* <Switch><PrivateRoute path={PATHS.profile} exact component={Profile} /></Switch> */}
      <Switch>
        <PrivateRoute path={PATHS.logout} exact component={Logout} />
      </Switch>
    </Router>
  );
}

export default Routes;
