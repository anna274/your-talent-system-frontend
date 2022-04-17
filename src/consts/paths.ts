const PATHS = {
  logout: '/logout/:userId',
  login: '/login',
  projects: '/projects/:userId',
  projects_new: '/projects/:userId/new',
  projects_view: '/projects/:userId/:projectId',
  projects_edit: '/projects/:userId/:projectId/edit',
  profiles: '/profiles/:userId',
  profiles_new: '/profiles/:userId/new',
  profiles_view: '/profiles/:userId/:profileId',
  profiles_edit: '/profiles/:userId/:profileId/edit',
  positions: '/positions/:userId',
  positions_new: '/positions/:userId/new',
  positions_view: '/positions/:userId/:positionId',
  positions_edit: '/positions/:userId/:positionId/edit',
  positions_possible_candidates: '/positions/:userId/:positionId/possible-candidates',
  positions_candidates: '/positions/:userId/:positionId/candidates',
  generate_cv: '/profiles/:userId/:profileId/cv',
  statistics: '/statistics/:userId',
  statistics_new: '/statistics/:userId/new',
  statistics_view: '/statistics/:userId/:statisticsId',
  statistics_edit: '/statistics/:userId/:statisticsId/edit',
  profile_view: '/profile/:userId',
  system: '/system/:userId',
  job_functions: '/system/:userId/job-functions',
  job_functions_new: '/system/:userId/job-functions/new',
  job_functions_edit: '/system/:userId/job-functions/:jobFunctionId/edit',
  departments: '/system/:userId/departments',
  departments_new: '/system/:userId/departments/new',
  departments_edit: '/system/:userId/departments/:departmentId/edit',
  technologies: '/system/:userId/technologies',
  technologies_new: '/system/:userId/technologies/new',
  technologies_edit: '/system/:userId/technologies/:technologyId/edit',
  settings: '/settings/:userId',
  settings_password: '/settings/:userId/password-settings',
};

export default PATHS;