import { color, light, dark } from '../tokens/index.js';

describe('generated theme', () => {
  test('default theme CSS', () => {
    expect(light.toCSS()).toMatchSnapshot();
  });

  test('dark theme CSS', () => {
    expect(dark.toCSS()).toMatchSnapshot();
  });

  test('color getter', () => {
    expect(color).toMatchSnapshot();
  });

  test('light color instance getter', () => {
    expect(light).toMatchSnapshot();
  });

  test('dark color instance getter', () => {
    expect(dark).toMatchSnapshot();
  });

  describe('dark theme contains the same colors as light theme', () => {
    describe.each(Object.entries(light.colors))('%s palette', (paletteKey, paletteColors) => {
      it.each(Object.keys(paletteColors))('%s', paletteColorKey => {
        expect(dark.colors?.[paletteKey]?.[paletteColorKey]).toBeTruthy();
      });
    });
  });
});
