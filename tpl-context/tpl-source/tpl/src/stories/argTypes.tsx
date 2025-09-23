import { ArgTypes } from '@storybook/react';
// eslint-disable-next-line no-restricted-imports
import { ColorBehaviorProps } from '@nyt/foundation';
import { icons } from '../Icon/icons.js';
import * as iconComponents from '../generated/Icons/index.js';
import { ButtonProps } from '../Button/index.js';

const iconMapping = Object.fromEntries(
  Object.values(icons)
    .flat()
    .map(iconName => [iconName.replace(/Icon$/, ''), iconComponents[iconName]])
);

const buttonExcludedIconNames = new Set<keyof typeof iconComponents>(['DotIcon']);

const buttonIconMapping = Object.fromEntries(
  Object.values(icons)
    .flat()
    .filter(iconName => !(buttonExcludedIconNames as Set<string>).has(iconName))
    .map(iconName => [iconName.replace(/Icon$/, ''), iconComponents[iconName]])
);

export const colorBehaviorArgType: ArgTypes<ColorBehaviorProps> = {
  colorBehavior: {
    control: 'select',
    options: ['userDefault', 'alwaysLight', 'alwaysDark', 'userInverse'],
  },
};

export const argTypes: ArgTypes<Pick<ButtonProps, 'colorBehavior' | 'icon'>> = {
  ...colorBehaviorArgType,
  icon: {
    control: 'select',
    options: Object.keys(iconMapping),
    mapping: iconMapping,
  },
};

export const buttonArgTypes: ArgTypes<ButtonProps> = {
  ...argTypes,
  href: {
    control: 'text',
  },
  /** We exclude certain icons from Button's stories */
  icon: {
    control: 'select',
    options: Object.keys(buttonIconMapping),
    mapping: buttonIconMapping,
  },
  processing: {
    control: 'boolean',
  },
};
