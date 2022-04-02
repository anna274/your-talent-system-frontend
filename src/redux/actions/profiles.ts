import { profilesTypes, loaderTypes, modalTypes } from 'redux/types';
import { showAlert } from 'redux/actions';
import {
  getProfilesInfo,
  getProfileInfo,
  getProfileInfoByAccount,
  createProfileInfo,
  updateProfileInfo,
  deleteProfileInfo,
} from 'services';
import { getViewProfileLink, getProfilesLink } from 'helpers';
import { goTo } from 'customHistory';

export const getProfiles = () => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: profiles } = await getProfilesInfo();
      dispatch({
        type: profilesTypes.GET_ALL_PROFILES_SUCCESS,
        payload: profiles,
      });
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
      dispatch({
        type: profilesTypes.GET_ALL_PROFILES_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const getProfile = (id: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: profile } = await getProfileInfo(id);
      dispatch({
        type: profilesTypes.GET_PROFILE_SUCCESS,
        payload: profile,
      });
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
      dispatch({
        type: profilesTypes.GET_PROFILE_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const getProfileByAccount = (id: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: profile } = await getProfileInfoByAccount(id);
      dispatch({
        type: profilesTypes.GET_PROFILE_SUCCESS,
        payload: profile,
      });
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
      dispatch({
        type: profilesTypes.GET_PROFILE_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const createProfile = (accountData: any, profileData: any, userId: string) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const newProfile = await createProfileInfo(accountData, profileData);
      dispatch({
        type: profilesTypes.CREATE_PROFILE_SUCCESS,
        payload: newProfile.data,
      });
      goTo(getViewProfileLink(userId, newProfile.data.id));
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
      dispatch({
        type: profilesTypes.CREATE_PROFILE_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const updateProfile = (id: string, updatedData: any, userId: string) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const updatedProfile = await updateProfileInfo(id, updatedData);
      dispatch({
        type: profilesTypes.UPDATE_PROFILE_SUCCESS,
        payload: updatedProfile.data,
      });
      goTo(getViewProfileLink(userId, updatedProfile.data.id));
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
      dispatch({
        type: profilesTypes.UPDATE_PROFILE_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const deleteProfile = (id: string, userId: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      await deleteProfileInfo(id);
      dispatch({
        type: profilesTypes.DELETE_PROFILE_SUCCESS,
      });
      dispatch({
        type: modalTypes.CLOSE_MODAL,
      });
      goTo(getProfilesLink(userId));
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
      dispatch({
        type: profilesTypes.DELETE_PROFILE_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const setProfilesInfoUpdated = (isUpdated: boolean) => {
  return {
    type: profilesTypes.SET_INFO_UPDATED,
    payload: { isUpdated },
  };
};
