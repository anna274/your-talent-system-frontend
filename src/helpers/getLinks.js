export const getProjectsLink = (userId) => `/projects/${userId}`;
export const getCreateProjectLink = (userId) => `/projects/${userId}/new`;
export const getViewProjectLink = (userId, projectId) => `/projects/${userId}/${projectId}`;
export const getEditProjectLink = (userId, projectId) => `/projects/${userId}/${projectId}/edit`;

export const getProfilesLink = (userId) => `/profiles/${userId}`;
export const getCreateProfileLink = (userId) => `/profiles/${userId}/new`;
export const getViewProfileLink = (userId, profileId) => `/profiles/${userId}/${profileId}`;
export const getEditProfileLink = (userId, profileId) => `/profiles/${userId}/${profileId}/edit`;
