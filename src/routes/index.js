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
  UserProfilePage,
  SystemPage,
  DepartmentsPage,
  CreateDepartmentPage,
  EditDepartmentPage,
  JobFunctionsPage,
  CreateJobFunctionPage,
  EditJobFunctionPage,
  TechnologiesPage,
  CreateTechnologyPage,
  EditTechnologyPage,
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
        <PrivateRoute path={PATHS.profile_view} exact component={UserProfilePage} />
        <PrivateRoute path={PATHS.system} exact component={SystemPage} />
        <PrivateRoute path={PATHS.departments} exact component={DepartmentsPage} />
        <PrivateRoute path={PATHS.departments_new} exact component={CreateDepartmentPage} />
        <PrivateRoute path={PATHS.departments_edit} exact component={EditDepartmentPage} />
        <PrivateRoute path={PATHS.job_functions} exact component={JobFunctionsPage} />
        <PrivateRoute path={PATHS.job_functions_new} exact component={CreateJobFunctionPage} />
        <PrivateRoute path={PATHS.job_functions_edit} exact component={EditJobFunctionPage} />
        <PrivateRoute path={PATHS.technologies} exact component={TechnologiesPage} />
        <PrivateRoute path={PATHS.technologies_new} exact component={CreateTechnologyPage} />
        <PrivateRoute path={PATHS.technologies_edit} exact component={EditTechnologyPage} />
      </Switch>
    </Router>
  );
}

export default Routes;
