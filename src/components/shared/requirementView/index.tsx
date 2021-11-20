import React from 'react';
import { Rating, PriorityArrow } from 'components/shared';
import { IRequirement } from 'declarations/interfaces';
import { Container, Technology } from './styled';

interface IProps {
  requirement: IRequirement;
}

export const RequirementView: React.FC<IProps> = ({
  requirement: { level, technology, priority },
}) => {
  return (
    <Container>
      <Technology>{technology.name}</Technology>
      <PriorityArrow className={`color-${priority.value}`} />
      <Rating max={3} name="value" readOnly={true} value={level.value} />
    </Container>
  );
};
