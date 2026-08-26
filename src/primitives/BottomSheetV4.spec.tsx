/** @jest-environment jsdom */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import { composeGlassCss } from '../theme/glass';
import type { ThemeSeed } from '../theme/types';
import type { BottomSheet } from './BottomSheet';
import { BottomSheetV4 } from './BottomSheetV4';
import { SCRIM_ALPHA, scrimCss } from './internal/surface-v4';

/** The stylesheet the V4 overlays inject. */
const v4css = (): string => document.getElementById('xen-surface-v4-styles')?.textContent ?? '';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function open(props: Partial<React.ComponentProps<typeof BottomSheetV4>> = {}, depth?: ThemeSeed['depth']) {
  return render(
    <XenitionUIProvider theme={{ ...seed, depth }}>
      <BottomSheetV4 open onClose={() => {}} title="Filters" {...props}>
        <p>panel body</p>
      </BottomSheetV4>
    </XenitionUIProvider>
  );
}

/* The LAST match: a test that opens twice leaves two portals in the body. */
const last = (sel: string): HTMLElement => {
  const all = document.querySelectorAll(sel);
  return all[all.length - 1] as HTMLElement;
};
const panel = (): HTMLElement => last('[data-xen-v4-sheet]');
const scrim = (): HTMLElement => last('[data-xen-v4-scrim]');

describe('BottomSheetV4', () => {
  it('takes exactly the base component’s props', () => {
    // Prop parity is the contract of a design line: an app switches V4 on at
    // the root and nothing else changes. Checked at compile time, so a prop
    // added to one and not the other fails the build rather than a review.
    const same: React.ComponentProps<typeof BottomSheet> = {
      open: true,
      onClose: () => {},
      title: 'Filters',
      snap: 0.4,
    };
    const asV4: React.ComponentProps<typeof BottomSheetV4> = same;
    expect(asV4).toBe(same);
  });

  it('renders nothing until open, then portals title and children to the body', () => {
    const closed = render(
      <XenitionUIProvider theme={seed}>
        <BottomSheetV4 open={false} onClose={() => {}}>
          <p>panel body</p>
        </BottomSheetV4>
      </XenitionUIProvider>
    );
    expect(closed.queryByText('panel body')).toBeNull();

    const { getByText } = open();
    expect(getByText('Filters')).toBeTruthy();
    expect(getByText('panel body')).toBeTruthy();
    expect(panel().closest('body')).toBe(document.body);
  });

  it('lifts the panel with the elevation token, not a Tailwind shadow-xl', () => {
    open();
    expect(panel().getAttribute('data-xen-v4-panel')).toBe('solid');
    expect(v4css()).toContain('box-shadow: var(--xen-elevation-sheet);');
    expect(panel().className).not.toContain('shadow-xl');
  });

  it('scrims from the shadow colour, so it stays dark in dark mode too', () => {
    // The base sheet scrims with `bg-neutral-950/50`, and the dark block
    // re-emits the ramp inverted — so on a dark page that class paints a
    // near-WHITE veil. `--xen-elevation-color` does not invert.
    open();
    expect(v4css()).toContain(`[data-xen-v4-scrim] {\n  background-color: ${scrimCss()};`);
    expect(scrimCss()).toContain('--xen-elevation-color');
    expect(scrim().className).not.toContain('neutral-950');
    // Lighter than the base 50%, because the panel's real shadow already
    // darkens the contact edge.
    expect(SCRIM_ALPHA).toBeLessThan(50);
  });

  it('is opaque under soft depth and translucent under glass — one depth check', () => {
    open({}, 'soft');
    expect(panel().getAttribute('data-xen-v4-panel')).toBe('solid');

    open({}, 'glass');
    expect(panel().getAttribute('data-xen-v4-panel')).toBe('glass');

    // The attribute is the whole depth branch; the stylesheet carries the rest.
    const css = v4css();
    expect(css).toContain('[data-xen-v4-panel] {\n  background-color: var(--xen-surface);');
    const glass = css.slice(css.indexOf('[data-xen-v4-panel="glass"]'));
    expect(glass).toContain(`background-color: ${composeGlassCss('regular')};`);
    expect(glass).toContain('border: 1px solid var(--xen-glass-border);');
    expect(glass).toContain('backdrop-filter: blur(var(--xen-glass-blur));');
  });

  it('goes flat for free — the token is already zeroed, so nothing branches', () => {
    open({}, 'flat');
    // Still the plain solid panel reading the same var: the compiler zeroed the
    // shadow, the component did not, and there is no `depth === 'flat'` branch
    // anywhere in the file.
    expect(panel().getAttribute('data-xen-v4-panel')).toBe('solid');
    expect(v4css()).toContain('box-shadow: var(--xen-elevation-sheet);');
    // …and the scrim survives, because flat is about depth, not about
    // dismissing the idea of a modal layer.
    expect(scrim()).toBeTruthy();
    expect(v4css()).toContain(scrimCss());
  });

  it('closes on the scrim and on Escape', () => {
    const onClose = jest.fn();
    open({ onClose });
    fireEvent.click(scrim());
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('pads its own body and header from the spacing scale', () => {
    const { getByText } = open();
    expect(getByText('panel body').parentElement!.className).toContain('px-lg');
    expect(getByText('Filters').parentElement!.className).toContain('px-lg');
    // The header is separated by a hairline, so the title reads as a header
    // rather than as the first line of the body.
    expect(getByText('Filters').parentElement!.className).toContain('border-b');
  });

  it('sizes the grab handle from the spacing scale, not from a magic 40px', () => {
    open();
    const handle = panel().querySelector('span[aria-hidden="true"]') as HTMLElement;
    expect(handle.className).toContain('w-[calc(var(--xen-space-xl)_+_var(--xen-space-sm))]');
    expect(handle.className).toContain('h-xs');
  });

  it('replaces the travel with a fade under prefers-reduced-motion', () => {
    open();
    const css = v4css();
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    // Replaced, not removed: an overlay that appears with no transition at all
    // reads as a glitch (§36.10).
    const reduced = css.slice(css.indexOf('@media (prefers-reduced-motion'));
    expect(reduced).toContain('xen-v4-fade-in');
    expect(reduced).not.toContain('xen-v4-sheet-in ');
  });

  it('introduces no literal colours anywhere it paints', () => {
    open({}, 'glass');
    expect(v4css()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(v4css()).not.toMatch(/\brgba?\(/);
    for (const el of [panel(), scrim()]) {
      expect(el.getAttribute('style') ?? '').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
      expect(el.getAttribute('style') ?? '').not.toMatch(/\brgba?\(/);
    }
  });
});
