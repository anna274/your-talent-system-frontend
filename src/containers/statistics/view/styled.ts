import styled from 'styled-components';
import { COLORS } from 'consts';

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  & > * {
    color: ${COLORS.color_text_header};
    margin-top: 0;
    margin-bottom: 1rem;
  }
  & .inline_link {
    color: ${COLORS.color_text_dim};
    &:hover {
      color: ${COLORS.color_text_bright};
    }
  }
`;

interface IStatusProps {
  isPublic: boolean;
}

export const StatisticsName = styled.h2`
  margin-bottom: 1.5rem;
`;

export const StatisticsStatus = styled.p`
  color: ${(props: IStatusProps) => (props.isPublic ? COLORS.color_green : COLORS.color_yellow)};
`;
