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
};

export default PATHS;
