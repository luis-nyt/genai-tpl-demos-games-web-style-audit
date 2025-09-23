import React from 'react';
import { css } from 'pretty-lights';
import { DocsContainer as BaseContainer } from '@storybook/blocks';
import { light, dark, color } from '../../src';

/**
 * This is a workaround to correctly apply a theme to Storybook Docs, based on these comments:
 * @see https://github.com/hipstersmoothie/storybook-dark-mode/issues/127#issuecomment-802018811
 * @see https://github.com/hipstersmoothie/storybook-dark-mode/issues/127#issuecomment-989039091
 */
const DocsContainer = ({ className, context, ...rest }) => {
  const docsContainerClass = css`
    .sbdocs-preview {
      background: ${color.background.primary} !important;
    }
  `;

  return (
    <div className={docsContainerClass}>
      <BaseContainer context={context} {...rest} />
    </div>
  );
};

export default DocsContainer;
