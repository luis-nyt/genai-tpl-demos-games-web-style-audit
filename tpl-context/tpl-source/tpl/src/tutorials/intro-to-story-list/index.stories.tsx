import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  StoryList,
  StoryListItem,
  StoryListItemContent,
  StoryListProps,
  StoryListSection,
} from '../../StoryList/index.js';
import { spaceScale } from '../../generated/spacing.js';
import { color } from '../../tokens/index.js';
import { HeadlineFeature } from '../../Typography/index.js';
// @ts-expect-error
import bestBooksSquare640 from './images/bestBooksSquare640.jpg';
// @ts-expect-error
import impressionistsSquare640 from './images/impressionistsSquare640.jpg';
// @ts-expect-error
import dogPilotSquare640 from './images/dogPilotSquare640.jpg';
import { LinkBox } from '../../LinkBox/index.js';
import { bestBooksAlt, impressionistsAlt, dogPilotAlt, imgStyle, h3ResetStyle } from './content.js';

const meta = {
  component: StoryList,
  decorators: [
    Story => (
      <div style={{ padding: spaceScale.get(2), background: color.background.tertiary }}>
        <div
          style={{
            maxWidth: 402,
            background: color.background.primary,
            margin: '0 auto',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ['!dev'],
  title: 'Tutorials/Intro to Story List/Stories',
} satisfies Meta<StoryListProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Section1Step1: Story = {
  args: {
    children: [
      <div key="bestBooks">The 100 Best Books of the 21st Century</div>,
      <div key="impressionists">How the Impressionists Became the World’s Favorite Painters</div>,
      <div key="dogPilot">The Last Flight of the Dog Pilot</div>,
    ],
  },
};

export const Section1Step2: Story = {
  args: {
    children: [
      <StoryListItem key="bestBooks">The 100 Best Books of the 21st Century</StoryListItem>,
      <StoryListItem key="impressionists">
        How the Impressionists Became the World’s Favorite Painters
      </StoryListItem>,
      <StoryListItem key="dogPilot">The Last Flight of the Dog Pilot</StoryListItem>,
    ],
  },
};

export const Section1Step3: Story = {
  args: {
    children: [
      <StoryListItem key="bestBooks">
        <StoryListItemContent>The 100 Best Books of the 21st Century</StoryListItemContent>
      </StoryListItem>,
      <StoryListItem key="impressionists">
        <StoryListItemContent>
          How the Impressionists Became the World’s Favorite Painters
        </StoryListItemContent>
      </StoryListItem>,
      <StoryListItem key="dogPilot">
        <StoryListItemContent>The Last Flight of the Dog Pilot</StoryListItemContent>
      </StoryListItem>,
    ],
  },
};

export const Section1Step4: Story = {
  args: {
    children: [
      <StoryListItem key="bestBooks">
        <StoryListItemContent topLabel="Book Review">
          The 100 Best Books of the 21st Century
        </StoryListItemContent>
      </StoryListItem>,
      <StoryListItem key="impressionists">
        <StoryListItemContent topLabel="Critic’s Notebook">
          How the Impressionists Became the World’s Favorite Painters
        </StoryListItemContent>
      </StoryListItem>,
      <StoryListItem key="dogPilot">
        <StoryListItemContent topLabel="Metro">
          The Last Flight of the Dog Pilot
        </StoryListItemContent>
      </StoryListItem>,
    ],
  },
};

export const Section1Step5: Story = {
  args: {
    children: [
      <StoryListItem key="bestBooks">
        <StoryListItemContent
          topLabel="Book Review"
          summary="As voted on by 503 book lovers — with a little help from the staff of The New York Times Book Review."
        >
          The 100 Best Books of the 21st Century
        </StoryListItemContent>
      </StoryListItem>,
      <StoryListItem key="impressionists">
        <StoryListItemContent
          topLabel="Critic’s Notebook"
          summary="Exactly 150 years ago, Monet, Degas, Renoir and their pals spurred an artistic revolution. Can we still see the defiance behind the beauty, and the schmaltz?"
        >
          How the Impressionists Became the World’s Favorite Painters
        </StoryListItemContent>
      </StoryListItem>,
      <StoryListItem key="dogPilot">
        <StoryListItemContent
          topLabel="Metro"
          summary="Seuk Kim left behind a finance career to chase his dream of becoming a pilot. He took off one day in November with four dogs on board, a trip that would not go according to plan."
        >
          The Last Flight of the Dog Pilot
        </StoryListItemContent>
      </StoryListItem>,
    ],
  },
};

export const Section1Step6: Story = {
  args: {
    children: [
      <LinkBox key="bestBooks">
        <StoryListItem>
          <StoryListItemContent
            topLabel="Book Review"
            summary="As voted on by 503 book lovers — with a little help from the staff of The New York Times Book Review."
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/interactive/2024/books/best-books-21st-century.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              The 100 Best Books of the 21st Century
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
      <LinkBox key="impressionists">
        <StoryListItem>
          <StoryListItemContent
            topLabel="Critic’s Notebook"
            summary="Exactly 150 years ago, Monet, Degas, Renoir and their pals spurred an artistic revolution. Can we still see the defiance behind the beauty, and the schmaltz?"
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/2024/10/10/arts/design/impressionism-monet-degas-renoir.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              How the Impressionists Became the World’s Favorite Painters
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
      <LinkBox key="dogPilot">
        <StoryListItem>
          <StoryListItemContent
            topLabel="Metro"
            summary="Seuk Kim left behind a finance career to chase his dream of becoming a pilot. He took off one day in November with four dogs on board, a trip that would not go according to plan."
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/2025/01/29/nyregion/seuk-kim-rescue-dog-pilot.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Last Flight of the Dog Pilot
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
    ],
  },
};

export const Section2Step1: Story = {
  args: {
    children: [
      <LinkBox key="bestBooks">
        <StoryListItem media={<img src={bestBooksSquare640} style={imgStyle} alt={bestBooksAlt} />}>
          <StoryListItemContent
            topLabel="Book Review"
            summary="As voted on by 503 book lovers — with a little help from the staff of The New York Times Book Review."
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/interactive/2024/books/best-books-21st-century.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              The 100 Best Books of the 21st Century
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
      <LinkBox key="impressionists">
        <StoryListItem>
          <StoryListItemContent
            topLabel="Critic’s Notebook"
            summary="Exactly 150 years ago, Monet, Degas, Renoir and their pals spurred an artistic revolution. Can we still see the defiance behind the beauty, and the schmaltz?"
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/2024/10/10/arts/design/impressionism-monet-degas-renoir.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              How the Impressionists Became the World’s Favorite Painters
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
      <LinkBox key="dogPilot">
        <StoryListItem>
          <StoryListItemContent
            topLabel="Metro"
            summary="Seuk Kim left behind a finance career to chase his dream of becoming a pilot. He took off one day in November with four dogs on board, a trip that would not go according to plan."
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/2025/01/29/nyregion/seuk-kim-rescue-dog-pilot.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Last Flight of the Dog Pilot
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
    ],
  },
};

export const Section2Step2: Story = {
  args: {
    children: [
      <LinkBox key="bestBooks">
        <StoryListItem
          mediaPosition="top"
          media={
            <img
              src={bestBooksSquare640}
              style={{ ...imgStyle, width: '100%' }}
              alt={bestBooksAlt}
            />
          }
        >
          <StoryListItemContent
            topLabel="Book Review"
            summary="As voted on by 503 book lovers — with a little help from the staff of The New York Times Book Review."
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/interactive/2024/books/best-books-21st-century.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              The 100 Best Books of the 21st Century
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
      <LinkBox key="impressionists">
        <StoryListItem>
          <StoryListItemContent
            topLabel="Critic’s Notebook"
            summary="Exactly 150 years ago, Monet, Degas, Renoir and their pals spurred an artistic revolution. Can we still see the defiance behind the beauty, and the schmaltz?"
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/2024/10/10/arts/design/impressionism-monet-degas-renoir.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              How the Impressionists Became the World’s Favorite Painters
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
      <LinkBox key="dogPilot">
        <StoryListItem>
          <StoryListItemContent
            topLabel="Metro"
            summary="Seuk Kim left behind a finance career to chase his dream of becoming a pilot. He took off one day in November with four dogs on board, a trip that would not go according to plan."
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/2025/01/29/nyregion/seuk-kim-rescue-dog-pilot.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Last Flight of the Dog Pilot
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
    ],
  },
};

export const Section2Step3: Story = {
  args: {
    children: [
      <LinkBox key="bestBooks">
        <StoryListItem
          mediaPosition="topFullBleed"
          media={
            <img
              src={bestBooksSquare640}
              style={{ ...imgStyle, width: '100%' }}
              alt={bestBooksAlt}
            />
          }
        >
          <StoryListItemContent
            topLabel="Book Review"
            summary="As voted on by 503 book lovers — with a little help from the staff of The New York Times Book Review."
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/interactive/2024/books/best-books-21st-century.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              The 100 Best Books of the 21st Century
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
      <LinkBox key="impressionists">
        <StoryListItem>
          <StoryListItemContent
            topLabel="Critic’s Notebook"
            summary="Exactly 150 years ago, Monet, Degas, Renoir and their pals spurred an artistic revolution. Can we still see the defiance behind the beauty, and the schmaltz?"
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/2024/10/10/arts/design/impressionism-monet-degas-renoir.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              How the Impressionists Became the World’s Favorite Painters
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
      <LinkBox key="dogPilot">
        <StoryListItem>
          <StoryListItemContent
            topLabel="Metro"
            summary="Seuk Kim left behind a finance career to chase his dream of becoming a pilot. He took off one day in November with four dogs on board, a trip that would not go according to plan."
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/2025/01/29/nyregion/seuk-kim-rescue-dog-pilot.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Last Flight of the Dog Pilot
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
    ],
  },
};

export const Section2Step4: Story = {
  args: {
    children: [
      <LinkBox key="bestBooks">
        <StoryListItem
          mediaPosition="topFullBleed"
          media={
            <img
              src={bestBooksSquare640}
              style={{ ...imgStyle, width: '100%' }}
              alt={bestBooksAlt}
            />
          }
        >
          <StoryListItemContent
            topLabel="Book Review"
            summary="As voted on by 503 book lovers — with a little help from the staff of The New York Times Book Review."
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/interactive/2024/books/best-books-21st-century.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              The 100 Best Books of the 21st Century
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
      <LinkBox key="impressionists">
        <StoryListItem
          media={<img src={impressionistsSquare640} style={imgStyle} alt={impressionistsAlt} />}
        >
          <StoryListItemContent
            topLabel="Critic’s Notebook"
            summary="Exactly 150 years ago, Monet, Degas, Renoir and their pals spurred an artistic revolution. Can we still see the defiance behind the beauty, and the schmaltz?"
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/2024/10/10/arts/design/impressionism-monet-degas-renoir.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              How the Impressionists Became the World’s Favorite Painters
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
      <LinkBox key="dogPilot">
        <StoryListItem media={<img src={dogPilotSquare640} style={imgStyle} alt={dogPilotAlt} />}>
          <StoryListItemContent
            topLabel="Metro"
            summary="Seuk Kim left behind a finance career to chase his dream of becoming a pilot. He took off one day in November with four dogs on board, a trip that would not go according to plan."
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/2025/01/29/nyregion/seuk-kim-rescue-dog-pilot.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Last Flight of the Dog Pilot
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
    ],
  },
};

export const Section2Step5: Story = {
  args: {
    children: [
      <LinkBox key="bestBooks">
        <StoryListItem
          mediaPosition="topFullBleed"
          media={
            <img
              src={bestBooksSquare640}
              style={{ ...imgStyle, width: '100%' }}
              alt={bestBooksAlt}
            />
          }
        >
          <StoryListItemContent
            topLabel="Book Review"
            summary="As voted on by 503 book lovers — with a little help from the staff of The New York Times Book Review."
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/interactive/2024/books/best-books-21st-century.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              The 100 Best Books of the 21st Century
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
      <LinkBox key="impressionists">
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
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/2024/10/10/arts/design/impressionism-monet-degas-renoir.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              How the Impressionists Became the World’s Favorite Painters
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
      <LinkBox key="dogPilot">
        <StoryListItem
          media={
            <img src={dogPilotSquare640} style={{ ...imgStyle, width: '95px' }} alt={dogPilotAlt} />
          }
        >
          <StoryListItemContent
            topLabel="Metro"
            summary="Seuk Kim left behind a finance career to chase his dream of becoming a pilot. He took off one day in November with four dogs on board, a trip that would not go according to plan."
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/2025/01/29/nyregion/seuk-kim-rescue-dog-pilot.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Last Flight of the Dog Pilot
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
    ],
  },
};

export const Section3Step1: Story = {
  args: {
    children: [
      <LinkBox key="bestBooks">
        <StoryListItem
          mediaPosition="topFullBleed"
          media={
            <img
              src={bestBooksSquare640}
              style={{ ...imgStyle, width: '100%' }}
              alt={bestBooksAlt}
            />
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
      </LinkBox>,
      <LinkBox key="impressionists">
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
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/2024/10/10/arts/design/impressionism-monet-degas-renoir.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              How the Impressionists Became the World’s Favorite Painters
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
      <LinkBox key="dogPilot">
        <StoryListItem
          media={
            <img src={dogPilotSquare640} style={{ ...imgStyle, width: '95px' }} alt={dogPilotAlt} />
          }
        >
          <StoryListItemContent
            topLabel="Metro"
            summary="Seuk Kim left behind a finance career to chase his dream of becoming a pilot. He took off one day in November with four dogs on board, a trip that would not go according to plan."
          >
            <LinkBox.Link
              subtle
              href="https://www.nytimes.com/2025/01/29/nyregion/seuk-kim-rescue-dog-pilot.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Last Flight of the Dog Pilot
            </LinkBox.Link>
          </StoryListItemContent>
        </StoryListItem>
      </LinkBox>,
    ],
  },
};

export const Section3Step2: Story = {
  args: {
    children: [
      <LinkBox key="bestBooks">
        <StoryListItem
          mediaPosition="topFullBleed"
          media={
            <img
              src={bestBooksSquare640}
              style={{ ...imgStyle, width: '100%' }}
              alt={bestBooksAlt}
            />
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
      </LinkBox>,
      <LinkBox key="impressionists">
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
            <h3>
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
      </LinkBox>,
      <LinkBox key="dogPilot">
        <StoryListItem
          media={
            <img src={dogPilotSquare640} style={{ ...imgStyle, width: '95px' }} alt={dogPilotAlt} />
          }
        >
          <StoryListItemContent
            topLabel="Metro"
            summary="Seuk Kim left behind a finance career to chase his dream of becoming a pilot. He took off one day in November with four dogs on board, a trip that would not go according to plan."
          >
            <h3>
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
      </LinkBox>,
    ],
  },
};

export const Section3Step3: Story = {
  args: {
    children: [
      <LinkBox key="bestBooks">
        <StoryListItem
          mediaPosition="topFullBleed"
          media={
            <img
              src={bestBooksSquare640}
              style={{ ...imgStyle, width: '100%' }}
              alt={bestBooksAlt}
            />
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
      </LinkBox>,
      <LinkBox key="impressionists">
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
      </LinkBox>,
      <LinkBox key="dogPilot">
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
      </LinkBox>,
    ],
  },
};

export const Section3Step4: Story = {
  args: {
    children: [
      <LinkBox key="bestBooks">
        <StoryListItem
          mediaPosition="topFullBleed"
          media={
            <img
              src={bestBooksSquare640}
              style={{ ...imgStyle, width: '100%' }}
              alt={bestBooksAlt}
            />
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
      </LinkBox>,
      <StoryListSection key="latest">
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
              <img
                src={dogPilotSquare640}
                style={{ ...imgStyle, width: '95px' }}
                alt={dogPilotAlt}
              />
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
      </StoryListSection>,
    ],
  },
};

export const Section3Step5: Story = {
  args: {
    children: [
      <LinkBox key="bestBooks">
        <StoryListItem
          mediaPosition="topFullBleed"
          media={
            <img
              src={bestBooksSquare640}
              style={{ ...imgStyle, width: '100%' }}
              alt={bestBooksAlt}
            />
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
      </LinkBox>,
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
              <img
                src={dogPilotSquare640}
                style={{ ...imgStyle, width: '95px' }}
                alt={dogPilotAlt}
              />
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
      </StoryListSection>,
    ],
  },
};
