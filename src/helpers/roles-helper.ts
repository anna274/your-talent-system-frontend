import { IRole } from 'declarations/interfaces';
import { ADMIN_ROLE } from 'consts';

export const isAdmin = (roles: IRole[]) => {
  return !!roles.find(({ name }) => name === ADMIN_ROLE);
};
