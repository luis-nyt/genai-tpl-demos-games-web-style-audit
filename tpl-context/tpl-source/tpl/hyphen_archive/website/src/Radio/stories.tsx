import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { Box, Flex } from '@nyt/foundation';
import {
  Radio,
  RadioItem,
  RadioProps,
  RadioTileItem,
  RadioItemProps,
  Title,
  Body,
  Button,
} from '../../../src';

// @see https://github.com/storybookjs/storybook/issues/15401
// @ts-ignore
RadioItem.displayName = 'Radio.Item';
// @ts-ignore
RadioTileItem.displayName = 'Radio.TileItem';

const defaultContent = {
  apples: [
    'apples',
    'Apples',
    'You can get these for free in office breakrooms. They get shinier and shinier every year.',
  ],
  oranges: ['oranges', 'Oranges', 'Eat an orange a day to keep the scurvy away'],
  bananas: [
    'bananas',
    'Bananas',
    "Shaped like a scimitar but there's nothing sharp about the flavor of these oblong fellows! Some people say they grow upside down. Others say we handle them upside down.",
  ],
};

const radioSharedArgs = {
  maxWidth: '50rem',
  showLabel: true,
  switchWidth: '32rem',
};

interface RadioTemplateProps extends RadioProps {
  name: string;
  maxWidth: string;
}

const RadioTemplate: Story<RadioTemplateProps> = ({ maxWidth, name, ...rest }) => (
  <Radio maxWidth={maxWidth} m={1} {...rest}>
    <Radio.Item
      name="example"
      label={defaultContent.apples[1]}
      secondaryLabel={defaultContent.apples[2]}
      value={defaultContent.apples[0]}
    />
    <Radio.Item
      name="example"
      label={defaultContent.oranges[1]}
      secondaryLabel={defaultContent.oranges[2]}
      value={defaultContent.oranges[0]}
    />
    <Radio.Item
      name="example"
      label={defaultContent.bananas[1]}
      secondaryLabel={defaultContent.bananas[2]}
      value={defaultContent.bananas[0]}
    />
  </Radio>
);

const RadioStory = RadioTemplate.bind({});

RadioStory.args = {
  ...radioSharedArgs,
  label: 'Know your fruits',
  secondaryLabel: 'For a long and healthy life',
};

RadioStory.argTypes = {
  onChange: { action: 'changed' },
  flexDirection: {
    options: ['row', 'column', undefined],
    control: { type: 'radio' },
  },
};

interface TemplateProps extends Omit<RadioItemProps, 'onChange'> {}

const RadioItemTemplate: Story<TemplateProps> = ({ checked, label, disabled, secondaryLabel }) => (
  <Box maxWidth="400px">
    <Radio.Item
      checked={checked}
      name="radio-item-example"
      label={label}
      disabled={disabled}
      secondaryLabel={secondaryLabel}
      value={defaultContent.apples[0]}
    />
  </Box>
);

const RadioItemStory = RadioItemTemplate.bind({});

RadioItemStory.args = {
  checked: true,
  label: defaultContent.apples[1],
  secondaryLabel: defaultContent.apples[2],
  disabled: false,
};

RadioItemStory.argTypes = {
  checked: {
    control: 'boolean',
  },
};

const TiledItemStoryTemplate: Story<TemplateProps> = ({
  checked,
  label,
  disabled,
  secondaryLabel,
  ...rest
}) => (
  <Radio label="Tiled Radio example" showLabel={false} m={1} {...rest}>
    <Radio.TileItem
      checked={checked}
      name="tiled-item-example"
      label={label}
      disabled={disabled}
      secondaryLabel={secondaryLabel}
      value="apples"
    />
    <Radio.TileItem name="tiled-item-example" value="oranges" id="example_bananas">
      <Flex gap={1}>
        <Box flex="1">
          <Title size={2} as="label" htmlFor="example_bananas">
            {defaultContent.bananas[1]}
          </Title>
          <Body size={2} as="label" htmlFor="example_bananas">
            {defaultContent.bananas[2]}
          </Body>
        </Box>

        <Box flex="0 1 5rem">
          <Body size={1} m={0}>
            🍌 🍌 🍌 🍌 🍌 🍌 🍌 🍌 🍌
          </Body>
        </Box>
      </Flex>
    </Radio.TileItem>
  </Radio>
);

const TiledItemStory = TiledItemStoryTemplate.bind({});

TiledItemStory.args = { ...RadioItemStory.args, checked: undefined };

TiledItemStory.argTypes = {
  ...RadioItemStory.argTypes,
  checked: {
    control: false,
  },
};

/**
 * Note: React 16 in development mode logs an error when setting `checked` but not either
 * `onChange` or `readOnly`. This suggests that its heuristic for detecting controlled `<input>`
 * elements does not account for the possibility of using a single `onChange` event on a parent
 * `<fieldset>` element. Thus, to avoid emitting that error, we pass an empty event handler to the
 * individual `Radio.Item` components in this example.
 */
const StatefulRadioTemplate: Story<RadioTemplateProps> = ({ name, onChange, ...rest }) => {
  const [value, setValue] = useState<string | undefined>(undefined);

  /** When the value of this radio button group changes, update this component's internal state. */
  const onChangeValue: RadioProps['onChange'] = e => {
    // `e.target` may not be defined, so we should check its value first
    if (e.target instanceof HTMLInputElement) {
      setValue(e.target.value);
      onChange?.(e);
    }
  };

  const onReset = () => {
    setValue(undefined);
  };

  return (
    <>
      <Radio
        m={1}
        label="Current Value:"
        secondaryLabel={value ?? '[None Chosen]'}
        onChange={onChangeValue}
        {...rest}
      >
        <Radio.Item
          name="controlled-example"
          label={defaultContent.apples[1]}
          secondaryLabel={defaultContent.apples[2]}
          value={defaultContent.apples[0]}
          checked={value === defaultContent.apples[0]}
        />
        <Radio.Item
          name="controlled-example"
          label={defaultContent.oranges[1]}
          secondaryLabel={defaultContent.oranges[2]}
          value={defaultContent.oranges[0]}
          checked={value === defaultContent.oranges[0]}
        />
        <Radio.Item
          name="controlled-example"
          label={defaultContent.bananas[1]}
          secondaryLabel={defaultContent.bananas[2]}
          value={defaultContent.bananas[0]}
          checked={value === defaultContent.bananas[0]}
        />
      </Radio>
      <Button variant="filled" disabled={!value} onClick={onReset}>
        Reset
      </Button>
    </>
  );
};

const StatefulRadioStory = StatefulRadioTemplate.bind({});

StatefulRadioStory.args = {
  ...radioSharedArgs,
};

StatefulRadioStory.argTypes = {
  ...RadioStory.argTypes,
  /**
   * We use the label and secondary label to show the current state in this story,
   * so disable the option to hide it.
   */
  showLabel: {
    control: false,
  },
};

export { RadioStory, RadioItemStory, TiledItemStory, StatefulRadioStory };
