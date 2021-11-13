import { compareStrings } from 'helpers';

interface IUserWithNameAndSurname {
  name?: string;
  surname?: string;
}

export const getFullName = (user: IUserWithNameAndSurname = {} as IUserWithNameAndSurname) => {
  if (!user) {
    return '';
  }
  const { name, surname } = user;
  if (!name || !surname) {
    return '';
  }
  return `${surname} ${name}`;
};

export const formatUserLocation = (location: any) => {
  if (!location) {
    return '- / - / -';
  }
  const { officeLocation: { code = '-', city = '-' } = {}, cabinet = '-' } = location;
  return `${city} / ${code} / ${cabinet}`;
};

export const sortByFullName = (user1: IUserWithNameAndSurname, user2: IUserWithNameAndSurname) => {
  const fullName1 = getFullName(user1);
  const fullName2 = getFullName(user2);
  return compareStrings(fullName1, fullName2);
};

export const sortByUserLocation = (location1: any, location2: any) => {
  return compareStrings(formatUserLocation(location1), formatUserLocation(location2));
};
