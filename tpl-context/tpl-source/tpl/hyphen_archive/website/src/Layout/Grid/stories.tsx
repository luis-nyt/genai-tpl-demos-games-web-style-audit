import React from 'react';
import { styled } from 'pretty-lights';
import { Box, spaceScale } from '@nyt/foundation';
import { dark, Grid } from '../../../../src';

const Placeholder = styled(Box)`
  background: ${props => props.bg};
  padding: ${spaceScale.get(4)} 0;
  color: ${dark.colors.content.primary.hex};
  text-align: center;
  font-family: sans-serif;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

Placeholder.displayName = 'PlaceholderBox';

const Default = ({ box1Span, box2Span, box3Span, pageMargin }) => (
  <Placeholder bg="#333">
    <Grid pageMargin={pageMargin}>
      <Grid.Item span={box1Span}>
        <Placeholder bg="SlateBlue" />
      </Grid.Item>
      <Grid.Item span={box2Span}>
        <Placeholder bg="MediumVioletRed" />
      </Grid.Item>
      <Grid.Item span={box3Span}>
        <Placeholder bg="DarkCyan" />
      </Grid.Item>
    </Grid>
  </Placeholder>
);

const Responsive = ({ pageMargin }) => (
  <Placeholder bg="#333">
    <Grid pageMargin={pageMargin}>
      <Grid.Item span={4} spanLg={2}>
        <Placeholder bg="SlateBlue" />
      </Grid.Item>
      <Grid.Item span={2} spanLg={1}>
        <Placeholder bg="MediumVioletRed" />
      </Grid.Item>
      <Grid.Item span={6} spanLg={3}>
        <Placeholder bg="DarkCyan" />
      </Grid.Item>
    </Grid>
  </Placeholder>
);

const Layout = ({ pageMargin }) => (
  <Placeholder bg="#333">
    <Grid pageMargin={pageMargin}>
      <Grid.Item as="header" mb={[0, 2]} order={1}>
        <Placeholder bg="SlateBlue">Header</Placeholder>
      </Grid.Item>
      <Grid.Item as="nav" span={2} order={2}>
        <Placeholder bg="MediumVioletRed">Nav</Placeholder>
      </Grid.Item>
      <Grid.Item as="main" span={3} order={[4, 3]}>
        <Placeholder bg="DarkKhaki" py={7}>
          Main
        </Placeholder>
      </Grid.Item>
      <Grid.Item span={1} order={[3, 4]}>
        <Placeholder bg="#666">Ad</Placeholder>
      </Grid.Item>
      <Grid.Item as="footer" mt={[0, 3]} order={5}>
        <Placeholder bg="DarkCyan">Footer</Placeholder>
      </Grid.Item>
    </Grid>
  </Placeholder>
);

export { Default, Responsive, Layout };
