import React from 'react';
import { Preview } from '@storybook/react';
import { styled } from 'pretty-lights';
import foundationPreview from '../../foundation/website/.storybook/preview';
import { Root } from '../src/Root';
import { color } from '../src/tokens';
import DocsContainer from './components/DocsContainer';

/**
 * We set this container style for TPL because TPL Root is wrapped in
 * Foundation's base Root component which does not define css vars in :root;
 * they are set in the TPL Root element.
 */
const Container = styled.div`
  background: ${color.background.primary};
  color: ${color.content.primary};
`;

const preview = {
  parameters: {
    ...foundationPreview.parameters,
    options: {
      /**
       * Workaround for Storybook not sorting stories the way we want it.
       * method 'alphabetical' does not work sorting stories where you want "Overview" or "Default" stories to appear first
       * This will be fixed in Storybook 7
       * https://github.com/storybookjs/storybook/issues/16573
       */
      storySort: {
        method: 'configure',
        order: [
          'Getting Started',
          'TPL Web 2.0 Deprecation Notices',
          'Tutorials',
          'Buttons',
          ['Button', 'Text Button', 'Icon Button'],
          'Color',
          'Dialog',
          'Forms',
          ['TextInput', 'PasswordInput'],
          'Icon',
          'Layout',
          'Link',
          ['Default', '*'],
          'LinkBox',
          'List',
          'Radio',
          ['RadioGroup', 'Radio'],
          'Row',
          ['Row', 'Row.Group'],
          'Rule',
          'Spinner',
          'StoryList',
          'Toast',
          'Typography',
          [
            'Overview',
            'Text',
            'Title',
            'TitleKarnak',
            'Label',
            'Headline',
            'HeadlineNews',
            'HeadlineOpinion',
            'HeadlineFeature',
            'Body',
            'Typography component (advanced)',
          ],
        ],
      },
    },
    docs: {
      ...foundationPreview.parameters.docs,
      container: DocsContainer,
    },
    viewport: {
      viewports: {
        small: {
          name: 'Small',
          styles: {
            width: '375px',
            height: '900px',
          },
        },
        medium: {
          name: 'Medium',
          styles: {
            width: '800px',
            height: '900px',
          },
        },
        large: {
          name: 'Large',
          styles: {
            width: '1100px',
            height: '900px',
          },
        },
      },
    },
  },

  decorators: [
    (Story, context) => (
      <Root darkMode={true}>
        <Container>
          <Story {...context} />
        </Container>
      </Root>
    ),
  ],
} satisfies Preview;

export default preview;
