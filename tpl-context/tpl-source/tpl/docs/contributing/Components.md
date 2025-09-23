# Components
*See also: [Project File Structure](Project%20File%20Structure.md#file-naming), [Documentation](Documentation.md) and [Unit Testing](Unit%20Testing.md).*

TPL React components support a set **common features**, many of which are prop-based and unit testable. This ensures components feel like they’re part of a coherent, consistently designed library.

## Getting Started
To create a new React component that supports TPL’s common features:

### 1. Extend common type definitions
Have your component’s prop type definitions extend either `CommonProps` or `CommonWithAsProps` (declared in [src/util/types.ts](../../src/util/types.ts)).
- e.g.  `export interface MyComponentProps extends CommonWithAsProps`
- If you choose to render `Box` or `Flex` internally, you can extend from`BoxProps` or `FlexProps` instead.

### 2. Implement `forwardRef`
Wrap your component’s function body in [￼`React.forwardRef`￼](https://react.dev/reference/react/forwardRef).

### 3. Specify `forwardRef`'s type parameters
Use  [￼`React.forwardRef`￼](https://react.dev/reference/react/forwardRef)’s generic type parameters to set the `ref` value type and the prop types.
- e.g.  `export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>`
- If your component supports the [￼`as`￼ prop](#as-prop) and/or extends `BoxProps` or `FlexProps`, declare its `ref` type as the more general `Element`, thereby indicating that the `ref` could be “any HTML or SVG element”. 

### 4. Add your component's name to `DataTplValue`
Add an enum member representing your component to [￼￼￼`DataTplValue`￼￼￼](#data-tpl-prop), so we can track usages of it. Use the same name as the exported component.

### 5. Export your component
Export your component from [src/index.ts](Project%20File%20Structure.md#package-exports).
- e.g. `export * from './MyComponents/index.tsx';`

### 6. Add component to the Common Test Suite
Add your component to the `testTable` in [src/common.test.tsx](../../src/common.test.tsx). Include the exported name of the component and the type of HTML element it renders at its root.

For example, a `Toast` component that renders a `<dialog>` would have this "row" in the `testTable`:
```ts
  ['Toast', HTMLDialogElement],
```

> [!TIP] 
>  You can start testing support for these common features as soon as you're ready! Just run `pnpm test projects/tpl/src/exports.test.tsx`.

## Next Steps
Once you've got your component set up, you'll need to implement support for these common features:
- See the following sections for more details on how to implement a specific common feature.
- Refer to the [Examples](#examples) section below for some boilerplate implementation code.
- The [TPL ￼￼`Box`￼](../../src/Box/index.tsx) and [TPL ￼￼￼`Flex`￼￼](../../src/Flex/index.tsx) components are also good points of reference.
  - You can even render `Box` or `Flex` at within your component — see [Example 2](#example-2-using-box-and-boxprops) below.
## Common Features Reference
### "as" Prop
Several TPL components support the `as` prop, which lets you change the HTML element, SVG element or React component that your component will render as its root element:

```tsx
<Box as="article">I’m an article!</Box>
```

Indicate that your component supports the `as` prop by having its prop type definition extend either `CommonWithAsProps`, `BoxProps` or `FlexProps` (if you’re also rendering `Box` or `Flex` internally).

> [!IMPORTANT] 
> `as` doesn’t always make sense — for example, we need [Toast](../../Toast/index.tsx) to render a `<dialog>` as its root element. If your component doesn’t support `as`, add its name to the `componentsWithoutAs` array in [src/common.test.tsx](../../src/common.test.tsx) .

### children Prop
*Most* TPL components support the `children` prop. Usually it’s typed as `{ children?: ReactNode; }`, which can be practically anything.

Occasionally you’ll want something more specific, such as an array of a specific type of child element ([￼￼`RadioGroup`￼￼](../../src/Radio/RadioGroup.tsx) does this!):

<details><summary>Advanced Example</summary>

```tsx
export interface MyComponentProps extends Omit<CommonProps, 'children'> {
  /** One or more {@link MyChild} child elements. */
  children?: ReactElement<MyChildProps>[];
}
```
</details>

> [!NOTE] 
> `{ children?: ReactNode }` indicates the `children` prop is _optional_. This makes unit testing *en masse* easier and gestures at JavaScript-only use cases, where implementers use the component without type-checking.

#### `children` as most commonly used "slot"
Supporting the `children` prop can be counterintuitive when building a component with multiple “slots.” In this case, have the `children`  prop correspond to the most commonly used “slot.” For example, [StoryListItemContent](../../src/StoryList/StoryListItemContent/index.tsx) uses `children` as the “headline” prop, since every Story List Item has a headline:

<details><summary>Example</summary>

```tsx
<StoryListItem>
  <StoryListItemContent>
    In Joyful Speech, Mamdani Asserts Vision for Future of Democratic Party
  </StoryListItemContent>
</StoryListItem>
```
</details>

In conclusion:
- *“You’re always trying to get me to use the ￼￼`children`￼￼ prop. What is it with you?”*
- *[“I just think they’re neat!”](https://youtu.be/oOlGQwPQztE)*

> [!IMPORTANT] 
> It's okay if your component ultimately doesn’t support `children`. Just be sure to note that by adding its name to the `componentsWithoutChildren` array in [src/common.test.tsx](../../src/common.test.tsx).

### className Prop
The `className` prop allows implementers to apply CSS class based style overrides to the component’s root element. Use [Pretty Lights](https://github.com/nytimes/pretty-lights)’ [`cx` function](https://turbo-sniffle-20eaaf66.pages.github.io/docs/api/cx/) to apply both an internal CSS class and the `className` prop.

<details><summary>Example</summary>

```tsx
import React from 'react';
import { cx } from 'pretty-lights';
import { CommonProps, useTplSxProp } from '../system/index.js';
import { dataTplAttr, DataTplValue } from '../util/index.js';
import { rootClass } from './styled.js';

export interface MyComponentProps extends CommonProps {}

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(({ className, sx, ...rest }, ref) => {
  const systemClass = useTplSxProp(sx);
  return (
    <div
      ref={ref}
      className={cx(rootClass, className, systemClass)}
      {...{ [dataTplAttr]: DataTplValue.MyComponent, ...rest }}
    />
  );
});
```
</details>

*What’s `systemClass`? Please see the [￼`sx`￼ prop](#sx-prop).*

#### Known Issues
**[Pretty Lights](https://github.com/nytimes/pretty-lights) does not guarantee CSS class insertion / source order! Read on for more.**

This is effectively a design flaw / limitation of Pretty Lights when using CSS classes. When an implementer declares a Pretty Lights class using the [￼`css`￼ function](https://turbo-sniffle-20eaaf66.pages.github.io/docs/api/css/) and passes it via the `className` prop, `cx` will attempt to combine multiple classes in to one.

This can result in **a single CSS class with duplicate property-value declarations**, wherein *source order* determines which duplicated property “wins”. The property order also appears to be governed by Pretty Lights runtime execution order, i.e. which call to `css` did the current application execute first?

Thus, it’s possible that an implementer’s `className` prop may not be able to override a component’s built-in styles. Our unit test *attempts* to check that a component’s implementation of the `className` prop works correctly, but this is a best guess.

> [!NOTE] 
> In the future, CSS features like [`:where()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:where) and [`@layer`](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) will help us avoid these issues.

### colorBehavior Prop & Context
See the [Color Behavior Styles](#color-behavior-styles) section.

### data-testid Prop
We commonly use `data-testid` in Jest unit tests via [React Testing Library](https://testing-library.com/docs/queries/bytestid/).

If your component uses `{...rest}` spreading to render additional props as HTML attributes on the root element it renders, then your component already support this!

> [!TIP] 
> The Common Test Suite in [src/common.test.tsx](../../src/common.test.tsx) has a unit test for this.

### data-tpl Prop
We use the `data-tpl` prop to render an HTML attribute of the same name on the component's root-level element. The value is a short string that comes from the [`DataTplValue`￼￼](../../src/util/DataTpl.ts) enum. This is effectively a tracking identifier for the TPL component.

We use the `data-tpl` attribute in the [NYT Toolbar](https://news.tech.nyt.net/development-guides/using-the-toolbar/)'s TPL plugin to count and locate the number of TPL component in use on a given page of [Project Vi](https://news.tech.nyt.net/vi/).

> [!TIP] 
> The Common Test Suite ([src/common.test.tsx](../../src/common.test.tsx)) already has a `data-tpl` unit test!

### ref Prop
We expect every TPL component to support the [React ￼`ref`￼ prop](https://react.dev/learn/manipulating-the-dom-with-refs) and for the ref value to correspond to the component's root HTML element.

As shown in the [example](#example), simply wrap your component in [￼`React.forwardRef`￼](https://react.dev/reference/react/forwardRef) before exporting it.

### style Prop
Like other React components, TPL components support the `style` prop.

We make one TypeScript addition to the `style` prop in the `CommonProps` interface and others, which lets you provide CSS custom properties via a `style` object without raising a TypeScript compiler error:

```tsx
<MyComponent style={{ '--my-custom-property': 'my-value' }} />
```

### "sx" Prop
The `sx` prop is inspired by "Styled System" design patterns seen in [Material UI](https://mui.com/system/getting-started/the-sx-prop/) and elsewhere. It lets implementers add style overrides to a component without having to manually access TPL's own design tokens.

Use the `useTplSxProp` hook within a component to implement support for the `sx` prop. [Example 1](#example-1-using-commonprops) below shows how to do this.

> [!IMPORTANT] 
> TPL Web 2.0 will remove support for the `sx` prop.

## Color Behavior Styles
*See the [Full Boilerplate Example](#full-boilerplate-example)  below for an implementation example!*

All TPL components support [Color Behavior](https://coda.io/d/Times-Product-Language-TPL_dH9ZFEaJR9I/Color_suie-VA7#_luPQrL5B), which gives them the ability to change their appearance according to the current `ColorBehaviorContext` value. They also support a `colorBehavior` prop for local overrides.

This allows implementers to render a TPL components in layouts where they've changed the color scheme, e.g. to "Always Dark", rather than adapting to the device's current color scheme.

The `colorBehavior` prop means they can make this behavior change directly on a component instance:

```tsx
<Button colorBehavior="alwaysDark">My Always Dark Button</Button>
```

`ColorBehaviorContext` allows them to do this for multiple instances — an entire view hierarchy:
```tsx
<ColorBehaviorContext.Provider value={{ colorBehavior: 'alwaysDark' }}>
  <PosterCarousel>
    <StoryListItem mediaPosition="posterBottom" media={<FirstMediaView />}>
      <StoryListItemContent>First Poster Headline</StoryListItemContent>
    </StoryListItem>
    <StoryListItem mediaPosition="posterBottom" media={<SecondMediaView />}>
      <StoryListItemContent>Second Poster Headline</StoryListItemContent>
    </StoryListItem>
  </PosterCarousel>
</ColorBehaviorContext.Provider>
```

Within a TPL component, color behavior support involves three key pieces of functionality:
1. Declare additional `colorBehaviorStyles` using helper functions like `createTplColorBehaviorStyles()`
2. Read `ColorBehaviorContext`, so that we can fall back to its value if the component's own `colorBehavior` prop isn't set
3. Use the resolved `colorBehavior` to look up the appropriate styles to apply as a CSS `className`
   - e.g. `className={colorBehaviorStyles[colorBehaviorProp ?? colorBehaviorContext]}`

> [!TIP] 
> [Example 1](#example-1-using-commonprops) contains a full color behavior styles implementation. Check it out!

> [!IMPORTANT] 
> TPL Web 2.0 will migrate from color behavior styles to [Color Tokens with Color Behavior](https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?tab=t.2tb2mnrxg2u6#heading=h.x2zpq2dspyrw) and [Color Scheme CSS Classes](https://docs.google.com/document/d/12T5bEefMJDYoLY8gtg0cokrNco53h5t8Ofj8rn5uaV4/edit?tab=t.2tb2mnrxg2u6#heading=h.3utcgww343jz), which will make component styles much easier and more conventional to author.

## Type Definitions
Use TypeScript to declare and export an `interface` ([why](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections)) describing the React props your component accepts. TPL contains a few common type definitions you can extend from:
| Interface           | `as` prop | Other Common Props | Additional Props                            | Notes                                                        |
|---------------------|-----------|--------------------|---------------------------------------------|--------------------------------------------------------------|
| `CommonProps`       | ❌ No      | ✅ Yes              | —                                           |                                                              |
| `CommonWithAsProps` | ✅ Yes     | ✅ Yes              | —                                           |                                                              |
| `BoxProps`          | ✅ Yes     | ✅ Yes              | `bg` / `background`                         | Box implements many props for you, including `colorBehavior` and `sx`. |
| `FlexProps`         | ✅ Yes     | ✅ Yes              | `bg` / `background`<br>Flexbox layout props | Box + additional Flexbox props, e.g. `flexDirection="column"`. |
Note that you can also use utility types such as [Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys) and React types describing known attributes for a particular HTML element. For example, here's part of [￼`ToastProps`￼](../../Toast/index.tsx#L22):
```tsx
export interface ToastProps
  extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'style' | 'title'>,
    CommonProps {
  // ...
}
```

Either way, name your component's props interface according to the component name plus the `Props` suffix.
- e.g. `Toast` → `ToastProps`.

> [!TIP]
> Use the component's prop types definition in tandem with [`React.forwardRef`](#ref-prop) to describe the component's props and `ref` type all at once.

## Examples
### Example 1: Using `CommonWithAsProps`
Let's put it all together in this comprehensive `MyComponent` example:

#### src/MyComponent/colorBehaviorStyles.ts
```ts
import { createTplColorBehaviorStyles } from '../tokens/index.js';

export default createTplColorBehaviorStyles(
  light => `
  background: ${light.background.primary.hex};
  color: ${light.content.primary.hex};
`
);
```
#### src/MyComponent/styled.ts
```ts
import { css } from 'pretty-lights';
import { spaceScale } from '../generated/spacing.js';

export const rootClass = css`
  padding: ${spaceScale.get(2)};
`;
```
#### src/MyComponent/index.tsx
```tsx
import React, { forwardRef } from 'react';
import { cx } from 'pretty-lights';
import { useColorBehaviorContext } from '@nyt/foundation';
import { useTplSxProp } from '../system/index.js';
import { CommonWithAsProps, dataTplAttr, DataTplValue } from '../util/index.js';
import colorBehaviorStyles from './colorBehaviorStyles.js';
import { rootClass } from './styled.js';

export interface MyComponentProps extends CommonWithAsProps {}

export const MyComponent = forwardRef<Element, MyComponentProps>(
  ({ as: Component = 'div', className, colorBehavior: colorBehaviorProp, sx, ...rest }, ref) => {
    const systemClass = useTplSxProp(sx);
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;

    return (
      <Component
        ref={ref}
        className={cx(rootClass, className, colorBehaviorStyles[colorBehavior], systemClass)}
        {...{ [dataTplAttr]: DataTplValue.MyComponent, ...rest }}
      />
    );
  }
);
```
#### Added to [src/index.ts](../../src/index.ts)
```ts
export * from './MyComponent/index.js';
```
#### Added to [src/common.test.tsx](../../src/common.test.tsx)
```tsx
const testTable = [
  // ...
  ['MyComponent', HTMLDivElement],
  // ...
];
```

### Example 2: Using `Box` and `BoxProps`
*Here we've skipped Color Behavior Styles for sake of brevity. Please refer to [the previous example](#example-1-using-commonwithasprops) for those.*
```tsx
import React, { forwardRef } from 'react';
import { Box, BoxProps } from '../Box/index.js';
import { dataTplAttr, DataTplValue } from '../util/index.js';

export interface MyBoxProps extends BoxProps {
  exemplify?: boolean;
}

export const MyBox = forwardRef<Element, MyBoxProps>(({ exemplify, ...rest }, ref) => (
  <Box
    ref={ref}
    data-exemplify={exemplify}
    {...{ [dataTplAttr]: DataTplValue.MyComponent, ...rest }}
  />
));
```
<hr>

[Project File Structure](Project%20File%20Structure.md) ← Components → [Documentation](Documentation.md)
