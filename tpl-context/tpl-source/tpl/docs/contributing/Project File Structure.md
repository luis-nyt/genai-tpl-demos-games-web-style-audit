# Project File Structure
## Design tokens from [`nytimes/design-tokens`](https://github.com/nytimes/design-tokens)
The [`nytimes/design-tokens`](https://github.com/nytimes/design-tokens) repository and `@nyt/design-tokens` npm package contain TPL's platform-independent design tokens in JSON format. We use these in `@nyt/tpl` to generate TypeScript code, via [Style Dictionary](https://styledictionary.com) and other custom scripts.

The separate repo lets us develop design token changes *without* immediately having to reflect those changes across the entire `nytimes/news` repository.

> [!TIP] 
> Whenever making design tokens changes, consider whether it's appropriate to make cross-platform changes in [`nytimes/design-tokens`](https://github.com/nytimes/design-tokens) as well!

## Package Exports
TPL Web has a single [￼`exports`￼](https://nodejs.org/api/packages.html#exports) entry point at [src/index.ts](../../src/index.ts). This file re-exports all publicly available components, variables, functions, etc. This means, new software is private to package consumers until we re-export it from the entry point.

> [!IMPORTANT] 
> A single entry point also means, implementers only ever `import` from that one file path, i.e. `import { StoryList } from '@nyt/tpl';`.

> [!NOTE] 
> See also: our [package exports snapshot](Unit%20Testing.md#package-exports-snapshot).
## Top-Level Folders
_Within [projects/tpl/](../../)_.
| Folder                         | Description                                                  |
|--------------------------------|--------------------------------------------------------------|
| [.storybook](../../.storybook) | [Storybook configuration files](https://storybook.js.org/docs/configure). |
| [@types](../../@types)         | TypeScript [module augmentations](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) which provide additional type declarations for third-party libraries, e.g. for the Pretty Lights Jest matchers we use for [unit testing](Unit%20Testing.md). |
| [docs](../../docs)             | Documentation, such as this file you're reading!             |
| [scripts](../../scripts)       | Scripts for code generation, including Style Dictionary ([scripts/tokens/index.ts](../../scripts/tokens/index.ts)). (TypeScript preferred, but shell scripts are fine too.) |
| [src](../../src)               | TypeScript source files for the library itself, including the entry point at [src/index.ts](../../src/index.ts). |
## File Naming
- For components, prefer subfolders with `index.tsx`, e.g. [￼￼￼src/LinkBox/index.tsx￼￼￼](../../src/LinkBox/index.tsx).
- For component styles, prefer `styled.ts`,  e.g. [￼￼￼￼src/LinkBox/styled.ts￼￼￼￼](../../src/LinkBox/styled.ts).
- Groups of components, e.g. StoryList, end up in nested folders with index files, e.g.:
  - [src/StoryList/index.ts](../../src/StoryList/index.ts)
  - [src/StoryList/StoryList/index.tsx](../../src/StoryList/StoryList/index.tsx)
  - [src/StoryList/StoryListItem/index.tsx](../../src/StoryList/StoryListItem/index.tsx)

> [!NOTE] 
> Occasional exceptions to this rule are fine, i.e. a [src/Toast/index.tsx](../../src/Toast/index.tsx) that exports a component and re-exports some utilities. This saves us from a nonsensical file path like `src/Toast/Toast/index.tsx` 😵‍💫
## File Exports
We prefer named exports, which makes it easy to use `export *` to re-export and ultimately include the exports in our [single entry point](#package-exports).
<hr>

[Contributing / General Guidelines](Readme.md) ← Project File Structure → [Components](Components.md)
