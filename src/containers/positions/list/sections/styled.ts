import styled from 'styled-components';
import { COLORS } from 'consts';
import { Chips } from 'components/shared';
import { IPositionStatus } from 'declarations/interfaces';
import { POSITION_STATUSES } from 'consts';

interface IStatusProps {
  positionStatus: IPositionStatus;
}

const POSITION_STATUSES_COLORS: { [key in POSITION_STATUSES]: string } = {
  [POSITION_STATUSES.OPENED]: COLORS.color_green,
  [POSITION_STATUSES.ACTIVE]: COLORS.color_yellow,
  [POSITION_STATUSES.INACTIVE]: COLORS.color_red,
};

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: ${COLORS.color_dark_secondary};
  border-radius: 1rem;
  padding: 2rem 3rem;
  & > * {
    color: ${COLORS.color_text_header};
    margin-top: 0;
    margin-bottom: 1rem;
  }
  margin-bottom: 2rem;
  & .view_details {
    color: ${COLORS.color_text_dim};
    &:hover {
      color: ${COLORS.color_text_bright};
    }
  }
`;

export const PositionName = styled.h2`
  margin-bottom: 1.5rem;
`;

export const PositionStatus = styled.p`
  color: ${(props: IStatusProps) => POSITION_STATUSES_COLORS[props.positionStatus.value]};
`;

export const PositionRequirements = Chips;
