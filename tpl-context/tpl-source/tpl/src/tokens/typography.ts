import { fontWeight, fontSize, typography } from '../generated/typography.js';

interface TypeStyle {
  font: string;
  letterSpacing?: `${number}em`;
  textTransform?: 'uppercase';
}

type TypographyKey = keyof typeof typography;

type VariantHelper<Name extends string> =
  Extract<TypographyKey, `${Name}/${string}`> extends `${Name}/${infer U}` ? U : never;

type TypographyPrefix = TypographyKey extends `${infer U}/${string}` ? U : never;

type TypographyVariant<T extends TypographyPrefix> =
  VariantHelper<T> extends infer U
    ? /** @see https://stackoverflow.com/a/69090186 */
      U extends `${infer Digit extends number}`
      ? Digit
      : U
    : never;

export { fontSize, fontWeight, typography };
export type { TypographyPrefix, TypographyVariant, TypeStyle, TypographyKey };
