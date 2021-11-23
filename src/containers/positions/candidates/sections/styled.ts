import styled from 'styled-components';
import { COLORS } from 'consts';

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

  & .show-button {
    width: fit-content;
    margin-bottom: 1rem;
    padding: 0;
    color: ${COLORS.color_text_dim};
  }

  & .set-specialist-btn {
    width: fit-content;
    position: absolute;
    top: 2rem;
    right: 2rem;
  }
`;

export const CandidateName = styled.h2`
  margin-bottom: 1.5rem;
`;

export const RequirementSkillsMatches = styled.div`
  display: grid;
  grid-template-columns: 30rem 30rem;
  grid-column-gap: 5rem;
`;

export const RequirementsColumn = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: 0.3rem;
  }
`;

export const SkillsColumn = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: 0.3rem;
  }
`;

export const SkillsPlaceholder = styled.div`
  margin: 0;
  height: 2rem;
`;

export const ColumnHeader = styled.p`
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 0;
  color: ${COLORS.color_text_bright};
`;
