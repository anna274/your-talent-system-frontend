import styled from 'styled-components';
import { COLORS, DEVIСES_WIDTH } from 'consts';

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

export const MenuList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  .item {
    background-color: ${COLORS.color_dark_secondary};
    padding: 3rem 4.5rem;
    color: ${COLORS.color_text_header};
    border-radius: 1rem;
    margin: 0 1.5rem 1.5rem 0;

    &:hover {
      background-color: ${COLORS.color_nav_link_hover};
    }

    @media (max-width: ${DEVIСES_WIDTH.tablet}) {
      padding: 1.5rem 2.5rem;
      margin: 0 1rem 1rem 0;
    }
  }

  .item:last-child {
    margin-right: 0;
  }
`;
