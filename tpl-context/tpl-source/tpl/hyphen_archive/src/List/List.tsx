import React from 'react';
import { MarginProps, useSystemProps, space, spaceScale } from '@nyt/foundation';
import { css, cx } from 'pretty-lights';
import { NavigationListItem, NavigationListItemProps } from './NavigationListItem';
import { ListItem, ListItemProps } from './ListItem';

interface ListProps extends MarginProps {
  children: (React.ReactElement<ListItemProps> | React.ReactElement<NavigationListItemProps>)[];
  className?: string;
}

const listClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: spaceScale.get(3),
  listStyleType: 'none',
  padding: 0,
  margin: 0,
});

const List = ({ children, ...rest }: ListProps) => {
  const [systemClass, pruned] = useSystemProps(rest, space);
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ul className={cx(listClass, systemClass)} {...pruned} role="list">
      {children}
    </ul>
  );
};

List.Nav = NavigationListItem;
List.Item = ListItem;

export { List, ListProps };
