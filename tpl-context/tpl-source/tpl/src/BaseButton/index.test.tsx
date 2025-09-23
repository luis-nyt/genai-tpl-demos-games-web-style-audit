import React, { createRef } from 'react';
import { findAllByTestId, findByTestId, findByText, render } from '@testing-library/react';
import { matchers } from 'pretty-lights/jest';
import { Spinner } from '../Spinner/index.js';
import { BaseButton, BaseButtonHeight, BaseButtonProps } from './index.js';
import { childHiddenClass, contentClass, iconClass, onlyIconClass } from './styled.js';
import { IconProps, IconSize } from '../Icon/index.js';

expect.extend(matchers);

jest.mock('../Spinner', () => ({ Spinner: jest.fn(() => <div data-testid="spinner" />) }));

type TestRow<Expected = Record<string, any>> = [
  name: string,
  props: BaseButtonProps,
  expected: Expected,
];

const TestIcon = jest.fn(({ size, inline, color, ...rest }: IconProps) => (
  <svg {...rest} data-testid="icon" />
));

describe('children', () => {
  it('wraps each child in a single <span> whose parent is the "content" <div>', async () => {
    const { container } = render(
      <BaseButton>
        <em data-testid="child">Child</em>
        <strong data-testid="child"> Child</strong>
      </BaseButton>
    );

    const contentElement = container.querySelector(`.${contentClass}`);
    const children = await findAllByTestId(container, 'child');

    expect(contentElement).toBeTruthy();

    children.forEach(child => {
      const childWrapper = child.parentElement;

      expect(childWrapper?.tagName).toBe('SPAN');
      expect(childWrapper?.className).not.toEqual(expect.stringContaining(childHiddenClass));
      expect(childWrapper?.parentElement).toBe(contentElement);
    });
  });

  it('hides wrapped children when `processing` is truthy', async () => {
    const { container } = render(
      <BaseButton processing>
        <em>Hello</em> World
      </BaseButton>
    );
    const childWrapper = await findByText(container, 'World', { exact: false });

    expect(childWrapper.tagName).toBe('SPAN');
    expect(childWrapper).toHaveStyleRule('visibility', 'hidden');
    expect(childWrapper.getAttribute('aria-hidden')).toBe('true');
  });

  it('hides the rendered `icon` when `processing` is truthy', async () => {
    const { container } = render(<BaseButton processing icon={TestIcon} />);
    const iconElement = await findByTestId(container, 'icon');

    expect(iconElement).toHaveStyleRule('visibility', 'hidden');
    expect(iconElement.getAttribute('aria-hidden')).toBe('true');
  });
});

describe('contentClassName', () => {
  it('applies this prop to the inner "content" <div>', () => {
    const testClassName = 'testClassName';
    const { container } = render(<BaseButton contentClassName={testClassName} />);

    const contentElement = container.querySelector(`.${contentClass}`);

    expect(contentElement).toBeTruthy();
    expect(contentElement?.className).toEqual(expect.stringContaining(testClassName));
  });
});

describe('height', () => {
  it('does not render a height attribute in the DOM', () => {
    const {
      container: { firstChild },
    } = render(<BaseButton height="expanded" />);

    expect((firstChild as HTMLElement | null)?.getAttribute('height')).toBeNull();
  });
});

describe('href', () => {
  const hrefTestTable: TestRow<string>[] = [
    [
      'renders an <a> tag when the href prop is a string',
      { href: 'https://www.nytimes.com', children: 'Hello world' },
      'A',
    ],
    [
      'renders an <button> tag when the href prop is present, but null',
      // @ts-expect-error
      { href: null, children: 'Hello world' },
      'BUTTON',
    ],
    [
      'renders an <button> tag when the href prop is present, but undefined',
      { href: undefined, children: 'Hello world' },
      'BUTTON',
    ],
    ['renders a <button> tag when the href prop is absent', { children: 'Hello world' }, 'BUTTON'],
  ];

  it.each(hrefTestTable)('%s', (_, props, expectedTag) => {
    const {
      container: { firstChild },
    } = render(
      // @ts-expect-error
      <BaseButton {...props} />
    );

    expect((firstChild as HTMLElement | null)?.tagName).toBe(expectedTag);
  });
});

describe('icon', () => {
  beforeEach(() => {
    TestIcon.mockClear();
  });

  it('renders the `icon` component with the expected props', () => {
    render(<BaseButton icon={TestIcon} />);

    expect(TestIcon).toHaveBeenCalledWith(
      {
        'aria-hidden': true,
        /** TestIcon isn't being hidden, so we end up passing it just `iconClass` */
        className: iconClass,
        /** We test `size` values separately (below) */
        size: expect.any(Number),
      },
      undefined
    );
  });

  it('renders the `icon` component within the "content" <div>', async () => {
    const { container } = render(<BaseButton icon={TestIcon} />);

    const contentElement = container.querySelector(`.${contentClass}`);
    const iconElement = await findByTestId(container, 'icon');

    expect(contentElement).toBeTruthy();
    expect(iconElement).toBeTruthy();
    expect(iconElement.parentElement).toBe(contentElement);
  });

  const iconSizeTestTable: [
    height: BaseButtonHeight,
    hasChildren: boolean,
    expectedIconSize: IconSize,
  ][] = [
    ['standard', true, 16],
    ['compact', true, 12],
    ['extraCompact', true, 12],

    ['standard', false, 20],
    ['compact', false, 16],
    ['extraCompact', false, 12],
    ['expanded', false, 24],
  ];

  describe('renders the expected icon size based on the `height` and `children` props', () => {
    it.each(iconSizeTestTable)(
      'height: %s, has children: %s, icon size: %s',
      (height, hasChildren, expectedIconSize) => {
        render(
          <BaseButton height={height} icon={TestIcon}>
            {hasChildren ? 'Hello world' : undefined}
          </BaseButton>
        );

        expect(TestIcon).toHaveBeenCalledWith(
          expect.objectContaining({ size: expectedIconSize }),
          undefined
        );
      }
    );
  });

  describe('conditionally renders the `only-icon` CSS class', () => {
    const onlyIconTestTable: [name: string, props: BaseButtonProps, hasOnlyIconClass: boolean][] = [
      ['icon but no children', { icon: TestIcon }, true],
      ['icon and children', { icon: TestIcon, children: 'Hello' }, false],
      ['children but no icon', { children: 'Hello' }, false],
      ['neither icon nor children', {}, false],
    ];

    it.each(onlyIconTestTable)('%s', (_testName, props, hasOnlyIconClass) => {
      const {
        container: { firstChild },
        // @ts-expect-error
      } = render(<BaseButton {...props} />);

      const baseExpectation = expect((firstChild as HTMLElement | null)?.className);

      (hasOnlyIconClass ? baseExpectation : baseExpectation.not).toContain(onlyIconClass);
    });
  });
});

describe('processing', () => {
  const processingTestTable: TestRow[] = [
    [
      'sets aria-disabled and disabled when `true`',
      { processing: true, children: 'Subscribe' },
      { 'aria-disabled': 'true', disabled: '' },
    ],
    [
      'sets aria-disabled and disabled when a string',
      { processing: 'Registering your subscription...', children: 'Subscribe' },
      { 'aria-disabled': 'true', disabled: '' },
    ],
    [
      'sets aria-disabled but NOT disabled when `true` and rendering an <a> tag',
      { processing: true, children: 'Learn more', href: 'https://www.nytimes.com' },
      { 'aria-disabled': 'true', disabled: null },
    ],
    [
      'sets aria-disabled but NOT disabled when a string and rendering an <a> tag',
      { processing: true, children: 'Learn more', href: 'https://www.nytimes.com' },
      { 'aria-disabled': 'true', disabled: null },
    ],
    [
      'does NOT set aria-disabled or disabled when falsy',
      { processing: false, children: 'Add to cart' },
      { 'aria-disabled': null, disabled: null },
    ],
    [
      'honors the aria-disabled prop when falsy',
      { processing: false, 'aria-disabled': true, children: 'Add to cart' },
      { 'aria-disabled': 'true' },
    ],
    [
      'honors the disabled prop when falsy',
      { processing: false, disabled: true, children: 'Add to cart' },
      { disabled: '' },
    ],
  ];

  it.each(processingTestTable)('%s', (_, props, expectedAttributes) => {
    const {
      container: { firstChild },
    } = render(
      // @ts-expect-error
      <BaseButton {...props} />
    );

    Object.entries(expectedAttributes).forEach(([key, value]) => {
      expect((firstChild as HTMLElement | null)?.getAttribute(key)).toBe(value);
    });
  });

  it('renders the Spinner icon when processing', () => {
    (Spinner as unknown as jest.Mock).mockClear();
    render(<BaseButton processing />);

    expect(Spinner).toHaveBeenCalled();
  });

  it('renders the Spinner icon within the "content" <div>', async () => {
    const { container } = render(<BaseButton processing />);

    const contentElement = container.querySelector(`.${contentClass}`);
    const spinnerElement = await findByTestId(container, 'spinner');

    expect(contentElement).toBeTruthy();
    expect(spinnerElement).toBeTruthy();
    expect(spinnerElement.parentElement).toBe(contentElement);
  });

  it('renders an `aria-live="assertive"` processing text description for screen readers', async () => {
    const { container } = render(<BaseButton processing />);

    const processingDescription = await findByText(container, 'Working...');

    expect(processingDescription).toBeTruthy();
    expect(processingDescription.getAttribute('aria-live')).toBe('assertive');
  });

  it('renders custom processing text for screen readers', async () => {
    const processing = 'Adding to cart...';

    const { container } = render(<BaseButton processing={processing} />);

    const processingDescription = await findByText(container, processing);

    expect(processingDescription).toBeTruthy();
    expect(processingDescription.getAttribute('aria-live')).toBe('assertive');
  });
});

describe('ref', () => {
  it('indicates the expected ref value type when passing `href`', () => {
    const ref = createRef<HTMLAnchorElement>();

    render(
      <BaseButton ref={ref} href="https://www.nytimes.com">
        Hello World
      </BaseButton>
    );

    expect(ref.current).toEqual(expect.any(HTMLAnchorElement));
  });
});

describe('renders common props as DOM attributes', () => {
  const testTable: [propName: string, propValue: any][] = [
    ['aria-disabled', true],
    ['aria-describedby', 'foo'],
    ['aria-label', 'Add'],
    ['aria-labelledby', 'bar'],
    ['aria-pressed', true],
    ['data-testid', 'dingus'],
    ['disabled', true],
    ['href', 'https://www.nytimes.com'],
    ['id', 'dingus'],
    ['role', 'button'],
    ['type', 'button'],
  ];

  it.each(testTable)('%s', (propName, propValue) => {
    const {
      container: { firstChild },
    } = render(<BaseButton {...{ [propName]: propValue }} />);

    expect((firstChild as HTMLElement | null)?.getAttribute(propName)).toBe(
      propName === 'disabled' ? '' : String(propValue)
    );
  });
});
