import { StorybookConfig } from '@storybook/react-vite';
import foundationConfig from '../../foundation/website/.storybook/main';

const config: StorybookConfig = {
  ...foundationConfig,
  staticDirs: [{ from: './media', to: '/assets' }],
};

export default config;
