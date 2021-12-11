import React from 'react';
import { ReactComponent as UploadIcon } from 'assets/icons/upload.svg';
import './style.scss';

interface IProps {
  id: string;
  name: string;
  label: string;
  accept: string;
  changeHandler?: (e: React.ChangeEvent<any>) => void;
}

export const FileInput = React.forwardRef<HTMLInputElement, IProps>(
  ({ name, accept, id, label, changeHandler }, ref) => {
    return (
      <div className="input_file-container">
        <input
          className="input_file"
          type="file"
          id={id}
          name={name}
          accept={accept}
          onChange={changeHandler}
          ref={ref}
        />
        <label className="input_file__label" htmlFor={id}>
          <UploadIcon className="input_file__icon" />
          <span>{label}</span>
        </label>
      </div>
    );
  },
);
