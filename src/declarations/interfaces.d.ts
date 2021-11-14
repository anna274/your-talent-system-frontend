export interface IRole {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  id: string;
  login: string;
  password: string;
  roles: IRole[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IModalPayload {
  modalType: string;
  modalProps: {
    onClose?: () => void;
    [k: string]: any;
  };
}

export interface IScope {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITechnology {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILevel {
  id: string;
  value: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISkill {
  id: string;
  level: ILevel;
  technology: ITechnology;
  profileId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date;
  headOffice: string;
  contact: string;
  scopes: IScope[];
  technologies: ITechnology[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDepartment {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IJobFunction {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProfile {
  id: string;
  name: string;
  surname: string;
  email: string;
  mobilePhone: string;
  photoLink?: string;
  carrierStartDate?: Date;
  companyStartDate?: Date;
  account: IAccount;
  department: IDepartment;
  jobFunction: IJobFunction;
  skills: ISkill[];
  createdAt?: Date;
  updatedAt?: Date;
}

// states

interface ILoaderState {
  loading: boolean;
}

export interface IProjectsState {
  projects: IProject[];
  project: IProject;
}

export interface IProfilesState {
  profiles: IProfile[];
  profile: IProfile;
}

export interface IScopesState {
  data: IScope[];
}

export interface ITechnologiesState {
  data: ITechnology[];
}

export interface ILevelsState {
  data: ITechnology[];
}

export interface IDepartmentsState {
  data: IDepartment[];
}

export interface IRootState {
  authorizedUser: {
    data: IUser;
    isAuthenticated: boolean;
    authenticating: boolean;
    actionRunning: boolean;
    error?: Error;
  };
  loader: ILoaderState;
  projects: IProjectsState;
  scopes: IScopesState;
  technologies: ITechnologiesState;
  levels: ILevelsState;
  profiles: IProfilesState;
  departments: IDepartmentsState;
}
