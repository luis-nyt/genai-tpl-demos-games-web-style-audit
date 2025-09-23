import React from 'react';
import { cx } from 'pretty-lights';
import { LayoutProps, MarginProps, space, layout, useSystemProps } from '@nyt/foundation';
import { LinkTarget } from '../types';
import { Spinner } from '../Spinner';
import { IconProps } from '../Icons/Icon';
import { StyledButton, StyledProcessingSpinner, hiddenClass } from './styled';

interface BaseButtonProps extends MarginProps, Omit<LayoutProps, 'display'> {
  display?: 'inline-flex' | 'flex';
  variant?: 'filled' | 'filledDark' | 'outline' | 'outlineDark' | 'text' | 'textDark';
  height?: 'standard' | 'compact';
  /**
   * Icon component which will render alongside Button's children. This takes a function component, not an element!
   *
   * @see https://hyphen.nyt.net/?path=/docs/components-icons--icon
   */
  icon?: React.FC<IconProps>;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ButtonAsButtonProps extends BaseButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  role?: string;
  processing?: boolean;
  processingIconClassName?: string;
  /** Defines a string value that labels the button. By default, the label is computed from any text content inside the button element. However, it can also be provided with aria-labelledby or aria-label. If this attribute is set, screenreaders will read this value instead of the button text. */
  ariaLabel?: string;
  /** Identifies the element (or elements) that labels the button. By default, the label is computed from any text content inside the button element. However, it can also be provided with aria-labelledby or aria-label. */
  ariaLabelledBy?: string;
  /**
   * Tells assistive technologies that a button is a toggle button. The button label should not change if this attribute is set to indicate the button's state has changed.
   */
  ariaPressed?: boolean;
  /** Identifies the element (or elements) that describes the button. Similar to aria-labelledby, a description can either be concise, or provide more verbose information. */
  ariaDescribedBy?: string;
  type?: React.JSX.IntrinsicElements['button']['type'];
}

interface ButtonAsLinkProps extends BaseButtonProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  /* Use the `href` prop to render a link styled as a button. This will render an anchor tag in the underlying markup. However, it is generally better to use an anchor tag styled as a link (see: https://a11y-101.com/design/button-vs-link).
   */
  href?: string;
  target?: LinkTarget;
}

/**
 * An interface that describes all possible Button props.
 *
 * **Note:** When using the component itself, the TypeScript compiler will disallow certain props
 * when passing the `href` prop.
 *
 * **Background:** We've implemented the Hyphen Button component with an overload signature, so
 * that the TypeScript compiler can enforce that only certain props are allowed when using the
 * `href` prop. Also when using `href`, the `onClick` event handler will be for an `<a>` tag,
 * instead of a `<button>` tag.
 *
 * The overload signature enforces this, but sometimes we need a type that describes all possible
 * Button props (e.g. in our own Hyphen Storybook). Normally we could use an intersection type for
 * this, e.g. `ButtonAsButtonProps & ButtonAsLinkProps`. However, when we do this with those two
 * current interfaces, we get the TypeScript error:
 *
 * > Types of property 'onClick' are incompatible.
 *
 * Thus, to describe "all possible Button props", we omit both overload interfaces' incompatible
 * `onClick` props and re-add an optional `onClick` prop that handles a non-specific `HTMLElement`.
 */
interface ButtonProps
  extends Omit<ButtonAsButtonProps, 'onClick'>,
    Omit<ButtonAsLinkProps, 'onClick'> {
  onClick?: React.MouseEventHandler<HTMLElement>;
}

type ButtonOverload = {
  (props: ButtonAsButtonProps): JSX.Element;
  (props: ButtonAsLinkProps): JSX.Element;
};

/**
 * Use Button with Flex or CSS Flexible Box Layout for responsive widths, to stack them vertically, or to group them horizontally.
 * Remember to provide the appropriate aria attributes when applicable if the
 * button text is absent.
 * Use the `href` prop to render a link styled as a button. This will render an anchor tag in the underlying markup. However, it is generally better to use an anchor tag styled as a link (see: https://a11y-101.com/design/button-vs-link).
 *
 * @see https://hyphen.nyt.net/?path=/docs/components-buttons--button
 * @see https://hyphen.tech.nyt.net/components/button/button/
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
const Button: ButtonOverload = ({
  variant = 'outline',
  display = 'inline-flex',
  height = 'standard',
  maxWidth = 'fit-content',
  width = '100%',
  icon: Icon,
  href,
  target,
  disabled,
  processing,
  processingIconClassName,
  onClick,
  role,
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  ariaPressed,
  className,
  children,
  type,
  ...rest
}: ButtonProps) => {
  const [systemClass, pruned] = useSystemProps(
    { display, maxWidth, width, ...rest },
    space,
    layout
  );
  return (
    <StyledButton
      variant={variant}
      heightVariant={height}
      as={href ? 'a' : 'button'}
      disabled={disabled || processing}
      onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault()}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-labelledby={ariaLabelledBy}
      aria-pressed={ariaPressed}
      /** When the action associated with a button is unavailable, the button has aria-disabled set to true. */
      aria-disabled={disabled || processing}
      className={cx(systemClass, className)}
      href={href}
      role={role}
      type={type}
      target={target}
      onClick={onClick}
      {...pruned}
    >
      {processing ? (
        <>
          <StyledProcessingSpinner buttonDisplay={display} className={processingIconClassName}>
            <Spinner />
          </StyledProcessingSpinner>
          <span aria-hidden className={hiddenClass}>
            {children}
          </span>
        </>
      ) : (
        <>
          {Icon && <Icon size="sm" inline aria-hidden />}
          {children}
        </>
      )}
    </StyledButton>
  );
};

export { Button, ButtonProps };
