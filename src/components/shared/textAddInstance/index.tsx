import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MUITextField from '@material-ui/core/TextField';
import { Container, SelectedOptions, ChooseArea } from './styled';

interface IProps {
  name: string;
  label: string;
  texts: any[];
  onChange: (updatedOptions: any[]) => void;
}

export const TextAddInstance: React.FC<IProps> = ({ name, texts, label, onChange }) => {
  const [currentText, setCurrentText] = useState<string>('');

  const handleDelete = (textToDelete: any) => {
    const updatedValues = texts.filter((text) => text.text !== textToDelete.text);
    onChange(updatedValues);
  };

  const handleAdd = () => {
    onChange([...texts, { text: currentText }]);
    setCurrentText('');
  };

  const handleTextChange = (text: string) => {
    setCurrentText(text);
  };

  return (
    <Container>
      <ChooseArea>
        <MUITextField
          id={name}
          variant="filled"
          name={name}
          label={label}
          value={currentText}
          onChange={(event: React.ChangeEvent<any>) => {
            handleTextChange(event.target.value);
          }}
        />
        <Fab color="primary" aria-label="add" onClick={handleAdd}>
          <AddIcon />
        </Fab>
      </ChooseArea>
      {texts.length > 0 && (
        <SelectedOptions>
          {texts.map((text) => (
            <Chip
              key={text.text}
              label={text.text}
              onDelete={() => handleDelete(text)}
              color="primary"
            />
          ))}
        </SelectedOptions>
      )}
    </Container>
  );
};
