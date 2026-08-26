/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { StatusMessageV4 } from './StatusMessageV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(result.container).getByTestId('status');
}

describe('StatusMessageV4 (web)', () => {
  it('loads with the kit spinner instead of a second, private one', () => {
    const el = renderThemed(<StatusMessageV4 data-testid="status" state="loading" />);
    expect(el.querySelector('[data-xen-v4-spinner]')).not.toBeNull();
    // The base injected its own ring sheet — two spinners in one kit drift.
    expect(el.querySelector('[data-xen-spinner]')).toBeNull();
    expect(el.getAttribute('aria-busy')).toBe('true');
  });

  it('never shows a determinate bar — §36.7 forbids inventing a fraction', () => {
    const el = renderThemed(
      <StatusMessageV4 data-testid="status" state="loading" message="Working" />
    );
    expect(el.querySelector('[role="progressbar"]')).toBeNull();
    expect(el.innerHTML).not.toContain('%');
  });

  it('promotes the empty copy out of the quietest type in the kit — §15', () => {
    const el = renderThemed(
      <StatusMessageV4 data-testid="status" state="empty" message="No habits yet" />
    );
    const copy = el.querySelector('span');
    expect(copy?.className).toContain('text-on-surface');
    expect(copy?.className).toContain('text-base');
    expect(copy?.className).not.toContain('text-muted');
  });

  it('gives a failure a body instead of red text in a void — §38', () => {
    const el = renderThemed(<StatusMessageV4 data-testid="status" state="error" />);
    const panel = el.firstElementChild as HTMLElement;
    expect(panel.className).toContain(
      'bg-[color-mix(in_srgb,var(--xen-danger)_10%,var(--xen-surface))]'
    );
    // The edge is neutral: the tint already says which kind of container.
    expect(panel.className).toContain('border-border');
    // And the label is the contrast-safe TEXT form, not the raw fill.
    expect(panel.className).toContain('text-danger-text');
  });

  it('announces each state the way a screen reader needs it', () => {
    expect(
      renderThemed(<StatusMessageV4 data-testid="status" state="loading" />).getAttribute('role')
    ).toBe('status');
    expect(
      renderThemed(<StatusMessageV4 data-testid="status" state="error" />).getAttribute('role')
    ).toBe('alert');
  });

  it('falls back to copy for every state', () => {
    expect(
      renderThemed(<StatusMessageV4 data-testid="status" state="empty" />).textContent
    ).toBe('Nothing here yet.');
    expect(
      renderThemed(<StatusMessageV4 data-testid="status" state="error" />).textContent
    ).toBe('Something went wrong.');
  });

  it('spaces itself from the scale, not from fixed px utilities', () => {
    const el = renderThemed(<StatusMessageV4 data-testid="status" state="empty" />);
    expect(el.className).toContain('py-[var(--xen-space-xl)]');
    expect(el.className).toContain('gap-[var(--xen-space-sm)]');
  });

  it('names no literal colour — every value is a token', () => {
    (['loading', 'empty', 'error'] as const).forEach((state) => {
      const el = renderThemed(<StatusMessageV4 data-testid="status" state={state} />);
      expect(el.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    });
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const el = renderThemed(
      <StatusMessageV4
        data-testid="status"
        state="empty"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(el);
  });
});
