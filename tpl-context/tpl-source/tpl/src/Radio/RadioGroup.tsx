import React, { FieldsetHTMLAttributes, forwardRef } from 'react';
import { cx } from 'pretty-lights';
import { Flex, FlexProps } from '../Flex/index.js';
import { Text, Title } from '../Typography/index.js';
import { dataTplAttr, DataTplValue, visuallyHidden } from '../util/index.js';
import type { RadioProps } from './Radio.js';
import { radioGroupClass } from './styled.js';
import { RadioGroupContext } from './RadioGroupContext.js';

interface RadioGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'style'>,
    FlexProps {
  /**
   * Instances of `Radio` components within group
   */
  children?: React.ReactElement<RadioProps>[];
  /** The common `name` prop for all `Radio` components rendered within the `RadioGroup` */
  name?: RadioProps['name'];
  /** A group label for all `Radio` components contained within */
  label?: React.ReactNode;
  /** An expanded description of this group of `Radio` components */
  description?: React.ReactNode;
  /**
   * Show the `RadioGroup` label and description? If set to `false`, visually hides the label and
   * description, while still making them accessible to screen readers.
   */
  showLabel?: boolean;
}

/**
 * Use `RadioGroup` to group multiple `Radio` components together within a `<fieldset>`, thereby presenting multiple
 * discrete options to the user in a form interface.
 *
 * The optional `label` and `description` props let you describe the group of options.
 * Setting `showLabel` to `false` renders these as visually hidden in the DOM.
 *
 * `RadioGroup`'s `name` and `onChange` props apply to all `Radio` components rendered within it.
 */
const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      children,
      className,
      colorBehavior,
      description,
      flexDirection = 'column',
      gap = 0.5,
      label,
      name,
      showLabel = true,
      ...rest
    },
    ref
  ) => (
    <Flex
      as="fieldset"
      className={cx(radioGroupClass, className)}
      colorBehavior={colorBehavior}
      flexDirection={flexDirection}
      gap={gap}
      ref={ref}
      {...{ [dataTplAttr]: DataTplValue.RadioGroup, ...rest }}
    >
      {(!!label || !!description) && (
        <Flex
          as="legend"
          className={cx({ [visuallyHidden]: !showLabel })}
          flexDirection="column"
          gap={0.5}
          p={0}
          mb={1.5}
        >
          {label && (
            <Title size={14} color="primary">
              {label}
            </Title>
          )}
          {description && (
            <Text size={14} color="secondary">
              {description}
            </Text>
          )}
        </Flex>
      )}

      <RadioGroupContext.Provider value={{ name }}>{children}</RadioGroupContext.Provider>
    </Flex>
  )
);

export { RadioGroup, RadioGroupProps };
