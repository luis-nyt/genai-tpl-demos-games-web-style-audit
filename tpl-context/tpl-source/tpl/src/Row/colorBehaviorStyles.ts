import { createTplColorBehaviorStyles } from '../tokens/index.js';

/**
 * These color behavior styles override Row's horizontal rule border-color.
 */
export const ruleColorBehaviorStyles = createTplColorBehaviorStyles(
  light => `border-color: ${light.stroke.tertiary.hex};`
);

/**
 * Row's color behavior styles set a text color to avoid custom text content displaying incorrectly.
 */
export const rowColorBehaviorStyles = createTplColorBehaviorStyles(
  light => `color: ${light.content.primary.hex};`
);
