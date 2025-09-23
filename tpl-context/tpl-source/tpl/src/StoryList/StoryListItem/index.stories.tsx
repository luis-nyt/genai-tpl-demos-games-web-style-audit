import React from 'react';
import { css } from 'pretty-lights';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StoryListItem, StoryListItemProps } from './index.js';
import { StoryListItemContent, StoryListItemContentProps } from '../StoryListItemContent/index.js';
import { Flex } from '../../Flex/index.js';
import { SaveIcon, ShareIcon } from '../../generated/Icons/index.js';
import { spaceScale } from '../../generated/spacing.js';
import { IconButton } from '../../IconButton/index.js';
import {
  FullMoonArtwork,
  PositionAwareMediaPlaceholder,
} from '../stories/PositionAwareMediaPlaceholder.js';
import { PositionAwareIcon } from '../stories/PositionAwareIcon.js';
import { LinkBox } from '../../LinkBox/index.js';
import { color } from '../../tokens/index.js';
import { HeadlineNews } from '../../Typography/index.js';
import { Box } from '../../Box/index.js';
import { colorBehaviorArgType } from '../../stories/argTypes.js';
import { createStoryListStyleClass } from '../../index.js';

const actionsOrInlineActions = (
  <Flex gap={spaceScale.get(0.5)}>
    <IconButton height="compact" weight="light" icon={SaveIcon} aria-label="Save" />
    <IconButton height="compact" weight="light" icon={ShareIcon} aria-label="Share" />
  </Flex>
);

const actionsMapping = {
  None: undefined,
  Buttons: actionsOrInlineActions,
};

const mediaMapping = {
  None: undefined,
  'Full Moon Artwork': <FullMoonArtwork />,
  'Position Aware Placeholder': (
    <PositionAwareMediaPlaceholder>
      <PositionAwareIcon />
    </PositionAwareMediaPlaceholder>
  ),
};

const actionsArgType: ArgTypes<Pick<StoryListItemProps, 'actions'>>['actions'] = {
  control: 'select',
  options: Object.keys(actionsMapping),
  mapping: actionsMapping,
};

const meta = {
  component: StoryListItem,
  tags: ['autodocs'],
  argTypes: {
    ...colorBehaviorArgType,
    actions: actionsArgType,
    inlineActions: actionsArgType,
    htmlFor: {
      table: {
        disable: true,
      },
    },
    media: {
      control: 'select',
      options: Object.keys(mediaMapping),
      mapping: mediaMapping,
    },
    id: {
      table: {
        disable: true,
      },
    },
    role: {
      table: {
        disable: true,
      },
    },
    sx: {
      table: {
        disable: true,
      },
    },
    style: {
      table: {
        disable: true,
      },
    },
    title: {
      table: {
        disable: true,
      },
    },
  },
  render: ({ media, mediaPosition, className, colorBehavior, actions, children = '', ...rest }) => (
    <StoryListItem
      className={className}
      colorBehavior={colorBehavior}
      mediaPosition={mediaPosition}
      media={media}
      actions={actions}
    >
      <StoryListItemContent {...rest}>{children}</StoryListItemContent>
    </StoryListItem>
  ),
  decorators: [
    (Story, context) => (
      <Box bg="primary" colorBehavior={context.args.colorBehavior}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    controls: { sort: 'requiredFirst' },
    docs: {
      description: {
        /** Duplicated from {@link StoryListItem}’s docstrings, since Storybook doesn't support JSDoc `@link` */
        component: `A view representing a single story list item within a [StoryList](/docs/storylist-storylist--docs) or \`StoryListSection\`.

Use \`StoryListItem\` to show a single story’s promotional text content, along with optional media and optional action buttons.

The \`children\` prop accepts any view to be laid out along with the optional \`media\` and \`actions\` props. Use
[StoryListItemContent](/docs/storylist-storylistitemcontent--docs) to render story list’s recommended text content lockup:

\`\`\`tsx
<StoryListItem>
  <StoryListItemContent topLabel="Book Review">
    The 100 Best Books of the 21st Century
  </StoryListItemContent>
</StoryListItem>
\`\`\`

### Media and Positioning

In addition to text content, story list item supports optional \`media\`, such as an image, with a number of available
\`mediaPosition\` options. Most offer full bleed support as well, e.g. \`'topFullBleed'\`.

Story list item has no explicit opinion about media sizing. Thus, for \`'leading'\` or
\`'trailing'\` media, you may need to add a \`width\` to achieve the desired thumbnail size:

\`\`\`tsx
<StoryListItem media={<img alt="" src="./bestBooksSquare640.jpg" width="95px" />}>
  <StoryListItemContent topLabel="Book Review">
    The 100 Best Books of the 21st Century
  </StoryListItemContent>
</StoryListItem>
\`\`\`

### Context Based Media Positioning

You can also _omit_ the \`mediaPosition\` prop and use \`StoryListMediaPositionContext\`
to set the media position for one or more story list items:

\`\`\`tsx
// Use "leading" media positioning for both story list items below
<StoryListMediaPositionContext.Provider value="leading">
  <StoryList>
    <StoryListItem media={<img src="./impressionistsSquare640.jpg" width="95" />}>
      <StoryListItemContent>
        How the Impressionists Became the World’s Favorite Painters
      </StoryListItemContent>
    </StoryListItem>
    <StoryListItem media={<img src="./dogPilotSquare640.jpg" width="95" />}>
      <StoryListItemContent>
        The Last Flight of the Dog Pilot
      </StoryListItemContent>
    </StoryListItem>
  </StoryList>
</StoryListMediaPositionContext.Provider>
\`\`\`

### Actions

The \`actions\` prop can be used to add a row of action buttons or other views.

Actions generally appear below the text _and_ media content. However, when using the
\`'posterTop'\` and \`'posterBottom'\` media positions, actions appear below the text content and
_on top of_ the media.

For \`'leading'\` or \`'trailing'\` media that is taller than the text content, you may see a large
vertical gap between the text content and actions. Use \`StoryListItemContent\`’s \`inlineActions\`
if you prefer to always render actions nearby the text content.

### Styling

Use the \`createStoryListStyleClass\` function to customize story list item’s outer padding, alignment and more.

## See Also

- [Intro to TPL Story List](https://tpl.nyt.net/?path=/docs/tutorials-intro-to-story-list-section-1-create-a-story-list--docs)
- [Times Product Language: Story List](https://coda.io/d/_dH9ZFEaJR9I/Story-List_suoUNY5D)
- [StoryList](/docs/storylist-storylist--docs)
- [StoryListItemContent](/docs/storylist-storylistitemcontent--docs)
- [StoryListItemSection](/docs/storylist-storylistitemsection--docs)
`,
      },
    },
  },
} satisfies Meta<StoryListItemProps & Partial<StoryListItemContentProps>>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    media: 'Full Moon Artwork',
    topLabel: 'Top Label',
    children: 'Basic story list headline',
    summary: 'The biggest most powerful and impactful story of our time',
    bottomLabel: 'Bottom Label',
  },
};

export const InlineActions: Story = {
  args: {
    media: 'Full Moon Artwork',
    children: (
      <StoryListItemContent
        topLabel="Top Label"
        summary="The biggest most powerful and impactful story of our time"
        bottomLabel="Bottom Label"
        inlineActions={actionsOrInlineActions}
      >
        Basic story list headline
      </StoryListItemContent>
    ),
  },
};

export const Actions: Story = {
  args: {
    media: 'Full Moon Artwork',
    children: (
      <StoryListItemContent
        topLabel="Top Label"
        summary="The biggest most powerful and impactful story of our time"
        bottomLabel="Bottom Label"
      >
        Basic story list headline
      </StoryListItemContent>
    ),
    actions: actionsOrInlineActions,
  },
};

export const MediaPositionLeading: Story = {
  args: {
    ...Default.args,
    media: 'Full Moon Artwork',
    mediaPosition: 'leading',
  },
};

export const MediaPositionTop: Story = {
  args: {
    ...Default.args,
    media: 'Full Moon Artwork',
    mediaPosition: 'top',
  },
};

export const MediaPositionBottom: Story = {
  args: {
    ...Default.args,
    media: 'Full Moon Artwork',
    mediaPosition: 'bottom',
  },
};

export const PosterTop: Story = {
  args: {
    ...Default.args,
    media: 'Full Moon Artwork',
    mediaPosition: 'posterTop',
    colorBehavior: 'alwaysDark',
  },
};

export const PosterBottom: Story = {
  args: {
    ...Default.args,
    media: 'Full Moon Artwork',
    mediaPosition: 'posterBottom',
    colorBehavior: 'alwaysDark',
  },
};

export const PosterBottomDarkenCheck: Story = {
  args: {
    ...Default.args,
    media: (
      <PositionAwareMediaPlaceholder
        style={{ background: 'linear-gradient(to right, #fff, #000' }}
      />
    ),
    mediaPosition: 'posterBottom',
    colorBehavior: 'alwaysDark',
  },
};

export const WithLinkBox: StoryFn<StoryListItemProps & Partial<StoryListItemContentProps>> = ({
  media,
  mediaPosition,
  className,
  colorBehavior,
  actions,
  children,
  ...rest
}) => (
  <LinkBox>
    <StoryListItem
      className={className}
      colorBehavior={colorBehavior}
      mediaPosition={mediaPosition}
      media={media}
      actions={actions}
    >
      <StoryListItemContent {...rest}>
        <LinkBox.Link subtle onClick={action(`Clicked: ${children}`)}>
          {children}
        </LinkBox.Link>
      </StoryListItemContent>
    </StoryListItem>
  </LinkBox>
);
WithLinkBox.args = {
  topLabel: 'Top Label',
  children: 'Basic story list headline',
  summary: 'The biggest most powerful and impactful story of our time',
  bottomLabel: 'Bottom Label',
  media: 'Full Moon Artwork',
  mediaPosition: 'topFullBleed',
};
WithLinkBox.storyName = 'With LinkBox';

const containerClass = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spaceScale.get(1)};
  grid-auto-flow: column;
  max-width: 800px;
`;

export const HomePoster: StoryFn = () => (
  <div className={containerClass}>
    <LinkBox style={{ gridColumn: '1 / 1' }}>
      <StoryListItem
        className={createStoryListStyleClass({
          itemOuterPaddingTop: spaceScale.get(2.5),
          outerPaddingHorizontal: spaceScale.get(2.5),
        })}
        colorBehavior="alwaysDark"
        mediaPosition="posterBottom"
        media={
          <div
            style={{
              aspectRatio: '2 / 3',
              position: 'relative',
            }}
          >
            <video
              playsInline
              autoPlay
              muted
              loop
              src="https://vp.nyt.com/video/2024/06/27/120122_1_00vid-mongolia-countrydoctor-snapper-22718_wg_1080p.mp4"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                inset: 0,
                objectFit: 'cover',
              }}
            />
          </div>
        }
      >
        <StoryListItemContent
          style={{ textAlign: 'center' }}
          topLabel="The Great Read"
          summary="This is how Mongolia provides basic medical services to its far-flung, semi-nomadic populations."
        >
          <HeadlineNews as="h1" size={28}>
            <LinkBox.Link
              subtle
              onClick={action('Clicked: Making House Calls to Mongolia’s Herders')}
            >
              Making House Calls to Mongolia’s Herders
            </LinkBox.Link>
          </HeadlineNews>
        </StoryListItemContent>
      </StoryListItem>
    </LinkBox>
    <div style={{ aspectRatio: '2 / 3', background: color.background.tertiary }} />
    <LinkBox style={{ gridColumn: '1 / 3' }}>
      <StoryListItem
        colorBehavior="alwaysDark"
        mediaPosition="posterTop"
        className={createStoryListStyleClass({
          itemOuterPaddingTop: spaceScale.get(4),
          outerPaddingHorizontal: spaceScale.get(4),
        })}
        media={
          <div
            style={{
              aspectRatio: '16 / 9',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage:
                'url(https://static01.nyt.com/images/2024/07/09/multimedia/00Mongolia-CountryDoctor-hgcz/00Mongolia-CountryDoctor-hgcz-superJumbo.jpg)',
            }}
          />
        }
      >
        <StoryListItemContent
          style={{ maxWidth: '460px' }}
          topLabel="The Great Read"
          summary="This is how Mongolia provides basic medical services to its far-flung, semi-nomadic populations."
        >
          <HeadlineNews as="h1" size={32}>
            <LinkBox.Link
              subtle
              onClick={action('Clicked: Making House Calls to Mongolia’s Herders')}
            >
              Making House Calls to Mongolia’s Herders
            </LinkBox.Link>
          </HeadlineNews>
        </StoryListItemContent>
      </StoryListItem>
    </LinkBox>
  </div>
);
