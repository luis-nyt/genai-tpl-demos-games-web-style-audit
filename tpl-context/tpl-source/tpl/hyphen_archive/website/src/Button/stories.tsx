import React from 'react';
import { styled } from 'pretty-lights';
import { Story } from '@storybook/react';
import { Box, Flex, spaceScale } from '@nyt/foundation';
import {
  Button,
  ButtonProps,
  AlertIcon,
  CheckmarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CloseIcon,
  HelpIcon,
  InfoIcon,
  MenuIcon,
  PersonIcon,
  PlusIcon,
  SuccessIcon,
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
  TimesIcon,
  CookingIcon,
  GamesIcon,
  HomeDeliveryIcon,
  TheAthleticIcon,
  WirecutterIcon,
  color,
  dark,
} from '../../../src';

const StyledBox = styled(Box)(props => ({
  padding: spaceScale.get(1),
  background: props.bg,
}));

interface ButtonArgProps extends Partial<ButtonProps> {}

export const args: Pick<ButtonProps, 'display' | 'variant' | 'maxWidth' | 'processing'> = {
  display: 'flex',
  variant: 'filled',
  maxWidth: 'fit-content',
  processing: false,
};

const argTypes = {
  children: {
    control: 'text',
  },
  variant: {
    control: {
      type: 'radio',
    },
    options: ['filled', 'filledDark', 'outline', 'outlineDark', 'text', 'textDark'],
  },
  height: {
    control: {
      type: 'radio',
    },
    options: ['standard', 'compact'],
  },
  maxWidth: {
    control: {
      type: 'text',
    },
  },
  display: {
    control: {
      type: 'radio',
    },
    options: ['flex', 'inline-flex'],
  },
  href: {
    control: {
      type: 'text',
    },
  },
  target: {
    control: {
      type: 'radio',
    },
    options: ['_self', '_blank'],
  },
  ariaLabel: {
    control: 'text',
  },
};

const ButtonTemplate: Story<ButtonArgProps> = ({ children, ...rest }: ButtonProps) => {
  return (
    <StyledBox bg={color.background.tertiary} p={2} maxWidth="400px">
      <Button {...rest}>{children}</Button>
    </StyledBox>
  );
};

const ButtonStory = ButtonTemplate.bind({});

ButtonStory.args = {
  children: 'Take an action',
  ...args,
};

ButtonStory.argTypes = argTypes;

// eslint-disable-next-line no-empty-pattern
const ButtonVariantText = ({}) => (
  <StyledBox>
    <Button variant="text">Text Button</Button>
  </StyledBox>
);

// eslint-disable-next-line no-empty-pattern
const ButtonVariantOutline = ({}) => (
  <StyledBox>
    <Button variant="outline">Text Button</Button>
  </StyledBox>
);

// eslint-disable-next-line no-empty-pattern
const ButtonVariantFilled = ({}) => (
  <StyledBox>
    <Button variant="filled">Text Button</Button>
  </StyledBox>
);

// eslint-disable-next-line no-empty-pattern
const ButtonVariantOutlineDark = ({}) => (
  <StyledBox bg={dark.colors.background.primary.hsla}>
    <Button variant="filledDark">Text Button</Button>
  </StyledBox>
);

// eslint-disable-next-line no-empty-pattern
const ButtonVariantTextDark = ({}) => (
  <StyledBox bg={dark.colors.background.primary.hsla}>
    <Button variant="textDark">Text Button</Button>
  </StyledBox>
);

// eslint-disable-next-line no-empty-pattern
const ButtonVariantFilledDark = ({}) => (
  <StyledBox bg={dark.colors.background.primary.hsla}>
    <Button variant="outlineDark">Text Button</Button>
  </StyledBox>
);

const icons: { [key: string]: React.FC } = {
  Alert: AlertIcon,
  Checkmark: CheckmarkIcon,
  ChevronDown: ChevronDownIcon,
  ChevronRight: ChevronRightIcon,
  ChevronUp: ChevronUpIcon,
  Close: CloseIcon,
  Help: HelpIcon,
  Info: InfoIcon,
  Menu: MenuIcon,
  Person: PersonIcon,
  Plus: PlusIcon,
  Success: SuccessIcon,
  Apple: AppleIcon,
  Facebook: FacebookIcon,
  Google: GoogleIcon,
  Times: TimesIcon,
  Cooking: CookingIcon,
  Games: GamesIcon,
  HomeDelivery: HomeDeliveryIcon,
  TheAthletic: TheAthleticIcon,
  Wirecutter: WirecutterIcon,
};

interface IconButtonTemplateProps extends Pick<ButtonProps, 'variant' | 'children' | 'maxWidth'> {
  icon: string;
}

const IconButtonTemplate: Story<IconButtonTemplateProps> = ({ icon, children, ...rest }) => {
  const mycon = icons[icon];
  return (
    <Button {...rest} icon={mycon}>
      {children}
    </Button>
  );
};

const IconButtonStory = IconButtonTemplate.bind({});

IconButtonStory.args = {
  variant: 'filled',
  icon: 'Checkmark',
  children: 'Take an action',
  maxWidth: args.maxWidth,
};

IconButtonStory.argTypes = {
  variant: argTypes.variant,
  maxWidth: argTypes.maxWidth,
  icon: {
    control: {
      type: 'select',
    },
    options: Object.keys(icons),
  },
};

// eslint-disable-next-line no-empty-pattern
const DisabledTemplate = ({}) => (
  <Button disabled onClick={() => {}}>
    Disabled button
  </Button>
);

const DisabledStory = DisabledTemplate.bind({});

const ProcessingTemplate: Story<ButtonProps> = props => (
  <Flex gap={2}>
    <Button {...props} mb={2} />
    <Button {...props} processing aria-label="Processing your registration..." />
  </Flex>
);

const ProcessingStory = ProcessingTemplate.bind({});

ProcessingStory.args = {
  children: 'Click to submit',
  variant: 'filled',
  maxWidth: args.maxWidth,
};

ProcessingStory.argTypes = {
  children: argTypes.children,
  variant: argTypes.variant,
  maxWidth: argTypes.maxWidth,
};

// eslint-disable-next-line no-empty-pattern
const AlignmentTemplate = ({}) => (
  <>
    <Flex justifyContent="end" mb={2} gap={2}>
      <Button variant="outline">Cancel</Button>
      <Button variant="filled">Next</Button>
    </Flex>
    <Flex justifyContent="center">
      <Button variant="filled" maxWidth={['100%', '200px']}>
        Get Started
      </Button>
    </Flex>
    <Box width="18rem">
      <Button variant="filled" maxWidth="100%" display="flex" marginBottom={1} marginTop={1}>
        Confirm changes
      </Button>
      <Button variant="outline" maxWidth="100%" display="flex">
        Discard changes
      </Button>
    </Box>
  </>
);

const AlignmentStory = AlignmentTemplate.bind({});

/**
 * Storybook docs chokes on Button's return type for saving this component which returns
 * plain JSX solely for the purpose of helping SB generate the args table
 */
const ButtonForArgsTable = (props: ButtonProps): JSX.Element => <Button {...props} />;

export {
  AlignmentStory,
  ButtonForArgsTable,
  ButtonStory,
  ButtonVariantText,
  ButtonVariantOutline,
  ButtonVariantFilled,
  ButtonVariantOutlineDark,
  ButtonVariantFilledDark,
  ButtonVariantTextDark,
  DisabledStory,
  IconButtonStory,
  ProcessingStory,
};
