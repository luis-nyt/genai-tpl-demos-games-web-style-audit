import type { Format, FormatFnArguments, TransformedToken } from 'style-dictionary/types';
import { stringifyJson } from '../util.js';
import { getDeprecationMessage } from './utils/deprecationUtils.js';

interface SimpleMapFormatOptions extends FormatFnArguments {
  keyFormatter?: (token: TransformedToken) => string | number | undefined;
  exportName: string;
  typeName: string;
}

/**
 * Create an export a simple Map of values along with its type definition all keys
 */
const simpleMapFormat = {
  name: 'javascript/simpleMap',
  format: ({ dictionary, options: { keyFormatter, exportName, typeName } }) => {
    if (!exportName || !typeName) {
      throw new Error(`${simpleMapFormat.name} requires an exportName and typeName option`);
    }
    const entries: [any, any][] = [];
    const allowed: any[] = [];
    dictionary.allTokens.forEach(token => {
      const key = keyFormatter ? keyFormatter(token) : token.name;
      entries.push([key, token.$value]);
      allowed.push(key);
    });

    const deprecatedExportName = getDeprecationMessage(exportName);
    const deprecatedTypeName = getDeprecationMessage(typeName);

    return `${deprecatedExportName}export const ${exportName} = new Map(${stringifyJson(entries)});\n
${deprecatedTypeName}export type ${typeName} = ${allowed.join(' | ')};\n`;
  },
} satisfies Format;

export { SimpleMapFormatOptions, simpleMapFormat };
