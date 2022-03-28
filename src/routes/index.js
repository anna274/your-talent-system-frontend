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
  PossibleCandidatesPage,
  CandidatesPage,
  GenerateCVPage,
  AllStatisticsPage,
  CreateStatisticsPage,
  StatisticsPage,
  EditStatisticsPage,
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
        <PrivateRoute
          path={PATHS.positions_possible_candidates}
          exact
          component={PossibleCandidatesPage}
        />
        <PrivateRoute path={PATHS.positions_candidates} exact component={CandidatesPage} />
        <PrivateRoute path={PATHS.generate_cv} exact component={GenerateCVPage} />
        <PrivateRoute path={PATHS.statistics} exact component={AllStatisticsPage} />
        <PrivateRoute path={PATHS.statistics_new} exact component={CreateStatisticsPage} />
        <PrivateRoute path={PATHS.statistics_view} exact component={StatisticsPage} />
        <PrivateRoute path={PATHS.statistics_edit} exact component={EditStatisticsPage} />
      </Switch>
    </Router>
  );
}

export default Routes;
