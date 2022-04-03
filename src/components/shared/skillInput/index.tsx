import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Select } from 'components/shared/select';
import { Rating } from 'components/shared/rating';
import { Container, SelectedOptions, ChooseArea } from './styled';
import { ILevel, ISkill, ITechnology } from 'declarations/interfaces';

interface IProps {
  name: string;
  skills: ISkill[];
  levels: ILevel[];
  technologies: ITechnology[];
  onChange: (updatedOptions: any[]) => void;
}

export const SkillInput: React.FC<IProps> = ({ levels, technologies, skills, onChange }) => {
  const [currentLevel, setCurrentLevel] = useState<ILevel | null>(null);
  const [currentTechnology, setCurrentTechnology] = useState<ITechnology | null>(null);

  const handleDelete = (skillToDelete: ISkill) => {
    const updatedValues = skills.filter(
      (skill) => skill.technology.id !== skillToDelete.technology.id,
    );
    onChange(updatedValues);
  };

  const handleAdd = () => {
    onChange([...skills, { technology: currentTechnology, level: currentLevel }]);
    setCurrentLevel(null);
    setCurrentTechnology(null);
  };

  const handleLevelSelect = (event: React.ChangeEvent<any>) => {
    setCurrentLevel(event.target.value);
  };

  const handleTechnologySelect = (event: React.ChangeEvent<any>) => {
    setCurrentTechnology(event.target.value);
  };

  return (
    <Container>
      <ChooseArea>
        <Select
          id="technology"
          label="Технология"
          classes="technologies"
          value={currentTechnology}
          onChange={handleTechnologySelect}
          getOptionLabel={(technology) => technology.name}
          options={technologies}
        />
        <Select
          id="level"
          label="Уровень"
          classes="levels"
          value={currentLevel}
          onChange={handleLevelSelect}
          getOptionLabel={(level) => level.value}
          options={levels}
        />
        <Fab color="primary" aria-label="add" onClick={handleAdd}>
          <AddIcon />
        </Fab>
      </ChooseArea>
      {skills.length > 0 && (
        <SelectedOptions>
          {skills.map((skill: ISkill) => (
            <Chip
              key={skill.technology.id}
              label={
                <>
                  {skill.technology.name}
                  <Rating max={3} name="value" readOnly={true} value={skill.level.value} />
                </>
              }
              onDelete={() => handleDelete(skill)}
              color="primary"
              className="skill-chip"
            />
          ))}
        </SelectedOptions>
      )}
    </Container>
  );
};
