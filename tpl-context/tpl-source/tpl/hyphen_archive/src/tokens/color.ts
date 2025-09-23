import { ColorLike, createColorBehaviorStyles, invertColors, setAlpha } from '@nyt/foundation';
import { light as baseLight, dark as baseDark } from '../../../src/tokens';

type ObjectWithContentPrimaryColorLike = { content: { primary: ColorLike } };

const createSemitransparentBg = (alpha: number) => {
  return (clr: ObjectWithContentPrimaryColorLike, name: string) =>
    clr.content.primary.transform(setAlpha(alpha), name);
};

const hoverFilled = createSemitransparentBg(0.16);

const pressedFilled = createSemitransparentBg(0.2);

const hoverOutline = createSemitransparentBg(0.08);

const pressedOutline = createSemitransparentBg(0.12);

/**
 * Extend base colors with hover and outline variants
 */

const light = baseLight.extend.colors({
  hover: {
    filled: hoverFilled(baseDark.colors, 'hover-filled'),
    outline: hoverOutline(baseLight.colors, 'hover-outline'),
    filledDark: hoverFilled(baseLight.colors, 'hover-dark'),
    outlineDark: hoverOutline(baseDark.colors, 'hover-outline-dark'),
  },
  active: {
    filled: pressedFilled(baseDark.colors, 'active-filled'),
    outline: pressedOutline(baseLight.colors, 'active-outline'),
    filledDark: pressedFilled(baseLight.colors, 'active-dark'),
    outlineDark: pressedOutline(baseDark.colors, 'active-outline-dark'),
  },
});

const dark = baseDark.extend.colors({
  hover: {
    filled: hoverFilled(baseLight.colors, 'hover-filled'),
    outline: hoverOutline(baseDark.colors, 'hover-outline'),
  },
  active: {
    filled: pressedFilled(baseLight.colors, 'active-filled'),
    outline: pressedOutline(baseDark.colors, 'active-outline'),
  },
});

const color = light.toVar();

const invertHyphenColors = invertColors(light.colors, dark.colors);

const createHyphenColorBehaviorStyles = createColorBehaviorStyles(light.colors, dark.colors);

export { color, light, dark, invertHyphenColors, createHyphenColorBehaviorStyles };
