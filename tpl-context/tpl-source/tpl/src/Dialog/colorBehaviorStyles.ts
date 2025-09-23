import { ColorBehaviorStyles } from '@nyt/foundation';
import { css } from 'pretty-lights';
import { light, dark } from '../tokens/index.js';
import { prefersDarkMode } from '../util/index.js';

const lightStyles = `
  background: var(--tpl-dialog-background, ${light.colors.background.primary.hex});
`;

const darkStyles = `
  background: var(--tpl-dialog-background, ${dark.colors.background.secondary.hex});
`;

export default {
  userDefault: css`
    ${lightStyles};
    ${prefersDarkMode(darkStyles)};
  `,
  alwaysLight: css(lightStyles),
  alwaysDark: css(darkStyles),
  userInverse: css`
    ${darkStyles};
    ${prefersDarkMode(lightStyles)};
  `,
} satisfies ColorBehaviorStyles;
