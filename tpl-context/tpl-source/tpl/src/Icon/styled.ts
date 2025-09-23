import { css } from 'pretty-lights';
import { ColorBehaviorStyles } from '@nyt/foundation';
import { prefersDarkMode } from '../util/index.js';

export const lightIconArtworkClass = 'icon-light';

export const darkIconArtworkClass = 'icon-dark';

export const themedIconArtworkClasses: ColorBehaviorStyles = {
  get userDefault() {
    return css`
      .${lightIconArtworkClass} {
        ${prefersDarkMode('visibility: hidden;')}
      }

      .${darkIconArtworkClass} {
        visibility: hidden;
        ${prefersDarkMode('visibility: visible;')}
      }
    `;
  },

  get alwaysLight() {
    return css`
      .${darkIconArtworkClass} {
        visibility: hidden;
      }
    `;
  },

  get alwaysDark() {
    return css`
      .${lightIconArtworkClass} {
        visibility: hidden;
      }
    `;
  },

  get userInverse() {
    return css`
      .${lightIconArtworkClass} {
        visibility: hidden;
        ${prefersDarkMode('visibility: visible;')}
      }

      .${darkIconArtworkClass} {
        ${prefersDarkMode('visibility: hidden;')}
      }
    `;
  },
};
