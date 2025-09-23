import React from 'react';
import { Text } from './Text';
import type { VTextProps } from './Text';

/* Core Typography */

const Body = ({ size = 2, ...rest }: VTextProps<'body'>) => {
  return <Text size={size} {...rest} variant="body" />;
};
const Subtitle = ({ size = 2, ...rest }: VTextProps<'subtitle'>) => {
  return <Text size={size} {...rest} variant="subtitle" />;
};
const Title = ({ size = 1, ...rest }: VTextProps<'title'>) => {
  return <Text size={size} {...rest} variant="title" />;
};
const Headline = ({ size = 1, ...rest }: VTextProps<'headline'>) => {
  return <Text size={size} {...rest} variant="headline" />;
};

/* Specialty Typography */

const Display = ({ size = 1, ...rest }: VTextProps<'display'>) => {
  return <Text size={size} {...rest} variant="display" />;
};

const Subscription = ({ size = 1, ...rest }: VTextProps<'subscription'>) => {
  return <Text size={size} {...rest} variant="subscription" />;
};

const Legal = ({ size = 1, ...rest }: VTextProps<'legal'>) => {
  return <Text size={size} {...rest} variant="legal" />;
};

export { Body, Subtitle, Title, Headline, Display, Subscription, Legal };
export * from './Text';
