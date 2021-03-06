import { POSITION_STATUSES } from 'consts';

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
    onSubmit: () => void;
    text: string;
    submitButtonText: string;
    onClose?: () => void;
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
  positions: IPosition[];
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

export interface IPriority {
  id: string;
  value: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDuty {
  id: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRequirement {
  id: string;
  level: ILevel;
  technology: ITechnology;
  priority: IPriority;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPositionStatus {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPositionStatus {
  id: string;
  label: string;
  value: POSITION_STATUSES;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPosition {
  id: string;
  project: IProject;
  job_function: IJobFunction;
  profile: IProfile;
  requirements: IRequirement[];
  applicationDate: Date;
  duties: IDuty[];
  closeDate: Date;
  deactivationDate: Date;
  profiles: IProfile[];
  position_status: IPositionStatus;
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
  careerStartDate: Date | string;
  companyStartDate: Date | string;
  account: IAccount;
  department: IDepartment;
  job_function: IJobFunction;
  skills: ISkill[];
  createdAt?: Date;
  updatedAt?: Date;
  summary: string;
  positions: IPosition[];
}

export interface ICandidate {
  id: string;
  profile: IProfile;
  koef: number;
  positionId: string;
}

export interface IStatisticsType {
  id: string;
  name: string;
}

export interface IStatistics {
  id: string;
  statistics_type: IStatisticsType;
  label: string;
  additionalInfo: string;
  data: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITechnologyStatistics extends IStatistics {
  startDate: Date;
  endDate: Date;
  position?: IPosition;
}

export interface ISkillsStatistics extends IStatistics {
  department?: IDepartment;
  position?: IPosition;
}

export interface IAlert {
  type: string;
  severity?: string;
  text: string;
  [k: string]: any;
}

export interface IAlertPayload {
  type: string;
  severity?: string;
  text: string;
  props: {
    onClose?: () => void;
    [k: string]: any;
  };
}

// states

interface ILoaderState {
  loading: boolean;
}

export interface IProjectsState {
  projects: IProject[];
  project: IProject;
  isUpdated: boolean;
}

export interface IProfilesState {
  profiles: IProfile[];
  profile: IProfile;
  isUpdated: boolean;
}

export interface IScopesState {
  data: IScope[];
}

export interface ITechnologiesState {
  data: ITechnology[];
  technology: ITechnology;
}

export interface ILevelsState {
  data: ITechnology[];
}

export interface IDepartmentsState {
  data: IDepartment[];
  department: IDepartment;
}

export interface IJobFunctionsState {
  data: IJobFunction[];
  jobFunction: IJobFunction;
}

export interface IPositionStatusesState {
  data: IPositionStatus[];
}

export interface ICandidatesState {
  data: ICandidate[];
  requested: boolean;
}

export interface IPrioritiesState {
  data: IPriority[];
}

export interface IPositionsState {
  positions: IPosition[];
  position: IPosition;
  isUpdated: boolean;
}

export interface IAlertState {
  data: IAlert[];
}

export interface IStatisticsState {
  data: IStatistics[];
  statistics: IStatistics;
  isUpdated: boolean;
}

export interface IStatisticsTypesState {
  data: IStatisticsType[];
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
  jobFunctions: IJobFunctionsState;
  positions: IPositionsState;
  positionStatuses: IPositionStatusesState;
  priorities: IPrioritiesState;
  candidates: ICandidatesState;
  alerts: IAlertState;
  statistics: IStatisticsState;
  statisticsTypes: IStatisticsTypesState;
  modal: IModalPayload;
}
