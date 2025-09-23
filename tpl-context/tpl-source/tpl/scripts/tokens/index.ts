import StyleDictionary from 'style-dictionary';
import { transforms } from 'style-dictionary/enums';
import { tokens as source } from '@nyt/design-tokens';
import { colorInputFormat } from './formats/colorFormat.js';
import { typographyFormat } from './formats/typographyFormat.js';
import { ruleFormat } from './formats/ruleFormat.js';
import { simpleMapFormat, SimpleMapFormatOptions } from './formats/simpleMapFormat.js';
import { fontWeightTransform } from './transforms/fontWeightTransform.js';
import { fontFamilyTransform } from './transforms/fontFamilyTransform.js';
import { typographyTransform } from './transforms/typographyTransform.js';
import { percentToRatioTransform } from './transforms/percentToRatioTransform.js';
import { colorToCSSReferenceTransform } from './transforms/colorToCSSReferenceTransform.js';
import { cssVarFormat } from './formats/cssVarFormat.js';

const buildPath = 'src/generated/';

const sizeNameToDecimal: SimpleMapFormatOptions['keyFormatter'] = token =>
  typeof token.attributes?.['item'] === 'string'
    ? Number(token.attributes?.['item']?.split('_').join('.').split('_').join('.'))
    : undefined;

StyleDictionary.registerTransform(fontWeightTransform);
StyleDictionary.registerTransform(fontFamilyTransform);
StyleDictionary.registerTransform(typographyTransform);
StyleDictionary.registerTransform(percentToRatioTransform);
StyleDictionary.registerTransform(colorToCSSReferenceTransform);
StyleDictionary.registerFormat(simpleMapFormat);
StyleDictionary.registerFormat(colorInputFormat);
StyleDictionary.registerFormat(typographyFormat);
StyleDictionary.registerFormat(cssVarFormat);
StyleDictionary.registerFormat(ruleFormat);

const StyleDictionaryWeb = new StyleDictionary({
  source,
  platforms: {
    web: {
      buildPath,
      transforms: [
        transforms.attributeCti,
        transforms.nameConstant,
        colorToCSSReferenceTransform.name,
        percentToRatioTransform.name,
        fontWeightTransform.name,
        fontFamilyTransform.name,
        typographyTransform.name,
      ],
      files: [
        {
          destination: 'cssVar.ts',
          format: cssVarFormat.name,
          filter: {
            attributes: {
              category: 'fontFamily',
            },
          },
        },
        {
          destination: 'borderWidth.ts',
          format: simpleMapFormat.name,
          options:
            /** @satisfies {import('./formats/simpleMapFormat.js').SimpleMapFormatOptions} */ {
              keyFormatter: sizeNameToDecimal,
              exportName: 'borderWidth',
              typeName: 'BorderWidth',
            },
          filter: { attributes: { category: 'size', type: 'border' } },
        },
        {
          destination: 'spacing.ts',
          format: simpleMapFormat.name,
          options:
            /** @satisfies {import('./formats/simpleMapFormat.js').SimpleMapFormatOptions} */ {
              keyFormatter: sizeNameToDecimal,
              exportName: 'spaceScale',
              typeName: 'SpaceType',
            },
          filter: { attributes: { category: 'size', type: 'spacing' } },
        },
        {
          destination: 'color.ts',
          format: colorInputFormat.name,
          filter: {
            attributes: {
              category: 'color',
            },
          },
        },
        {
          destination: 'rule.ts',
          format: ruleFormat.name,
          filter: {
            attributes: {
              category: 'rule',
            },
          },
        },
        {
          destination: 'typography.ts',
          format: typographyFormat.name,
          filter: token => {
            const { name, attributes: { category, type } = {} } = token;
            if (typeof category !== 'string' || typeof type !== 'string') {
              throw new Error(
                `${name} is missing one or more required attributes of "category" and "type".
        Ensure you are running the built-in "attributeCti" transform first. Token:\n${JSON.stringify(token, null, 2)}`
              );
            }

            return (
              ['fontWeight', 'typography'].includes(category) ||
              (category === 'size' && type === 'font')
            );
          },
        },
      ],
    },
  },
});

StyleDictionaryWeb.buildAllPlatforms();
