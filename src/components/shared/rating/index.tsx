import React from 'react';
import MuiRating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

interface IProps {
  name: string;
  max: number;
  readOnly?: boolean;
  value: number;
}

export const Rating: React.FC<IProps> = ({ name, max, readOnly = false, value }) => {
  return (
    <MuiRating
      name={name}
      max={max}
      emptyIcon={<StarBorderIcon fontSize="inherit" />}
      readOnly={readOnly}
      value={value}
    />
  );
};
