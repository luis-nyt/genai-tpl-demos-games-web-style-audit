/**
 * @see https://github.com/emotion-js/emotion/blob/314a5fb/packages/jest/types/index.d.ts#L35-L45
 */
declare module 'pretty-lights/jest' {
  interface StyleRuleOptions {
    target?: string | RegExp;
    media?: string;
  }

  // Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
  // TypeScript Version: 2.9

  /// <reference types="jest" />

  type SnapshotSerializerPlugin = Extract<jest.SnapshotSerializerPlugin, { serialize: any }>;

  export interface StyleRuleOptions {
    target?: string | RegExp;
    media?: string;
  }

  export interface EmotionMatchers extends jest.ExpectExtendMap {
    toHaveStyleRule(
      received: any,
      property: string,
      value: any,
      options?: StyleRuleOptions
    ): { message(): string; pass: boolean };
  }
  export const matchers: EmotionMatchers;

  export interface CreateSerializerOptions {
    classNameReplacer?: (className: string, index: number) => string;
    DOMElements?: boolean;
    includeStyles?: boolean;
  }
  export function createSerializer(options?: CreateSerializerOptions): SnapshotSerializerPlugin;

  global {
    namespace jest {
      interface Matchers<R> {
        toHaveStyleRule(property: string, value: any, options?: StyleRuleOptions): R;
      }
    }
  }
}
