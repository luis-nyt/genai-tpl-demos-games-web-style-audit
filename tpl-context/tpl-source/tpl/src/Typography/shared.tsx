import React from 'react';
import { ArgTypes, Meta } from '@storybook/react';
import { typography, TypographyPrefix, TypographyVariant, TypographyProps, Box } from '../index.js';

type MinimalTypographyProps = Pick<TypographyProps, 'children' | 'color' | 'colorBehavior'>;

const createSizeControl = <Prefix extends TypographyPrefix>(
  prefix: Prefix
): { control: 'select'; options: TypographyVariant<Prefix>[] } => {
  return {
    control: 'select',
    options: Object.keys(typography)
      .filter(key => key.startsWith(prefix))
      .map(k => {
        const [, variant] = k.split('/');
        const variantNum = parseInt(variant, 10);
        return (Number.isNaN(variantNum) ? variant : variantNum) as TypographyVariant<Prefix>;
      }),
  };
};

const responsiveSize: ArgTypes<{ size: number }>['size'] = { size: { control: 'array' } };

const bodyParams = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis mi arcu. Nunc risus massa, posuere sed felis et, placerat mollis ligula. Proin dapibus felis eget porttitor faucibus. Vestibulum viverra mattis cursus. Sed id turpis sed felis rutrum consectetur nec lobortis lacus. Praesent ante justo, mattis eleifend orci non, vestibulum imperdiet justo. Proin eget libero condimentum, euismod nibh ullamcorper, maximus arcu. Quisque turpis ex, porta at est id, semper blandit nulla. Proin hendrerit orci sit amet enim feugiat, vitae dapibus sapien euismod. Aenean lorem purus, porttitor in tristique eu, interdum a ex. Proin elementum auctor consectetur. Etiam eleifend eget ipsum at tincidunt. Sed eu iaculis est.',
  },
  decorators: [
    (Story, { args }) => (
      <Box bg="primary" p={2} maxWidth="36rem" colorBehavior={args.color && args.colorBehavior}>
        {Story()}
      </Box>
    ),
  ],
} satisfies Meta<MinimalTypographyProps>;

const headingParams = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  decorators: [
    (Story, { args }) => (
      <Box bg="primary" p={2} colorBehavior={args.color && args.colorBehavior}>
        {Story()}
      </Box>
    ),
  ],
} satisfies Meta<MinimalTypographyProps>;

export { bodyParams, createSizeControl, headingParams, responsiveSize };
