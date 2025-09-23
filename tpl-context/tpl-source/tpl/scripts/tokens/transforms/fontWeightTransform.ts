import { Transform } from 'style-dictionary/types';

const fontWeightTransform = {
  name: 'typography/fontWeight',
  type: 'value',
  filter: ({ attributes: { category = '' } = {} }) => category === 'fontWeight',
  transform: ({ normalizedValue }) => {
    return normalizedValue;
  },
} satisfies Transform;

export { fontWeightTransform };
