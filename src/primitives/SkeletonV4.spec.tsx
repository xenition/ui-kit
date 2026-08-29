/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { SkeletonV4 } from './SkeletonV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(result.container).getByTestId('skeleton');
}

/** The skeleton's OWN injected sheet — not the provider's token block. */
function sheet(): string {
  return document.getElementById('xen-v4-skeleton-styles')?.textContent ?? '';
}

describe('SkeletonV4 (web)', () => {
  it('rests and peaks on two OPAQUE colours, never on the element`s opacity', () => {
    const el = renderThemed(<SkeletonV4 data-testid="skeleton" />);
    // `animate-pulse` fades the element itself to 0.5, turning the placeholder
    // into a window onto whatever it is sitting on.
    expect(el.className).not.toContain('animate-pulse');
    expect(sheet()).toContain(
      'background-color: color-mix(in srgb,var(--xen-on-surface) 8%,var(--xen-surface));'
    );
    expect(sheet()).toContain(
      'background-color: color-mix(in srgb,var(--xen-on-surface) 16%,var(--xen-surface));'
    );
  });

  it('never uses a ramp step — a placeholder is `on-surface` faded, not grey', () => {
    const el = renderThemed(<SkeletonV4 data-testid="skeleton" />);
    expect(el.className).not.toContain('bg-neutral-200');
    expect(sheet()).not.toContain('--xen-neutral-');
  });

  it('breathes symmetrically — no sweep, because a sweep claims progress', () => {
    renderThemed(<SkeletonV4 data-testid="skeleton" />);
    expect(sheet()).toContain('infinite alternate');
    // A sweep would need a translate; this only ever changes opacity.
    expect(sheet()).not.toContain('translate');
  });

  it('stops at its brighter end under prefers-reduced-motion — §36.10', () => {
    renderThemed(<SkeletonV4 data-testid="skeleton" />);
    expect(sheet()).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*animation: none; opacity: 1;/
    );
  });

  it('takes the text line height from the scale it stands in for — §36.7', () => {
    const el = renderThemed(<SkeletonV4 data-testid="skeleton" />);
    expect(el.className).toContain('h-[var(--xen-text-sm)]');
    expect(el.className).not.toContain('h-3.5');
  });

  it('matches the layout it replaces — N lines, the last one short', () => {
    const el = renderThemed(<SkeletonV4 data-testid="skeleton" lines={3} />);
    const rows = Array.from(el.querySelectorAll('[data-xen-v4-skeleton]')) as HTMLElement[];
    expect(rows.map((r) => r.style.width)).toEqual(['100%', '100%', '60%']);
  });

  it('rounds each variant from the seed', () => {
    expect(renderThemed(<SkeletonV4 data-testid="skeleton" variant="circle" />).className)
      .toContain('rounded-[var(--xen-radius-full)]');
    expect(renderThemed(<SkeletonV4 data-testid="skeleton" variant="rect" />).className)
      .toContain('rounded-[var(--xen-radius-md)]');
    expect(renderThemed(<SkeletonV4 data-testid="skeleton" />).className)
      .toContain('rounded-[var(--xen-radius-sm)]');
  });

  it('is hidden from assistive tech — a region announces busy, not its boxes', () => {
    expect(renderThemed(<SkeletonV4 data-testid="skeleton" />).getAttribute('aria-hidden'))
      .toBe('true');
    expect(renderThemed(<SkeletonV4 data-testid="skeleton" lines={2} />).getAttribute('aria-hidden'))
      .toBe('true');
  });

  it('honours an explicit width and height', () => {
    const el = renderThemed(
      <SkeletonV4 data-testid="skeleton" variant="rect" width={120} height={60} />
    );
    expect(el.style.width).toBe('120px');
    expect(el.style.height).toBe('60px');
  });

  it('names no literal colour — every value is a token', () => {
    renderThemed(<SkeletonV4 data-testid="skeleton" />);
    expect(sheet()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('forwards its ref', () => {
    let node: HTMLDivElement | null = null;
    const el = renderThemed(
      <SkeletonV4
        data-testid="skeleton"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(el);
  });
});
