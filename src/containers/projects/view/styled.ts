import styled from 'styled-components';
import { COLORS, DEVIСES_WIDTH } from 'consts';
import { Chips } from 'components/shared';

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
  isOpened: boolean;
}

export const ProjectName = styled.h2`
  margin-bottom: 1.5rem;
`;

export const ProjectStatus = styled.p`
  color: ${(props: IStatusProps) => (props.isOpened ? COLORS.color_green : COLORS.color_red)};
`;

export const ProjectScopes = Chips;

export const ProjectTechnologies = Chips;
