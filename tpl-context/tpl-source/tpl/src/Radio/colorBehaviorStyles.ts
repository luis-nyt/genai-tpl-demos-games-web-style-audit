/**
 * @fileoverview
 * TPL Radio uses a custom border color when hovering over it in Dark Mode. We want to accommodate
 * both this and the `colorBehavior` prop. Thus, we use extended themes with an extra color token
 * named `stroke.radioHover`, along with `createColorBehaviorStyles()`, to declare styles with the
 * custom color token.
 *
 * We do *not* need to tell TPL Root about this color because `createColorBehaviorStyles()` doesn't
 * output styles with CSS variable references.
 */

import { createColorBehaviorStyles } from '@nyt/foundation';
import { light, dark } from '../tokens/index.js';
import { notDisabledSelector, prefersDarkMode } from '../util/index.js';

const radioLight = light.extend.colors({
  stroke: {
    /** Happens to be the same color value as Content Secondary */
    radioHover: '#5A5A5A',
  },
});

const radioDark = dark.extend.colors({
  stroke: {
    radioHover: '#C7C7C7',
  },
});

const colorBehaviorStyles = createColorBehaviorStyles(
  radioLight.colors,
  radioDark.colors,
  prefersDarkMode // same as `createTplColorBehaviorStyles()`
)(
  lightTheme => `
  ${notDisabledSelector}:not(:checked):not(:active):hover {
    /* A custom color */
    border-color: ${lightTheme.stroke.radioHover.hex};
  }

  &:checked {
    border-color: ${lightTheme.stroke.primary.hex};
    background-color: ${lightTheme.content.primary.hex};
  }

  &:active {
    border-color: ${lightTheme.content.primary.hex};
  }

  border-color: ${lightTheme.stroke.secondary.hex};`
);

export default colorBehaviorStyles;
