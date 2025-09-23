import React from 'react';
import { cx, css } from 'pretty-lights';
import { color as hyphenColor } from '../tokens';
import { IconSize, iconSizes } from '../Icons/Icon';

interface SpinnerProps {
  /**
   * The label prop turns the spinner into an image element in assistive technologies and adds an aria-label of the value. This is useful for buttons and other elements with a spinner that don't have a text label.
   */
  label?: string;
  className?: string;
  /**
   * The color prop gives you the choice of colors from the Hyphen Content color palette: primary, secondary, tertiary, positive, negative, and accent.
   * By default, the color is set to currentColor of the color of the parent element or document.
   */
  color?: keyof typeof hyphenColor.content;
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

const Spinner = ({ className, color, label, size = 'lg', ...rest }: SpinnerProps): JSX.Element => {
  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox="0 0 24 24"
      role={label ? 'img' : ''}
      aria-label={label}
      className={cx(spinnerClass, className)}
      style={{ color: color ? hyphenColor.content[color] : undefined }}
      {...rest}
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
};

export { Spinner, SpinnerProps };
