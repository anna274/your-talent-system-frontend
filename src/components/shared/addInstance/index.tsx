import React, { useState, useMemo } from 'react';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Autocomplete } from 'components/shared';
import { removeRepeatedItemsById } from 'helpers';
import { Container, SelectedOptions, ChooseArea } from './styled';

interface IProps {
  options: any[];
  selectedOptions: any[];
  getOptionLabel: (option: any) => string;
  label: string;
  name: string;
  onChange: (updatedOptions: any[]) => void;
}

export const AddInstance: React.FC<IProps> = ({
  name,
  options,
  getOptionLabel,
  label,
  onChange,
  selectedOptions = [],
}) => {
  const [currentOption, setCurrentOption] = useState<any>(null);

  const filteredOptions = useMemo(() => removeRepeatedItemsById(options, selectedOptions), [
    options,
    selectedOptions,
  ]);

  const handleDelete = (option: any) => {
    const updatedSelectedOptions = selectedOptions.filter(({ name }) => name !== option.name);
    onChange(updatedSelectedOptions);
  };

  const handleAdd = () => {
    if (currentOption) {
      const updatedSelectedOptions = [...selectedOptions, currentOption];
      onChange(updatedSelectedOptions);
      setCurrentOption(null);
    }
  };

  const handleSelect = (event: any, newValue: any) => {
    setCurrentOption(newValue);
  };

  return (
    <Container>
      <ChooseArea>
        <Autocomplete
          name={name}
          options={filteredOptions}
          getOptionLabel={getOptionLabel}
          label={label}
          onSelect={handleSelect}
          value={currentOption}
        />
        <Fab color="primary" aria-label="add" onClick={handleAdd}>
          <AddIcon />
        </Fab>
      </ChooseArea>
      {selectedOptions.length > 0 && (
        <SelectedOptions>
          {selectedOptions.map((option) => (
            <Chip
              key={option.id}
              label={getOptionLabel(option)}
              onDelete={() => handleDelete(option)}
              color="primary"
            />
          ))}
        </SelectedOptions>
      )}
    </Container>
  );
};
