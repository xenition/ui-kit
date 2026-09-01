/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { StickyV4 } from './StickyV4';

function draw(ui: ReactElement): HTMLElement {
  const { container } = render(ui);
  return container;
}

/** The band itself — the one element carrying the V4 marker. */
function band(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[data-xen-v4-sticky]');
}

/**
 * The composed distance from the sticky edge.
 *
 * It is a custom property rather than a `top` / `bottom` value because it has
 * to be composed from a token and an `env()`, and a class built by template
 * literal is invisible to Tailwind's scanner — so the class is a literal and
 * the value rides down a variable.
 */
function offsetOf(container: HTMLElement): string {
  return band(container)!.style.getPropertyValue('--xen-v4-sticky-offset');
}

/** `border-border` contains the substring `border-b`, so match whole classes. */
function hasClass(el: HTMLElement, name: string): boolean {
  return el.className.split(/\s+/).includes(name);
}

const BAR = <div>Bar</div>;

describe('StickyV4 (web)', () => {
  it('pins to the top edge by default, above the content it covers', () => {
    const el = band(draw(<StickyV4>{BAR}</StickyV4>))!;
    expect(hasClass(el, 'sticky')).toBe(true);
    // Without a stacking order a positioned child of the scrolling content
    // paints over the bar, which defeats the point of pinning it.
    expect(hasClass(el, 'z-10')).toBe(true);
    expect(hasClass(el, 'top-[var(--xen-v4-sticky-offset)]')).toBe(true);
    expect(el.getAttribute('data-xen-v4-sticky')).toBe('top');
  });

  it('pins to the bottom edge on request', () => {
    const el = band(draw(<StickyV4 side="bottom">{BAR}</StickyV4>))!;
    expect(hasClass(el, 'bottom-[var(--xen-v4-sticky-offset)]')).toBe(true);
    expect(hasClass(el, 'top-[var(--xen-v4-sticky-offset)]')).toBe(false);
    expect(el.getAttribute('data-xen-v4-sticky')).toBe('bottom');
  });

  it('sits flush against the edge by default — unchanged from the base (§1.4)', () => {
    expect(offsetOf(draw(<StickyV4>{BAR}</StickyV4>))).toBe('0px');
  });

  it('keeps the base meaning of a numeric offset — a measured px distance', () => {
    // For clearing an app bar of a height the caller knows and the design
    // system does not.
    expect(offsetOf(draw(<StickyV4 offset={56}>{BAR}</StickyV4>))).toBe('56px');
    expect(offsetOf(draw(<StickyV4 side="bottom" offset={56}>{BAR}</StickyV4>))).toBe('56px');
  });

  it('takes a spacing token, so a normal gap need not be typed as a number (§1.1)', () => {
    expect(offsetOf(draw(<StickyV4 offset="lg">{BAR}</StickyV4>))).toBe('var(--xen-space-lg)');
    expect(offsetOf(draw(<StickyV4 side="bottom" offset="md">{BAR}</StickyV4>))).toBe(
      'var(--xen-space-md)'
    );
    expect(offsetOf(draw(<StickyV4 offset="2xl">{BAR}</StickyV4>))).toBe('var(--xen-space-2xl)');
  });

  it('reads no safe-area inset by default — the base read none (§1.4)', () => {
    expect(offsetOf(draw(<StickyV4 offset="lg">{BAR}</StickyV4>))).not.toContain('env(');
  });

  it('clears the system chrome when asked, on whichever edge it is pinned to', () => {
    // The same `env()` expression AuthStickyFooterV4 uses — one approach to the
    // inset across the kit, not two.
    expect(offsetOf(draw(<StickyV4 safeArea>{BAR}</StickyV4>))).toBe(
      'calc(0px + env(safe-area-inset-top))'
    );
    expect(offsetOf(draw(<StickyV4 side="bottom" safeArea offset="lg">{BAR}</StickyV4>))).toBe(
      'calc(var(--xen-space-lg) + env(safe-area-inset-bottom))'
    );
  });

  it('is transparent by default, so a pinned label inside a card stays a label', () => {
    const el = band(draw(<StickyV4>{BAR}</StickyV4>))!;
    expect(el.className).not.toContain('bg-surface');
    expect(el.className).not.toContain('border');
  });

  it('wears §5’s band on request: opaque surface plus one hairline, on the edge content passes', () => {
    const top = band(draw(<StickyV4 filled>{BAR}</StickyV4>))!;
    expect(hasClass(top, 'bg-surface')).toBe(true);
    expect(hasClass(top, 'text-on-surface')).toBe(true);
    expect(hasClass(top, 'border-b')).toBe(true);
    expect(hasClass(top, 'border-border')).toBe(true);
    // One hairline, on the edge the content passes — never both.
    expect(hasClass(top, 'border-t')).toBe(false);

    const bottom = band(draw(<StickyV4 side="bottom" filled>{BAR}</StickyV4>))!;
    expect(hasClass(bottom, 'border-t')).toBe(true);
    expect(hasClass(bottom, 'border-b')).toBe(false);
  });

  it('carries no shadow — §4.6 gives one to a card, a sheet and the one action', () => {
    expect(band(draw(<StickyV4 filled>{BAR}</StickyV4>))!.className).not.toMatch(/\bshadow/);
  });

  it('renders the bar it is handed, untouched', () => {
    const container = draw(
      <StickyV4 filled>
        <button type="button">Continue</button>
      </StickyV4>
    );
    expect(container.querySelector('button')!.textContent).toBe('Continue');
  });

  it('empty state: nothing to pin, nothing rendered (§4.5)', () => {
    // An empty band is a hairline and a strip of surface across the edge of the
    // screen with no explanation.
    expect(band(draw(<StickyV4 />))).toBeNull();
    expect(band(draw(<StickyV4 filled side="bottom" />))).toBeNull();
  });

  it('empty state: a bar behind a false conditional counts as absent', () => {
    expect(band(draw(<StickyV4>{false}</StickyV4>))).toBeNull();
    expect(band(draw(<StickyV4>{null}</StickyV4>))).toBeNull();
    expect(band(draw(<StickyV4>{undefined}</StickyV4>))).toBeNull();
  });

  it('forwards its ref and merges a className without losing the pin', () => {
    const ref = createRef<HTMLDivElement>();
    const container = draw(
      <StickyV4 ref={ref} className="px-lg">
        {BAR}
      </StickyV4>
    );
    const el = band(container)!;
    expect(ref.current).toBe(el);
    expect(hasClass(el, 'px-lg')).toBe(true);
    expect(hasClass(el, 'sticky')).toBe(true);
  });

  it('passes DOM props through and lets a caller add to the style', () => {
    const container = draw(
      <StickyV4 id="bar" aria-label="Toolbar" offset="lg" style={{ marginTop: 8 }}>
        {BAR}
      </StickyV4>
    );
    const el = band(container)!;
    expect(el.getAttribute('id')).toBe('bar');
    expect(el.getAttribute('aria-label')).toBe('Toolbar');
    expect(el.style.marginTop).toBe('8px');
    // The caller's style must not cost the offset.
    expect(offsetOf(container)).toBe('var(--xen-space-lg)');
  });

  it('names no colour of its own, and no spacing literal when given a token (§1.1)', () => {
    const container = draw(
      <StickyV4 filled offset="lg" safeArea>
        {BAR}
      </StickyV4>
    );
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(offsetOf(container)).not.toMatch(/\d+px/);
  });
});
