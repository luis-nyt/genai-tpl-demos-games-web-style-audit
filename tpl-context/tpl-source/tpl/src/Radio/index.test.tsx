import React, { useRef, useEffect } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Radio, RadioGroup } from './index.js';
import '@testing-library/jest-dom';

describe('RadioGroup', () => {
  it('works as a controlled form field', () => {
    let out = null;
    const onChange = ev => {
      out = ev.target.value;
    };
    const { container } = render(
      <RadioGroup name="example" onChange={onChange} label="test">
        <Radio label="Some label 1" id="one" value={1} />
        <Radio label="Some label 2" id="two" value={2} />
      </RadioGroup>
    );

    fireEvent.click(container.querySelector('#two') as HTMLInputElement);

    expect(out).toBe('2');
  });
});

describe('Radio', () => {
  it('automatically assigns an id from NAME_VALUE', () => {
    const { container } = render(<Radio name="example" label="Label" value="someValue" />);

    expect(container.querySelector('#example_someValue')).toBeInTheDocument();
  });

  it('forwards the input ref for used in an uncontrolled form field context', () => {
    let out = '';
    const UncontrolledFormComponent = () => {
      const ref = useRef<HTMLInputElement>(null);
      useEffect(() => {
        if (!ref.current) {
          return;
        }
        ref.current.addEventListener('click', ev => {
          out = (ev.target as HTMLInputElement).value;
        });
      }, [ref]);
      return (
        <Radio
          name="example"
          label="Some label 1"
          id="one"
          value="foo"
          data-testid="foo"
          ref={ref}
        />
      );
    };
    const { container } = render(<UncontrolledFormComponent />);
    fireEvent.click(container.querySelector('input') as HTMLInputElement);

    expect(out).toBe('foo');
  });
});
