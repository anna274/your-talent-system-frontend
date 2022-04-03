import styled from 'styled-components';
import { COLORS } from 'consts';
import { Chips } from 'components/shared';

interface IStatusProps {
  isOpened: boolean;
}

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

export const ProjectName = styled.h2`
  margin-bottom: 1.5rem;
`;

export const ProjectStatus = styled.p`
  color: ${(props: IStatusProps) => (props.isOpened ? COLORS.color_green : COLORS.color_red)};
`;

export const ProjectScopes = Chips;
