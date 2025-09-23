import React from 'react';
import { Story } from '@storybook/react';
import { Box } from '@nyt/foundation';
import {
  Button,
  List,
  ListItemProps,
  Body,
  Title,
  Link,
  TimesIcon,
  CookingIcon,
} from '../../../src';
import { ImgPlaceHolder } from './shared';

// @see https://github.com/storybookjs/storybook/issues/15401
// @ts-ignore
List.Nav.displayName = 'List.Nav';
// @ts-ignore
List.Item.displayName = 'List.Item';

/**
 * Work around React's unique key warning
 */
const incKeyMapper = (c, i) => <React.Fragment key={i}>{c}</React.Fragment>;

interface ListItemTemplateProps extends Omit<ListItemProps, 'children' | 'start' | 'end'> {
  start: boolean;
  end: boolean;
  body?: string;
  headline?: string;
  containerWidth?: string;
}

const ListItemTemplate: Story<ListItemTemplateProps> = ({
  body,
  headline,
  start,
  end,
  switchWidth,
  flexDirection,
  containerWidth,
  ...rest
}) => {
  const childLayoutProps = {
    flexDirection,
    switchWidth,
  };

  return (
    <Box m={1} maxWidth={containerWidth}>
      <List {...rest}>
        <List.Item
          {...childLayoutProps}
          start={start ? <ImgPlaceHolder maxWidth="3em" /> : undefined}
          end={end ? <ImgPlaceHolder /> : undefined}
        >
          <Title size={2} mb={1}>
            {headline}
          </Title>
          <Body size={2}>{body}</Body>
        </List.Item>
        <List.Item
          start={<ImgPlaceHolder maxWidth="3em" />}
          end={<ImgPlaceHolder />}
          {...childLayoutProps}
        >
          <Title size={2} mb={1}>
            Ut massa leo, vestibulum ut dapibus eu
          </Title>
          <Body size={2}>
            ullamcorper et elit. Morbi pretium elementum elit egestas varius. Nunc ut orci
            sollicitudin lacus varius congue.
          </Body>
        </List.Item>
      </List>
    </Box>
  );
};

const ListItem = ListItemTemplate.bind({});

ListItem.args = {
  containerWidth: '40rem',
  headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  body: 'Integer eget ultricies nisi. Aliquam massa ligula, mattis sit amet turpis at, auctor sollicitudin massa.',
  switchWidth: '32rem',
  flexDirection: undefined,
  start: true,
  end: true,
};

ListItem.argTypes = {
  flexDirection: {
    options: ['row', 'column', undefined],
    control: { type: 'radio' },
  },
};

const infoItemExample = (
  <List.Item
    start={<TimesIcon size="md" />}
    end={
      <Body size={2}>
        <Link href="https://nytimes.com">Click&nbsp;me</Link>
      </Body>
    }
  >
    <Title size={2} mb={1}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </Title>
    <Body size={2}>
      Integer eget ultricies nisi. Aliquam massa ligula, mattis sit amet turpis at, auctor
      sollicitudin massa
    </Body>
  </List.Item>
);

// eslint-disable-next-line no-empty-pattern
const InfoTemplate = ({}) => (
  <Box m={1} maxWidth="620px">
    <List>{new Array(2).fill(infoItemExample).map(incKeyMapper)}</List>
  </Box>
);

const InfoItem = InfoTemplate.bind({});

interface ActionItemTemplateProps extends Omit<ListItemProps, 'children' | 'start' | 'end'> {
  containerWidth: string;
  showIcon: boolean;
}

const ActionTemplate: Story<ActionItemTemplateProps> = ({
  containerWidth,
  switchWidth,
  showIcon,
}) => {
  const actionItemExample = (
    <List.Item
      end={
        <Button variant="outline" maxWidth="none">
          Click Me
        </Button>
      }
      start={showIcon ? <TimesIcon size="lg" /> : undefined}
      switchWidth={switchWidth}
    >
      <Title size={2} mb={1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </Title>
      <Body size={2}>
        Integer eget ultricies nisi. Aliquam massa ligula, mattis sit amet turpis at, auctor
        sollicitudin massa
      </Body>
    </List.Item>
  );
  return (
    <Box m={1} maxWidth={containerWidth}>
      <List>{new Array(2).fill(actionItemExample).map(incKeyMapper)}</List>
    </Box>
  );
};

const ActionItem = ActionTemplate.bind({});

ActionItem.args = {
  switchWidth: '400px',
  containerWidth: '350px',
  showIcon: true,
};

interface NavItemTemplateProps {
  body: string;
  headline: string;
  href: string;
}

const NavItemTemplate: Story<NavItemTemplateProps> = ({ body, headline, href }) => {
  const actionItemExample = (
    <List.Nav
      start={<CookingIcon size="md" />}
      headline={
        <Title size={3} mb={1}>
          {headline}
        </Title>
      }
      href={href}
    >
      <Body size={2}>{body}</Body>
    </List.Nav>
  );
  return (
    <Box m={1} maxWidth="30rem" as="nav" aria-label="List.Nav story">
      {new Array(2).fill(actionItemExample).map(incKeyMapper)}
    </Box>
  );
};

const NavItem = NavItemTemplate.bind({});

NavItem.args = {
  headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  body: 'Integer eget ultricies nisi. Aliquam massa ligula, mattis sit amet turpis at, auctor sollicitudin massa',
  href: 'https://nytimes.com',
};

export { ActionItem, InfoItem, ListItem, NavItem };
