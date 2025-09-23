// @ts-check
import { fileURLToPath } from 'url';
import fs from 'fs';
import { dirname, join } from 'path';
import mkdirp from 'mkdirp';

/** @see https://stackoverflow.com/a/50052194/1991086 */
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

const srcDir = join(__dirname, '../src/');
const svgDir = `${srcDir}/Icons/svgs`;
/** @type {{ [P: string]: { [Size in 'sm' | 'md' | 'lg']?: string } } }} */
const iconData = {};
let indexString = '';

/**
 *
 * @param {string} sm
 * @param {string} md
 * @param {string} lg
 * @param {string} componentName
 * @returns {string}
 */
function builtComponent(sm, md, lg, componentName) {
  return `import React, { JSX } from 'react';
import { Icon, IconProps } from '../../Icons/Icon';

const svgData = {
  sm: (
    <>${sm}</>
  ),
  md: (
    <>${md}</>
  ),
  lg: (
    <>${lg}</>
  )
};

const ${componentName}Icon = ({ size = 'lg', ...rest }: IconProps): React.JSX.Element => {
  const iconData = svgData[size];

  return (
    <Icon size={size} {...rest}>
      {iconData}
    </Icon>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { ${componentName}Icon };
`;
}

// loop through all the files in the svgs directory and store in an object
fs.readdirSync(svgDir).forEach(file => {
  const fileContents = fs
    // get the file contents
    .readFileSync(`${svgDir}/${file}`, 'utf8')
    // replace all kebab-case attributes with camelCase
    .replace(/-([a-z])/g, g => g[1].toUpperCase())
    // remove the outer svg tag <svg> and </svg>
    /** @see https://regexr.com/75tiq */
    .replace(/<svg[^>]*>([\s\S]*)<\/svg>/m, '$1')
    .trim();

  if (!fileContents)
    throw new Error(`${svgDir}/${file}: could not get contents of <svg> element within the file`);

  // separate the file name from the extension
  const fileName = file.split('.')[0];
  // get the icon name and size from the file name
  const [iconName, iconSize] = fileName.split('-');

  // if the icon name doesn't exist in the object, create it
  if (!iconData[iconName]) {
    iconData[iconName] = {};
  }

  // store icons in an object based on the file name while stripping out the svg tags
  iconData[iconName][iconSize] = fileContents;
});

// loop through the object and create the components and index file
mkdirp.sync(`${srcDir}/generated/Icons`);
Object.keys(iconData).forEach(icon => {
  const { sm, md, lg } = iconData[icon];
  if (!sm || !md || !lg) {
    throw new Error(
      `'${icon}' icon is missing artwork for these sizes: ${['sm', 'md', 'lg'].filter(
        size => !iconData[icon][size]
      )}`
    );
  }
  const component = builtComponent(sm, md, lg, icon);
  fs.writeFileSync(`${srcDir}/generated/Icons/${icon}Icon.tsx`, component);

  // create the index file string
  indexString += `export * from './${icon}Icon';\n`;
});

// create the index file
fs.writeFileSync(`${srcDir}/generated/Icons/index.ts`, indexString);
