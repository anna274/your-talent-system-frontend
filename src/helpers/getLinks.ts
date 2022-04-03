import { getQueryString } from 'helpers';

export const getProjectsLink = (userId: string) => `/projects/${userId}`;
export const getCreateProjectLink = (userId: string) => `/projects/${userId}/new`;
export const getViewProjectLink = (userId: string, projectId: string) =>
  `/projects/${userId}/${projectId}`;
export const getEditProjectLink = (userId: string, projectId: string) =>
  `/projects/${userId}/${projectId}/edit`;

export const getProfilesLink = (userId: string) => `/profiles/${userId}`;
export const getCreateProfileLink = (userId: string) => `/profiles/${userId}/new`;
export const getViewProfileLink = (userId: string, profileId: string) =>
  `/profiles/${userId}/${profileId}`;
export const getEditProfileLink = (userId: string, profileId: string) =>
  `/profiles/${userId}/${profileId}/edit`;
export const getGenerateCVLink = (userId: string, profileId: string) =>
  `/profiles/${userId}/${profileId}/cv`;

export const getPositionsLink = (userId: string, filters = {}) =>
  `/positions/${userId}${getQueryString(filters)}`;
export const getCreatePositionLink = (userId: string) => `/positions/${userId}/new`;
export const getViewPositionLink = (userId: string, positionId: string) =>
  `/positions/${userId}/${positionId}`;
export const getEditPositionLink = (userId: string, positionId: string) =>
  `/positions/${userId}/${positionId}/edit`;

export const getPossibleCandidatesLink = (userId: string, positionId: string) =>
  `/positions/${userId}/${positionId}/possible-candidates`;
export const getCandidatesLink = (userId: string, positionId: string) =>
  `/positions/${userId}/${positionId}/candidates`;

export const getStatisticsLink = (userId: string) => `/statistics/${userId}`;
export const getCreateStatisticsLink = (userId: string) => `/statistics/${userId}/new`;
export const getViewStatisticsLink = (userId: string, statisticsId: string) =>
  `/statistics/${userId}/${statisticsId}`;
export const getEditStatisticsLink = (userId: string, statisticsId: string) =>
  `/statistics/${userId}/${statisticsId}/edit`;

export const getProfileLink = (userId: string) => `/profile/${userId}`;

export const getSettingsLink = (userId: string) => `/settings/${userId}`;

export const getTechnologiesLink = (userId: string) => `/system/${userId}/technologies`;
export const getCreateTechnologyLink = (userId: string) => `/system/${userId}/technologies/new`;
export const getEditTechnologyLink = (userId: string, technologyId: string) =>
  `/system/${userId}/technologies/${technologyId}/edit`;

export const getDepartmentsLink = (userId: string) => `/system/${userId}/departments`;
export const getCreateDepartmentLink = (userId: string) => `/system/${userId}/departments/new`;
export const getEditDepartmentLink = (userId: string, departmentId: string) =>
  `/system/${userId}/departments/${departmentId}/edit`;

export const getJobFunctionsLink = (userId: string) => `/system/${userId}/job-functions`;
export const getCreateJobFunctionLink = (userId: string) => `/system/${userId}/job-functions/new`;
export const getEditJobFunctionLink = (userId: string, jobFunctionId: string) =>
  `/system/${userId}/job-functions/${jobFunctionId}/edit`;
