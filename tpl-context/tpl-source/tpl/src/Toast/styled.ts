import { css } from 'pretty-lights';
import { toastStyle } from './toastStyle.js';

const { background, cornerRadius, maxWidth, minHeight, padding, outerPadding } = toastStyle;

export const contentClass = css`
  width: 100%;
`;

export const dialogClass = css`
  background: transparent;
  border: none;
  max-width: ${maxWidth};
  padding: 0 ${outerPadding};
  width: calc(100% - ${outerPadding} * 2);
`;

export const dialogBodyClass = css`
  background: ${background};
  border-radius: ${cornerRadius};
  min-height: ${minHeight};
  padding: ${padding};
`;
