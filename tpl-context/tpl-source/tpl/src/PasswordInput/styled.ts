import { css } from 'pretty-lights';
import { spaceScale } from '@nyt/foundation';

const outlineOffset = '-0.3rem';

export const showButtonClass = css({
  minWidth: '3.57rem',
  padding: `0 ${spaceScale.get(1.5)}`,

  borderRadius: '0.35rem',
  outlineOffset,
  '&:focus-visible': {
    outlineOffset,
  },
});
