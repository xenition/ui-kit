/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { ScrollAreaV4 } from './ScrollAreaV4';

function draw(ui: ReactElement): HTMLElement {
  const { container } = render(ui);
  return container;
}

/** The region itself — the one element carrying the V4 marker. */
function region(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-xen-v4-scroll]') as HTMLElement;
}

const SAFE_LG = 'pb-[calc(var(--xen-space-lg)_+_env(safe-area-inset-bottom))]';

describe('ScrollAreaV4 (web)', () => {
  it('scrolls vertically with the page gutter by default — unchanged (§1.4)', () => {
    const el = region(draw(<ScrollAreaV4 />));
    expect(el.className).toContain('overflow-y-auto');
    expect(el.className).toContain('overflow-x-hidden');
    // §4.1's page gutter, and changing this default would not be additive.
    expect(el.className).toContain('p-[var(--xen-space-lg)]');
  });

  it('switches axis, including the two-axis case', () => {
    expect(region(draw(<ScrollAreaV4 axis="horizontal" />)).className).toContain('overflow-x-auto');
    expect(region(draw(<ScrollAreaV4 axis="horizontal" />)).className).toContain(
      'overflow-y-hidden'
    );
    expect(region(draw(<ScrollAreaV4 axis="both" />)).className).toContain('overflow-auto');
  });

  it('binds every padding step to a spacing token', () => {
    expect(region(draw(<ScrollAreaV4 padding="xs" />)).className).toContain(
      'p-[var(--xen-space-xs)]'
    );
    expect(region(draw(<ScrollAreaV4 padding="md" />)).className).toContain(
      'p-[var(--xen-space-md)]'
    );
    expect(region(draw(<ScrollAreaV4 padding="2xl" />)).className).toContain(
      'p-[var(--xen-space-2xl)]'
    );
  });

  it('padding="none" is truly full-bleed, for content that owns its own gutter', () => {
    // A row list carries §4.3's spacing.md itself; inside a padded region it is
    // indented twice and stops lining up with the rest of the page.
    const el = region(draw(<ScrollAreaV4 padding="none" />));
    expect(el.className).not.toMatch(/\bp-\[var/);
  });

  it('fills the theme surface on request, and is transparent otherwise', () => {
    expect(region(draw(<ScrollAreaV4 filled />)).className).toContain('bg-surface');
    expect(region(draw(<ScrollAreaV4 filled />)).className).toContain('text-on-surface');
    expect(region(draw(<ScrollAreaV4 />)).className).not.toContain('bg-surface');
  });

  it('pays no safe-area inset by default — the base read none (§1.4)', () => {
    expect(region(draw(<ScrollAreaV4 />)).className).not.toContain('safe-area-inset-bottom');
  });

  it('clears the home indicator when asked, composing the inset onto the padding', () => {
    // The same `env()` expression AuthStickyFooterV4 uses, so a scroll region
    // and the footer pinned under it clear the indicator by the same amount.
    expect(region(draw(<ScrollAreaV4 safeArea />)).className).toContain(SAFE_LG);
    expect(region(draw(<ScrollAreaV4 safeArea padding="md" />)).className).toContain(
      'pb-[calc(var(--xen-space-md)_+_env(safe-area-inset-bottom))]'
    );
  });

  it('pays the bare inset when the content is full-bleed', () => {
    const el = region(draw(<ScrollAreaV4 safeArea padding="none" />));
    expect(el.className).toContain('pb-[env(safe-area-inset-bottom)]');
    expect(el.className).not.toMatch(/\bp-\[var/);
  });

  it('renders the content it is handed, untouched', () => {
    const container = draw(
      <ScrollAreaV4>
        <p>Row one</p>
      </ScrollAreaV4>
    );
    expect(container.querySelector('p')!.textContent).toBe('Row one');
  });

  it('empty state: an empty region is still a viewport, not a blank box', () => {
    // §4.5's "render nothing" is about a component with nothing to SAY; this is
    // a viewport the caller sized, and collapsing it takes the scroll with it.
    const el = region(draw(<ScrollAreaV4 />));
    expect(el).not.toBeNull();
    expect(el.childNodes).toHaveLength(0);
    expect(el.className).toContain('overflow-y-auto');
  });

  it('empty state: paints no ground, no border and no rule of its own', () => {
    const el = region(draw(<ScrollAreaV4 />));
    expect(el.className).not.toMatch(/\bbg-/);
    expect(el.className).not.toMatch(/\bborder\b/);
    expect(el.className).not.toMatch(/\bshadow/);
  });

  it('forwards its ref and merges a className without losing the overflow', () => {
    const ref = createRef<HTMLDivElement>();
    const container = draw(<ScrollAreaV4 ref={ref} className="max-h-full" />);
    const el = region(container);
    expect(ref.current).toBe(el);
    expect(el.className).toContain('max-h-full');
    expect(el.className).toContain('overflow-y-auto');
  });

  it('passes DOM props through', () => {
    const el = region(draw(<ScrollAreaV4 id="feed" aria-label="Activity" />));
    expect(el.getAttribute('id')).toBe('feed');
    expect(el.getAttribute('aria-label')).toBe('Activity');
  });

  it('names no colour, spacing or radius of its own (§1.1)', () => {
    const container = draw(<ScrollAreaV4 filled safeArea />);
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    // Every length is a token or an `env()`, never a px/rem literal.
    expect(region(container).className).not.toMatch(/\b(p|pb|pt|px)-\[\d/);
  });
});
