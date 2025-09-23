import { css } from 'pretty-lights';

/**
 * A base CSS class used to style a "content" container for BaseButton's children, Icon & Spinner.
 * It uses flex layout and inherits an intentionally limited number of CSS properties for
 * convenience, e.g. to change the Icon position from "leading" (preferred) to "trailing" with:
 *
 * ```tsx
 * <BaseButton style={{ flexDirection: 'row-reverse' }}>
 * ```
 *
 * It also uses relative positioning so that we can absolutely position the Spinner.
 */
export const contentClass = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'inherit',
  alignItems: 'inherit',
  justifyContent: 'inherit',
  gap: 'inherit',
});

/**
 * Use this to hide the button text when `processing` is truthy.
 *
 * Doing this maintains the button width between processing and non-processing
 * states. Remember to set the aria-label to reflect the state of the button
 * when the button text is hidden, e.g., `aria-label="Processing your registration"`
 */
export const childHiddenClass = css({
  visibility: 'hidden',
});

/** A CSS class applied to the Icon component rendered by BaseButton */
export const iconClass = css({
  /** Prevents the Icon from shrinking in width when the other children are very wide */
  flexShrink: 0,
});

/** A string-type CSS class which we use in other components to apply CSS overrides */
export const onlyIconClass = 'only-icon';

export const spinnerClass = css({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  margin: 'auto',
});
