import { join } from 'path';
import getExports from '../../../foundation/web/src/__tests__/getExports.js';

const path = join(__dirname, '../index.ts');

const tplExports = getExports(path).sort();

it('contains the expected named exports', () => {
  expect(tplExports).toMatchSnapshot();
});
