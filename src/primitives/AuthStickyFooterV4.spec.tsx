/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { AuthStickyFooterV4 } from './AuthStickyFooterV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function draw(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container;
}

/** The band itself — the one element carrying the V4 footer marker. */
function band(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[data-xen-v4-auth-footer]');
}

/**
 * Just what the component drew. The provider stamps a `<style>` of compiled
 * tokens and a `data-theme` wrapper into the same container, and neither is
 * this component's markup.
 */
function markup(container: HTMLElement): string {
  return container.querySelector('[data-theme]')!.innerHTML;
}

const CTA = <button type="button">Continue</button>;

describe('AuthStickyFooterV4 (web)', () => {
  it('pins to the bottom behind an opaque surface with a hairline on top (§5)', () => {
    const el = band(draw(<AuthStickyFooterV4>{CTA}</AuthStickyFooterV4>))!;
    // Sticky + opaque surface is what makes content scroll UNDER the action
    // rather than collide with it.
    expect(el.className).toContain('sticky');
    expect(el.className).toContain('bottom-0');
    expect(el.className).toContain('bg-surface');
    expect(el.className).toContain('border-t');
    expect(el.className).toContain('border-border');
  });

  it('stacks above the content it is pinned over', () => {
    // The base had no stacking order, so a positioned child of the scrolling
    // content could paint over the CTA — which defeats the whole band.
    expect(band(draw(<AuthStickyFooterV4>{CTA}</AuthStickyFooterV4>))!.className).toContain('z-10');
  });

  it('sits ABOVE the safe-area inset by default (§5)', () => {
    const el = band(draw(<AuthStickyFooterV4>{CTA}</AuthStickyFooterV4>))!;
    // spacing.lg PLUS the inset — the base read no inset at all, so the CTA
    // sat under the home indicator on a notched phone.
    expect(el.className).toContain(
      'pb-[calc(var(--xen-space-lg)_+_env(safe-area-inset-bottom))]'
    );
    expect(el.className).toContain('pt-lg');
    expect(el.className).toContain('px-lg');
  });

  it('gives the inset back when an ancestor already consumed it', () => {
    const el = band(draw(<AuthStickyFooterV4 safeArea={false}>{CTA}</AuthStickyFooterV4>))!;
    expect(el.className).toContain('pb-lg');
    expect(el.className).not.toContain('safe-area-inset-bottom');
  });

  it('renders the CTA it is handed, untouched', () => {
    const container = draw(<AuthStickyFooterV4>{CTA}</AuthStickyFooterV4>);
    expect(container.querySelector('button')!.textContent).toBe('Continue');
  });

  it('puts the secondary action BELOW the CTA, centred and muted — never beside it (§5)', () => {
    const container = draw(
      <AuthStickyFooterV4 secondaryLabel="No thanks">{CTA}</AuthStickyFooterV4>
    );
    const el = band(container)!;
    // A column, so "below" is structural rather than a hope about wrapping.
    expect(el.className).toContain('flex-col');

    const secondary = el.querySelector('[data-xen-v4-auth-switch]')!;
    expect(secondary.getAttribute('data-xen-v4-auth-switch')).toBe('muted');
    expect(secondary.className).toContain('justify-center');
    // Order: the CTA first, the link after it.
    const kids = Array.from(el.children);
    expect(kids).toHaveLength(2);
    expect(kids[0]!.textContent).toBe('Continue');
    expect(kids[1]).toBe(secondary);
  });

  it('reports the secondary press and can freeze it independently of the CTA', () => {
    const onSecondaryClick = jest.fn();
    const container = draw(
      <AuthStickyFooterV4 secondaryLabel="No thanks" onSecondaryClick={onSecondaryClick}>
        {CTA}
      </AuthStickyFooterV4>
    );
    const link = container.querySelector('[data-xen-v4-auth-link]') as HTMLButtonElement;
    fireEvent.click(link);
    expect(onSecondaryClick).toHaveBeenCalledTimes(1);

    const frozen = draw(
      <AuthStickyFooterV4 secondaryLabel="No thanks" secondaryDisabled>
        {CTA}
      </AuthStickyFooterV4>
    );
    const disabledLink = frozen.querySelector('[data-xen-v4-auth-link]') as HTMLButtonElement;
    expect(disabledLink.disabled).toBe(true);
    // M3's 0.38 for disabled content, not a hand-picked 0.5.
    expect(disabledLink.className).toContain('disabled:opacity-[0.38]');
  });

  it('draws no secondary line when none was asked for', () => {
    const container = draw(<AuthStickyFooterV4>{CTA}</AuthStickyFooterV4>);
    expect(container.querySelector('[data-xen-v4-auth-switch]')).toBeNull();
  });

  it('empty state: nothing to pin, nothing rendered (§12)', () => {
    // A hairline and a strip of surface across the bottom with nothing on it
    // is the same defect as §9's divider above no providers.
    expect(band(draw(<AuthStickyFooterV4 />))).toBeNull();
    expect(markup(draw(<AuthStickyFooterV4 />))).toBe('');
  });

  it('empty state: a CTA behind a false conditional counts as absent', () => {
    expect(band(draw(<AuthStickyFooterV4>{false}</AuthStickyFooterV4>))).toBeNull();
    expect(band(draw(<AuthStickyFooterV4>{null}</AuthStickyFooterV4>))).toBeNull();
  });

  it('empty state: a secondary action alone still earns the band', () => {
    const container = draw(<AuthStickyFooterV4 secondaryLabel="Back" />);
    expect(band(container)).not.toBeNull();
    expect(container.querySelector('[data-xen-v4-auth-link]')!.textContent).toBe('Back');
  });

  it('merges a className and passes DOM props through', () => {
    const container = draw(
      <AuthStickyFooterV4 id="footer" className="mt-lg" aria-label="Actions">
        {CTA}
      </AuthStickyFooterV4>
    );
    const el = band(container)!;
    expect(el.getAttribute('id')).toBe('footer');
    expect(el.getAttribute('aria-label')).toBe('Actions');
    expect(el.className).toContain('mt-lg');
    expect(el.className).toContain('sticky');
  });

  it('names no colour, spacing or radius of its own (§10.1)', () => {
    const container = draw(
      <AuthStickyFooterV4 secondaryLabel="No thanks">{CTA}</AuthStickyFooterV4>
    );
    expect(markup(container)).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    // Every length is a token or an `env()`, never a px/rem literal.
    expect(band(container)!.className).not.toMatch(/\b(p|pb|pt|px|gap)-\[\d/);
  });
});
