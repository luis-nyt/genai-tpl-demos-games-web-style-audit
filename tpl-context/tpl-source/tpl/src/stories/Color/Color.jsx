import React, { Fragment } from 'react';
import { styled, css } from 'pretty-lights';
import colorContrast from 'color-contrast';
import { Box, Flex } from '../../index.js';

const containerClass = css`
  font-family: sans-serif;
  font-size: 0.875rem;
  flex: 1 0 150px;
`;

/** @typedef {(color: import('@nyt/foundation').Color) => boolean} ColorDeprecationChecker */

/**
 * Has this color been deprecated?
 * @param {{ [P: string]: { deprecated?: boolean; deprecatedMessage?: string; renamed?: string; supportsVariants?: boolean; }}} colorMetadata
 * @returns {ColorDeprecationChecker}
 */
const createIsDeprecated = colorMetadata => color => colorMetadata[color.name]?.deprecated === true;

/**
 * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 * Returns the color contrast ratio between background and foreground content,
 * usually text
 *
 * https://stackoverflow.com/questions/19390644/round-number-to-nearest-5-decimal
 * @param {string} color String hex value of the foreground
 * @param {string} backgroundColor String hex value of the background
 */
const getColorContrast = (color, backgroundColor) =>
  Math.round(colorContrast(backgroundColor, color) * 2) / 2;

const formatName = name =>
  name
    .split('-')
    .join(' ')
    .replace(/(?!^)([A-Z])/g, ' $1');

const StyledColorContent = styled.div`
  height: 100%;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  color: ${props => props.color};
`;

const StyledColor = styled(Flex)`
  border-radius: 4px;
  margin-bottom: 0.75rem !important;
  height: 40px;
  text-align: left;
  padding: 0.8rem;
  background: ${props => props.bg};
`;

const iconContainerClass = css`
  display: flex;
  align-items: center;
`;

/**
 * Color Item component shows displays a color in a configurable way
 * @param {Object} props
 * @param {string} [props.bg]
 * @param {string} [props.className]
 * @param {string} [props.color]
 * @param  {JSX.Element} props.icon
 * @param {JSX.Element} props.children
 * @returns {JSX.Element}
 */
// eslint-disable-next-line react/prop-types
const ColorItem = ({ bg, className, color, icon, children }) => (
  <StyledColor bg={bg} gap={2} className={className}>
    {icon && <div className={iconContainerClass}>{icon}</div>}
    <StyledColorContent color={color}>{children}</StyledColorContent>
  </StyledColor>
);

const Title = styled.h4`
  text-transform: capitalize;
  color: ${props => props.color};
`;

const orderedKeyNames = [
  'primary',
  'secondary',
  'tertiary',
  'quaternary',
  'quintary',
  'accent',
  'positive',
  'negative',
];

const sortKeys = orderedList => {
  return (a, b) => {
    if (orderedList.indexOf(a) === -1) {
      return 1;
    }
    return orderedList.indexOf(a) > orderedList.indexOf(b) ? 1 : -1;
  };
};

const StyledContentIcon = styled.div`
  color: ${props => props.color};
  min-height: 25px;
  max-height: 25px;
  width: 100%;
  font-size: 1.4em;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
`;

const ContentIcon = ({ color }) => <StyledContentIcon color={color}>Aa</StyledContentIcon>;

/**
 * Show a column of colors in a single color category (i.e. must be a flat object of colors)
 * @param {Object} props
 * @param {string} props.title
 * @param {{[key: string]: Color}} props.colorSet
 * @param {(children: string, color: Color, colorSet: {[key: string]: Color}) => JSX.Element} props.onColor
 * @param {ColorDeprecationChecker} [props.isDeprecated]
 * @param {string[]} [props.exclude] color names to exclude
 * @returns {JSX.Element}
 */
const ColorColumn = ({
  title,
  colorSet = {},
  onColor = (children, color) => <ColorItem bg={color.hsla}>{children}</ColorItem>,
  isDeprecated,
  exclude,
}) => (
  <div className={containerClass}>
    {title && <Title>{title}</Title>}
    {Object.keys(colorSet)
      .filter(key => (exclude ? !exclude.includes(`${title}.${key}`) : true))
      .sort(sortKeys(orderedKeyNames))
      .map(key => {
        const color = colorSet[key];
        let formattedName = <b>{formatName(color.name)}</b>;
        formattedName = isDeprecated?.(color) ? (
          <span>
            <strike>{formattedName}</strike> *
          </span>
        ) : (
          formattedName
        );
        return <Fragment key={color.name}>{onColor(formattedName, color)}</Fragment>;
      })}
  </div>
);

const StrokeIcon = styled(Box)`
  border-left: 2px solid ${props => props.color};
`;

const isInverse = (color, type) => (color.lightness < 53 && color.alpha > 0.5) || type === 'signal';

export {
  ColorColumn,
  ColorItem,
  ContentIcon,
  StrokeIcon,
  isInverse,
  createIsDeprecated,
  getColorContrast,
  formatName,
  sortKeys,
  containerClass,
};
