import React, { ReactNode } from 'react';
import { cx } from 'pretty-lights';
import { Link, LinkProps } from '../Link/index.js';
import { linkBoxLinkClass } from './styled.js';

/**
 * Custom components passed via `LinkBox.Link`'s `as` prop must support a `className` prop at
 * minimum, so that we can correctly style the component with `linkBoxLinkClass` to increase
 * the size of the element's clickable area to the `LinkBox`'s bounds.
 */
export interface LinkComponentProps {
  children?: React.ReactNode;
  className?: string;
}

export type LinkComponent<P extends LinkComponentProps = LinkProps> = (props: P) => ReactNode;

export type LinkBoxLinkProps<P extends LinkComponentProps = LinkProps> = P & {
  /**
   * Use the `as` prop to render an entirely different link component. All of `LinkBox.Link`'s
   * props will pass through to the specified component when rendered.
   */
  as?: LinkComponent<P> | keyof React.JSX.IntrinsicElements;
};

/**
 * This is the core implementation of `LinkBox.Link`. Below we wrap it in `React.forwardRef()` and
 * add a type assertion so that it can continue to infer the supported props of custom components
 * passed via its `as` prop.
 */
const LinkBoxLinkInner = <P extends LinkComponentProps = LinkProps>(
  { as: Component = Link, className, ...rest }: LinkBoxLinkProps<P>,
  ref: React.ForwardedRef<HTMLElement>
  // TODO: see if it's possible to eliminate TS 2322 re: the `ref` type
  // @ts-expect-error
) => <Component className={cx(linkBoxLinkClass, className)} ref={ref} {...rest} />;

/**
 * Use a type assertion with this type alias below make `LinkBox.Link` wrapped in
 * `React.forwardRef()` _generic_ (in the TypeScript sense). This allows the component
 * to infer the supported props of the custom component passed via the `as` prop.
 *
 * Adapted from this blog post:
 * @see https://fettblog.eu/typescript-react-generic-forward-refs/#option-1%3A-type-assertion
 */
type LinkBoxLinkWithGenericForwardRef = <P extends LinkComponentProps = LinkProps>(
  props: LinkBoxLinkProps<P> & { ref?: React.ForwardedRef<HTMLElement> }
) => ReturnType<typeof LinkBoxLinkInner>;

/**
 * `LinkBox.Link` extends the hit target of the rendered `Link` to the bounds of the containing
 * `LinkBox`. Pass in a `className` to override the styles or use the `as` prop to render an
 * entirely different link component. All other props are passed through to the link itself.
 */
export const LinkBoxLink = React.forwardRef(LinkBoxLinkInner) as LinkBoxLinkWithGenericForwardRef;
