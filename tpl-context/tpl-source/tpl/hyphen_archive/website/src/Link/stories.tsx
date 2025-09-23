import React from 'react';
import { Body, Link } from '../../../src';

const Template = ({ color, directional, disabled, href }) => (
  <Body>
    <Link color={color} directional={directional} disabled={disabled} href={href}>
      Lorem ipsum dolor sit amet
    </Link>
  </Body>
);

const Default = Template.bind({});

export { Default };
