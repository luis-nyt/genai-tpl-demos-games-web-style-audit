import React, { InputHTMLAttributes, useImperativeHandle, useRef, useState } from 'react';
import { cx } from 'pretty-lights';
import { useColorBehaviorContext, ColorBehaviorContext } from '@nyt/foundation';
import { Title, Text } from '../Typography/index.js';
import {
  inputLabelClass,
  textInputClass,
  tabFocusClass,
  inputHelperTextClass,
  inputErrorTextClass,
  alertInputClass,
  inputContainerClass,
  lockedClass,
  inputErrorClass,
  inputContainerFocusClass,
  inputFocusErrorClass,
} from './styled.js';
import { AlertIcon } from '../generated/Icons/index.js';
import { CommonProps, dataTplAttr, DataTplValue, visuallyHidden } from '../util/index.js';
import { BackgroundColorModifier, useTplSxProp } from '../system/index.js';
import { inputColorBehavior } from './colorBehaviorStyles.js';
import { CustomValidityMessages } from './applyCustomValidity.js';
import { useValidation } from './useValidation.js';

// TODO: add more types as we start developing them. i.e. type 'number'
type SupportedInput = 'text' | 'email' | 'password';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'>,
    Omit<CommonProps, 'children'>,
    BackgroundColorModifier {
  /**
   * Name of the form input. used to generate the `id` attribute if `id` is not provided
   */
  name?: string;
  /**
   * Brief notice of what information should be entered, i.e. "Name".
   */
  label?: React.ReactNode;
  /**
   * Visually hides the required label
   */
  hideLabel?: boolean;
  /**
   * Hides the " (Required)" string appended at the end of Label, when `required` is set to true
   */
  hideRequiredSuffix?: boolean;
  helperText?: React.ReactNode;
  /**
   * This is useful to add a component right next to the input. i.e. PasswordInput's show button. It's positioned using `flex`
   */
  badge?: React.ReactNode;
  type?: SupportedInput;
  /**
   * Allows overriding default HTML DOM error messages.
   */
  customValidity?: CustomValidityMessages;
  /**
   * Arbitrary "React-driven" error message, if passed with a value, it will trigger the input error state and will be displayed as the error message
   */
  error?: string;

  /**
   * Marks input as `readonly` and sets `aria-disabled=true`; provides a friendlier experience than setting the disabled attribute.
   */
  locked?: boolean;
}

export const TextInput = React.forwardRef(
  (
    {
      id,
      name,
      type = 'text',
      label,
      hideLabel,
      helperText,
      className,
      colorBehavior: colorBehaviorProp,
      badge,
      customValidity,
      error,
      locked,
      disabled,
      'aria-disabled': ariaDisabled,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      readOnly,
      required,
      hideRequiredSuffix,
      onClick,
      onMouseDownCapture,
      onFocus,
      onKeyDown,
      onBlur,
      onInvalid = e => {
        e.preventDefault();
      },
      style,
      sx,
      ...rest
    }: TextInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const [alertError, setAlertError] = useState(false);
    const [useTabFocusClass, setUseTabFocusClass] = useState(false);
    const [useInputFocusClass, setUseInputFocusClass] = useState(false);
    const { validationMessage, showValidationMessage } = useValidation(
      { customValidity, error },
      inputRef as React.RefObject<HTMLInputElement>
    );

    const computedId = id ?? `form_input_${name}`;

    const systemClass = useTplSxProp(sx);
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;

    // builds list of elements that describe the input, supports additional ids when passed by the aria-disabled prop
    const ariaDescribedByList =
      (helperText ? `helper_${computedId} ` : '') +
      (showValidationMessage ? `error_${computedId} ` : '') +
      (ariaDescribedBy ? `${ariaDescribedBy}` : '');

    // using a function instead of a component so aria-live doesn't miss it when re rendering error message
    const composedLabel = () => (
      <>
        {label}
        {required && !hideRequiredSuffix && (
          <Text size={14} as="span">
            {' '}
            (required)
          </Text>
        )}
      </>
    );

    return (
      <ColorBehaviorContext.Provider value={{ colorBehavior }}>
        <div className={cx(className, systemClass)} style={style}>
          <Title
            size={14}
            className={cx(inputLabelClass, {
              [visuallyHidden]: !!hideLabel,
            })}
            as="label"
            htmlFor={computedId}
            color="primary"
          >
            {composedLabel()}
          </Title>
          <div
            className={cx(
              inputContainerClass,
              {
                [lockedClass]: disabled ?? locked,
                [tabFocusClass]: useTabFocusClass,
                [inputContainerFocusClass]: useInputFocusClass,
                [inputErrorClass]: showValidationMessage,
                [inputFocusErrorClass]:
                  showValidationMessage && (useTabFocusClass || useInputFocusClass),
              },
              inputColorBehavior[colorBehavior]
            )}
          >
            <input
              className={cx(textInputClass, {
                [lockedClass]: disabled ?? locked,
              })}
              onInvalid={e => {
                setAlertError(true);
                onInvalid(e);
              }}
              onMouseDownCapture={e => {
                setUseInputFocusClass(true);
                onMouseDownCapture?.(e);
              }}
              onClick={e => {
                setUseTabFocusClass(false);
                onClick?.(e);
              }}
              onFocus={e => {
                setUseTabFocusClass(true);
                setAlertError(false);
                onFocus?.(e);
              }}
              onKeyDown={e => {
                // Prevents all inputs from getting focus style when form is autofilled
                if (e.key !== 'Unidentified') {
                  setUseTabFocusClass(false);
                  setUseInputFocusClass(true);
                }
                onKeyDown?.(e);
              }}
              onBlur={e => {
                setUseTabFocusClass(false);
                setUseInputFocusClass(false);
                setAlertError(true);
                onBlur?.(e);
              }}
              id={computedId}
              name={name}
              ref={inputRef}
              type={type}
              readOnly={readOnly ?? locked}
              aria-disabled={ariaDisabled ?? locked}
              required={required}
              aria-invalid={ariaInvalid ?? showValidationMessage}
              aria-describedby={ariaDescribedByList}
              disabled={disabled}
              {...{ [dataTplAttr]: DataTplValue.TextInput, ...rest }}
            />
            {badge && badge}
          </div>
          {helperText && (
            <Text
              id={`helper_${computedId}`}
              size={14}
              className={inputHelperTextClass}
              as="p"
              color="secondary"
            >
              {helperText}
            </Text>
          )}
          {showValidationMessage && (
            <Text
              id={`error_${computedId}`}
              aria-live={alertError ? 'assertive' : 'off'}
              aria-atomic
              size={14}
              className={cx(inputErrorTextClass)}
              as="p"
              color="negative"
            >
              <AlertIcon inline className={alertInputClass} size={12} />
              <span className={visuallyHidden}>Error on {composedLabel()} </span>
              {validationMessage}
            </Text>
          )}
        </div>
      </ColorBehaviorContext.Provider>
    );
  }
);
