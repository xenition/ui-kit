/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Grid } from './Grid';
import { GridV4, type GridV4Props } from './GridV4';

function box(props: GridV4Props = {}): HTMLElement {
  const { container } = render(<GridV4 {...props} />);
  const el = container.querySelector('[data-xen-v4-grid]');
  expect(el).not.toBeNull();
  return el as HTMLElement;
}

describe('GridV4 (web)', () => {
  it('is additive: the base props still render the base layout', () => {
    const v4 = box({ columns: 3, gap: 'lg' });
    const legacy = render(<Grid data-testid="base" columns={3} gap="lg" />).getByTestId('base');
    expect(v4.style.gridTemplateColumns).toBe(legacy.style.gridTemplateColumns);
    expect(v4.className).toContain('gap-[var(--xen-space-lg)]');
    expect(legacy.className).toContain('gap-[var(--xen-space-lg)]');
  });

  it('defaults to two equal tracks — §3’s "two per row, never four"', () => {
    const el = box();
    expect(el.className).toContain('grid');
    expect(el.style.gridTemplateColumns).toBe('repeat(2, minmax(0, 1fr))');
  });

  it('binds the gutter to §4.1’s `md`, and to any token it is given', () => {
    expect(box().className).toContain('gap-[var(--xen-space-md)]');
    expect(box({ gap: 'xs' }).className).toContain('gap-[var(--xen-space-xs)]');
    expect(box({ gap: '2xl' }).className).toContain('gap-[var(--xen-space-2xl)]');
  });

  it('fits as many columns as the container holds on minItemWidth', () => {
    // The scoped form of the one Tamagui idea worth having: a layout that
    // restyles itself at a breakpoint, without a media-query prop system.
    const el = box({ minItemWidth: 240 });
    expect(el.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(240px, 1fr))');
  });

  it('lets minItemWidth win over columns — it is the more specific instruction', () => {
    const el = box({ columns: 2, minItemWidth: 200 });
    expect(el.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(200px, 1fr))');
    expect(el.style.gridTemplateColumns).not.toContain('repeat(2,');
  });

  it('keeps the fixed-column template when minItemWidth is absent', () => {
    expect(box({ columns: 4 }).style.gridTemplateColumns).toBe('repeat(4, minmax(0, 1fr))');
    expect(box({ columns: 4 }).style.gridTemplateColumns).not.toContain('auto-fit');
  });

  it('never emits an invalid track count', () => {
    // `repeat(0, …)` is invalid CSS and would drop the template entirely,
    // collapsing the grid to a single implicit column with no warning.
    expect(box({ columns: 0 }).style.gridTemplateColumns).toBe('repeat(1, minmax(0, 1fr))');
    expect(box({ columns: -3 }).style.gridTemplateColumns).toBe('repeat(1, minmax(0, 1fr))');
    expect(box({ columns: 2.7 }).style.gridTemplateColumns).toBe('repeat(2, minmax(0, 1fr))');
  });

  it('lays its children out as grid items, in order', () => {
    const { container } = render(
      <GridV4 columns={2}>
        <span>a</span>
        <span>b</span>
        <span>c</span>
      </GridV4>
    );
    const el = container.querySelector('[data-xen-v4-grid]') as HTMLElement;
    expect(el.childElementCount).toBe(3);
    expect(el.textContent).toBe('abc');
  });

  it('survives its empty case: no cells, nothing painted', () => {
    // §4.5 — never a blank bordered box. A grid paints no ground and draws no
    // edge, so an empty one is a zero-height, invisible container.
    const el = box();
    expect(el.childElementCount).toBe(0);
    expect(el.textContent).toBe('');
    expect(el.className).not.toContain('border');
    expect(el.className).not.toContain('bg-');
    expect(el.className).not.toContain('shadow');
    // Empty and responsive still renders a valid template, not a broken one.
    expect(box({ minItemWidth: 180 }).style.gridTemplateColumns).toBe(
      'repeat(auto-fit, minmax(180px, 1fr))'
    );
  });

  it('carries no depth of its own — §4.6, never a shadow inside a shadow', () => {
    const el = box({ columns: 2 });
    expect(el.className).not.toContain('shadow');
    expect(el.className).not.toContain('rounded');
  });

  it('forwards the ref, merges a className and passes DOM props through', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <GridV4 ref={ref} data-testid="g" id="kpis" className="mt-lg" />
    );
    const el = getByTestId('g');
    expect(ref.current).toBe(el);
    expect(el.id).toBe('kpis');
    expect(el.className).toContain('mt-lg');
    expect(el.className).toContain('grid');
  });

  it('lets a caller’s style win over the computed template', () => {
    const el = box({ style: { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' } });
    expect(el.style.gridTemplateColumns).toBe('repeat(5, minmax(0, 1fr))');
  });

  it('paints nothing with a literal — every value traces to a `--xen-*` token', () => {
    const el = box({ gap: 'lg', minItemWidth: 240 });
    expect(el.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(el.outerHTML).not.toMatch(/rgba?\(/);
    // The one bare number is the caller's own `minItemWidth`, in the inline
    // template — no spacing literal anywhere in the class list.
    expect(el.className).not.toMatch(/\[\d+px\]/);
  });
});
