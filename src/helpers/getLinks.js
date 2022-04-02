import { getQueryString } from 'helpers';

export const getProjectsLink = (userId) => `/projects/${userId}`;
export const getCreateProjectLink = (userId) => `/projects/${userId}/new`;
export const getViewProjectLink = (userId, projectId) => `/projects/${userId}/${projectId}`;
export const getEditProjectLink = (userId, projectId) => `/projects/${userId}/${projectId}/edit`;

export const getProfilesLink = (userId) => `/profiles/${userId}`;
export const getCreateProfileLink = (userId) => `/profiles/${userId}/new`;
export const getViewProfileLink = (userId, profileId) => `/profiles/${userId}/${profileId}`;
export const getEditProfileLink = (userId, profileId) => `/profiles/${userId}/${profileId}/edit`;
export const getGenerateCVLink = (userId, profileId) => `/profiles/${userId}/${profileId}/cv`;

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

export const getStatisticsLink = (userId) => `/statistics/${userId}`;
export const getCreateStatisticsLink = (userId) => `/statistics/${userId}/new`;
export const getViewStatisticsLink = (userId, statisticsId) =>
  `/statistics/${userId}/${statisticsId}`;
export const getEditStatisticsLink = (userId, statisticsId) =>
  `/statistics/${userId}/${statisticsId}/edit`;

export const getProfileLink = (userId) => `/profile/${userId}`;

export const getSettingsLink = (userId) => `/settings/${userId}`;

export const getTechnologiesLink = (userId) => `/system/${userId}/technologies`;
export const getCreateTechnologyLink = (userId) => `/system/${userId}/technologies/new`;
export const getEditTechnologyLink = (userId, technologyId) =>
  `/system/${userId}/technologies/${technologyId}/edit`;

export const getDepartmentsLink = (userId) => `/system/${userId}/departments`;
export const getCreateDepartmentLink = (userId) => `/system/${userId}/departments/new`;
export const getEditDepartmentLink = (userId, departmentId) =>
  `/system/${userId}/departments/${departmentId}/edit`;

export const getJobFunctionsLink = (userId) => `/system/${userId}/job-functions`;
export const getCreateJobFunctionLink = (userId) => `/system/${userId}/job-functions/new`;
export const getEditJobFunctionLink = (userId, jobFunctionId) =>
  `/system/${userId}/job-functions/${jobFunctionId}/edit`;
