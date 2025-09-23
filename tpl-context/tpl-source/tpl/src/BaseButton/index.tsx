import React, {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  forwardRef,
  ReactNode,
  RefAttributes,
  Children,
} from 'react';
import { cx } from 'pretty-lights';
import { TplSx, useTplSxProp } from '../system/index.js';
import { IconProps, IconSize } from '../Icon/index.js';
import { Spinner } from '../Spinner/index.js';
import {
  childHiddenClass,
  contentClass,
  iconClass,
  onlyIconClass,
  spinnerClass,
} from './styled.js';
import { visuallyHidden } from '../util/index.js';

export type BaseButtonHeight = 'standard' | 'compact' | 'extraCompact' | 'expanded';

export interface BaseButtonCustomProps {
  height?: BaseButtonHeight;
  /**
   * An [Icon](https://tpl.nyt.net/?path=/docs/components-icons--icon) component which will
   * render alongside Button's children. This takes a function component, not an element!
   *
   * @see https://tpl.nyt.net/?path=/docs/components-icons--icon
   */
  icon?: React.FC<Omit<IconProps, 'children'> & RefAttributes<SVGSVGElement>>;
  /**
   * Indicates whether the Button is currently processing a user request. We also set
   * `aria-disabled="true"` while `processing` is truthy.
   *
   * **Accessibility Note:** Button communicates when processing begins to screen readers by having
   * them speak aloud that the Button is "Working..." You can customize this spoken description of
   * the processing activity by passing a string.
   *
   * @example
   * ```tsx
   * <Button processing="Adding to cart...">Add to cart</Button>
   * ```
   */
  processing?: boolean | string;
  /**
   * @deprecated `sx` will be removed in the next major version of `@nyt/tpl`, which will switch to CSS Modules with Sass. Replace with the `className` or `style` prop to achieve similar results.
   * @see {@link https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?pli=1&tab=t.2tb2mnrxg2u6#heading=h.ocen8qix6l00 TPL Web 2.0 Release Plan: Remove sx Prop}
   */
  sx?: TplSx;
  /** Used to pass in a CSS className to the inner "content" element that wraps the Button's child elements. */
  contentClassName?: string;
}

export interface BaseButtonAsButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    RefAttributes<HTMLButtonElement>,
    BaseButtonCustomProps {}

export interface BaseButtonAsLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    RefAttributes<HTMLAnchorElement>,
    BaseButtonCustomProps {}

const spinnerSize: Record<BaseButtonHeight, IconSize> = {
  standard: 24,
  compact: 16,
  extraCompact: 16,
  expanded: 24,
};

const iconSizeStandalone: Record<BaseButtonHeight, IconSize> = {
  standard: 20,
  compact: 16,
  extraCompact: 12,
  expanded: 24,
};

const iconSizeWithChildren: Record<BaseButtonHeight, IconSize> = {
  standard: 16,
  compact: 12,
  extraCompact: 12,
  /** Not used in practice (only Icon Button has an "expanded" size) */
  expanded: 20,
};

/**
 * This overload signature allows the TypeScript compiler to enforce that only certain props are
 * allowed when using the `href` prop. Also, when using `href`, the `onClick` event handler will be
 * for an `<a>` tag, instead of a `<button>` tag.
 */
export type BaseButtonOverload<T = {}> = {
  (
    props: BaseButtonAsLinkProps & {
      // Require the `href` prop to reliably distinguish between overload signatures in TypeScript 5.2
      // and higher (thanks @tilgovi!)
      href: string;
    } & T
  ): ReactNode;
  (props: BaseButtonAsButtonProps & T): ReactNode;
};

export type BaseButtonProps<T = {}> = (BaseButtonAsLinkProps | BaseButtonAsButtonProps) & T;

/**
 * A base or "headless" Button component with minimal styling that handles the following concerns:
 *
 * - Render an `<a>` or `<button>` element based on the presence of an `href` prop
 * - `icon` prop rendering and sizing
 * - `processing` support: hide children, set `aria-disabled` (always) and `disabled` (if needed),
 *   show progress indicator and announce the state change to screen readers
 * - `children` wrapping: each child gets wrapped in a `<span>` so they can be hidden and layered
 *   above the `backgroundSelector` pseudo-element
 * - Ref forwarding (though components that compose `BaseButton` must do this, too)
 * - Pass through other props to the root element
 *
 * @see TextButton
 * @see Button
 * @see IconButton
 */
export const BaseButton: BaseButtonOverload = forwardRef<HTMLAnchorElement | HTMLButtonElement>(
  (
    {
      'aria-disabled': ariaDisabled,
      children,
      className,
      contentClassName,
      height = 'standard',
      icon: Icon,
      processing,
      sx,
      ...rest
    }: BaseButtonProps,
    ref
  ) => {
    const Element = 'href' in rest && typeof rest.href === 'string' ? 'a' : 'button';
    const iconSize = children ? iconSizeWithChildren[height] : iconSizeStandalone[height];
    const childClass = processing ? childHiddenClass : undefined;
    const systemClass = useTplSxProp(sx);

    /**
     * Only set `disabled` if we're rendering a `<button>` and either:
     * - We're `processing`
     * - The `disabled` prop itself is set
     */
    let disabled: boolean | undefined;
    if (Element === 'button') {
      disabled = !!processing || (rest as Pick<BaseButtonAsButtonProps, 'disabled'>).disabled;
    }

    return (
      <Element
        // @ts-expect-error
        ref={ref}
        aria-disabled={!!processing || ariaDisabled}
        data-processing={!!processing || undefined}
        disabled={disabled}
        className={cx({ [onlyIconClass]: Icon && !children }, className, systemClass)}
        {...rest}
      >
        <div className={cx(contentClass, contentClassName)}>
          {Children.map(
            children,
            child =>
              child && (
                <span className={childClass} aria-hidden={!!processing || undefined}>
                  {child}
                </span>
              )
          )}

          {Icon && <Icon className={cx(childClass, iconClass)} aria-hidden size={iconSize} />}

          {processing && (
            <>
              <Spinner className={spinnerClass} size={spinnerSize[height]} />
              <span aria-live="assertive" className={visuallyHidden}>
                {typeof processing === 'string' ? processing : 'Working...'}
              </span>
            </>
          )}
        </div>
      </Element>
    );
  }
);
