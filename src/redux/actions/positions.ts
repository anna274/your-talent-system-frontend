import { positionsTypes, loaderTypes } from 'redux/types';
import {
  getPositionsInfo,
  getPositionInfo,
  createPositionInfo,
  updatePositionInfo,
  deletePositionInfo,
} from 'services';
import { getViewPositionLink, getPositionsLink } from 'helpers';
import { goTo } from 'customHistory';

export const getPositions = () => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: positions } = await getPositionsInfo();
      dispatch({
        type: positionsTypes.GET_ALL_POSITIONS_SUCCESS,
        payload: positions,
      });
    } catch (e) {
      dispatch({
        type: positionsTypes.GET_ALL_POSITIONS_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const getPosition = (id: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: position } = await getPositionInfo(id);
      dispatch({
        type: positionsTypes.GET_POSITION_SUCCESS,
        payload: position,
      });
    } catch (e) {
      dispatch({
        type: positionsTypes.GET_POSITION_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const createPosition = (positionData: any, userId: string) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const newPosition = await createPositionInfo(positionData);
      dispatch({
        type: positionsTypes.CREATE_POSITION_SUCCESS,
        payload: newPosition.data,
      });
      goTo(getViewPositionLink(userId, newPosition.data.id));
    } catch (e) {
      dispatch({
        type: positionsTypes.CREATE_POSITION_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const updatePosition = (id: string, updatedData: any, userId: string) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const updatedPosition = await updatePositionInfo(id, updatedData);
      dispatch({
        type: positionsTypes.UPDATE_POSITION_SUCCESS,
        payload: updatedPosition.data,
      });
      goTo(getViewPositionLink(userId, updatedPosition.data.id));
    } catch (e) {
      dispatch({
        type: positionsTypes.UPDATE_POSITION_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const deletePosition = (id: string, userId: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      await deletePositionInfo(id);
      dispatch({
        type: positionsTypes.DELETE_POSITION_SUCCESS,
      });
      goTo(getPositionsLink(userId));
    } catch (e) {
      dispatch({
        type: positionsTypes.DELETE_POSITION_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};
