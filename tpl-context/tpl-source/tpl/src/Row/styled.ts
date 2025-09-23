import { spaceScale } from '@nyt/foundation';
import { css } from 'pretty-lights';
import { buttonHoverStyles, buttonActiveStyles } from '../Button/styled.js';
import { linkBoxLinkClass } from '../LinkBox/styled.js';
import { activeSelector, hoverSelector } from '../TextButton/styled.js';
import { borderRadius, color } from '../tokens/index.js';
import { dataTplAttr, DataTplValue } from '../util/index.js';

export const navIconButtonClass = 'tpl-row-nav-icon-button';

export const rowClass = css({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'row',
  gap: spaceScale.get(1),
  padding: `${spaceScale.get(2)} 0`,

  /** `LinkBox.Link` override: invariably get rid of text-decoration */
  [`.${linkBoxLinkClass}`]: {
    '&, &:link, &:hover, &:active': {
      textDecoration: 'none',
    },
  },

  /** Override styles for "nav" mode's trailing IconButton */
  [`.${navIconButtonClass}`]: {
    borderColor: 'transparent',
    '--button-shadowSpread': borderRadius.get(1),
  },

  /** Re-add hover and click effects to the "nav" trailing IconButton */
  [`${hoverSelector} .${navIconButtonClass}`]: buttonHoverStyles,
  [`${activeSelector} .${navIconButtonClass}`]: buttonActiveStyles,
});

export const leadingClass = css({
  flex: '0 0 auto',
});

export const contentAndSwitcherClass = css({
  flex: '1',
  alignItems: 'inherit',
  gap: 'inherit',
});

export const labelClass = css({
  margin: 0,
  color: `var(${color.content.primary}, #121212)`,
  font: '500 1rem/1.3 sans-serif',
});

export const descriptionClass = css({
  margin: `${spaceScale.get(0.5)} 0 0 0`,
  color: `var(${color.content.secondary}, #5a5a5a)`,
  font: '500 0.875rem/1.3 sans-serif',
});

export const trailingClass = css({
  [`> [${dataTplAttr}="${DataTplValue.IconButton}"]`]: {
    /** TODO: figure out why label text is positioned a half pixel lower? */
    margin: '-0.34375rem 0',
  },

  [`> [${dataTplAttr}="${DataTplValue.IconButton}"]`]: {
    /** TODO: figure out why TextButton is positioned a half pixel lower? */
    minHeight: 'initial',
  },
});
