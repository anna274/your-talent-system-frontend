import { positionsTypes, loaderTypes } from 'redux/types';
import {
  getPositionsInfo,
  getPositionInfo,
  createPositionInfo,
  updatePositionInfo,
  deletePositionInfo,
  addCandidateInfo,
  deleteCandidateInfo,
  setSpecialistInfo,
} from 'services';
import { getViewPositionLink, getPositionsLink, getQueryString } from 'helpers';
import { goTo } from 'customHistory';

export const getPositions = (filters: any = {}) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: positions } = await getPositionsInfo(getQueryString(filters));
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

export const updatePosition = (positionId: string, updatedData: any, userId: string) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const updatedPosition = await updatePositionInfo(positionId, updatedData);
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

export const addCandidate = (positionId: string, profileId: string, koef: number) => {
  return async (dispatch: Function) => {
    dispatch({
      type: positionsTypes.ADD_CANDIDATE_REQUEST,
    });
    try {
      const { data: updatedPosition } = await addCandidateInfo(positionId, profileId, koef);
      dispatch({
        type: positionsTypes.ADD_CANDIDATE_SUCCESS,
        payload: updatedPosition,
      });
    } catch (e) {
      dispatch({
        type: positionsTypes.ADD_CANDIDATE_FAILURE,
        payload: e,
      });
    }
  };
};

export const deleteCandidate = (positionId: string, profileId: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: positionsTypes.DELETE_CANDIDATE_REQUEST,
    });
    try {
      const { data: updatedPosition } = await deleteCandidateInfo(positionId, profileId);
      dispatch({
        type: positionsTypes.DELETE_CANDIDATE_SUCCESS,
        payload: updatedPosition,
      });
    } catch (e) {
      dispatch({
        type: positionsTypes.DELETE_CANDIDATE_FAILURE,
        payload: e,
      });
    }
  };
};

export const setSpecialist = (positionId: string, profileId: string, userId: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: positionsTypes.SET_SPECIALIST_REQUEST,
    });
    try {
      const { data: updatedPosition } = await setSpecialistInfo(positionId, profileId);
      dispatch({
        type: positionsTypes.SET_SPECIALIST_SUCCESS,
        payload: updatedPosition,
      });
      goTo(getViewPositionLink(userId, positionId));
    } catch (e) {
      dispatch({
        type: positionsTypes.SET_SPECIALIST_FAILURE,
        payload: e,
      });
    }
  };
};
