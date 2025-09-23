/* eslint-disable no-restricted-syntax */
import * as iconComponents from '../generated/Icons/index.js';
import { icons } from './icons.js';

it('categorizes all icons', () => {
  const uncategorizedIcons = new Set(Object.keys(iconComponents));

  for (const iconNames of Object.values(icons)) {
    for (const iconName of iconNames) {
      if (uncategorizedIcons.has(iconName)) uncategorizedIcons.delete(iconName);
    }
  }

  expect([...uncategorizedIcons.values()]).toEqual([]);
});
