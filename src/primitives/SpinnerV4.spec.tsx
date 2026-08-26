/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { SpinnerV4 } from './SpinnerV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(result.container).getByTestId('spinner');
}

/** The spinner's OWN injected sheet — not the provider's token block. */
function sheet(): string {
  return document.getElementById('xen-v4-spinner-styles')?.textContent ?? '';
}

describe('SpinnerV4 (web)', () => {
  it('sizes from the spacing scale — the base 16/24/32, now as tokens', () => {
    expect(renderThemed(<SpinnerV4 data-testid="spinner" size="sm" />).className).toContain(
      'h-[var(--xen-space-md)]'
    );
    expect(renderThemed(<SpinnerV4 data-testid="spinner" />).className).toContain(
      'h-[var(--xen-space-lg)]'
    );
    expect(renderThemed(<SpinnerV4 data-testid="spinner" size="lg" />).className).toContain(
      'h-[var(--xen-space-xl)]'
    );
  });

  it('names no ramp step — the base track was a LIGHT hoop on a dark page', () => {
    const el = renderThemed(<SpinnerV4 data-testid="spinner" />);
    expect(el.className).not.toContain('border-neutral-300');
    expect(sheet()).not.toContain('--xen-neutral-300');
  });

  it('keeps the ring one hue family, not a grey hoop with a chip on it', () => {
    renderThemed(<SpinnerV4 data-testid="spinner" />);
    expect(sheet()).toContain(
      'border-color: color-mix(in srgb,var(--xen-primary) 20%,var(--xen-surface));'
    );
    expect(sheet()).toContain('border-top-color: var(--xen-primary);');
  });

  it('stops turning under prefers-reduced-motion — §36.10', () => {
    renderThemed(<SpinnerV4 data-testid="spinner" />);
    expect(sheet()).toMatch(
      /@media \(prefers-reduced-motion: reduce\) \{\s*\[data-xen-v4-spinner\] \{ animation: none; \}/
    );
  });

  it('turns linearly and forever — no start, no end, no percentage (§36.7)', () => {
    renderThemed(<SpinnerV4 data-testid="spinner" />);
    expect(sheet()).toContain('animation: xen-v4-spin 900ms linear infinite;');
    // Never a bar: a spinner that filled would be inventing a fraction.
    expect(sheet()).not.toContain('width:');
  });

  it('announces itself as busy without needing a visible label', () => {
    const el = renderThemed(<SpinnerV4 data-testid="spinner" />);
    expect(el.getAttribute('role')).toBe('status');
    expect(el.getAttribute('aria-label')).toBe('Loading');
  });

  it('names no literal colour — every value is a token', () => {
    renderThemed(<SpinnerV4 data-testid="spinner" />);
    const own = sheet().slice(sheet().indexOf('[data-xen-v4-spinner]'));
    expect(own).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLSpanElement | null = null;
    const el = renderThemed(
      <SpinnerV4
        data-testid="spinner"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(el);
  });
});
