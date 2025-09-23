import { join } from 'path';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(join(__dirname, '../../package.json')));

describe('package.json', () => {
  it('contains a "main" field which resolves to the CommonJS library build', () => {
    expect(pkg.main).toEqual(expect.stringMatching(/cjs\/index\.js$/));
  });

  it('contains a "module" field which resolves to the ESM library build', () => {
    expect(pkg.module).toEqual(expect.stringMatching(/lib\/index\.js$/));
  });
});
