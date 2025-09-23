import { color } from '../tokens';

type PressableVariant = 'filled' | 'filledDark' | 'outline' | 'outlineDark';

/**
 * attach a solid background overlay
 */
const bgOverlay = (clr: string): string => `background-image: linear-gradient(${clr}, ${clr});`;

/**
 * create a hover or active state background style
 */
const state = (action: 'active' | 'hover') => {
  return (variant: PressableVariant): string =>
    `&:${action}&:not(:disabled):not([aria-disabled="true"]) {${bgOverlay(
      color[action]?.[variant]
    )}}`;
};

/**
 * active style
 */
const active = state('active');

/**
 * hover style
 */
const hover = state('hover');

/**
 * hover and active state
 */
const allStates = (variant: PressableVariant) => `${hover(variant)};
${active(variant)};`;

const disabled = `
  &:disabled {
    opacity: 40%;
  }
`;

export { disabled, active, allStates, hover, PressableVariant };
