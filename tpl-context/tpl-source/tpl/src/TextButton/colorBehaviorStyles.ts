import { createTplColorBehaviorStyles } from '../tokens/index.js';

export const hslValuesToCssVarValues = ([h, s, l]) => `${h},${s}%,${l}%`;

const colorBehaviorStyles = createTplColorBehaviorStyles(
  (light, dark) => `
  --button-bg: ${hslValuesToCssVarValues(dark.background.primary.hslValues)};
  --button-fg: ${hslValuesToCssVarValues(light.content.primary.hslValues)};
  --button-filledFg: ${dark.content.primary.hex};
  --button-strokeHover: ${hslValuesToCssVarValues(light.stroke.primary.hslValues)};`
);

export default colorBehaviorStyles;
