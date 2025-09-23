import { css } from 'pretty-lights';
import { ColorBehaviorStyles } from '@nyt/foundation';
import { prefersDarkMode } from '../../util/index.js';

const lightStyles = `
  --tpl-story-list-item-poster-overlay-color: transparent;
  --tpl-story-list-item-poster-text-shadow-color: transparent;
  --tpl-story-list-item-poster-gradient-color: transparent;
`;

const darkStyles = `
  --tpl-story-list-item-poster-overlay-color: hsla(0 0% 50% / 0.1);
  --tpl-story-list-item-poster-text-shadow-color: hsla(0 0 0% / 79%);
  --tpl-story-list-item-poster-gradient-color: #000;
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
