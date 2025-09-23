import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { StoryListSection, StoryListSectionProps } from './index.js';
import { StoryList } from '../StoryList/index.js';
import { StoryListItem } from '../StoryListItem/index.js';
import { StoryListItemContent } from '../StoryListItemContent/index.js';
import { FullMoonArtwork } from '../stories/PositionAwareMediaPlaceholder.js';

const item = (
  <StoryListItem media={<FullMoonArtwork />}>
    <StoryListItemContent
      topLabel="Top Label"
      summary="The biggest most
          powerful and impactful story of our time"
      bottomLabel="Bottom Label"
    >
      Basic story list headline
    </StoryListItemContent>
  </StoryListItem>
);

const meta = {
  component: StoryListSection,
  render: args => (
    <StoryList>
      <StoryListSection style={{ opacity: 0.15 }}>{item}</StoryListSection>
      <StoryListSection {...args} />
    </StoryList>
  ),
} satisfies Meta<StoryListSectionProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const WithoutTitle: Story = {
  args: {
    children: item,
  },
};

export const WithTitle: Story = {
  args: {
    header: 'The Latest',
    children: item,
  },
};
