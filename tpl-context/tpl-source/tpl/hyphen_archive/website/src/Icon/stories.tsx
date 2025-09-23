import React from 'react';
import { Story } from '@storybook/react';
import { Flex } from '@nyt/foundation';
import { css } from 'pretty-lights';
import * as IconMap from '../../../src/generated/Icons';
import { IconProps } from '../../../src/Icons/Icon';
import { Button, Body } from '../../../src';

interface IconExampleProps extends IconProps {
  icon?: keyof typeof IconMap;
}

export const BaseExample: Story<IconExampleProps> = ({ icon = 'AlertIcon', ...rest }) => {
  const IconComponent = IconMap[icon];
  return (
    <Flex justifyContent="center" padding={3}>
      <IconComponent {...rest} />
    </Flex>
  );
};

export const SizeExample: Story<IconExampleProps> = ({
  icon = 'AlertIcon',
  ...rest
}: Omit<IconExampleProps, 'size'>) => {
  const SizeComponent = IconMap[icon];
  return (
    <Flex justifyContent="center" alignItems="center" padding={3}>
      <SizeComponent size="sm" {...rest} />
      <SizeComponent size="md" {...rest} />
      <SizeComponent size="lg" {...rest} />
    </Flex>
  );
};

const scaledSize = css({
  height: '48px',
  width: '48px',
});

export const ScaledExample: Story<IconExampleProps> = ({
  icon = 'AlertIcon',
  ...rest
}: Omit<IconExampleProps, 'size'>) => {
  const ScaledComponent = IconMap[icon];
  return (
    <Flex justifyContent="center" alignItems="center" padding={3}>
      <ScaledComponent size="lg" className={scaledSize} {...rest} />
    </Flex>
  );
};

export const ButtonExample: Story<IconExampleProps> = ({
  icon = 'PlusIcon',
  ...rest
}: IconExampleProps) => {
  const ButtonComponent = IconMap[icon];
  return (
    <Flex justifyContent="center" alignItems="center" padding={3}>
      <Button variant="outline">
        <ButtonComponent size="sm" inline {...rest} /> Take an Action
      </Button>
    </Flex>
  );
};

export const InlineExample: Story<IconExampleProps> = ({
  color: iconColor = 'primary',
  icon = 'PlusIcon',
  ...rest
}: IconExampleProps) => {
  const InlineComponent = IconMap[icon];
  return (
    <>
      <Body color={iconColor}>
        <InlineComponent size="md" color={iconColor} inline {...rest} />
        Inline Icon with text (text large)
      </Body>
      <Flex alignItems="center" gap={0.5} style={{ color: iconColor }}>
        <InlineComponent size="md" color={iconColor} inline {...rest} />
        <Body size={3} color={iconColor}>
          Flex with Icon (text small)
        </Body>
      </Flex>
    </>
  );
};
