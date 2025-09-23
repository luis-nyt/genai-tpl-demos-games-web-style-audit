import { IconGroupTuple } from './createIconGroupEntries.js';
import { IconTheme } from './iconMetadata.js';

export const verifyIconGroupEntries = (
  entries: IconGroupTuple[],
  expectedSizes: number[],
  severity: 'warn' | 'throw' = 'warn'
) => {
  // Throw an error if we're missing any expected sizes
  for (const [name, svgs] of entries) {
    const missingSizes = expectedSizes.filter(
      expectedSize => !svgs.find(svg => svg.size === expectedSize)
    );
    if (missingSizes.length > 0) {
      const message = `'${name}' icon is missing sizes: ${missingSizes}`;
      if (severity === 'throw') throw new Error(message);
      else console.warn(`  ${message}`);
    }

    const hasThemes = svgs.some(metadata => !!metadata.theme);

    if (hasThemes) {
      const missingThemeSizes = (['light', 'dark'] as IconTheme[])
        .flatMap(theme => expectedSizes.map(size => ({ size, theme })))
        .filter(({ size, theme }) => !svgs.find(svg => svg.theme === theme && svg.size === size));
      if (missingThemeSizes.length > 0) {
        const message = `'${name}' icon is missing themed artwork sizes: ${missingThemeSizes.map(
          ({ size, theme }) => `size: ${size}, theme: ${theme}`
        )}`;
        if (severity === 'throw') throw new Error(message);
        else console.warn(`  ${message}`);
      }
    }
  }
};
