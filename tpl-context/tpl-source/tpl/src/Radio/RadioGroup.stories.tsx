import React, { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { spaceScale } from '@nyt/foundation';

import { Radio, RadioGroup, RadioGroupProps, RadioProps } from './index.js';
import { Button } from '../Button/index.js';
import { colorBehaviorArgType } from '../stories/argTypes.js';
import { Box } from '../Box/index.js';

interface RadioGroupStoryProps extends Omit<RadioGroupProps, 'children'> {
  children: RadioProps[];
}

const meta = {
  title: 'Radio/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    children: [
      {
        label: 'Radio option A',
        value: '1',
      },
      {
        label: 'Radio option B',
        value: '2',
      },
      {
        label: 'Radio option C',
        value: '3',
      },
    ],
  },
  argTypes: {
    ...colorBehaviorArgType,
    label: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'text' },
    },
    gap: {
      control: { type: 'select' },
      options: [0, ...spaceScale.keys()],
    },
    onChange: {
      action: 'changed',
    },
  },
  parameters: {
    controls: {
      include: ['children', 'colorBehavior', 'description', 'gap', 'label', 'name', 'onChange'],
    },
  },
  render: ({ colorBehavior, children, ...rest }) => (
    <Box bg="primary" colorBehavior={colorBehavior} p={1}>
      <RadioGroup colorBehavior={colorBehavior} {...rest}>
        {children.map(radioProps => (
          <Radio key={`radio_${radioProps.value}`} {...radioProps} />
        ))}
      </RadioGroup>
    </Box>
  ),
} satisfies Meta<RadioGroupStoryProps>;
export default meta;

type Story = StoryObj<RadioGroupStoryProps>;

/**
 * You can add a label for the group using `RadioGroup`'s `label` prop.
 * You can also use the `description` property to show more clarifying text.
 */
export const WithGroupLabelAndDescription: Story = {
  args: {
    label: 'Group label',
    description: 'Group description',
    name: 'story1',
  },
};

export const WithGroupLabel: Story = {
  args: {
    label: 'Group label',
    name: 'story2',
  },
};

/**
 * The optional `label` and `description` props let you describe the group of options.
 * Setting `showLabel` to `false` renders these as visually hidden in the DOM, but
 * accessible to screen readers.
 */
export const WithHiddenGroupLabelAndDescription: Story = {
  args: {
    label: 'Hidden group label',
    description: 'Hidden group description',
    name: 'story7',
    showLabel: false,
  },
};

export const Default: Story = { args: { name: 'story3' } };

export const WithDisabledRadios: Story = {
  args: {
    name: 'story4',
    children: [
      {
        label: 'Radio option A',
        value: '1',
      },
      {
        label: 'Radio option B',
        value: '2',
        disabled: true,
      },
      {
        label: 'Radio option C',
        value: '3',
        disabled: true,
      },
    ],
  },
};

export const WithRadioDescriptions: Story = {
  args: {
    name: 'story5',
    children: [
      {
        label: 'Radio option A',
        description: 'Radio description',
        value: '1',
      },
      {
        label: 'Radio option B',
        description: 'Radio description',
        value: '2',
      },
      {
        label: 'Radio option C',
        description: 'Radio description',
        value: '3',
      },
    ],
  },
};

/**
 * `RadioGroup`'s `gap` prop lets you customize the space between `Radio` elements.
 * Set `gap={0}` to go gapless.
 */
export const WithZeroGap: Story = {
  args: {
    name: 'story6',
    gap: 0,
  },
};

const statefulRecipeContent = {
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

/**
 * On a [controlled](https://reactjs.org/docs/forms.html#controlled-components) form, use `RadioGroup`'s `onChange` prop to handle changes to the individual `Radio` components within:
 *
 * ```jsx
 * const Form = () => {
 *   const [value, setValue] = useState();
 *
 *   const onChange = event => {
 *     if (event.target instanceof HTMLInputElement) {
 *       // event.target.value will give you access to the value that has changed
 *     }
 *   };
 *
 *   return (
 *     <form>
 *       <RadioGroup name="example" onChange={onChange}>
 *         <Radio label="one" value={1} checked={value === 1} />
 *         <Radio label="two" value={2} checked={value === 2} />
 *         <Radio label="three" value={3} checked={value === 3} />
 *       </RadioGroup>
 *     </form>
 *   );
 * };
 * ```
 *
 * Below is an interactive demo, based on the concepts shown above.
 *
 * Note: React 16 in development mode logs an error when setting `checked` but not either
 * `onChange` or `readOnly`. This suggests that its heuristic for detecting controlled `<input>`
 * elements does not account for the possibility of using a single `onChange` event on a parent
 * `<fieldset>` element.
 */
export const StatefulRecipe: StoryFn<RadioGroupProps> = ({
  colorBehavior,
  name,
  onChange,
  ...rest
}) => {
  const [value, setValue] = useState<string | undefined>(undefined);

  /** When the value of this radio button group changes, update this component's internal state. */
  const onChangeValue: RadioGroupProps['onChange'] = e => {
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
    <Box bg="primary" colorBehavior={colorBehavior} p={1}>
      <RadioGroup
        mb={1.5}
        label="Current Value:"
        description={value ?? '[None Chosen]'}
        colorBehavior={colorBehavior}
        name="controlled-example"
        onChange={onChangeValue}
        {...rest}
      >
        <Radio
          label={statefulRecipeContent.apples[1]}
          description={statefulRecipeContent.apples[2]}
          value={statefulRecipeContent.apples[0]}
          checked={value === statefulRecipeContent.apples[0]}
        />
        <Radio
          label={statefulRecipeContent.oranges[1]}
          description={statefulRecipeContent.oranges[2]}
          value={statefulRecipeContent.oranges[0]}
          checked={value === statefulRecipeContent.oranges[0]}
        />
        <Radio
          label={statefulRecipeContent.bananas[1]}
          description={statefulRecipeContent.bananas[2]}
          value={statefulRecipeContent.bananas[0]}
          checked={value === statefulRecipeContent.bananas[0]}
        />
      </RadioGroup>
      <Button disabled={!value} onClick={onReset}>
        Reset
      </Button>
    </Box>
  );
};
