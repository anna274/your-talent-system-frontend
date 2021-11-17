import { combineReducers } from 'redux';
import authorizedUserReducer from 'redux/reducers/authorizedUser';
import { loaderReducer } from 'redux/reducers/loader';
import { projectsReducer } from 'redux/reducers/projects';
import { scopesReducer } from 'redux/reducers/scopes';
import { technologiesReducer } from 'redux/reducers/technologies';
import { levelsReducer } from 'redux/reducers/levels';
import { departmentsReducer } from 'redux/reducers/departments';
import { profilesReducer } from 'redux/reducers/profiles';
import { jobFunctionsReducer } from 'redux/reducers/jobFunctions';

const rootReducer = combineReducers({
  authorizedUser: authorizedUserReducer,
  loader: loaderReducer,
  projects: projectsReducer,
  scopes: scopesReducer,
  technologies: technologiesReducer,
  levels: levelsReducer,
  departments: departmentsReducer,
  profiles: profilesReducer,
  jobFunctions: jobFunctionsReducer,
});

export default rootReducer;
