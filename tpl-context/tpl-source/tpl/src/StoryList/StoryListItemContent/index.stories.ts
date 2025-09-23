import { Meta, StoryObj } from '@storybook/react';
import { StoryListItemContent, StoryListItemContentProps } from './index.js';

const meta = {
  component: StoryListItemContent,
  tags: ['autodocs'],
  parameters: {
    controls: { sort: 'requiredFirst' },
    docs: {
      description: {
        component: `A text content lockup with a headline, optional summary, byline, top label and more. Typically used within [StoryListItem](/docs/storylist-storylistitem--docs).

## Overview

Story list item content requires a \`children\` prop, which corresponds to the headline. It may also include other pieces of text.

Each parameter has a default typography token and text color applied to it. You can easily override these by passing in your own React element:

\`\`\`tsx
<TPLStoryListItemContent>
  <HeadlineFeature as="h2" size={28}>
    The 100 Best Books of the 21st Century
  </HeadlineFeature>
</TPLStoryListItemContent>
\`\`\`

### Inline Actions

Use the \`inlineActions\` parameter to add actions buttons or other views to a story list item.

Rendering actions as part of the content lockup ensures the buttons, etc. are always positioned below the text content.

If your actions always need to be below both the text _and_ media content, use [StoryListItem](/docs/storylist-storylistitem--docs)’s \`actions\` parameter instead.

### Styling

Use the \`createStoryListStyleClass\` function to customize story list item content’s inner spacing between text, alignment and more.

## See Also

- [Intro to TPL Story List](https://tpl.nyt.net/?path=/docs/tutorials-intro-to-story-list-section-1-create-a-story-list--docs)
- [Times Product Language: Story List](https://coda.io/d/_dH9ZFEaJR9I/Story-List_suoUNY5D)
- [StoryList](/docs/storylist-storylist--docs)
- [StoryListItem](/docs/storylist-storylistitem--docs)
- [StoryListItemSection](/docs/storylist-storylistitemsection--docs)
`,
      },
    },
  },
} satisfies Meta<StoryListItemContentProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const WithAllTextElements: Story = {
  args: {
    topLabel: 'Top Label',
    children: 'Basic story list headline',
    summary: 'The biggest most powerful and impactful story of our time',
    bottomLabel: 'Bottom Label',
  },
};

export const HeadlineOnly: Story = {
  args: {
    children: 'Basic story list headline',
  },
};
