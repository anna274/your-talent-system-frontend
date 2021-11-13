import thunk from 'redux-thunk';
import rootReducer from 'redux/reducers';
import { createStore, compose, applyMiddleware } from 'redux';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
