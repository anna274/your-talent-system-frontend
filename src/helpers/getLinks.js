export const getProjectsLink = (userId) => `/projects/${userId}`;
export const getCreateProjectLink = (userId) => `/projects/${userId}/new`;
export const getViewProjectLink = (userId, projectId) => `/projects/${userId}/${projectId}`;
export const getEditProjectLink = (userId, projectId) => `/projects/${userId}/${projectId}/edit`;
