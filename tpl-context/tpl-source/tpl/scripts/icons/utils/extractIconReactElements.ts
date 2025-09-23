export const extractIconReactElements = (fileContents: string): string =>
  fileContents
    // replace all kebab-case attributes with camelCase
    .replace(/-([a-z])/g, g => g[1]!.toUpperCase())
    // remove the outer svg tag <svg> and </svg>
    /** @see https://regexr.com/75tiq */
    .replace(/<svg[^>]*>([\s\S]*)<\/svg>/m, '$1')
    .trim();
