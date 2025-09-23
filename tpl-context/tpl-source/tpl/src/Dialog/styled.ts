import { css } from 'pretty-lights';
import { spaceScale } from '@nyt/foundation';
import { dialogStyle } from './dialogStyle.js';
import { color } from '../tokens/index.js';

const transitionDuration = '0.25s';

export const rootClass = css`
  border: none;
  overflow: hidden;
  padding: 0;
  margin: auto;
  width: calc(100% - ${dialogStyle.outerPadding} * 2);
  min-width: calc(23.4375rem - ${dialogStyle.outerPadding} * 2);
  max-width: 33.5rem;
  max-height: 100%;
  border-radius: ${dialogStyle.cornerRadius};
  box-shadow: ${dialogStyle.shadowX} ${dialogStyle.shadowY} ${dialogStyle.shadowRadius}
    ${dialogStyle.shadowColor};

  ::backdrop {
    background-color: ${color.background.scrim};
  }
`;

/**
 * @see https://frontendmasters.com/blog/the-dialog-element-with-entry-and-exit-animations/
 * @see https://frontendmasters.com/blog/animating-dialog/
 * @see https://codepen.io/argyleink/pen/zYbQBOm
 */
export const rootWithTransitionClass = css`
  &,
  &::backdrop {
    opacity: 0;
    transition:
      opacity ${transitionDuration} ease-in-out,
      display ${transitionDuration} ease-in-out allow-discrete,
      overlay ${transitionDuration} ease-in-out allow-discrete;
  }

  &[open],
  &[open]::backdrop {
    /* Post-Entry (Normal) State */
    opacity: 1;

    /* Pre-Entry State */
    @starting-style {
      opacity: 0;
    }
  }
`;

export const closeBtnClass = css`
  position: absolute;
  right: ${spaceScale.get(1.5)};
  top: ${spaceScale.get(1.5)};
`;

// TODO: Remove after implementing full TPL on-media Button support
export const closeBtnOnMediaClass = css`
  background: rgba(0, 0, 0, 0.35);
`;

export const containerClass = css`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: stretch;
  gap: ${dialogStyle.spacing};
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(100dvh - ${dialogStyle.outerPadding} * 2);
  padding: ${dialogStyle.padding};
`;

export const mediaSlotClass = css`
  order: 0;
  margin: calc(-1 * ${dialogStyle.padding}) calc(-1 * ${dialogStyle.padding}) 0;
`;

export const contentSlotClass = css`
  order: 1;
`;

export const contentSlotWithTrailingPaddingClass = css`
  padding-right: ${spaceScale.get(1.5)};
`;

export const actionSlotClass = css`
  order: 2;
  display: flex;
  flex-direction: column;
  gap: ${dialogStyle.spacingBetweenActions};
  align-items: ${dialogStyle.alignment};

  & > button {
    max-width: 100%;
  }
`;

export const noMediaTopPaddingClass = css`
  padding-top: ${spaceScale.get(4)};
`;
