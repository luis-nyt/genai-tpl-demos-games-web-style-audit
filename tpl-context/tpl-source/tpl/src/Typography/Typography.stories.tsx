import React from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Flex } from '@nyt/foundation';
import { TypographyProps, Typography, typography, TypographyKey } from '../index.js';
import { headingParams } from './shared.js';

const meta = {
  title: 'Typography/Typography component (advanced)',
  component: Typography,
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(typography).sort(),
    },
  },
  decorators: headingParams.decorators,
} satisfies Meta<TypographyProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: 'Headline/28' } };

/**
 * `variant` can accept an array of valid typography tokens for responsive values
 */
export const ResponsiveVariant: Story = { args: { variant: ['Headline/18', null, 'Headline/18'] } };

/**
 * `as` will change the rendered markup so you can decouple your document hierarchy from your presentation.
 */
export const WithAsProp: Story = {
  args: { variant: 'Headline/28', as: 'h2' },
  name: 'with `as` prop',
};

const multidimensionalTyp = Object.entries(
  Object.keys(typography).reduce(
    (acc, key) => {
      const [category, variant] = key.split('/');
      acc[category] ??= [];
      acc[category].push(variant);
      return acc;
    },
    {} as { [P: string]: string[] }
  )
).sort((_, [b]) => {
  return ['Display', 'Text', 'Body', 'Headline'].indexOf(b);
});

export const Catalog: StoryFn = () => (
  <Flex p={1} gap={1} flexWrap="wrap">
    {multidimensionalTyp.map(([category, variants]) => {
      return (
        <Flex flex="28rem 1 1" flexDirection="column" gap={1} mb={4} key={category}>
          <Typography variant="Text/12" sx={{ mb: 1 }} color="secondary">
            {category}
          </Typography>
          {variants.map(variant => (
            <Flex gap={1} key={variant}>
              <Typography variant="Text/12" sx={{ flex: '0' }} color="secondary">
                {variant}
              </Typography>
              <Typography variant={`${category}/${variant}` as TypographyKey}>
                Lorem ipsum dolor
              </Typography>
            </Flex>
          ))}
        </Flex>
      );
    })}
  </Flex>
);
