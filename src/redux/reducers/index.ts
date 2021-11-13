import { combineReducers } from 'redux';
import authorizedUserReducer from 'redux/reducers/authorizedUser';
import { loaderReducer } from 'redux/reducers/loader';

const rootReducer = combineReducers({
  authorizedUser: authorizedUserReducer,
  loader: loaderReducer,
});

export default rootReducer;
