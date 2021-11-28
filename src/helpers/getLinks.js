import { getQueryString } from 'helpers';

export const getProjectsLink = (userId) => `/projects/${userId}`;
export const getCreateProjectLink = (userId) => `/projects/${userId}/new`;
export const getViewProjectLink = (userId, projectId) => `/projects/${userId}/${projectId}`;
export const getEditProjectLink = (userId, projectId) => `/projects/${userId}/${projectId}/edit`;

export const getProfilesLink = (userId) => `/profiles/${userId}`;
export const getCreateProfileLink = (userId) => `/profiles/${userId}/new`;
export const getViewProfileLink = (userId, profileId) => `/profiles/${userId}/${profileId}`;
export const getEditProfileLink = (userId, profileId) => `/profiles/${userId}/${profileId}/edit`;

export const getPositionsLink = (userId, filters = {}) =>
  `/positions/${userId}${getQueryString(filters)}`;
export const getCreatePositionLink = (userId) => `/positions/${userId}/new`;
export const getViewPositionLink = (userId, positionId) => `/positions/${userId}/${positionId}`;
export const getEditPositionLink = (userId, positionId) =>
  `/positions/${userId}/${positionId}/edit`;

export const getPossibleCandidatesLink = (userId, positionId) =>
  `/positions/${userId}/${positionId}/possible-candidates`;
export const getCandidatesLink = (userId, positionId) =>
  `/positions/${userId}/${positionId}/candidates`;
