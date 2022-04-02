import { statisticsTypes, loaderTypes, modalTypes } from 'redux/types';
import { showAlert } from 'redux/actions';
import {
  getAllStatisticsInfo,
  getStatisticsInfo,
  createStatisticsInfo,
  updateStatisticsInfo,
  deleteStatisticsInfo,
} from 'services';
import { getViewStatisticsLink, getStatisticsLink, getQueryString } from 'helpers';
import { goTo } from 'customHistory';

export const getAllStatistics = (filters: any = {}) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: statistics } = await getAllStatisticsInfo(getQueryString(filters));
      dispatch({
        type: statisticsTypes.GET_ALL_STATISTICS_SUCCESS,
        payload: statistics,
      });
    } catch (e) {
      dispatch({
        type: statisticsTypes.GET_ALL_STATISTICS_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const getStatistics = (id: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: statistics } = await getStatisticsInfo(id);
      dispatch({
        type: statisticsTypes.GET_STATISTICS_SUCCESS,
        payload: statistics,
      });
    } catch (e) {
      dispatch({
        type: statisticsTypes.GET_STATISTICS_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const createStatistics = (statisticsData: any, userId: string) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const newStatistics = await createStatisticsInfo(statisticsData);
      dispatch({
        type: statisticsTypes.CREATE_STATISTICS_SUCCESS,
        payload: newStatistics.data,
      });
      goTo(getViewStatisticsLink(userId, newStatistics.data.id));
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
      dispatch({
        type: statisticsTypes.CREATE_STATISTICS_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const updateStatistics = (id: string, updatedData: any, userId: string) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const updatedStatistics = await updateStatisticsInfo(id, updatedData);
      dispatch({
        type: statisticsTypes.UPDATE_STATISTICS_SUCCESS,
        payload: updatedStatistics.data,
      });
      goTo(getViewStatisticsLink(userId, updatedStatistics.data.id));
    } catch (e) {
      dispatch({
        type: statisticsTypes.UPDATE_STATISTICS_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const deleteStatistics = (id: string, userId: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      await deleteStatisticsInfo(id);
      dispatch({
        type: statisticsTypes.DELETE_STATISTICS_SUCCESS,
      });
      goTo(getStatisticsLink(userId));
      dispatch({
        type: modalTypes.CLOSE_MODAL,
      });
    } catch (e) {
      dispatch({
        type: statisticsTypes.DELETE_STATISTICS_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};
