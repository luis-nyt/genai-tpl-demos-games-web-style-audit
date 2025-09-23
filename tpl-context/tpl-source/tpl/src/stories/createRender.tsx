// eslint-disable-next-line no-restricted-imports
import { ColorBehaviorProps } from '@nyt/foundation';
import React, { ReactNode } from 'react';
import { Box, createTplColorBehaviorStyles } from '../index.js';

export const boxColorBehaviorStyles = createTplColorBehaviorStyles(
  light => `background: ${light.background.primary.hex};
  color: ${light.content.primary.hex};
  `
);

/** @see https://storybook.js.org/docs/react/api/csf#custom-render-functions */
export const createRender =
  <P extends ColorBehaviorProps, T extends (props: P) => ReactNode>(Component: T) =>
  (props: P) => (
    <Box bg="primary" colorBehavior={props.colorBehavior} p={2}>
      {/* @ts-expect-error */}
      <Component {...props} />
    </Box>
  );
