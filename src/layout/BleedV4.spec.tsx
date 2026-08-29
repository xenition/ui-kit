/** @jest-environment jsdom */
import * as React from 'react';
import { render } from '@testing-library/react';
import { Bleed } from './Bleed';
import { BleedV4, type BleedV4Props } from './BleedV4';

describe('BleedV4 (web)', () => {
  it('renders today’s Bleed by default — the new prop cannot move an existing caller', () => {
    const { getByTestId } = render(<BleedV4 data-testid="v4" space="lg" />);
    const { getByTestId: getBase } = render(<Bleed data-testid="base" space="lg" />);
    expect(getByTestId('v4').className).toBe(getBase('base').className);
  });

  it('keeps the base props with the same names and defaults', () => {
    const same: React.ComponentProps<typeof Bleed> = {
      space: 'lg',
      horizontal: 'sm',
      vertical: 'xl',
      className: 'extra',
    };
    // Additive: every base prop is still accepted, unchanged.
    const asV4: BleedV4Props = same;
    expect(asV4).toBe(same);
  });

  it('binds uniform negative margins to --xen-space-* tokens on both axes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
    sizes.forEach((space) => {
      const { getByTestId, unmount } = render(<BleedV4 data-testid="b" space={space} />);
      const el = getByTestId('b');
      expect(el.className).toContain(`-mx-[var(--xen-space-${space})]`);
      expect(el.className).toContain(`-my-[var(--xen-space-${space})]`);
      unmount();
    });
  });

  it('defaults to md on both axes', () => {
    const { getByTestId } = render(<BleedV4 data-testid="b" />);
    expect(getByTestId('b').className).toContain('-mx-[var(--xen-space-md)]');
    expect(getByTestId('b').className).toContain('-my-[var(--xen-space-md)]');
  });

  it('lets horizontal and vertical override the uniform space independently', () => {
    const { getByTestId } = render(<BleedV4 data-testid="b" space="md" horizontal="lg" vertical="xs" />);
    const el = getByTestId('b');
    expect(el.className).toContain('-mx-[var(--xen-space-lg)]');
    expect(el.className).toContain('-my-[var(--xen-space-xs)]');
  });

  it('edge="start" bleeds only the inline-start side, leaving the other on the gutter', () => {
    const { getByTestId } = render(<BleedV4 data-testid="b" space="lg" edge="start" />);
    const el = getByTestId('b');
    expect(el.className).toContain('-ms-[var(--xen-space-lg)]');
    expect(el.className).not.toContain('-me-[');
    expect(el.className).not.toContain('-mx-[');
  });

  it('edge="end" bleeds only the inline-end side — the scrolling-chip-strip case', () => {
    const { getByTestId } = render(<BleedV4 data-testid="b" space="lg" edge="end" />);
    const el = getByTestId('b');
    expect(el.className).toContain('-me-[var(--xen-space-lg)]');
    expect(el.className).not.toContain('-ms-[');
    expect(el.className).not.toContain('-mx-[');
  });

  it('edge="both" is the default and is the only value that bleeds both sides', () => {
    const { getByTestId } = render(<BleedV4 data-testid="b" edge="both" space="sm" />);
    const { getByTestId: getDefault } = render(<BleedV4 data-testid="d" space="sm" />);
    expect(getByTestId('b').className).toBe(getDefault('d').className);
    expect(getByTestId('b').className).toContain('-mx-[var(--xen-space-sm)]');
  });

  it('edge governs the horizontal axis only — the vertical bleed is untouched', () => {
    const { getByTestId } = render(<BleedV4 data-testid="b" space="md" vertical="xl" edge="end" />);
    expect(getByTestId('b').className).toContain('-my-[var(--xen-space-xl)]');
  });

  it('takes the one-sided margin from `horizontal` when it is set', () => {
    const { getByTestId } = render(<BleedV4 data-testid="b" space="xs" horizontal="2xl" edge="start" />);
    expect(getByTestId('b').className).toContain('-ms-[var(--xen-space-2xl)]');
  });

  it('renders an empty box with no children — an edge-to-edge slot with nothing in it', () => {
    const { getByTestId } = render(<BleedV4 data-testid="b" edge="end" />);
    const el = getByTestId('b');
    expect(el.childNodes.length).toBe(0);
    expect(el.textContent).toBe('');
    expect(el.className).toContain('-me-[var(--xen-space-md)]');
  });

  it('merges a caller className and forwards its ref to the div', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(<BleedV4 ref={ref} data-testid="b" className="overflow-x-auto" />);
    const el = getByTestId('b');
    expect(el.className).toContain('overflow-x-auto');
    expect(ref.current).toBe(el);
  });

  it('paints nothing — no colour, border, radius, shadow or type class', () => {
    const { getByTestId } = render(<BleedV4 data-testid="b" space="lg" edge="end" />);
    expect(getByTestId('b').className).not.toMatch(/\b(bg|text|border|rounded|shadow)-/);
  });
});
