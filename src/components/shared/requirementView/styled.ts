import styled from 'styled-components';
import { COLORS } from 'consts';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  & .MuiRating-root {
    margin-left: 1rem;
  }
`;

export const Technology = styled.p`
  margin: 0;
  width: 18rem;
  color: ${COLORS.color_text_bright};
`;
