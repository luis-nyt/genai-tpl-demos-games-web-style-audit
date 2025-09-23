import React, { useState } from 'react';
import { TextInput, TextInputProps } from '../TextInput/index.js';
import { showButtonClass } from './styled.js';
import { TextButton } from '../TextButton/index.js';
import { dataTplAttr, DataTplValue, visuallyHidden } from '../util/index.js';

export interface PasswordInputProps extends Omit<TextInputProps, 'type' | 'badge'> {
  'new-password'?: boolean;
}

const TogglePasswordBtn = ({ showPassword, onShowClick }) => {
  const showHideText = showPassword ? 'Hide' : 'Show';
  const passwordVisibilityAnnouncement = `Your password is ${showPassword ? 'shown' : 'hidden'}.`;

  return (
    <>
      <TextButton
        className={showButtonClass}
        onClick={onShowClick}
        aria-label={`${showHideText} Password`}
        height="compact"
        type="button"
      >
        {showHideText}
      </TextButton>
      <span className={visuallyHidden} aria-live="polite">
        {passwordVisibilityAnnouncement}
      </span>
    </>
  );
};

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    { id, className, 'new-password': newPassword, autoComplete, locked, disabled, ...rest },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const autoCompleteVal = newPassword ? 'new-password' : autoComplete;
    const textOrPasswordType = showPassword ? 'text' : 'password';

    const onShowClick = e => {
      e.preventDefault();
      setShowPassword(!showPassword);
    };

    return (
      <TextInput
        {...{ [dataTplAttr]: DataTplValue.PasswordInput, ...rest }}
        autoComplete={autoCompleteVal}
        type={textOrPasswordType}
        className={className}
        ref={ref}
        locked={locked}
        disabled={disabled}
        badge={<TogglePasswordBtn showPassword={showPassword} onShowClick={onShowClick} />}
      />
    );
  }
);
