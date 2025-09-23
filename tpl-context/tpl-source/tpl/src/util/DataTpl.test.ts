import { DataTplValue } from './DataTpl.js';

it('contains zero duplicated string values', () => {
  const seenStringValues = new Set();

  // eslint-disable-next-line no-restricted-syntax
  for (const stringValue of Object.values(DataTplValue)) {
    expect(seenStringValues.has(stringValue)).toBeFalsy();

    seenStringValues.add(stringValue);
  }
});
