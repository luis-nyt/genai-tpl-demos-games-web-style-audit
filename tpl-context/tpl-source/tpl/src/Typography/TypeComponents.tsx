import React, {
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import { cx, css } from 'pretty-lights';
import { SystemProp } from '@nyt/foundation';
import { Typography, TypographyProps } from './Typography.js';
import { TypographyPrefix, TypographyVariant, TypographyKey } from '../tokens/index.js';
import { ResponsiveTypography } from '../system/index.js';
import { dataTplAttr, DataTplValue } from '../util/index.js';

type WrappedTypographyProps<
  Prefix extends TypographyPrefix,
  OtherProps extends {} = {},
  SizeProp extends string = 'size',
> = Omit<TypographyProps, 'variant'> & {
  [P in SizeProp]?: SystemProp<TypographyVariant<Prefix>>;
} & OtherProps;

type WrappedTypographyComponent<
  Prefix extends TypographyPrefix,
  OtherProps extends {} = {},
  SizeProp extends string = 'size',
> = ForwardRefExoticComponent<
  PropsWithoutRef<WrappedTypographyProps<Prefix, OtherProps, SizeProp>> & RefAttributes<HTMLElement>
>;

/**
 * Create a variant or array of variants from a prefix and size value
 */
const responsiveVariant = <T extends TypographyPrefix>(
  prefix: T,
  size?: SystemProp<TypographyVariant<T>>
): ResponsiveTypography =>
  Array.isArray(size)
    ? size.map(sz => `${prefix}/${sz}` as TypographyKey)
    : (`${prefix}/${size}` as TypographyKey);

/**
 * The `Text` component is used for body text outside of articles.
 *
 * For article body text, use the `Body` typography component.
 */
const Text: WrappedTypographyComponent<'Text'> = forwardRef(({ size, ...rest }, ref) => (
  <Typography
    variant={responsiveVariant('Text', size)}
    ref={ref}
    {...{ [dataTplAttr]: DataTplValue.Text, ...rest }}
  />
));
type TextProps = Parameters<typeof Text>[0];

/**
 * The `Body` component is used for content article body text.
 *
 * For non-article body text, use the `Text` typography component.
 */
const Body: WrappedTypographyComponent<'Body'> = forwardRef(({ size, ...rest }, ref) => (
  <Typography
    variant={responsiveVariant('Body', size)}
    ref={ref}
    {...{ [dataTplAttr]: DataTplValue.Body, ...rest }}
  />
));
type BodyProps = Parameters<typeof Body>[0];

/**
 * The `Headline` component is used for headings within some content articles.
 *
 * For headings outside content articles, use the `Title` typography component.
 */
const Headline: WrappedTypographyComponent<'Headline'> = forwardRef(({ size, ...rest }, ref) => (
  <Typography
    variant={responsiveVariant('Headline', size)}
    ref={ref}
    {...{ [dataTplAttr]: DataTplValue.Headline, ...rest }}
  />
));
type HeadlineProps = Parameters<typeof Headline>[0];

/**
 * The `Label` component can be used to add extra context to other pieces of text. It comes in two weights: Regular and Emphasis. It is never used as a heading.
 */
const Label: WrappedTypographyComponent<'Label', {}, 'variant'> = forwardRef(
  ({ variant, ...rest }, ref) => (
    <Typography
      variant={responsiveVariant('Label', variant)}
      ref={ref}
      {...{ [dataTplAttr]: DataTplValue.Label, ...rest }}
    />
  )
);
type LabelProps = Parameters<typeof Label>[0];

const italicClass = css({
  fontStyle: 'italic',
});

/**
 * The `HeadlineNews` component is only used to communicate the headline of a News story. It may additionally be italic for extra attention.
 */
const HeadlineNews: WrappedTypographyComponent<'HeadlineNews', { italic?: boolean }> = forwardRef(
  ({ className, italic = false, size, ...rest }, ref) => (
    <Typography
      variant={responsiveVariant('HeadlineNews', size)}
      className={cx({ [italicClass]: !!italic }, className)}
      ref={ref}
      {...{ [dataTplAttr]: DataTplValue.HeadlineNews, ...rest }}
    />
  )
);
type HeadlineNewsProps = Parameters<typeof HeadlineNews>[0];

/**
 * The `HeadlineOpinion` component is only used to communicate the headline of an Opinion story.
 */
const HeadlineOpinion: WrappedTypographyComponent<'HeadlineOpinion'> = forwardRef(
  ({ size, ...rest }, ref) => (
    <Typography
      variant={responsiveVariant('HeadlineOpinion', size)}
      ref={ref}
      {...{ [dataTplAttr]: DataTplValue.HeadlineOpinion, ...rest }}
    />
  )
);
type HeadlineOpinionProps = Parameters<typeof HeadlineOpinion>[0];

/**
 * `HeadlineFeature` is similar `Headline` in that it is used for content article headlines, but expresses a feature tone.
 */
const HeadlineFeature: WrappedTypographyComponent<'HeadlineFeature'> = forwardRef(
  ({ size, ...rest }, ref) => (
    <Typography
      variant={responsiveVariant('HeadlineFeature', size)}
      ref={ref}
      {...{ [dataTplAttr]: DataTplValue.HeadlineFeature, ...rest }}
    />
  )
);
type HeadlineFeatureProps = Parameters<typeof HeadlineFeature>[0];

/**
 * `Title` is for added visual weight, used for headings, legends, emphasis.
 */
const Title: WrappedTypographyComponent<'Title'> = forwardRef(({ size, ...rest }, ref) => (
  <Typography
    variant={responsiveVariant('Title', size)}
    ref={ref}
    {...{ [dataTplAttr]: DataTplValue.Title, ...rest }}
  />
));
type TitleProps = Parameters<typeof Title>[0];

/**
 * `TitleKarnak` is used for short-form copy (typically headings)
 * that represents sub-brands and newsletters only.
 */
const TitleKarnak: WrappedTypographyComponent<'TitleKarnak'> = forwardRef(
  ({ size, ...rest }, ref) => (
    <Typography
      variant={responsiveVariant('TitleKarnak', size)}
      ref={ref}
      {...{ [dataTplAttr]: DataTplValue.TitleKarnak, ...rest }}
    />
  )
);
type TitleKarnakProps = Parameters<typeof TitleKarnak>[0];

export {
  Text,
  Title,
  TitleKarnak,
  Label,
  Headline,
  HeadlineNews,
  HeadlineOpinion,
  HeadlineFeature,
  Body,
};
export type {
  TextProps,
  TitleProps,
  TitleKarnakProps,
  LabelProps,
  HeadlineProps,
  HeadlineNewsProps,
  HeadlineOpinionProps,
  HeadlineFeatureProps,
  BodyProps,
};
