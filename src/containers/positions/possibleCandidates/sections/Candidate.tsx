import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ICandidate, IPosition } from 'declarations/interfaces';
import {
  getPossibleCandidatesLink,
  getViewProfileLink,
  sortRequirementsMatchesByPriority,
} from 'helpers';
import { addCandidate, deleteCandidate, setSpecialist } from 'redux/actions';
import { CustomLink, RequirementView, SkillView } from 'components/shared';
import {
  Container,
  CandidateName,
  RequirementSkillsMatches,
  RequirementsColumn,
  SkillsColumn,
  SkillsPlaceholder,
  ColumnHeader,
  CandidateHeader,
} from './styled';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

interface IProps {
  position: IPosition;
  candidate: ICandidate;
}

interface IParams {
  userId: string;
}

export const Candidate: React.FC<IProps> = ({
  position: { requirements, id: positionId, profiles },
  candidate: {
    profile: { surname, name, department, id: profileId, skills },
    koef,
  },
}) => {
  const [showMatches, setShowMatches] = useState<boolean>(false);
  const [isCandidate, setIsCandidate] = useState<boolean>(
    !!profiles.find(({ id }) => id === profileId),
  );

  const dispatch = useDispatch();

  const { userId } = useParams<IParams>();

  const returnToParam =
    '?returnTo=' + encodeURIComponent(getPossibleCandidatesLink(userId, positionId));

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

  const handleAddCandidate = () => {
    setIsCandidate(true);
    dispatch(addCandidate(positionId, profileId, koef));
  };

  const handleDeleteCandidate = () => {
    setIsCandidate(false);
    dispatch(deleteCandidate(positionId, profileId));
  };

  return (
    <Container>
      <CandidateHeader isCandidate={isCandidate}>
        <CandidateName>{`${surname} ${name}`}</CandidateName>
        <CheckCircleIcon className="checked" />
        <Button
          className="check-button"
          onClick={isCandidate ? handleDeleteCandidate : handleAddCandidate}
        >
          {isCandidate ? 'Убрать из кандидатов' : 'Отметить как кандидата'}
        </Button>
      </CandidateHeader>
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
            {/* @ts-ignore */}
            {requirementsMatches.map((reqMatch) =>
              reqMatch.notIncluded ? <SkillsPlaceholder /> : <SkillView skill={reqMatch.skill} />,
            )}
            {notIncludedSkills.map((skill) => (
              <SkillView key={skill.id} classes="notIncluded" skill={skill} />
            ))}
          </SkillsColumn>
        </RequirementSkillsMatches>
      )}
      <CustomLink
        classes="view_details"
        to={`${getViewProfileLink(userId, profileId)}${returnToParam}`}
      >
        Смотреть подробнее
      </CustomLink>
      <Button
        variant="contained"
        className="set-specialist-btn"
        onClick={() => dispatch(setSpecialist(positionId, profileId, userId))}
      >
        Принять на позицию
      </Button>
    </Container>
  );
};
