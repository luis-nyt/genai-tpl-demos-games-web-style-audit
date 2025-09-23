import React from 'react';
import { css } from 'pretty-lights';
import { color } from '../tokens';
import { LinkBlock } from '../Link';
// We've removed `@nyt/hyphen`'s generated icons from this archive
// import { ChevronRightIcon } from '../generated/Icons';
import { ListItem, ListItemProps } from './ListItem';

interface NavigationListItemProps
  extends Omit<ListItemProps, 'end' | 'switchWidth' | 'Container' | 'children'> {
  href: string;
  headline: JSX.Element;
  children?: any;
}

const linkClass = css({
  textDecoration: 'none',
});

const iconContainer = css({
  height: '100%;',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2rem',

  '&:before': {
    display: 'block',
    content: '""',
    background: color.background.tertiary,
    height: '2.25rem',
    width: '2.25rem',
    position: 'absolute',
    borderRadius: '50%',
    transition: 'all 0.25s',
    transitionProperties: 'opacity, transition',
    transform: 'scale(0)',
    opacity: 0,

    '@media (prefers-reduced-motion)': {
      transition: 'none',
    },
  },

  svg: {
    position: 'relative',
  },
});

const linkBlockClass = css({
  [`&:hover .${iconContainer}:before`]: {
    transform: 'scale(1)',
    opacity: 1,
  },
});

const NavigationListItem = ({
  children,
  className,
  headline,
  href,
  start,
}: NavigationListItemProps) => {
  return (
    <ListItem
      className={className}
      start={start}
      Container={props => (
        <LinkBlock
          flexDirection="row"
          gap={1.5}
          justifyContent="space-between"
          className={linkBlockClass}
        >
          {props.children}
        </LinkBlock>
      )}
      end={
        <div className={iconContainer}>
          {/* We've removed `@nyt/hyphen`'s generated icons from this archive */}
          {/* <ChevronRightIcon size="md" color="secondary" aria-hidden /> */}
        </div>
      }
    >
      <LinkBlock.Link href={href} className={linkClass}>
        {headline}
      </LinkBlock.Link>
      {children}
    </ListItem>
  );
};

/**
 * displayName must be assigned using assign method.
 * @ see https://github.com/storybookjs/storybook/issues/15401
 */
Object.assign(NavigationListItem, {
  displayName: 'Link.Navigation',
});

export { NavigationListItem, NavigationListItemProps };
