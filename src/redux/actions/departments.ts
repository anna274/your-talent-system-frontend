import { departmentsTypes, loaderTypes } from 'redux/types';
import { getDepartmentsInfo } from 'services';

export const getDepartments = () => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: departments } = await getDepartmentsInfo();
      dispatch({
        type: departmentsTypes.GET_ALL_DEPARTMENTS_SUCCESS,
        payload: departments,
      });
    } catch (e) {
      dispatch({
        type: departmentsTypes.GET_ALL_DEPARTMENTS_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};
