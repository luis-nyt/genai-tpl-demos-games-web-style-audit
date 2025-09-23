// @ts-check
import { css, styled } from 'pretty-lights';
import { spaceScale } from '@nyt/foundation';
import { allStates, disabled } from '../util';
import { color, light, dark, invertHyphenColors } from '../tokens';

const filled = `
  ${invertHyphenColors(
    inverted => `
    background: ${inverted.background.primary.hsla};
    color: ${inverted.content.primary.hsla};
  `
  )}
  border: none;
  ${allStates('filled')};
`;

const textShared = `
  background: transparent;
  border: none;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

const text = `
  color: ${color.content.primary};
  ${textShared};
`;

const textDark = `
  ${textShared};
  color: ${dark.colors.content.primary.hsla};
`;

const filledDark = `
  background: ${light.colors.background.primary.hsla};
  color: ${light.colors.content.primary.hsla};
  border: none;
  ${allStates('filledDark')};
`;

const outlineBase = `
  box-sizing: border-box;
  background: transparent;
`;

const outline = `
  ${outlineBase}
  color: ${color.content.primary};
  border: 1px solid ${color.stroke.primary};
  ${allStates('outline')};
`;

const outlineDark = `
  ${outlineBase}
  color: ${dark.colors.content.primary.hsla};
  border: 1px solid ${dark.colors.stroke.primary.hsla};
  ${allStates('outlineDark')};
`;

const standard = `
  height: 2.75rem;
  padding: 0 1rem;
`;

const compact = `
  height: 2.25rem;
  padding: 0 0.75rem;
`;

/*
 * Use this to hide the button text when `processing` is true.
 * Doing this maintains the button width between processing and non-processing
 * states. Remember to set the aria-label to reflect the state of the button
 * when the button text is hidden,
 * e.g., ariaLabel="Processing your registration"
 */
const hiddenClass = css`
  visibility: hidden;
`;

const StyledButton = styled.button`
  min-width: fit-content;
  cursor: pointer;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border-radius: 3px;
  gap: ${spaceScale.get(1)};
  white-space: nowrap;
  font-family: nyt-franklin, helvetica, arial, sans-serif;
  font-size: 1rem;
  line-height: 1.3em;
  font-weight: 600;
  ${({ heightVariant }) =>
    ({
      standard,
      compact,
    }[heightVariant])}

  ${({ variant }) =>
    ({
      filled,
      filledDark,
      outline,
      outlineDark,
      text,
      textDark,
    }[variant])}
  ${disabled}

  /* processing should be full opacity even though it's disabled */
  ${({ processing }) => processing && `&:disabled { opacity: unset }`};
`;

const StyledProcessingSpinner = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  /*
   * Use position absolute to position the spinner icon over the hidden button text.
   * See 'hiddenClass' definition for hidden button text rationale.
  */
  ${({ buttonDisplay }) => (buttonDisplay === 'inline-flex' ? 'position: absolute;' : '')}
`;

export { StyledButton, StyledProcessingSpinner, hiddenClass };
