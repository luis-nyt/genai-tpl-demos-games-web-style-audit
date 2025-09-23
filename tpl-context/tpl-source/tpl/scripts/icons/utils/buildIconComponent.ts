import { readFile } from 'fs/promises';
import { extractIconReactElements } from './extractIconReactElements.js';
import { IconMetadata } from './iconMetadata.js';

export const buildIconComponent = async (name: string, files: IconMetadata[]): Promise<string> => {
  /**
   * Mark the React component as deprecated if all its associated SVGs are marked as deprecated.
   * This is a little weird, but, we check for name conflicts between deprecated and non-deprecated
   * icon SVGs in the download script. Thus, in practice, we'll avoid having a mix of deprecated
   * and non-deprecated SVGs for a single icon component.
   */
  const deprecated = files.every(file => file.deprecated);
  /** Some icons have theme-specific artwork */
  const hasThemedArt = files.every(file => file.theme);

  // Read each file into memory first
  const artworkBySize: { [P: string]: string } = {};
  for (const { path, size, theme } of files) {
    let contents = extractIconReactElements((await readFile(path)).toString());
    if (theme)
      contents = `<g className={${
        theme === 'dark' ? 'darkIconArtworkClass' : 'lightIconArtworkClass'
      }}>${contents}</g>`;

    artworkBySize[size] ??= '';
    artworkBySize[size] += contents;
  }

  return `import React, { forwardRef } from 'react';
import { Icon, IconComponentProps${
    hasThemedArt ? ', lightIconArtworkClass, darkIconArtworkClass' : ''
  } } from '../../Icon/index.js';

const artworkBySize = {
  ${Object.entries(artworkBySize)
    .map(([key, value]) => `${key}: () => <>${value}</>`)
    .join(',\n  ')}
};

${
  deprecated
    ? '/** @deprecated This icon will be removed from a future release of `@nyt/tpl`. */'
    : ''
}
const ${name}Icon = forwardRef<SVGSVGElement, IconComponentProps>(({ size = 24, ...rest }, ref) => {
  const Artwork = artworkBySize[size];
  return (
    <Icon ref={ref} size={size} {...rest}>
      <Artwork />
    </Icon>
  );
});

export { ${name}Icon };
`;
};
