import React, { forwardRef } from 'react';
import { Global } from 'pretty-lights';
import { Box, BoxProps } from '../Box/index.js';
import { linkBoxClass, linkBoxStyles } from './styled.js';
import { LinkBoxLink } from './LinkBoxLink.js';
import { dataTplAttr, DataTplValue } from '../util/index.js';

interface LinkBoxProps extends BoxProps {}

const LinkBoxComponent = forwardRef<Element, LinkBoxProps>(
  ({ children, className, ...rest }, ref) => (
    <Box
      className={[linkBoxClass, className].join(' ')}
      ref={ref}
      {...{ [dataTplAttr]: DataTplValue.LinkBox, ...rest }}
    >
      <Global styles={linkBoxStyles} />
      {children}
    </Box>
  )
);

/**
 * LinkBox combines a collection of elements into one link using LinkBox.Link. This method and the
 * motivation for it are described in more detail here: https://inclusive-components.design/cards/
 */
// @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-894053907
const LinkBox = Object.assign(LinkBoxComponent, {
  Link: LinkBoxLink,
});

export { LinkBox, LinkBoxProps };
