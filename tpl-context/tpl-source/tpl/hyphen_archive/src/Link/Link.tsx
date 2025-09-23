import React from 'react';
import { cx, css } from 'pretty-lights';
import { color } from '../tokens';

interface LinkProps extends Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'> {
  /**
   * Used for standalone navigational actions.
   * Appends arrow at end
   */
  directional?: boolean;
  /**
   * Color of the link
   */
  color?: 'inherit' | 'accent';
  /**
   * Visually dims anchor, sets aria-disabled=true, disables pointer-events
   */
  disabled?: boolean;
  className?: string;
}

const underline = {
  textUnderlineOffset: '0.1em',
  textDecorationLine: 'underline',
  textDecorationThickness: '1px',
};

const linkClass = css({
  ...underline,
  color: 'inherit',

  '&:disabled': {
    opacity: '0.4',
  },

  '&:hover, &:focus': {
    textDecoration: 'none',
  },
});

const disabledClass = css({
  opacity: '0.4',
  pointerEvents: 'none',
});

const directionalClass = css({
  textDecorationLine: 'unset',

  '&:after': {
    display: 'inline-block',
    content: '"\u203A"', // TODO use Icon instead
    marginLeft: '0.4ch',
  },

  '&:hover, &:focus': underline,
});

const accentClass = css({
  color: color.content.accent,
});

const Link = React.forwardRef<HTMLAnchorElement | null, LinkProps>(
  (
    { children, className, directional, disabled, color: colorProp, ...rest }: LinkProps,
    ref
  ): JSX.Element => {
    return (
      <a
        ref={ref}
        aria-disabled={disabled}
        className={cx(
          linkClass,
          {
            [directionalClass]: directional,
            [disabledClass]: disabled,
            [accentClass]: colorProp === 'accent',
          },
          className
        )}
        {...rest}
      >
        {children}
      </a>
    );
  }
);

Link.defaultProps = {
  color: 'inherit',
};

Link.displayName = 'Link';

export { Link, LinkProps };
