/** @jest-environment jsdom */
import * as React from 'react';
import { render } from '@testing-library/react';
import { Inset } from './Inset';
import { InsetV4, type InsetV4Props } from './InsetV4';

describe('InsetV4 (web)', () => {
  it('IS the base component — two token-bound padding classes leave nothing to restyle', () => {
    expect(InsetV4).toBe(Inset);
  });

  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof Inset> = {
      space: 'lg',
      horizontal: 'sm',
      vertical: 'xl',
      className: 'extra',
    };
    const asV4: InsetV4Props = same;
    expect(asV4).toBe(same);
  });

  it('binds uniform padding to a --xen-space-* token on both axes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
    sizes.forEach((space) => {
      const { getByTestId, unmount } = render(<InsetV4 data-testid="i" space={space} />);
      const el = getByTestId('i');
      expect(el.className).toContain(`px-[var(--xen-space-${space})]`);
      expect(el.className).toContain(`py-[var(--xen-space-${space})]`);
      unmount();
    });
  });

  it('defaults to md, which the caller overrides per §4.1 at the call site', () => {
    const { getByTestId } = render(<InsetV4 data-testid="i" />);
    expect(getByTestId('i').className).toContain('px-[var(--xen-space-md)]');
    expect(getByTestId('i').className).toContain('py-[var(--xen-space-md)]');
  });

  it('lets horizontal and vertical override the uniform space independently', () => {
    const { getByTestId } = render(<InsetV4 data-testid="i" space="md" horizontal="lg" />);
    const el = getByTestId('i');
    expect(el.className).toContain('px-[var(--xen-space-lg)]');
    expect(el.className).toContain('py-[var(--xen-space-md)]');

    const { getByTestId: get2 } = render(<InsetV4 data-testid="j" space="md" vertical="2xl" />);
    const el2 = get2('j');
    expect(el2.className).toContain('px-[var(--xen-space-md)]');
    expect(el2.className).toContain('py-[var(--xen-space-2xl)]');
  });

  it('still pads with no children — an empty padded box is a valid spacer block', () => {
    const { getByTestId } = render(<InsetV4 data-testid="i" space="lg" />);
    const el = getByTestId('i');
    expect(el.childNodes.length).toBe(0);
    expect(el.textContent).toBe('');
    expect(el.className).toContain('px-[var(--xen-space-lg)]');
  });

  it('merges a caller className and forwards its ref to the div', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(<InsetV4 ref={ref} data-testid="i" className="w-full" />);
    const el = getByTestId('i');
    expect(el.className).toContain('w-full');
    expect(ref.current).toBe(el);
  });

  it('paints nothing — no colour, border, radius, shadow or type class', () => {
    const { getByTestId } = render(<InsetV4 data-testid="i" space="lg" />);
    expect(getByTestId('i').className).not.toMatch(/\b(bg|text|border|rounded|shadow)-/);
  });
});
