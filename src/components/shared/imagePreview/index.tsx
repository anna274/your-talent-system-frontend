import React, { useState, useRef } from 'react';
import { FileInput } from 'components/shared';
import './style.scss';

interface IProps {
  name: string;
  label: string;
  imageURL: string;
  changeHandler?: (e: React.ChangeEvent<any>) => void;
  onClear: () => void;
}
export const ImagePreview: React.FC<IProps> = ({
  imageURL,
  label,
  name,
  changeHandler = () => {},
  onClear,
}) => {
  const [selectedImage, setSelectedImage] = useState(imageURL || '');
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const handleImageChange = (event: React.ChangeEvent<any>) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
    changeHandler(event);
  };
  const handleRemoveImage = () => {
    setSelectedImage('');
    if (inputRef.current?.value) {
      inputRef.current.value = '';
    }
    onClear();
  };

  return (
    <div className="image-preview">
      <FileInput
        id={name}
        name={name}
        label={label}
        accept="image/*"
        changeHandler={handleImageChange}
        ref={inputRef}
      />
      <div className="image-preview__container">
        {selectedImage ? (
          <>
            <img className="image-preview__image" alt="preview" src={selectedImage} />
            <span className="image-preview__rm-button" onClick={handleRemoveImage}></span>
          </>
        ) : (
          <h3>Изображение не выбрано</h3>
        )}
      </div>
    </div>
  );
};
