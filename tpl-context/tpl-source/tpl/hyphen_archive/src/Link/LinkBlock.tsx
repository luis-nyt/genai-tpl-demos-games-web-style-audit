import React from 'react';
import { css } from 'pretty-lights';
import { Flex, FlexProps } from '@nyt/foundation';
import { Link, LinkProps } from './Link';
import { focusStyles } from '../../../src/util';

/**
 * Idea here is to increase the hit area of LinkBlock.Link so it appears that a LinkBlock links the entire
 * block even though only the contents of LinkBlock.Link is linked
 *
 * This method, and the motivation for it are described in more detail here https://inclusive-components.design/cards/
 */
const linkBlockLinkClass = css({
  'html &': {
    '&:is(a[href])': {
      position: 'static',
      zIndex: 1,
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  '&:focus-visible': {
    outline: 'none',
    '&::before': focusStyles,
  },
});

/**
 * list of tabbable elements. The below must still be able to be interacted with within a linkblock
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
const linkBlockClass = css({
  position: 'relative',
  userSelect: 'text',

  [tabbables]: {
    position: 'relative',
    zIndex: 2,
  },
});

interface LinkBlockProps extends LinkProps {}

const LinkBlock = ({
  children,
  className,
  flexDirection = 'column',
  justifyContent = 'start',
  ...rest
}: FlexProps) => {
  return (
    <Flex
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      className={[linkBlockClass, className].join(' ')}
      {...rest}
    >
      {children}
    </Flex>
  );
};

const LinkBlockLink = React.forwardRef<HTMLAnchorElement | null, LinkBlockProps>(
  ({ children, className, ...rest }: LinkBlockProps, ref): JSX.Element => {
    return (
      <Link className={[linkBlockLinkClass, className].join(' ')} ref={ref} {...rest}>
        {children}
      </Link>
    );
  }
);

LinkBlockLink.displayName = 'LinkBlock.Link';

LinkBlock.Link = LinkBlockLink;

export { LinkBlock, LinkBlockProps };
