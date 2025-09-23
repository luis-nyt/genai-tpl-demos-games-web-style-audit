import { createFocusClass } from '../util/index.js';

export const linkBoxClass = 'tpl-lb';

/**
 * Using a non-Pretty Lights string class here so that we can use this class in other selectors
 * below. When this was a Pretty Lights class, e.g. `= css(...)`, Pretty Lights generated a
 * different class in `linkBoxClass`'s selectors than the CSS class applied to the `LinkBox.Link`
 * element itself. Thus, to ensure we have reliable styles, this is just a string.
 */
export const linkBoxLinkClass = 'tpl-lbl';

/**
 * list of tabbable elements. The below must still be able to be interacted with within a linkbox
 */
const tabbables = `
  a[href],
  area,
  button:enabled,
  input:not([type=hidden]):enabled,
  link[href],
  object,
  select:enabled,
  textarea:enabled,
  [tabindex],
  [draggable]
`;

export const linkBoxStyles = {
  [`:where(.${linkBoxClass})`]: {
    position: 'relative',
    isolation: 'isolate',
  },

  /**
   * This forces all tabbable elements other than the LinkBox link itself (video, links, etc) to
   * above the z-index of the ::before pseudo-element. Otherwise they wouldn't be interactive;
   * clicks within the LinkBox would follow the main link.
   */
  [`:where(.${linkBoxClass} :is(${tabbables}):not(.${linkBoxLinkClass}))`]: {
    position: 'relative',
    zIndex: 1,
  },

  [`:where(.${linkBoxClass} .${linkBoxLinkClass})`]: createFocusClass({
    selectorSuffix: '::before',
  }),

  /**
   * This is where the magic happens. It makes the click area of the link the entire container.
   */
  [`:where(.${linkBoxClass} .${linkBoxLinkClass})::before`]: {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
};
