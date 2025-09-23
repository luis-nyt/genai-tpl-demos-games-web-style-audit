import type { ComponentMetadata } from 'figma-api/lib/api-types.js';

export interface IconMetadata {
  name: string;
  size: number;
  theme?: IconTheme;
  deprecated?: boolean;
  path: string;
}

export type IconTheme = 'light' | 'dark';

export const isIconTheme = (v: unknown): v is IconTheme => v === 'light' || v === 'dark';

export const getIconMetadataFromComponent = (
  name: string,
  component: ComponentMetadata
): Pick<IconMetadata, 'name' | 'size' | 'theme'> => {
  /** TODO: Read icon size from somewhere other than the component name? */
  const size = parseInt(component.name.match(/Size=(\d+)/)?.[1] ?? 'NaN', 10);
  if (Number.isNaN(size)) {
    throw new Error(`Could not determine size of component '${component.name}' (set: '${name}')`);
  }

  /** Some icons have light and dark specific artwork */
  const theme = component.name.match(/Theme=(\w+)/i)?.[1]?.toLowerCase();

  const metadata: Pick<IconMetadata, 'name' | 'size' | 'theme'> = { name, size };
  if (isIconTheme(theme)) metadata.theme = theme;
  else if (theme) {
    throw new Error(
      `Encountered invalid theme '${theme}' for component '${component.name}' (set: '${name}')`
    );
  }

  return metadata;
};
/** Create a filename for an icon's SVG image based on its metadata */
export const getIconFilename = ({
  name,
  size,
  theme,
}: Pick<IconMetadata, 'name' | 'size' | 'theme'>): string =>
  `${name}-${size}${theme ? `-${theme}` : ''}.svg`;

export const iconMetadataRegex = /(\w+)-(\d+)(?:-(light|dark))?\.svg/;

/** Extract icon metadata from a given SVG filename */
export const getIconMetadataFromFilename = (
  filename: string
): Pick<IconMetadata, 'name' | 'size' | 'theme'> => {
  const match = filename.match(iconMetadataRegex);
  if (!match) throw new Error(`Could not get icon metadata from filename '${filename}'`);

  const [, name, sizeStr, theme] = match;
  const size = sizeStr ? parseInt(sizeStr, 10) : undefined;

  if (!name) throw new Error(`Could not get icon name from filename '${filename}'`);
  if (!size) throw new Error(`Could not get icon size from filename '${filename}'`);

  if (isIconTheme(theme)) return { name, size, theme };
  if (theme) throw new Error(`Got invalid theme '${theme}' from filename '${filename}'`);
  return { name, size };
};
