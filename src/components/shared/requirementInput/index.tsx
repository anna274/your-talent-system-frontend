import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Select } from 'components/shared/select';
import { Rating } from 'components/shared/rating';
import { Container, SelectedOptions, ChooseArea } from './styled';
import { ILevel, IPriority, IRequirement, ITechnology } from 'declarations/interfaces';

interface IProps {
  name: string;
  requirements: IRequirement[];
  levels: ILevel[];
  technologies: ITechnology[];
  priorities: IPriority[];
  onChange: (updatedOptions: any[]) => void;
}

export const RequirementInput: React.FC<IProps> = ({
  levels,
  technologies,
  requirements,
  priorities,
  onChange,
}) => {
  const [currentLevel, setCurrentLevel] = useState<ILevel | null>(null);
  const [currentTechnology, setCurrentTechnology] = useState<ITechnology | null>(null);
  const [currentPriority, setCurrentPriority] = useState<IPriority | null>(null);

  const handleDelete = (requirementToDelete: IRequirement) => {
    const updatedValues = requirements.filter(
      (requirement) => requirement.technology.id !== requirementToDelete.technology.id,
    );
    onChange(updatedValues);
  };

  const handleAdd = () => {
    onChange([
      ...requirements,
      { technology: currentTechnology, level: currentLevel, priority: currentPriority },
    ]);
    setCurrentLevel(null);
    setCurrentTechnology(null);
    setCurrentPriority(null);
  };

  const handleLevelSelect = (event: React.ChangeEvent<any>) => {
    setCurrentLevel(event.target.value);
  };

  const handleTechnologySelect = (event: React.ChangeEvent<any>) => {
    setCurrentTechnology(event.target.value);
  };

  const handlePrioritySelect = (event: React.ChangeEvent<any>) => {
    setCurrentPriority(event.target.value);
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
        <Select
          id="priority"
          label="Приоритет"
          classes="priorities"
          value={currentPriority}
          onChange={handlePrioritySelect}
          getOptionLabel={(priority) => priority.name}
          options={priorities}
        />
        <Fab color="primary" aria-label="add" onClick={handleAdd}>
          <AddIcon />
        </Fab>
      </ChooseArea>
      {requirements.length > 0 && (
        <SelectedOptions>
          {requirements.map((requirement: IRequirement) => (
            <Chip
              key={requirement.technology.id}
              label={
                <>
                  {requirement.technology.name}
                  <ArrowUpwardIcon className={`color-${requirement.priority.value}`} />
                  <Rating max={3} name="value" readOnly={true} value={requirement.level.value} />
                </>
              }
              onDelete={() => handleDelete(requirement)}
              color="primary"
              className="requirement-chip"
            />
          ))}
        </SelectedOptions>
      )}
    </Container>
  );
};
