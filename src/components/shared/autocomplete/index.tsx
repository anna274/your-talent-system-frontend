import React from 'react';
import TextField from '@material-ui/core/TextField';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import { StyledPopper } from './styled';

interface IProps {
  options: any[];
  getOptionLabel: (option: any) => string;
  label: string;
  name: string;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  value?: any;
  onSelect: (event: any, newValue: any) => void;
}

const CustomPopper = function (props: any) {
  return <StyledPopper {...props} placement="bottom" />;
};

export const Autocomplete: React.FC<IProps> = ({
  name,
  options,
  getOptionLabel,
  label,
  onSelect,
  value,
}) => {
  return (
    <MuiAutocomplete
      id={name}
      options={options}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => <TextField {...params} label={label} variant="filled" />}
      onChange={onSelect}
      value={value}
      noOptionsText="Не опций"
      PopperComponent={CustomPopper}
      onBlur={() => {}}
    />
  );
};
