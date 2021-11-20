import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from 'routes/privateRoute';
import customHistory from 'customHistory';
import { PATHS } from 'consts';
import {
  Navigation,
  Login,
  Logout,
  ProjectsPage,
  CreateProjectPage,
  ProjectPage,
  EditProjectPage,
  ProfilesPage,
  CreateProfilePage,
  ProfilePage,
  EditProfilePage,
  PositionsPage,
  CreatePositionPage,
  PositionPage,
  EditPositionPage,
} from 'containers';

function Routes() {
  return (
    <Router history={customHistory}>
      <Route path={PATHS.login} exact component={Login} />
      <PrivateRoute path="/" component={Navigation} />
      {/* <Switch><PrivateRoute path={PATHS.profile} exact component={Profile} /></Switch> */}
      <Switch>
        <PrivateRoute path={PATHS.logout} exact component={Logout} />
        <PrivateRoute path={PATHS.projects} exact component={ProjectsPage} />
        <PrivateRoute path={PATHS.projects_new} exact component={CreateProjectPage} />
        <PrivateRoute path={PATHS.projects_view} exact component={ProjectPage} />
        <PrivateRoute path={PATHS.projects_edit} exact component={EditProjectPage} />
        <PrivateRoute path={PATHS.profiles} exact component={ProfilesPage} />
        <PrivateRoute path={PATHS.profiles_new} exact component={CreateProfilePage} />
        <PrivateRoute path={PATHS.profiles_view} exact component={ProfilePage} />
        <PrivateRoute path={PATHS.profiles_edit} exact component={EditProfilePage} />
        <PrivateRoute path={PATHS.positions} exact component={PositionsPage} />
        <PrivateRoute path={PATHS.positions_new} exact component={CreatePositionPage} />
        <PrivateRoute path={PATHS.positions_view} exact component={PositionPage} />
        <PrivateRoute path={PATHS.positions_edit} exact component={EditPositionPage} />
      </Switch>
    </Router>
  );
}

export default Routes;
