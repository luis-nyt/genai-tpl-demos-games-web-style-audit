import { Properties } from 'csstype';
import { BorderWidth, BorderRadius, borderWidth, borderRadius } from '../../../src/tokens';
import { color } from '../tokens';

/**
 * Define a solid stroke using box shadow
 */
const stroke = (
  borderColor: 'primary' | 'secondary',
  width: BorderWidth = 1,
  radius?: BorderRadius
): Pick<Properties, 'boxShadow' | 'borderRadius'> => {
  return {
    boxShadow: `inset 0 0 0 ${borderWidth.get(width)} ${color.stroke[borderColor]}`,
    borderRadius: radius ? borderRadius.get(radius) : undefined,
  };
};

export { stroke };
export { default as elevation } from './elevation';
export * from './state';
export * from './useTypographyCSS';
