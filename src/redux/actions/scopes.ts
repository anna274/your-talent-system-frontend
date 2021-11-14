import { scopesTypes, loaderTypes } from 'redux/types';
import { getScopesInfo } from 'services';

export const getScopes = () => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: scopes } = await getScopesInfo();
      dispatch({
        type: scopesTypes.GET_ALL_SCOPES_SUCCESS,
        payload: scopes,
      });
    } catch (e) {
      dispatch({
        type: scopesTypes.GET_ALL_SCOPES_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};
