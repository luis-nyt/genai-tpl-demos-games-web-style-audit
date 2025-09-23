import React from 'react';
import { ArgTypes, Meta, Parameters, StoryFn, StoryObj } from '@storybook/react';
import { Box } from '../Box/index.js';
import { color, typography } from '../tokens/index.js';
import { Typography, TypographyProps } from '../Typography/index.js';
import { Link, LinkProps } from './index.js';

const includedControls = ['children', 'color', 'colorBehavior', 'href', 'subtle', 'target'];

const meta = {
  component: Link,
  tags: ['autodocs'],
  args: {
    children: 'View subscriptions',
    href: 'https://www.nytimes.com/account/subscription',
  },
  argTypes: {
    target: {
      options: ['_self', '_blank', '_parent', '_top'],
      control: { type: 'select' },
    },
  },
  parameters: {
    layout: 'centered',
    controls: {
      include: includedControls,
    },
  },
} satisfies Meta<LinkProps>;
export default meta;

type LinkAndParentTypographyTokenProps = LinkProps & {
  [P in Extract<
    keyof TypographyProps,
    'color' | 'colorBehavior' | 'variant'
  > as `parent${Capitalize<P>}`]: TypographyProps[P];
};

const parentTypographyTokenArgTypes: Partial<ArgTypes<LinkAndParentTypographyTokenProps>> = {
  parentColor: {
    options: Object.keys(color.content),
    control: { type: 'select' },
  },
  parentColorBehavior: {
    options: ['userDefault', 'alwaysLight', 'alwaysDark', 'userInverse'],
    control: { type: 'radio' },
  },
  parentVariant: {
    control: 'select',
    options: Object.keys(typography).sort(),
  },
};

const parentTypographyTokenParameters: Parameters = {
  controls: {
    include: [...includedControls, 'parentColor', 'parentColorBehavior', 'parentVariant'],
  },
};

type Story = StoryObj<typeof meta>;

/**
 * **Note:** This story intentionally uses the browser's default text styles.
 */
export const Default: Story = { args: {} };

/**
 * The `subtle` prop removes the Link's underline to reduce visual clutter, e.g. when grouping many
 * links together.
 *
 * For more info, please refer to the [TPL Link docs in Coda](https://coda.io/d/Times-Product-Language-TPL_dH9ZFEaJR9I/Link-WIP_sublS#_luSLA).
 *
 * **Note:** This story intentionally uses the browser's default text styles.
 */
export const Subtle: Story = { args: { subtle: true } };

/**
 * When setting `target="_blank"` on the component, Link announces to screen readers that it will open in a new tab.
 *
 * Please see also: the [Site Footer Recipe](#site-footer-recipe).
 *
 * For more on linking to content outside of the Times, please refer to the
 * [TPL Link docs in Coda](https://coda.io/d/Times-Product-Language-TPL_dH9ZFEaJR9I/Link-WIP_sublS#_luKCl).
 *
 * **Note:** This story intentionally uses the browser's default text styles.
 */
export const OpensInNewTab: Story = {
  args: { href: 'https://www.w3.org/TR/WCAG22/', target: '_blank' },
};

/**
 * **Note:** This story's controls let you change the typography token applied to the paragraph.
 */
export const RecipeParagraph: StoryFn<LinkAndParentTypographyTokenProps> = ({
  parentColor,
  parentColorBehavior,
  parentVariant,
  ...rest
}) => (
  <Typography color={parentColor} colorBehavior={parentColorBehavior} variant={parentVariant}>
    The New York Times takes your privacy seriously. Visit our <Link {...rest} /> to learn more.
  </Typography>
);
RecipeParagraph.args = {
  children: 'privacy policy',
  href: 'https://www.nytimes.com/privacy/privacy-policy',
  parentColor: 'primary',
  parentVariant: 'Text/14',
};
RecipeParagraph.argTypes = parentTypographyTokenArgTypes;
RecipeParagraph.parameters = parentTypographyTokenParameters;
RecipeParagraph.storyName = 'Recipe: Paragraph';

/**
 * **Note:** This story's controls let you change the typography token applied to the paragraph.
 */
export const RecipeListItem: StoryFn<
  Omit<LinkAndParentTypographyTokenProps, 'children' | 'href'>
> = ({ parentColor, parentColorBehavior, parentVariant, ...rest }) => (
  <ul>
    <Typography
      as="li"
      color={parentColor}
      colorBehavior={parentColorBehavior}
      variant={parentVariant}
    >
      Access via{' '}
      <Link href="https://www.nytimes.com" {...rest}>
        nytimes.com
      </Link>{' '}
      and The New York Times app for{' '}
      <Link href="https://apps.apple.com/us/app/the-new-york-times/id284862083" {...rest}>
        iPhone
      </Link>{' '}
      and{' '}
      <Link
        href="https://play.google.com/store/apps/details?id=com.nytimes.android&hl=en_US"
        {...rest}
      >
        Android
      </Link>
      .
    </Typography>
  </ul>
);
RecipeListItem.args = {
  target: '_blank',
  parentColor: 'primary',
  parentVariant: 'Text/14',
};
RecipeListItem.argTypes = parentTypographyTokenArgTypes;
RecipeListItem.parameters = parentTypographyTokenParameters;
RecipeListItem.storyName = 'Recipe: List Item';

/**
 * A simplified site footer or index, like we have at the bottom of [nytimes.com](https://www.nytimes.com/#site-index).
 * Since almost all the text here is clickable, we're using Link's `subtle` prop to reduce visual clutter.
 *
 * For more info, please refer to the [TPL Link docs in Coda](https://coda.io/d/Times-Product-Language-TPL_dH9ZFEaJR9I/Link-WIP_sublS#_luSLA).
 *
 * **Note:** This story's controls let you change the typography token applied to the Link text.
 */
export const RecipeSiteFooter: StoryFn<LinkAndParentTypographyTokenProps> = ({
  parentColor,
  parentColorBehavior,
  parentVariant,
  ...rest
}) => (
  <Typography
    color={parentColor}
    colorBehavior={parentColorBehavior}
    variant={parentVariant}
    as="dl"
  >
    <Box as="dt" pb={0.5}>
      News
    </Box>
    <dd style={{ margin: 0 }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <Link {...rest} href="https://www.nytimes.com/">
            Home Page
          </Link>
        </li>
        <li>
          <Link {...rest} href="https://www.nytimes.com/section/world">
            World
          </Link>
        </li>
        <li>
          <Link {...rest} href="https://www.nytimes.com/news-event/coronavirus">
            Coronavirus
          </Link>
        </li>
        <li>
          <Link {...rest} href="https://www.nytimes.com/section/us">
            U.S.
          </Link>
        </li>
        <li>
          <Link {...rest} href="https://www.nytimes.com/section/politics">
            Politics
          </Link>
        </li>
        <li>
          <Link {...rest} href="https://www.nytimes.com/section/nyregion">
            New York
          </Link>
        </li>
        <li>
          <Link {...rest} href="https://www.nytimes.com/section/business">
            Business
          </Link>
        </li>
        <li>
          <Link {...rest} href="https://www.nytimes.com/section/technology">
            Tech
          </Link>
        </li>
        <li>
          <Link {...rest} href="https://www.nytimes.com/section/science">
            Science
          </Link>
        </li>
        <li>
          <Link {...rest} href="https://www.nytimes.com/section/sports">
            Sports
          </Link>
        </li>
        <li>
          <Link {...rest} href="https://www.nytimes.com/interactive/2022/us/fire-tracker-maps.html">
            Wildfire Tracker
          </Link>
        </li>
        <li>
          <Link {...rest} href="https://www.nytimes.com/section/obituaries">
            Obituaries
          </Link>
        </li>
        <li>
          <Link {...rest} href="https://www.nytimes.com/section/todayspaper">
            Today&rsquo;s Paper
          </Link>
        </li>
        <li>
          <Link {...rest} href="https://www.nytimes.com/section/corrections">
            Corrections
          </Link>
        </li>
        <li>
          <Link {...rest} href="https://www.nytimes.com/trending/">
            Trending
          </Link>
        </li>
      </ul>
    </dd>
  </Typography>
);
RecipeSiteFooter.args = {
  subtle: true,
  parentVariant: 'Text/16',
};
RecipeSiteFooter.argTypes = parentTypographyTokenArgTypes;
RecipeSiteFooter.parameters = parentTypographyTokenParameters;
RecipeSiteFooter.storyName = 'Recipe: Site Footer';
