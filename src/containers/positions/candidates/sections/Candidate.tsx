import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { IProfile, IPosition } from 'declarations/interfaces';
import { setSpecialist } from 'redux/actions';
import { getCandidatesLink, getViewProfileLink, sortRequirementsMatchesByPriority } from 'helpers';
import { CustomLink, RequirementView, SkillView } from 'components/shared';
import {
  Container,
  CandidateName,
  RequirementSkillsMatches,
  RequirementsColumn,
  SkillsColumn,
  SkillsPlaceholder,
  ColumnHeader,
} from './styled';

interface IProps {
  position: IPosition;
  profile: IProfile;
}

interface IParams {
  userId: string;
}

export const Candidate: React.FC<IProps> = ({
  position: { requirements, id: positionId },
  profile: { surname, name, department, id: profileId, skills },
}) => {
  const [showMatches, setShowMatches] = useState<boolean>(false);
  const { userId } = useParams<IParams>();
  const dispatch = useDispatch();

  const returnToParam = '?returnTo=' + encodeURIComponent(getCandidatesLink(userId, positionId));

  let requirementsMatches = requirements.map((req) => {
    const skill = skills.find((sk) => sk.technology.id === req.technology.id);
    if (!skill) {
      return { requirement: req, notIncluded: true, skill: null };
    }
    return { skill, requirement: req };
  });
  //@ts-ignore
  requirementsMatches = sortRequirementsMatchesByPriority(requirementsMatches);
  const notIncludedSkills = skills.filter(
    (skill) => !requirements.find((req) => req.technology.id === skill.technology.id),
  );

  return (
    <Container>
      <CandidateName>{`${surname} ${name}`}</CandidateName>
      <p>{`Департамент: ${department?.name || 'не указан'}`}</p>
      <Button className="show-button" onClick={() => setShowMatches(!showMatches)}>
        {showMatches ? 'Скрыть соответствие' : 'Показать соответствие'}
      </Button>
      {showMatches && (
        <RequirementSkillsMatches>
          <RequirementsColumn>
            <ColumnHeader>Требования</ColumnHeader>
            {requirementsMatches.map((reqMatch) => (
              <RequirementView
                key={reqMatch.requirement.id}
                classes={reqMatch.notIncluded ? 'notIncluded' : ''}
                requirement={reqMatch.requirement}
              />
            ))}
          </RequirementsColumn>
          <SkillsColumn>
            <ColumnHeader>Навыки</ColumnHeader>
            {requirementsMatches.map((reqMatch) =>
              // @ts-ignore
              reqMatch.notIncluded ? <SkillsPlaceholder /> : <SkillView skill={reqMatch.skill} />,
            )}
            {notIncludedSkills.map((skill) => (
              <SkillView key={skill.id} classes="notIncluded" skill={skill} />
            ))}
          </SkillsColumn>
        </RequirementSkillsMatches>
      )}
      <Button
        variant="contained"
        className="set-specialist-btn"
        onClick={() => dispatch(setSpecialist(positionId, profileId, userId))}
      >
        Принять на позицию
      </Button>
      <CustomLink
        classes="view_details"
        to={`${getViewProfileLink(userId, profileId)}${returnToParam}`}
      >
        Смотреть подробнее
      </CustomLink>
    </Container>
  );
};
