import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MuiSelect from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import classNames from 'classnames';

interface IProps {
  value: any;
  id: string;
  label: string;
  options: any[];
  getOptionLabel: (option: any) => string;
  onChange: (e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
  error?: any;
  helperText?: string;
  classes?: string;
}

export const MultiSelect: React.FC<IProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  getOptionLabel,
  helperText,
  classes = '',
  error,
}) => {
  return (
    <FormControl variant="filled" className={classNames('custom', { [classes]: classes })}>
      <InputLabel id={label} error={error}>
        {label}
      </InputLabel>
      <MuiSelect
        labelId={label}
        id={id}
        // value={value.map((option: any) => getOptionLabel(option))}
        value={value}
        onChange={onChange}
        renderValue={(value: any) => value.map((option: any) => getOptionLabel(option)).join(',')}
        multiple
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option}>
            {getOptionLabel(option)}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText ? <FormHelperText className="Mui-error">{helperText}</FormHelperText> : null}
    </FormControl>
  );
};
