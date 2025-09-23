import { IconDiskMetadataTuple } from './getIconsOnDisk.js';
import { IconMetadata } from './iconMetadata.js';

export type IconGroupTuple = [name: string, files: IconMetadata[]];

export const createIconGroupEntries = (icons: IconDiskMetadataTuple[]): IconGroupTuple[] =>
  Object.entries(
    icons.reduce(
      (groups, [, metadata]) => {
        groups[metadata.name] ??= [];
        groups[metadata.name]!.push(metadata);
        return groups;
      },
      {} as { [P: string]: IconMetadata[] }
    )
  );
