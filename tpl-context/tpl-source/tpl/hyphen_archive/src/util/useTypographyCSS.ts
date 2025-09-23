import { SystemProp } from '@nyt/foundation';
import { useResponsivePropToCSS } from '../../../src/util';

interface TypographyTokens {
  [Variant: string]: { [Size in number]: SystemProp };
}

/**
 * A utility function which returns an object of CSS-in-JS compatible CSS `font` properties and
 * values, potentially with nested media queries, which correspond to a given set of typography
 * tokens, a given variant, and a given font size.
 *
 * In particular, this function is designed to handle cases where `size` is a Facepaint-style array
 * of values **and** the underlying typography tokens are themselves an array of responsive values.
 *
 * This ensures that we can safely mix and match array-type `size` values with the underlying
 * responsive typography tokens. For example, we could combine Display 1, 2, and 3 with an array of
 * `size` values:
 *
 * @example
 * ```
 * import { typographyFlat, createTypographyCSS } from '@nyt/hyphen';
 *
 * const css = createTypographyCSS(typographyFlat, 'display', [1, 2, 3]);
 * ```
 *
 * The resulting styles will use Display 1's base `font` styles, Display 2's styles for Hyphen's
 * first media query, and Display 3's styles for Hyphen's second media query.
 */
const useTypographyCSS = <
  Typography extends TypographyTokens,
  Variant extends keyof Typography,
  Size extends keyof Typography[Variant],
  SizeProp extends SystemProp<Size>
>(
  typography: Typography,
  variant: Variant,
  size: SizeProp
) => {
  /** Collect the CSS `font` values we want to output */
  let fontValue: SystemProp<Typography[Variant][Size]> | null;

  /**
   * If `size` is a Facepaint-style array of values, a single value in that array could correspond
   * to a typography token that itself uses multiple styles across breakpoints (e.g. Display 1).
   *
   * To account for this, we map the `size` array to an array of `font` values by looking up the
   * corresponding typography token for the variant and single size.
   */
  if (Array.isArray(size)) {
    fontValue = size.map((responsiveSize, index) => {
      /** First, look up the type token for this variant and single, responsive `size` value. */
      const responsiveFontValue = responsiveSize ? typography[variant][responsiveSize] : null;
      /**
       * If the type token is an array (i.e. the underlying token itself specifies uses responsive
       * styles), only use the value that corresponds to the current index of the `size` array
       * value we are currently iterating on.
       */
      if (Array.isArray(responsiveFontValue)) return responsiveFontValue[index];

      // Otherwise, the type token is _not_ an array, and we can safely return its single value.
      return responsiveFontValue;
    });
  } else {
    /**
     * If `size` is NOT an array: Look up the corresponding type token and assign to `fontValue`.
     *
     * Note that the corresponding type token could still be an array (i.e. responsive).
     *
     * However, `responsivePropToCSS()` knows how to handle that, and `fontValue` is declared as a
     * `SystemProp | null` (either an array, a single value, or `null`). Thus, this assignment is
     * fine, and we're not forgetting to do anything!
     */
    fontValue = size ? typography[variant][size as Size] : null;
  }

  /**
   * Hand `fontValue` to `responsivePropToCSS()`, which returns an object of CSS property-value
   * pairs with nested media queries. This also handles single values, i.e. when both `size` and
   * `fontValue` are NOT arrays.
   */
  return useResponsivePropToCSS('font', fontValue);
};

export { useTypographyCSS };
