import { css } from 'pretty-lights';

export const iconButton = css({
  /**
   * Override the base `borderRadius` and always render round end caps, regardless of button width
   * @see https://stackoverflow.com/questions/18794947/capsule-shape-using-border-radius-without-a-set-width-or-height#comment27716324_18795153
   */
  borderRadius: '9999px',
});
