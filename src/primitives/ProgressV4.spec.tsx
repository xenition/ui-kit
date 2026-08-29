/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { ProgressV4 } from './ProgressV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(result.container).getByTestId('progress');
}

function fill(el: HTMLElement): HTMLElement {
  return el.querySelector('[data-xen-v4-progress-fill]') as HTMLElement;
}

describe('ProgressV4 (web)', () => {
  it('builds the track from the fill`s own tone — one colour, two strengths', () => {
    const el = renderThemed(<ProgressV4 data-testid="progress" value={40} tone="success" />);
    // The base painted `bg-neutral-200`: a ramp step with no relationship to
    // the thing filling it.
    expect(el.className).not.toContain('bg-neutral-200');
    expect(el.className).toContain(
      'bg-[color-mix(in_srgb,var(--xen-success)_10%,var(--xen-surface))]'
    );
    expect(fill(el).className).toContain('bg-success');
  });

  it('routes `warn` to the WARN slot, never to the brand accent — §35.4', () => {
    const el = renderThemed(<ProgressV4 data-testid="progress" value={50} tone="warn" />);
    expect(fill(el).className).toContain('bg-warn');
    expect(el.className).toContain('var(--xen-warn)');
    expect(el.className).not.toContain('accent');
  });

  it('makes a started task look started, and a zero task look zero', () => {
    const started = renderThemed(<ProgressV4 data-testid="progress" value={1} />);
    expect(fill(started).style.width).toBe('1%');
    // A floor at the bar's own thickness — never enough to read as a quantity.
    expect(fill(started).style.minWidth).toBe('var(--xen-space-sm)');

    const zero = renderThemed(<ProgressV4 data-testid="progress" value={0} />);
    expect(fill(zero).style.width).toBe('0%');
    expect(fill(zero).style.minWidth).toBe('0');
  });

  it('clamps out-of-range values', () => {
    expect(fill(renderThemed(<ProgressV4 data-testid="progress" value={-5} />)).style.width)
      .toBe('0%');
    expect(fill(renderThemed(<ProgressV4 data-testid="progress" value={500} />)).style.width)
      .toBe('100%');
    expect(
      fill(renderThemed(<ProgressV4 data-testid="progress" value={5} max={0} />)).style.width
    ).toBe('0%');
  });

  it('takes its thickness from the spacing scale, not a fixed utility', () => {
    expect(
      renderThemed(<ProgressV4 data-testid="progress" value={1} size="sm" />).className
    ).toContain('h-[var(--xen-space-xs)]');
    expect(renderThemed(<ProgressV4 data-testid="progress" value={1} />).className).toContain(
      'h-[var(--xen-space-sm)]'
    );
  });

  it('rounds from the seed — a sharp brand gets square ends (§8)', () => {
    const el = renderThemed(<ProgressV4 data-testid="progress" value={50} />);
    expect(el.className).toContain('rounded-[var(--xen-radius-full)]');
    expect(el.className).not.toContain('rounded-full');
  });

  it('carries no gradient and no shadow — the length is the whole message', () => {
    const el = renderThemed(<ProgressV4 data-testid="progress" value={50} />);
    expect(el.innerHTML).not.toMatch(/gradient/);
    expect(el.className).not.toMatch(/\bshadow/);
    expect(fill(el).className).not.toMatch(/gradient/);
  });

  it('snaps instead of easing under reduced motion — §36.10', () => {
    const el = renderThemed(<ProgressV4 data-testid="progress" value={50} />);
    expect(fill(el).className).toContain('motion-reduce:transition-none');
  });

  it('reports its value to assistive tech', () => {
    const el = renderThemed(<ProgressV4 data-testid="progress" value={30} max={60} />);
    expect(el.getAttribute('role')).toBe('progressbar');
    expect(el.getAttribute('aria-valuenow')).toBe('30');
    expect(el.getAttribute('aria-valuemax')).toBe('60');
  });

  it('names no literal colour — every value is a token', () => {
    const el = renderThemed(<ProgressV4 data-testid="progress" value={50} tone="danger" />);
    expect(el.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const el = renderThemed(
      <ProgressV4
        data-testid="progress"
        value={10}
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(el);
  });
});
