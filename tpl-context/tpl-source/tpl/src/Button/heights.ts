import { spaceScale } from '@nyt/foundation';
import { css } from 'pretty-lights';
import { borderWidth } from '../tokens/index.js';

export const standard = css({
  '--button-px': `calc(${spaceScale.get(2)} + var(--button-pxExtra) - var(--button-borderWidth))`,
});

export const compact = css({
  '--button-px': `calc(${spaceScale.get(1.5)} + var(--button-pxExtra) - var(--button-borderWidth))`,
});

export const extraCompact = css({
  '--button-py': `calc(0.375rem - ${borderWidth.get(1)})`,
  '--button-px': 'calc(0.625rem + var(--button-pxExtra) - var(--button-borderWidth))',
});

export const expanded = css({
  '--button-py': `calc(${spaceScale.get(2)} - var(--button-borderWidth))`,
  '--button-px': `calc(${spaceScale.get(2.5)} + var(--button-pxExtra) - var(--button-borderWidth))`,
});
