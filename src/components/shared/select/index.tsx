import React from 'react';
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
  withClean?: boolean;
}

export const Select: React.FC<IProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  getOptionLabel,
  error,
  helperText,
  classes = '',
  withClean = false,
}) => {
  return (
    <FormControl variant="filled" className={classNames('custom', { [classes]: classes })}>
      <InputLabel id={label} error={error}>
        {label}
      </InputLabel>
      <MuiSelect
        labelId={label}
        id={id}
        value={value}
        onChange={onChange}
        renderValue={(value: any) => getOptionLabel(value)}
      >
        {withClean && (
          <MenuItem value="">
            <em> - </em>
          </MenuItem>
        )}
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
