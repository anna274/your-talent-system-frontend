import styled from 'styled-components';
import { COLORS } from 'consts';
import { Chips } from 'components/shared';

export const ProfileInfoContainer = styled.div`
  display: flex;
  display: grid;
  grid-template-columns: 180px auto;
  grid-column-gap: 25px;
  position: relative;
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
  & .skill-chip {
    & .MuiChip-label {
      display: flex;
      align-items: center;

      & .MuiRating-root {
        margin-left: 0.5rem;
      }
    }
  }
`;

export const ProfileName = styled.h2`
  margin-bottom: 1.5rem;
`;

export const ProfileSkills = Chips;

export const SectionName = styled.p`
  margin-top: 1rem;
  font-weight: bold;
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
