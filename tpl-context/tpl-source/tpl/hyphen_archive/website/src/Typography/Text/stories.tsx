import React from 'react';
import { ArgTypes, Story } from '@storybook/react';
import { Box } from '@nyt/foundation';
import {
  Body,
  Display,
  Headline,
  Legal,
  Subtitle,
  Text,
  TextProps,
  TextSize,
  TextStyle,
  Title,
  Subscription,
  typographyFlat,
  VTextProps,
} from '../../../../src';

const defaultText = {
  body: 'Here is some body copy. The default element is a paragraph tag. You can change the element with the as prop.',
  subtitle: 'Here is some subtitle text.',
  title: 'This is a title',
  headline: 'Extra. Extra. Read all about it.',
  display: 'Prominent Display Text',
  subscription: 'Your Subscription',
  legal: 'Offers for New York Times News subscription or New York Times All Access subscription.',
};

const args = {
  as: 'p',
  size: 2,
  color: 'primary',
};

/** Arg types for single-variant Text components (Body, Headline, etc.) */
const vTextArgTypes: Partial<ArgTypes<VTextProps<'body'>>> = {
  /** Disable the `variant` control that `<Meta component={Text}>` gives us */
  // @ts-expect-error
  variant: { control: false },
  size: {
    control: { type: 'number', min: 1, max: 3 },
  },
};

const argTypes: Partial<ArgTypes<TextProps<TextStyle>>> = {
  as: {
    control: 'select',
    options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  },
  children: { control: 'text' },
  color: {
    control: 'select',
    options: ['primary', 'secondary', 'tertiary', 'positive', 'negative', 'accent'],
  },
  size: vTextArgTypes.size,
};

const headlineAndSubscriptionArgTypes: Partial<ArgTypes<VTextProps<'headline'>>> = {
  ...vTextArgTypes,
  size: {
    control: { type: 'number', min: 1, max: 2 },
  },
};

/** We need these so that Storybook's code drawer shows the intended JSX, rather than `<Text>` */

const HeadlineStory: Story<VTextProps<'headline'>> = Headline.bind({});
HeadlineStory.args = { as: 'h1', size: 1, children: defaultText.headline };
HeadlineStory.argTypes = headlineAndSubscriptionArgTypes;

const TitleStory: Story<VTextProps<'title'>> = Title.bind({});
TitleStory.args = { as: 'h3', size: 1, children: defaultText.title };
TitleStory.argTypes = vTextArgTypes;

const SubtitleStory: Story<VTextProps<'subtitle'>> = Subtitle.bind({});
SubtitleStory.args = { as: 'h4', size: 1, children: defaultText.subtitle };
SubtitleStory.argTypes = vTextArgTypes;

const BodyStory: Story<VTextProps<'body'>> = Body.bind({});
BodyStory.args = { size: 3, children: defaultText.body };
BodyStory.argTypes = vTextArgTypes;

const DisplayStory: Story<VTextProps<'display'>> = Display.bind({});
DisplayStory.args = { size: 1, children: defaultText.display };
DisplayStory.argTypes = vTextArgTypes;

const SubscriptionStory: Story<VTextProps<'subscription'>> = Subscription.bind({});
SubscriptionStory.args = { size: 1, children: defaultText.subscription };
SubscriptionStory.argTypes = headlineAndSubscriptionArgTypes;

const LegalStory: Story<VTextProps<'legal'>> = Legal.bind({});
LegalStory.args = { size: 1, children: defaultText.legal };
LegalStory.argTypes = { ...vTextArgTypes, size: { control: false } };

const ResponsiveStory: Story<VTextProps<'body'>> = Body.bind({});
ResponsiveStory.args = { size: [3, null, 1], color: 'secondary', children: defaultText.body };
ResponsiveStory.argTypes = { ...vTextArgTypes, size: { control: { type: 'object' } } };

interface TextTemplateProps<TextSizeStyle extends TextStyle>
  extends Pick<TextProps<TextSizeStyle>, 'children' | 'variant'> {
  size: TextSize<TextSizeStyle>;
}

const TextTemplate: Story<TextTemplateProps<TextStyle>> = ({ children, variant, size }) => {
  return (
    <Box m={1} maxWidth="500px">
      {typographyFlat[variant][size] ? (
        <Text variant={variant} size={size}>
          {children}
        </Text>
      ) : (
        <>
          <Subtitle color="negative" size={2} mb={0.5}>
            <strong>Invalid combination</strong>
          </Subtitle>
          <Body size={2}>
            {`Variant ${variant} is only available in size/s: ${Object.keys(
              typographyFlat[variant]
            ).join(', ')}`}
          </Body>
        </>
      )}
    </Box>
  );
};

const TextStory = TextTemplate.bind({});

TextStory.args = {
  variant: 'headline',
  size: 1,
  children: 'The quick brown fox jumps over the lazy dog',
};

export {
  BodyStory,
  SubtitleStory,
  TitleStory,
  HeadlineStory,
  ResponsiveStory,
  TextStory,
  DisplayStory,
  SubscriptionStory,
  LegalStory,
  args,
  argTypes,
  defaultText,
};
