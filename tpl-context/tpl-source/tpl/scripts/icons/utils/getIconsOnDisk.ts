import { basename, join } from 'path';
import { existsSync } from 'fs';
import { readdir } from 'fs/promises';
import { getIconMetadataFromFilename, IconMetadata } from './iconMetadata.js';

export type IconDiskMetadataTuple = [filename: string, metadata: IconMetadata];
export const getIconsOnDisk = async (
  sourceDir: string,
  deprecatedSourceDir: string
): Promise<IconDiskMetadataTuple[]> => {
  const dirs = [sourceDir, deprecatedSourceDir].filter(existsSync);
  const icons = new Map<string, IconMetadata>();

  // Read both the `sourceDir` folder and the `sourceDir/deprecated` subfolder
  for (const dir of dirs) {
    for (const dirent of await readdir(dir, { withFileTypes: true })) {
      // Try extracting icon metadata from this filename
      let metadata: IconMetadata | undefined;
      try {
        metadata = { path: join(dir, dirent.name), ...getIconMetadataFromFilename(dirent.name) };
      } catch (e) {
        // Whatever it is, we can't get icon metadata from it --- just skip it
      }
      if (!metadata) continue;

      if (dir === deprecatedSourceDir) metadata.deprecated = true;

      if (!dirent.isFile()) throw new Error(`${dirent.name} is not a file`);

      const filename = basename(metadata.path);

      if (icons.has(filename)) {
        throw new Error(
          `Found conflicting icon SVGs for ${metadata.name} icon:\n  - ${
            icons.get(filename)!.path
          }\n  - ${metadata.path}`
        );
      }

      icons.set(filename, metadata);
    }
  }

  return [...icons.entries()];
};
