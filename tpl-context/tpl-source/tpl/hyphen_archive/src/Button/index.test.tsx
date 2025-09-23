import React from 'react';
import { findByTestId, fireEvent, render } from '@testing-library/react';
import { Button } from '.';

const commonAttributes = {
  'data-testid': 'test',
};

const ariaProps = {
  ariaLabel: 'foo',
  ariaDescribedBy: 'bar',
  ariaLabelledBy: 'baz',
  ariaPressed: true,
};

/**
 * Button supports both a subset of React-style camelCase aria props, e.g. `ariaLabel`, _and_ is
 * expected to pass through HTML-style snake-case aria attributes, e.g. `aria-label`. Thus, this
 * helper utility converts aria props to attributes we'd expect to find on an HTML element.
 */
const convertToAriaAttributes = (props: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(props).map(([key, value]) =>
      key.match(/^aria[A-Z]/) ? [key.toLowerCase().replace(/^aria/, 'aria-'), value] : [key, value]
    )
  );

/**
 * A helper function which roughly converts props to the equivalent attribute values we'd expect
 * to find on an HTML element. A bit more general-purpose than `convertToAriaAttributes()` above,
 * but still kind of naïve / bound to have unaccounted-for edge cases.
 */
const getExpectedAttributes = (props: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(props)
      .filter(([, value]) => value !== false)
      .map(([key, value]) => {
        let attributeValue: string;
        switch (typeof value) {
          case 'number':
            attributeValue = String(value);
            break;
          case 'boolean':
            attributeValue = expect.any(String);
            break;
          default:
            attributeValue = value;
            break;
        }

        return [key.toLowerCase(), attributeValue];
      })
  );

const testTable: Record<string, any>[] = [
  {
    ...commonAttributes,
    ...ariaProps,
    role: 'link',
    target: '_blank',
    href: 'https://www.nytimes.com',
  },
  {
    ...commonAttributes,
    ...ariaProps,
    type: 'button',
    role: 'link',
    disabled: true,
  },
  {
    ...commonAttributes,
    ...convertToAriaAttributes(ariaProps),
  },
  {
    ...commonAttributes,
    tabIndex: 0,
    formAction: 'https://nonexistent-url.com/submit',
  },
];

describe('renders the expected props as attributes on the underlying <a> element', () => {
  it.each(testTable)('%p', async props => {
    const { container } = render(<Button {...props} />);
    const element = await findByTestId(container, 'test');

    const attributesObj = Object.fromEntries(
      [...element.attributes].map(({ name, value }) => [name, value])
    );

    expect(attributesObj).toStrictEqual(
      getExpectedAttributes(
        convertToAriaAttributes({
          ...props,
          class: expect.any(String),
          ...('disabled' in props ? { 'aria-disabled': props['disabled'] } : {}),
        })
      )
    );
  });
});

it('indicates that the element is disabled when the processing prop is `true`', async () => {
  const { container } = render(
    <Button data-testid="test" processing>
      Subscribe
    </Button>
  );
  const element = await findByTestId(container, 'test');

  expect(element.hasAttribute('disabled')).toBeTruthy();
  expect(element.hasAttribute('aria-disabled')).toBeTruthy();
});

it('passes through onClick to the underlying element', async () => {
  const onClick = jest.fn();

  const { container } = render(
    <Button data-testid="test" onClick={onClick}>
      Subscribe
    </Button>
  );

  const element = await findByTestId(container, 'test');

  fireEvent(
    element,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(onClick).toHaveBeenCalled();
});
