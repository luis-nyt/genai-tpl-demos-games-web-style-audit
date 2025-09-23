import { createTplColorBehaviorStyles } from '../tokens/index.js';

export const inputColorBehavior = createTplColorBehaviorStyles(
  light => `
  --tpl-input-tab-focus-accent:${light.content.accent.hex};
  --tpl-input-focus-stroke:${light.stroke.primary.hex};

  --tpl-input-locked-background: ${light.background.tertiary.hex};

  --tpl-input-content: ${light.content.primary.hex};
  --tpl-input-stroke: ${light.stroke.secondary.hex};
  --tpl-input-background: ${light.background.primary.hex};
  --tpl-input-placeholder: ${light.content.placeholder.hex};

  --tpl-input-error-stroke: ${light.content.negative.hex};`
);
