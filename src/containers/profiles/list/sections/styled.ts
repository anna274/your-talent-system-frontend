import styled from 'styled-components';
import { COLORS } from 'consts';
import { Chips } from 'components/shared';

export const Container = styled.div`
  display: flex;
  display: grid;
  grid-template-columns: 180px auto;
  grid-column-gap: 25px;
  position: relative;
  background-color: ${COLORS.color_dark_secondary};
  border-radius: 1rem;
  padding: 2rem 3rem;
  margin-bottom: 2rem;
  & .view_details {
    color: ${COLORS.color_text_dim};
    &:hover {
      color: ${COLORS.color_text_bright};
    }
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    color: ${COLORS.color_text_header};
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;

export const ProfileName = styled.h2`
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
`;

export const ProfileSkills = styled(Chips)`
  margin-top: auto;
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 5px;
`;

export const Avatar = styled.img`
  height: 180px;
  width: auto;
`;
