import { IPosition } from 'declarations/interfaces';

export const isPositionStatus = (position: IPosition, value: string) =>
  position.position_status.value === value;
