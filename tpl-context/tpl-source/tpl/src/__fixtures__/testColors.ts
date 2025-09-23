import { Theme } from '@nyt/foundation';

const light = new Theme({
  foreground: {
    first: '#000',
    second: '#666',
    accent: '#00F',
  },

  background: {
    first: '#FFF',
    second: '#999',
  },
});

const dark = new Theme({
  foreground: {
    first: '#FFF',
    second: '#999',
    accent: '#33F',
  },

  stroke: {
    first: '#FFFFFF',
    second: '#666',
  },

  background: {
    first: '#000',
    second: '#333',
  },
});

const color = light.toVar();

export { color, light, dark };
