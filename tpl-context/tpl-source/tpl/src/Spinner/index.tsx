import React, { forwardRef } from 'react';
import { cx, css } from 'pretty-lights';
import { ColorLike, useColorBehaviorContext } from '@nyt/foundation';
import { createTplColorBehaviorStyles } from '../tokens/index.js';
import { IconProps, IconSize } from '../Icon/index.js';
import { dataTplAttr, DataTplValue } from '../util/index.js';
import { useTplSxProp } from '../system/index.js';

interface SpinnerProps extends Omit<IconProps, 'children' | 'inline' | 'size'> {
  /** The size at which the icon is rendered. */
  size?: IconSize;
}

const spinnerClass = css`
  animation: spin 0.8s steps(10, end) infinite;
  @media (prefers-reduced-motion) {
    animation-duration: 10s;
  }
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

/**
 * The `@nyt/tpl` Spinner is a simple loading indicator that can be used to indicate that a process
 * is in progress. It will take the color of the parent element, typically a black or white.
 *
 * When a user has reduced motion enabled, the spinner will animate at a significantly slower speed.
 */
const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  (
    {
      'aria-hidden': ariaHiddenProp,
      'aria-label': ariaLabel,
      className,
      color,
      colorBehavior: colorBehaviorProp,
      size = 24,
      role: roleProp,
      sx,
      ...rest
    },
    ref
  ) => {
    const systemClass = useTplSxProp(sx);
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;

    /** Create color behavior styles for the given `color` */
    const colorClass = color
      ? createTplColorBehaviorStyles(light => `color: ${(light.content[color] as ColorLike).hex};`)
      : undefined;

    let role = roleProp;
    if (ariaLabel && !role) role = 'img';

    /** Set `aria-hidden={true}` when `aria-label` is nullish and `aria-hidden` is nullish */
    const ariaHidden = ariaLabel == null && ariaHiddenProp == null ? true : ariaHiddenProp;

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        role={role}
        className={cx(spinnerClass, colorClass?.[colorBehavior], className, systemClass)}
        {...{ [dataTplAttr]: DataTplValue.Spinner, ...rest }}
      >
        <g fill="currentColor">
          <path d="M11.28 22.8a.72.72 0 1 0 1.44 0v-6.72a.72.72 0 1 0-1.44 0v6.72Z" opacity=".37" />
          <path
            d="M17.766 21.16a.72.72 0 1 0 1.165-.846l-3.95-5.436a.72.72 0 1 0-1.165.846l3.95 5.437Z"
            opacity=".26"
          />
          <path
            d="M1.506 14.653a.72.72 0 0 0 .445 1.37l6.391-2.078a.72.72 0 1 0-.445-1.369l-6.39 2.077Z"
            opacity=".61"
          />
          <path
            d="M5.07 20.314a.72.72 0 0 0 1.164.847l3.95-5.437a.72.72 0 1 0-1.165-.846l-3.95 5.436Z"
            opacity=".48"
          />
          <path
            d="M22.049 16.022a.72.72 0 0 0 .445-1.37l-6.391-2.076a.72.72 0 1 0-.445 1.37l6.39 2.076Z"
            opacity=".17"
          />
          <path
            d="M22.494 9.347a.72.72 0 1 0-.445-1.37l-6.391 2.078a.72.72 0 1 0 .445 1.369l6.39-2.077Z"
            opacity=".09"
          />
          <path
            d="M6.234 2.84a.72.72 0 0 0-1.165.846l3.95 5.436a.72.72 0 0 0 1.165-.846l-3.95-5.437Z"
            opacity=".87"
          />
          <path
            d="M1.951 7.978a.72.72 0 1 0-.445 1.37l6.391 2.076a.72.72 0 1 0 .445-1.37l-6.39-2.076Z"
            opacity=".74"
          />
          <path
            d="M18.93 3.686a.72.72 0 0 0-1.164-.847l-3.95 5.437a.72.72 0 0 0 1.165.846l3.95-5.436Z"
            opacity=".02"
          />
          <path d="M12.72 1.2a.72.72 0 1 0-1.44 0v6.72a.72.72 0 0 0 1.44 0V1.2Z" />
        </g>
      </svg>
    );
  }
);

export { Spinner, SpinnerProps };
