/** @jest-environment jsdom */
import * as React from 'react';
import { render } from '@testing-library/react';
import { Center } from './Center';
import { CenterV4, type CenterV4Props } from './CenterV4';

describe('CenterV4 (web)', () => {
  it('IS the base component — three alignment utilities are not a design line', () => {
    expect(CenterV4).toBe(Center);
  });

  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof Center> = { fill: true, className: 'extra' };
    const asV4: CenterV4Props = same;
    expect(asV4).toBe(same);
  });

  it('centers on both axes', () => {
    const { getByTestId } = render(
      <CenterV4 data-testid="c">
        <span>content</span>
      </CenterV4>
    );
    const el = getByTestId('c');
    expect(el.className).toContain('flex');
    expect(el.className).toContain('items-center');
    expect(el.className).toContain('justify-center');
  });

  it('does not fill by default and takes flex-1 when asked to', () => {
    const { getByTestId, rerender } = render(<CenterV4 data-testid="c" />);
    expect(getByTestId('c').className).not.toContain('flex-1');
    rerender(<CenterV4 data-testid="c" fill />);
    expect(getByTestId('c').className).toContain('flex-1');
  });

  it('renders an empty box with no children — centering nothing must not throw or paint', () => {
    const { getByTestId } = render(<CenterV4 data-testid="c" />);
    const el = getByTestId('c');
    expect(el.childNodes.length).toBe(0);
    expect(el.textContent).toBe('');
    expect(el.className).toContain('items-center');
  });

  it('adds no padding of its own — that is Inset’s job (brief §5)', () => {
    const { getByTestId } = render(<CenterV4 data-testid="c" fill />);
    expect(getByTestId('c').className).not.toMatch(/\bp[xytrbl]?-/);
  });

  it('merges a caller className and forwards its ref to the div', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(<CenterV4 ref={ref} data-testid="c" className="min-h-0" />);
    const el = getByTestId('c');
    expect(el.className).toContain('min-h-0');
    expect(ref.current).toBe(el);
  });

  it('paints nothing — no colour, border, radius, shadow or type class', () => {
    const { getByTestId } = render(<CenterV4 data-testid="c" fill />);
    expect(getByTestId('c').className).not.toMatch(/\b(bg|text|border|rounded|shadow)-/);
  });
});
