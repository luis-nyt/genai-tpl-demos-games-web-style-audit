import React, { forwardRef, ReactNode } from 'react';
import { Flex, FlexProps } from '../../Flex/index.js';
import { Label, Title, Text } from '../../Typography/index.js';
import { dataTplAttr, DataTplValue } from '../../util/index.js';

/**
 * @group Dialog
 */
export interface DialogContentProps extends FlexProps {
  label?: ReactNode;
  description?: ReactNode;
}

/**
 * A view that renders {@link Dialog}'s title, label and description text in the default layout.
 * Use as the dialog's `children` property.
 *
 * @group Dialog
 */
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, label, description, ...rest }, ref) => {
    return (
      <Flex
        ref={ref}
        flexDirection="column"
        gap={1}
        alignItems="flex-start"
        {...{ [dataTplAttr]: DataTplValue.DialogContent, ...rest }}
      >
        {label && (
          <Label as="div" variant="Regular" color="secondary">
            {label}
          </Label>
        )}
        <Title as="div" size={18} color="primary">
          {children}
        </Title>
        {description && (
          <Text as="div" size={16} color="secondary">
            {description}
          </Text>
        )}
      </Flex>
    );
  }
);
