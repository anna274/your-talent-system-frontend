import React from 'react';
import { Rating } from 'components/shared';
import { ISkill } from 'declarations/interfaces';
import { Container, Technology } from './styled';

interface IProps {
  skill: ISkill;
  classes?: string;
}

export const SkillView: React.FC<IProps> = ({ skill: { level, technology }, classes = '' }) => {
  return (
    <Container className={classes}>
      <Technology>{technology.name}</Technology>
      <Rating max={3} name="value" readOnly={true} value={level.value} />
    </Container>
  );
};
