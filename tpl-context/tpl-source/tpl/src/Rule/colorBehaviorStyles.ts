import { ColorBehavior, HorizontalRuleVariant, VerticalRuleVariant } from '@nyt/foundation';
import { createTplColorBehaviorStyles } from '../tokens/index.js';

// TODO: See if we can codegen this with Style Dictionary
export const createHRuleColorBehaviorStyles = (
  colorBehavior: ColorBehavior
): Record<HorizontalRuleVariant, string> => ({
  primary: createTplColorBehaviorStyles(
    light => `border-top: 0.125rem solid ${light.stroke.primary.hex};`
  )[colorBehavior],
  secondary: createTplColorBehaviorStyles(
    light => `border-top: 0.0625rem solid ${light.stroke.primary.hex};`
  )[colorBehavior],
  tertiary: createTplColorBehaviorStyles(
    light => `border-top: 0.0625rem solid ${light.stroke.tertiary.hex};`
  )[colorBehavior],
});

// TODO: See if we can codegen this with Style Dictionary
export const createVRuleColorBehaviorStyles = (
  colorBehavior: ColorBehavior
): Record<VerticalRuleVariant, string> => ({
  primary: createTplColorBehaviorStyles(
    light => `border-right: 0.0625rem solid ${light.stroke.primary.hex};`
  )[colorBehavior],
  secondary: createTplColorBehaviorStyles(
    light => `border-right: 0.0625rem solid ${light.stroke.tertiary.hex};`
  )[colorBehavior],
});
