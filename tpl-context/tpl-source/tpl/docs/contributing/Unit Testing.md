# Unit Testing
In general, we use Jest and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to write unit tests in `@nyt/tpl`. Read on for details about some TPL-specific testing conventions we use.

## Common Test Suite
As mentioned in the [Components](Components.md) document,  [src/common.test.tsx](../../src/common.test.tsx) contains a full suite of unit tests for the [Common Features](Components.md#common-features-reference) we implement across all TPL React components.

## Package Exports Snapshot
Our [single entry point](Project%20File%20Structure.md#package-exports)’s JavaScript and TypeScript exports is the basis of the "API contract" between `@nyt/tpl` and its dependents. Whenever we rename or remove something from our exports, we are *changing the contract* — and thus introducing a breaking change.

Thus, we use a Jest snapshot test of Our [single entry point](Project%20File%20Structure.md#package-exports)’s JavaScript and TypeScript exports ([test file](../../src/__tests__/exports.test.js) · [snapshot](../../src/__tests__/__snapshots__/exports.test.js.snap)). This helps us either avoid unintentional breaking changes, or simply help us confirm that we're intentionally making such a change.

> [!TIP] 
> When adding, renaming or removing a public export, remember to update the exports test snapshot:
> ```
> pnpm test-update projects/tpl/src/__tests__/exports.test.js
> ```
<hr>

[Documentation](Documentation.md) ← Unit Testing → [Build Scripts](Build%20Scripts.md)
