import { ArgTypes } from '@storybook/react';
import { spaceScale, SpaceType } from '@nyt/foundation';
import { allowedSpace } from '../../../../foundation/web/src/system/space.js';
import { BoxProps, color } from '../../index.js';

const spaceScaleSelect: ArgTypes<{ gap: SpaceType }>['gap'] = {
  control: 'select',
  options: Array.from(spaceScale.keys()),
};

const argTypes: ArgTypes<BoxProps> = {
  bg: {
    control: 'radio',
    options: [undefined, ...Object.keys(color.background)],
  },
  background: {
    control: false,
  },
  children: {
    control: false,
  },
  ...allowedSpace.reduce((acc, spaceProp) => {
    acc[spaceProp] = spaceScaleSelect;
    return acc;
  }, {}),
};

export { argTypes, spaceScaleSelect };
