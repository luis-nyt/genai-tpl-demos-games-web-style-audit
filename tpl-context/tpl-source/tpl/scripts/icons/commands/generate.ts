import { fileURLToPath } from 'url';
import { dirname, isAbsolute, join, relative } from 'path';
import { cpus } from 'os';
import { cwd } from 'process';
import { createRequire } from 'module';
import mkdirp from 'mkdirp';
import pAll from 'p-all';
import ProgressBar from 'progress';
import { ArgumentsCamelCase, CommandModule, InferredOptionTypes, Options } from 'yargs';
import { writeFile } from 'fs/promises';
import { oraPromise } from 'ora';
import { buildIconComponent } from '../utils/buildIconComponent.js';
import { createIconGroupEntries } from '../utils/createIconGroupEntries.js';
import { getIconsOnDisk } from '../utils/getIconsOnDisk.js';
import { verifyIconGroupEntries } from '../utils/verifyIconGroupEntries.js';

export const defaultExpectedSizes = [12, 16, 20, 24];

/** @see https://stackoverflow.com/a/50052194/1991086 */
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

/** Source icon assets from `@nyt/design-tokens` package */
const defaultSourceDir = join(dirname(require.resolve('@nyt/design-tokens')), '../assets/icons');
const defaultDeprecatedSourceDir = join(defaultSourceDir, '__deprecated__');
const defaultOutDir = join(__dirname, '../../../src/generated/Icons');

const builder = {
  expectedSizes: {
    type: 'array',
    default: defaultExpectedSizes,
    describe: 'The size, in pixels, expected for each icon',
    coerce: (values: unknown[]) => values.map(value => parseInt(String(value), 10)),
  },
  sourceDir: {
    type: 'string',
    default: relative(cwd(), defaultSourceDir),
    describe: 'The directory from which to read icon SVGs',
    coerce: (value: string) => (isAbsolute(value) ? value : join(cwd(), value)),
  },
  deprecatedSourceDir: {
    type: 'string',
    default: relative(cwd(), defaultDeprecatedSourceDir),
    describe: 'The directory from which to read **deprecated** icon SVGs',
    coerce: (value: string) => (isAbsolute(value) ? value : join(cwd(), value)),
  },
  outDir: {
    type: 'string',
    default: relative(cwd(), defaultOutDir),
    describe: 'The directory in which to write generated React components',
    coerce: (value: string) => (isAbsolute(value) ? value : join(cwd(), value)),
  },
} satisfies { [P: string]: Options };

type GenerateOptions = ArgumentsCamelCase<InferredOptionTypes<typeof builder>>;

const handler = async ({
  expectedSizes,
  sourceDir,
  deprecatedSourceDir,
  outDir,
}: GenerateOptions) => {
  const icons = await getIconsOnDisk(sourceDir, deprecatedSourceDir);
  const iconGroupEntries = createIconGroupEntries(icons);

  // Make sure each icon group has all the expected sizes
  // (i.e. try to fail early, before we try to generate React components)
  console.log('Verifying current icons on disk');
  verifyIconGroupEntries(iconGroupEntries, expectedSizes, 'throw');

  // Before generating icon components, make sure the output directory exists
  await mkdirp(outDir);

  const generateComponentsBar = new ProgressBar('Generating React components :bar', {
    total: iconGroupEntries.length,
    width: 20,
  });
  const componentsOnDisk = await pAll(
    iconGroupEntries.map(([name, files]) => async () => {
      const outPath = join(outDir, `${name}Icon.tsx`);
      await writeFile(outPath, await buildIconComponent(name, files));
      generateComponentsBar.tick();
      return outPath;
    }),
    { concurrency: cpus().length }
  );

  const indexFilePath = join(outDir, 'index.ts');
  await oraPromise(
    writeFile(
      indexFilePath,
      iconGroupEntries.map(([name]) => `export * from './${name}Icon.js';`).join('\n')
    ),
    { text: 'Writing index file' }
  );

  console.log(`Wrote ${componentsOnDisk.length} generated React components to ${outDir}`);
  console.log(`Wrote index file to ${indexFilePath}`);
};

// `export default` and `satisfies` make this Yargs command module type-safe
// @see https://github.com/yargs/yargs/blob/v17.7.2/docs/advanced.md#providing-a-command-module
export default {
  command: 'generate',
  describe: 'Generates React components from previously downloaded icon SVGs',
  builder,
  handler,
} as CommandModule<any, GenerateOptions>;
