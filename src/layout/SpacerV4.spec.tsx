/** @jest-environment jsdom */
import * as React from 'react';
import { render } from '@testing-library/react';
import { Spacer } from './Spacer';
import { SpacerV4, type SpacerV4Props } from './SpacerV4';

describe('SpacerV4 (web)', () => {
  it('IS the base component — a token-pure spacer has nothing for a design line to restyle', () => {
    // Asserted rather than left as a comment: the alias is the decision the
    // brief records ("Spacer — structure only, no visual change"), and a V4
    // that differed could only differ by changing what `size="md"` means.
    expect(SpacerV4).toBe(Spacer);
  });

  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof Spacer> = { size: 'lg', className: 'extra' };
    const asV4: SpacerV4Props = same;
    expect(asV4).toBe(same);
  });

  it('binds every fixed size to a --xen-space-* token on both axes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
    sizes.forEach((size) => {
      const { getByTestId, unmount } = render(<SpacerV4 data-testid="s" size={size} />);
      const el = getByTestId('s');
      expect(el.className).toContain(`w-[var(--xen-space-${size})]`);
      expect(el.className).toContain(`h-[var(--xen-space-${size})]`);
      unmount();
    });
  });

  it('defaults to the md square when no size is given', () => {
    const { getByTestId } = render(<SpacerV4 data-testid="s" />);
    expect(getByTestId('s').className).toContain('w-[var(--xen-space-md)]');
    expect(getByTestId('s').className).toContain('h-[var(--xen-space-md)]');
  });

  it('grows instead of measuring at size="flex" — a flex factor, not a spacing value', () => {
    const { getByTestId } = render(<SpacerV4 data-testid="s" size="flex" />);
    const el = getByTestId('s');
    expect(el.className).toContain('grow');
    expect(el.className).toContain('shrink');
    expect(el.className).not.toContain('--xen-space');
  });

  it('is hidden from assistive tech and renders nothing else — the empty state IS the component', () => {
    const { getByTestId } = render(<SpacerV4 data-testid="s" />);
    const el = getByTestId('s');
    // A spacer never has children; furniture must not be announced or read.
    expect(el.getAttribute('aria-hidden')).toBe('true');
    expect(el.childNodes.length).toBe(0);
    expect(el.textContent).toBe('');
  });

  it('merges a caller className and forwards its ref to the div', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(<SpacerV4 ref={ref} data-testid="s" className="self-end" />);
    const el = getByTestId('s');
    expect(el.className).toContain('self-end');
    expect(ref.current).toBe(el);
  });

  it('paints nothing — no colour, border, radius, shadow or type class', () => {
    const { getByTestId } = render(<SpacerV4 data-testid="s" size="xl" />);
    expect(getByTestId('s').className).not.toMatch(/\b(bg|text|border|rounded|shadow)-/);
  });
});
