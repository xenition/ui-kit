/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Container } from './Container';
import { ContainerV4, type ContainerV4Props } from './ContainerV4';

/** The gutter class the safe-area variant must produce at `padding="lg"`. */
const SAFE_LEFT_LG = 'pl-[calc(var(--xen-space-lg)+env(safe-area-inset-left,0px))]';
const SAFE_RIGHT_LG = 'pr-[calc(var(--xen-space-lg)+env(safe-area-inset-right,0px))]';

function box(props: ContainerV4Props = {}): HTMLElement {
  const { container } = render(<ContainerV4 {...props} />);
  const el = container.querySelector('[data-xen-v4-container]');
  expect(el).not.toBeNull();
  return el as HTMLElement;
}

describe('ContainerV4 (web)', () => {
  it('is additive: the base props still mean what they meant', () => {
    // Every prop the base takes, typed as the V4's — the compile-time half of
    // the parity rule.
    const base: ContainerV4Props = { maxWidth: 640, padding: 'md' };
    expect(base.maxWidth).toBe(640);

    const v4 = box();
    const legacy = render(<Container data-testid="base" />).getByTestId('base');
    // Same default gutter, same centring, same cap — V4 moved nothing.
    expect(v4.className).toContain('px-[var(--xen-space-lg)]');
    expect(legacy.className).toContain('px-[var(--xen-space-lg)]');
    expect(v4.style.maxWidth).toBe('480px');
    expect(legacy.style.maxWidth).toBe('480px');
  });

  it('centres a full-width column and caps it at the reading measure', () => {
    const el = box();
    expect(el.className).toContain('w-full');
    expect(el.className).toContain('mx-auto');
    expect(el.style.maxWidth).toBe('480px');
  });

  it('takes a numeric cap', () => {
    expect(box({ maxWidth: 960 }).style.maxWidth).toBe('960px');
  });

  it('uncaps on maxWidth="none" — the prop the base could not express', () => {
    // The base types `maxWidth` as `number`, so the only way out of 480 was a
    // number large enough to be a lie. `'none'` writes no cap at all.
    const el = box({ maxWidth: 'none' });
    expect(el.style.maxWidth).toBe('');
    // Still a centred, gutter-bearing column — only the cap is gone.
    expect(el.className).toContain('mx-auto');
    expect(el.className).toContain('px-[var(--xen-space-lg)]');
  });

  it('binds the page gutter to §4.1, one token per key', () => {
    expect(box({ padding: 'xs' }).className).toContain('px-[var(--xen-space-xs)]');
    expect(box({ padding: 'sm' }).className).toContain('px-[var(--xen-space-sm)]');
    expect(box({ padding: 'md' }).className).toContain('px-[var(--xen-space-md)]');
    // `lg` (24) is the default: M3's medium-window margin and the house gutter.
    expect(box().className).toContain('px-[var(--xen-space-lg)]');
    expect(box({ padding: 'xl' }).className).toContain('px-[var(--xen-space-xl)]');
    expect(box({ padding: '2xl' }).className).toContain('px-[var(--xen-space-2xl)]');
  });

  it('does not pay the safe-area inset unless asked — additive rule', () => {
    const el = box();
    expect(el.className).not.toContain('env(safe-area-inset-left');
    expect(el.className).toContain('px-[var(--xen-space-lg)]');
    expect(box({ safeArea: false }).className).not.toContain('env(');
  });

  it('adds the horizontal safe-area inset to the gutter on safeArea', () => {
    // HIG asks every layout to respect the system safe areas and nothing in
    // this module did. Gutter PLUS inset, not `max(gutter, inset)`, so content
    // keeps its breathing room instead of sitting flush against the notch.
    const el = box({ safeArea: true });
    expect(el.className).toContain(SAFE_LEFT_LG);
    expect(el.className).toContain(SAFE_RIGHT_LG);
    // The plain gutter is replaced, not stacked on top of the safe one.
    expect(el.className).not.toContain('px-[var(--xen-space-lg)]');
  });

  it('scales the safe gutter with the padding token', () => {
    const el = box({ safeArea: true, padding: 'md' });
    expect(el.className).toContain('pl-[calc(var(--xen-space-md)+env(safe-area-inset-left,0px))]');
    expect(el.className).toContain('pr-[calc(var(--xen-space-md)+env(safe-area-inset-right,0px))]');
  });

  it('survives its empty case: no children, nothing painted', () => {
    // §4.5 — a component with nothing to show renders nothing, never a blank
    // bordered box. A container paints no ground and draws no edge, so an
    // empty one is a zero-height, invisible column.
    const el = box();
    expect(el.childElementCount).toBe(0);
    expect(el.textContent).toBe('');
    expect(el.className).not.toContain('border');
    expect(el.className).not.toContain('bg-');
    expect(el.className).not.toContain('rounded');
    expect(el.className).not.toContain('shadow');
    // Empty AND uncapped AND safe-area'd still renders cleanly.
    const bare = box({ maxWidth: 'none', safeArea: true });
    expect(bare.childElementCount).toBe(0);
  });

  it('renders its children as-is', () => {
    const { getByText } = render(
      <ContainerV4>
        <span>page</span>
      </ContainerV4>
    );
    expect(getByText('page')).toBeTruthy();
  });

  it('forwards the ref, merges a className and passes DOM props through', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <ContainerV4 ref={ref} data-testid="c" id="page" className="pb-lg" />
    );
    const el = getByTestId('c');
    expect(ref.current).toBe(el);
    expect(el.id).toBe('page');
    expect(el.className).toContain('pb-lg');
    expect(el.className).toContain('mx-auto');
  });

  it('lets a caller’s style win over the computed cap', () => {
    const el = box({ style: { maxWidth: 800 } });
    expect(el.style.maxWidth).toBe('800px');
  });

  it('paints nothing with a literal — every value traces to a `--xen-*` token', () => {
    const el = box({ safeArea: true, padding: '2xl' });
    expect(el.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(el.outerHTML).not.toMatch(/rgba?\(/);
    // The only bare number is the caller's own `maxWidth`; no spacing literal.
    expect(el.className).not.toMatch(/\[\d+px\]/);
  });
});
