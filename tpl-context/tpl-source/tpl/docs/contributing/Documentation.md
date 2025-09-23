# Documentation
TPL Web is filled with Markdown-flavored documentation — in source files, in Storybook stories, you name it! Read on for more information on how we author documentation for this library.
## JSDoc
TypeScript features extensive [JSDoc support](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html), which we make use of by adding JSDoc comments to TPL components, types, properties on object-type interfaces and more. [JetBrains IDEs](https://www.jetbrains.com/idea/), [Zed](https://zed.dev) and others also support Markdown-flavored JSDoc comments, which they present in tooltips and other parts of the editor UI.

**This is what makes JSDoc so powerful: it lets us present curated info about TPL Web right in the user's editor!**

## Storybook
We also extensively use [Storybook](https://storybook.js.org/) to document TPL Web components:
| Production            | Development                         |
|-----------------------|-------------------------------------|
| https://tpl.nyt.net/  | `https://tpl.dev.nyt.net/<branch>/` |

Start the Storybook dev server locally by running `pnpm -F @nyt/tpl storybook`. Then, add a component to Storybook by creating a `*.stories.tsx` file alongside the component’s source file.

We recommend using per-component [Autodocs](https://storybook.js.org/docs/writing-docs/autodocs#component-level-configuration), [StoryObj](https://storybook.js.org/docs/8/writing-stories/typescript#typing-stories-with-meta-and-storyobj) and [￼`satisfies`￼ for better type safety](https://storybook.js.org/docs/8/writing-stories/typescript#using-satisfies-for-better-type-safety). We also use the “[implicit method](https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy#:~:text=The%20implicit%20method%20involves%20relying%20upon%20the%20physical%20location%20of%20your%20stories%20to%20position%20them%20in%20the%20sidebar)” of relying upon the physical location of stories to position them in the Storybook sidebar. You can also use [single-story hoisting](https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy#single-story-hoisting) if you really only have one story to contribute at the time.

<details><summary>Example</summary>

```tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Dialog as DialogComponent, DialogProps } from './index.js';

const meta = {
  component: DialogComponent,
  tags: ['autodocs'],
} satisfies Meta<DialogProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Dialog: Story = {
  args: {
    children: (
      <DialogContent>My Dialog Title</DialogContent>
    }
  }
};
```
</details>

### Storybook and JSDoc
Storybook *also* supports JSDoc rather extensively.

For example, using [Autodocs](https://storybook.js.org/docs/writing-docs/autodocs#component-level-configuration), we can render a Markdown-formatted JSDoc comment affixed to the component itself right at the top of the Storybook Docs page. This saves us from having to write that same documentation in two places.

> [!TIP]
> If you update the component's JSDoc comment, you may have to **restart the Storybook dev server** to see the changes reflected on its Storybook Docs page.

Also note that Storybook lets you write story descriptions as [JSDoc comments above the story declaration](https://storybook.js.org/docs/api/doc-blocks/doc-block-description#writing-descriptions).

## Tutorials
So far we have one multi-section tutorial in Storybook, located in [src/tutorials/intro-to-story-list/](./src/tutorials/intro-to-story-list/) ([view in Storybook](https://tpl.nyt.net/?path=/docs/tutorials-intro-to-story-list-section-1-create-a-story-list--docs)). Future tutorials could go here, too, e.g. `src/tutorials/color-behaviors/index.mdx`.
<hr>

[Components](Components.md) ← Documentation → [Unit Testing](Unit%20Testing.md)
