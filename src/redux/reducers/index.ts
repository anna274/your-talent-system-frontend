import { combineReducers } from 'redux';
import authorizedUserReducer from 'redux/reducers/authorizedUser';
import { loaderReducer } from 'redux/reducers/loader';
import { projectsReducer } from 'redux/reducers/projects';
import { scopesReducer } from 'redux/reducers/scopes';
import { technologiesReducer } from 'redux/reducers/technologies';

const rootReducer = combineReducers({
  authorizedUser: authorizedUserReducer,
  loader: loaderReducer,
  projects: projectsReducer,
  scopes: scopesReducer,
  technologies: technologiesReducer,
});

export default rootReducer;
