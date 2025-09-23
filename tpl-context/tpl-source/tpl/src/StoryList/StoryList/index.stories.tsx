/* eslint-disable react/no-array-index-key */
import React, { Fragment, useLayoutEffect, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ColorBehaviorContext, useColorBehaviorContext } from '@nyt/foundation';
import { StoryList, StoryListProps } from './index.js';
import { StoryListItem } from '../StoryListItem/index.js';
import { StoryListItemContent } from '../StoryListItemContent/index.js';
import {
  FullMoonArtwork,
  PositionAwareMediaPlaceholder,
} from '../stories/PositionAwareMediaPlaceholder.js';
import { StoryListSection } from '../StoryListSection/index.js';
import { HRule } from '../../Rule/index.js';
import { HeadlineFeature, HeadlineOpinion } from '../../Typography/index.js';
import { storyListOuterPadding } from '../storyListOuterPadding.js';
import { colorBehaviorArgType } from '../../stories/argTypes.js';
import { Box } from '../../Box/index.js';
import { StoryListMediaPositionContext } from '../StoryListMediaPositionContext.js';
import { PosterCarousel } from '../stories/PosterCarousel/index.js';
import { SectionTextCarousel } from '../stories/SectionTextCarousel/index.js';
import { Flex } from '../../Flex/index.js';
import { storyListStyle } from '../storyListStyle.js';
import { LinkBox } from '../../LinkBox/index.js';
// @ts-expect-error
import bestBooksSquare640 from '../../tutorials/intro-to-story-list/images/bestBooksSquare640.jpg';
// @ts-expect-error
import impressionistsSquare640 from '../../tutorials/intro-to-story-list/images/impressionistsSquare640.jpg';
// @ts-expect-error
import dogPilotSquare640 from '../../tutorials/intro-to-story-list/images/dogPilotSquare640.jpg';
import {
  bestBooksAlt,
  dogPilotAlt,
  h3ResetStyle,
  imgStyle,
  impressionistsAlt,
} from '../../tutorials/intro-to-story-list/content.js';

const { outerPaddingHorizontal, sectionMarginTop } = storyListStyle;

const meta = {
  component: StoryList,
  tags: ['autodocs'],
  argTypes: {
    ...colorBehaviorArgType,
    htmlFor: {
      table: {
        disable: true,
      },
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
    title: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <Box bg="primary" colorBehavior={context.args.colorBehavior}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        /** Duplicated from {@link StoryListItem}’s docstrings, since Storybook doesn't support JSDoc `@link` */
        component: `A collection view used to create lists of \`StoryListItem\`s.

## Overview

Story lists are made up of multiple composed views that work together:
- **Collection:** \`StoryList\`
- **Item:** [StoryListItem](/docs/storylist-storylistitem--docs)
- **Item Content:** [StoryListItemContent](/docs/storylist-storylistitemcontent--docs)
- **Sections:** \`StoryListSection\`

See [Intro to TPL Story List](/docs/tutorials-intro-to-story-list-section-1-create-a-story-list--docs) for a full demonstration of story list and its related views.

### Styling

Story list automatically inserts dividers between items and sections. Use \`StoryList\`’s props,
such as \`itemDivider\` and \`sectionDivider\`, and the \`createStoryListStyleClass\` function to customize its look.

## See Also

- [Intro to TPL Story List](/docs/tutorials-intro-to-story-list-section-1-create-a-story-list--docs)
- [Times Product Language: Story List](https://coda.io/d/_dH9ZFEaJR9I/Story-List_suoUNY5D)
- [StoryListItem](/docs/storylist-storylistitem--docs)
- [StoryListItemContent](/docs/storylist-storylistitemcontent--docs)
- [StoryListItemSection](/docs/storylist-storylistitemsection--docs)
`,
      },
    },
  },
} satisfies Meta<StoryListProps>;
export default meta;

const item = (
  <StoryListItem media={<FullMoonArtwork />}>
    <StoryListItemContent
      topLabel="Top Label"
      summary="The biggest most powerful and impactful story of our time"
      bottomLabel="Bottom Label"
    >
      Basic story list headline
    </StoryListItemContent>
  </StoryListItem>
);

// Storybook 7.x crashes when trying to write this as a `Story`
export const WithSections: StoryFn<StoryListProps> = ({ children, ...rest }) => (
  <StoryList {...rest}>
    <StoryListItem mediaPosition="topFullBleed" media={<FullMoonArtwork />}>
      <StoryListItemContent
        topLabel="Top Label"
        summary="The biggest most powerful and impactful story of our time"
        bottomLabel="Bottom Label"
      >
        Basic story list headline
      </StoryListItemContent>
    </StoryListItem>
    <StoryListItem media={<FullMoonArtwork />}>
      <StoryListItemContent
        topLabel="Top Label"
        summary="The biggest most powerful and impactful story of our time"
        bottomLabel="Bottom Label"
      >
        Basic story list headline
      </StoryListItemContent>
    </StoryListItem>
    <StoryListSection header="The Latest">
      <StoryListItem media={<FullMoonArtwork />}>
        <StoryListItemContent
          topLabel="Top Label"
          summary="The biggest most powerful and impactful story of our time"
          bottomLabel="Bottom Label"
        >
          Basic story list headline
        </StoryListItemContent>
      </StoryListItem>
      <StoryListItem media={<FullMoonArtwork />}>
        <StoryListItemContent
          topLabel="Top Label"
          summary="The biggest most powerful and impactful story of our time"
          bottomLabel="Bottom Label"
        >
          Basic story list headline
        </StoryListItemContent>
      </StoryListItem>
    </StoryListSection>
  </StoryList>
);

// Storybook 7.x crashes when trying to write this as a `Story`
export const WithoutSections: StoryFn<StoryListProps> = ({ children, ...rest }) => (
  <StoryList {...rest}>
    <StoryListItem mediaPosition="topFullBleed" media={<FullMoonArtwork />}>
      <StoryListItemContent
        topLabel="Top Label"
        summary="The biggest most powerful and impactful story of our time"
        bottomLabel="Bottom Label"
      >
        Basic story list headline
      </StoryListItemContent>
    </StoryListItem>
    <StoryListItem media={<FullMoonArtwork />}>
      <StoryListItemContent
        topLabel="Top Label"
        summary="The biggest most powerful and impactful story of our time"
        bottomLabel="Bottom Label"
      >
        Basic story list headline
      </StoryListItemContent>
    </StoryListItem>
    <StoryListItem media={<FullMoonArtwork />}>
      <StoryListItemContent
        topLabel="Top Label"
        summary="The biggest most powerful and impactful story of our time"
        bottomLabel="Bottom Label"
      >
        Basic story list headline
      </StoryListItemContent>
    </StoryListItem>
    <StoryListItem media={<FullMoonArtwork />}>
      <StoryListItemContent
        topLabel="Top Label"
        summary="The biggest most powerful and impactful story of our time"
        bottomLabel="Bottom Label"
      >
        Basic story list headline
      </StoryListItemContent>
    </StoryListItem>
  </StoryList>
);

export const MultiLayoutDemo: StoryFn<StoryListProps> = ({
  colorBehavior: colorBehaviorProp,
  itemDivider,
  sectionDivider,
}) => {
  const [horizontalSizeClass, setHorizontalSizeClass] = useState<'compact' | 'regular'>('compact');

  const updateSizeClass = ({ matches }: { matches: boolean }) => {
    if (matches) setHorizontalSizeClass('regular');
    else setHorizontalSizeClass('compact');
  };

  useLayoutEffect(() => {
    const mql = window.matchMedia('(min-width: 800px)');
    updateSizeClass({ matches: mql.matches });
    mql.addEventListener('change', updateSizeClass);
    return () => {
      mql.removeEventListener('change', updateSizeClass);
    };
  }, []);

  const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
  const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;

  const latestSection = (
    <StoryListSection header="Latest">
      {Array.from({ length: 4 }).map((_, i) => (
        <Fragment key={i}>{item}</Fragment>
      ))}
    </StoryListSection>
  );

  const asideSection = (
    <StoryListSection header="Aside">
      {Array.from({ length: 4 }).map((_, i) => (
        <Fragment key={i}>
          <StoryListMediaPositionContext.Provider value={i === 0 ? 'top' : 'trailing'}>
            {item}
          </StoryListMediaPositionContext.Provider>
        </Fragment>
      ))}
    </StoryListSection>
  );

  return (
    <ColorBehaviorContext.Provider value={{ colorBehavior }}>
      <StoryList itemDivider={itemDivider} sectionDivider={sectionDivider}>
        <ColorBehaviorContext.Provider value={{ colorBehavior: 'alwaysDark' }}>
          <StoryListMediaPositionContext.Provider value="posterBottom">
            <PosterCarousel horizontalSizeClass={horizontalSizeClass}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Fragment key={i}>{item}</Fragment>
              ))}
            </PosterCarousel>
          </StoryListMediaPositionContext.Provider>
        </ColorBehaviorContext.Provider>

        <StoryListSection header="From Opinion">
          <SectionTextCarousel>
            {Array.from({ length: 6 }).map((_, i) => (
              <StoryListItem key={i}>
                <StoryListItemContent
                  topLabel="Top Label"
                  summary="The biggest most powerful and impactful story of our time"
                  bottomLabel="Bottom Label"
                >
                  <HeadlineOpinion size={20} as="h1">
                    Basic story list headline
                  </HeadlineOpinion>
                </StoryListItemContent>
              </StoryListItem>
            ))}
          </SectionTextCarousel>
        </StoryListSection>

        {horizontalSizeClass === 'compact' && latestSection}
        {horizontalSizeClass === 'compact' && asideSection}
      </StoryList>

      {horizontalSizeClass === 'regular' && (
        <Flex flexDirection="row" style={{ marginTop: sectionMarginTop }}>
          <StoryList
            itemDivider={itemDivider}
            sectionDivider={sectionDivider}
            style={{ flexGrow: 1 }}
          >
            {latestSection}
          </StoryList>
          <StoryList
            itemDivider={itemDivider}
            sectionDivider={sectionDivider}
            style={{ flexGrow: 1, marginLeft: `calc(-1 * ${outerPaddingHorizontal})` }}
          >
            {asideSection}
          </StoryList>
        </Flex>
      )}
    </ColorBehaviorContext.Provider>
  );
};

export const TutorialBuild: StoryFn<StoryListProps> = ({ children, ...rest }) => (
  <StoryList {...rest}>
    <LinkBox key="bestBooks">
      <StoryListItem
        mediaPosition="topFullBleed"
        media={
          <img src={bestBooksSquare640} style={{ ...imgStyle, width: '100%' }} alt={bestBooksAlt} />
        }
      >
        <StoryListItemContent
          topLabel="Book Review"
          summary="As voted on by 503 book lovers — with a little help from the staff of The New York Times Book Review."
        >
          <HeadlineFeature as="h3" size={28}>
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/interactive/2024/books/best-books-21st-century.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              The 100 Best Books of the 21st Century
            </LinkBox.Link>
          </HeadlineFeature>
        </StoryListItemContent>
      </StoryListItem>
    </LinkBox>
    <StoryListSection key="latest" header="The Latest">
      <LinkBox>
        <StoryListItem
          media={
            <img
              src={impressionistsSquare640}
              style={{ ...imgStyle, width: '95px' }}
              alt={impressionistsAlt}
            />
          }
        >
          <StoryListItemContent
            topLabel="Critic’s Notebook"
            summary="Exactly 150 years ago, Monet, Degas, Renoir and their pals spurred an artistic revolution. Can we still see the defiance behind the beauty, and the schmaltz?"
          >
            <h3 style={h3ResetStyle}>
              <LinkBox.Link
                subtle
                href="https://www.nytimes.com/2024/10/10/arts/design/impressionism-monet-degas-renoir.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                How the Impressionists Became the World’s Favorite Painters
              </LinkBox.Link>
            </h3>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>
      <LinkBox>
        <StoryListItem
          media={
            <img src={dogPilotSquare640} style={{ ...imgStyle, width: '95px' }} alt={dogPilotAlt} />
          }
        >
          <StoryListItemContent
            topLabel="Metro"
            summary="Seuk Kim left behind a finance career to chase his dream of becoming a pilot. He took off one day in November with four dogs on board, a trip that would not go according to plan."
          >
            <h3 style={h3ResetStyle}>
              <LinkBox.Link
                subtle
                href="https://www.nytimes.com/2025/01/29/nyregion/seuk-kim-rescue-dog-pilot.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Last Flight of the Dog Pilot
              </LinkBox.Link>
            </h3>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>
    </StoryListSection>
  </StoryList>
);

export const VQA1: StoryFn<StoryListProps> = ({ children, ...rest }) => (
  <StoryList {...rest}>
    <StoryListSection header="Title">
      <StoryListItem>
        <StoryListItemContent topLabel="Upper Label" bottomLabel="Lower Label">
          Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit
        </StoryListItemContent>
      </StoryListItem>
      <StoryListItem>
        <StoryListItemContent topLabel="Upper Label" bottomLabel="Lower Label">
          Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit
        </StoryListItemContent>
      </StoryListItem>
    </StoryListSection>
    <StoryListSection header="Title">
      <StoryListItem>
        <StoryListItemContent topLabel="Upper Label" bottomLabel="Lower Label">
          Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit
        </StoryListItemContent>
      </StoryListItem>
      <StoryListItem>
        <StoryListItemContent topLabel="Upper Label" bottomLabel="Lower Label">
          Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit
        </StoryListItemContent>
      </StoryListItem>
    </StoryListSection>
  </StoryList>
);

export const VQA2: StoryFn = () => (
  <>
    <HRule
      variant="tertiary"
      className={storyListOuterPadding({ edges: ['left', 'right'], mode: 'margin' })}
      mt={1}
      width="auto"
    />
    <StoryListItem>
      <StoryListItemContent
        topLabel="Upper Label"
        summary="In his new column, Ask Kenji, the cookbook author Kenji López-Alt answers your questions. First up: why smaller is better in the freezer in the freezer in the freezer."
        byline="From Serial Productions"
        bottomLabel="Lower Label"
      >
        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit
      </StoryListItemContent>
    </StoryListItem>
  </>
);

export const VQA3: StoryFn = () => (
  <>
    <HRule
      variant="primary"
      className={storyListOuterPadding({ edges: ['left', 'right'], mode: 'margin' })}
      mt={1}
      width="auto"
    />
    <StoryListItem>
      <StoryListItemContent>
        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit
      </StoryListItemContent>
    </StoryListItem>
  </>
);

export const VQA4: StoryFn = () => (
  <>
    <HRule
      variant="tertiary"
      className={storyListOuterPadding({ edges: ['left', 'right'], mode: 'margin' })}
      mt={1}
      width="auto"
    />
    <StoryListItem
      media={<PositionAwareMediaPlaceholder style={{ width: '91px' }} />}
      mediaPosition="leading"
    >
      <StoryListItemContent topLabel="Upper Label" bottomLabel="Lower Label">
        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit
      </StoryListItemContent>
    </StoryListItem>
  </>
);

export const VQA5: StoryFn = () => (
  <>
    <HRule
      variant="tertiary"
      className={storyListOuterPadding({ edges: ['left', 'right'], mode: 'margin' })}
      mt={1}
      width="auto"
    />
    <StoryListItem
      media={<PositionAwareMediaPlaceholder style={{ aspectRatio: '1' }} />}
      mediaPosition="bottom"
    >
      <StoryListItemContent
        topLabel="Upper Label"
        summary="In his new column, Ask Kenji, the cookbook author Kenji López-Alt answers your questions. First up: why smaller is better in the freezer in the freezer in the freezer."
        bottomLabel="Lower Label"
      >
        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit
      </StoryListItemContent>
    </StoryListItem>
  </>
);

export const VQA6: StoryFn = () => (
  <StoryListItem
    media={<PositionAwareMediaPlaceholder style={{ aspectRatio: '1' }} />}
    mediaPosition="top"
  >
    <StoryListItemContent bottomLabel="Lower Label">
      Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit
    </StoryListItemContent>
  </StoryListItem>
);
