/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { LoadingOverlayV4 } from './LoadingOverlayV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED) {
  return render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>).container;
}

/** The shared V4 overlay sheet — not the provider's token block. */
function sheet(): string {
  return document.getElementById('xen-surface-v4-styles')?.textContent ?? '';
}

describe('LoadingOverlayV4 (web)', () => {
  it('renders nothing when not visible', () => {
    const el = renderThemed(<LoadingOverlayV4 visible={false} />);
    expect(el.querySelector('[data-xen-v4-overlay]')).toBeNull();
  });

  it('never dims with a ramp step — that inverts into a white veil', () => {
    const el = renderThemed(<LoadingOverlayV4 visible />);
    expect(el.innerHTML).not.toContain('bg-neutral-950');
    // The shared scrim, built from the elevation colour, which does not invert.
    expect(el.querySelector('[data-xen-v4-scrim]')).not.toBeNull();
    expect(sheet()).toContain('var(--xen-elevation-color)');
  });

  it('is the ONE component in the feedback line that takes a layer', () => {
    const el = renderThemed(<LoadingOverlayV4 visible />);
    const panel = el.querySelector('[data-xen-v4-panel]');
    expect(panel).not.toBeNull();
    // The same `--xen-elevation-sheet` ModalV4 takes, for the same reason.
    expect(sheet()).toContain('box-shadow: var(--xen-elevation-sheet);');
  });

  it('asks for glass rather than assuming it — the single depth check', () => {
    const solid = renderThemed(<LoadingOverlayV4 visible />);
    expect(solid.querySelector('[data-xen-v4-panel]')?.getAttribute('data-xen-v4-panel')).toBe(
      'solid'
    );
    const glassy = renderThemed(<LoadingOverlayV4 visible />, { ...SEED, depth: 'glass' });
    expect(glassy.querySelector('[data-xen-v4-panel]')?.getAttribute('data-xen-v4-panel')).toBe(
      'glass'
    );
  });

  it('labels with `on-surface`, never `muted` — over glass, muted fails AA', () => {
    const el = renderThemed(<LoadingOverlayV4 visible label="Saving your work" />);
    const label = el.querySelector('span:not([data-xen-v4-spinner])');
    expect(label?.className).toContain('text-on-surface');
    expect(label?.className).not.toContain('text-muted');
  });

  it('uses the kit spinner, hidden from the region that already announces', () => {
    const el = renderThemed(<LoadingOverlayV4 visible />);
    const spinner = el.querySelector('[data-xen-v4-spinner]');
    expect(spinner).not.toBeNull();
    expect(spinner?.getAttribute('aria-hidden')).toBe('true');
    expect(spinner?.hasAttribute('role')).toBe(false);
  });

  it('announces one busy region', () => {
    const el = renderThemed(<LoadingOverlayV4 visible label="Saving" />);
    const region = el.querySelector('[data-xen-v4-overlay]') as HTMLElement;
    expect(region.getAttribute('role')).toBe('progressbar');
    expect(region.getAttribute('aria-busy')).toBe('true');
    expect(region.getAttribute('aria-label')).toBe('Saving');
  });

  it('reduces to a plain fade under prefers-reduced-motion — §36.10', () => {
    renderThemed(<LoadingOverlayV4 visible />);
    expect(sheet()).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*xen-v4-fade-in/
    );
  });

  it('names no literal colour — every value is a token', () => {
    const overlay = renderThemed(<LoadingOverlayV4 visible label="Saving" />).querySelector(
      '[data-xen-v4-overlay]'
    ) as HTMLElement;
    expect(overlay.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
