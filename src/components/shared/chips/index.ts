import styled from 'styled-components';
import { COLORS, DEVIСES_WIDTH } from 'consts';

export const Chips = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.5rem;
  & > * {
    margin-right: 1rem;
  }
  .MuiChip-root {
    background-color: ${COLORS.color_tag};
  }
`;
