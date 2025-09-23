import { hslValuesToCssVarValues } from '../TextButton/colorBehaviorStyles.js';
import { createTplColorBehaviorStyles } from '../tokens/index.js';

const colorBehaviorStyles = createTplColorBehaviorStyles(
  light => `--button-stroke: ${hslValuesToCssVarValues(light.stroke.tertiary.hslValues)};`
);

export default colorBehaviorStyles;
