import { css } from 'pretty-lights';
import { borderRadius } from '../tokens/index.js';

export const regular = '';

export const light = css({
  borderColor: 'transparent',
  '--button-shadowSpread': borderRadius.get(1),
});
