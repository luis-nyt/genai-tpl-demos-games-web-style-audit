import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cx } from 'pretty-lights';
import { useColorBehaviorContext } from '@nyt/foundation';
import { Flex } from '../Flex/index.js';
import { LinkBox } from '../LinkBox/index.js';
import { Text } from '../Typography/index.js';
import colorBehaviorStyles from './colorBehaviorStyles.js';
import { disabledClass, rootClass, radioIndicatorClass } from './styled.js';
import { useRadioGroupContext } from './RadioGroupContext.js';
import { CommonProps, dataTplAttr, DataTplValue } from '../util/index.js';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'>, CommonProps {
  /**
   * Input id. This will be derived from the value, if left blank.
   */
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** An optional CSS class applied to an inner parent element that contains the Radio's `label`, `description` and `children`. */
  contentClassName?: string;
}

/**
 * `Radio` wraps an `<input type="radio">` HTML element.
 *
 * Required fields are:
 *
 * - `label`: string field that wraps the primary label of the input. A `description` string is also allowed.
 * - `value`: the "value" property of the `<input>` element. to be recorded by the form. These must be unique.
 *
 * You also need a `name` prop. Use the `RadioGroup` component to set a common `name` prop for all `Radio` components in the group.
 *
 * An `id` may be passed as well, but if not, the `id` will be derived from the required `name` and `value` props.
 *
 * To preselect a default option add the attribute `checked`.
 *
 * @see RadioGroup
 */
const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      'aria-disabled': ariaDisabled,
      colorBehavior: colorBehaviorProp,
      children,
      className,
      contentClassName,
      description,
      disabled,
      id,
      label,
      name: nameProp,
      value,
      sx,
      style,
      ...rest
    }: RadioProps,
    ref
  ) => {
    const { name: nameContext } = useRadioGroupContext();
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();

    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;
    const name = nameProp ?? nameContext;
    const computedId = id ?? `${name}_${String(value)}`;

    return (
      <LinkBox
        className={cx(rootClass, className, {
          [disabledClass]: ariaDisabled === true || ariaDisabled === 'true' || !!disabled,
        })}
        colorBehavior={colorBehavior}
        style={style}
        sx={sx}
        {...{ [dataTplAttr]: DataTplValue.Radio }}
      >
        <LinkBox.Link
          as="input"
          type="radio"
          id={computedId}
          name={name}
          className={cx(radioIndicatorClass, colorBehaviorStyles[colorBehavior])}
          aria-disabled={ariaDisabled}
          disabled={disabled}
          /**
           * Radio indicates that its ref is of type `HTMLInputElement`, which is more precise
           * than `LinkBox.Link`'s ref type of `HTMLElement`
           */
          // @ts-expect-error
          ref={ref}
          value={value}
          {...rest}
        />
        <Flex className={contentClassName} flexDirection="column" gap={0.5}>
          {label && (
            <Text as="label" htmlFor={computedId} size={16} color="primary">
              {label}
            </Text>
          )}
          {description && (
            <Text as="label" htmlFor={computedId} size={14} color="secondary">
              {description}
            </Text>
          )}
          {children}
        </Flex>
      </LinkBox>
    );
  }
);

export { Radio, RadioProps };
