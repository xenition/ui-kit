/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import type { ThemeSeed } from '../theme/types';
import { StatusDotV4 } from './StatusDotV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(result.container).getByTestId('dot');
}

/** The dot's OWN injected sheet — not the provider's token block. */
function sheet(): string {
  return document.getElementById('xen-v4-status-dot-styles')?.textContent ?? '';
}

describe('StatusDotV4 (web)', () => {
  it('draws the mark in the TEXT form of its slot, never the raw fill', () => {
    renderThemed(<StatusDotV4 data-testid="dot" tone="warn" />);
    expect(sheet()).toContain('background-color: var(--xen-warn-text);');
    // `warn` is a background colour with no promise against `surface`; at eight
    // pixels on a light page that is a dot nobody can find.
    expect(sheet()).not.toContain('background-color: var(--xen-warn);');
  });

  it('gives every tone a mark that clears AA against the page', () => {
    const theme = compileTheme(SEED);
    (['success', 'warn', 'danger', 'primary', 'accent'] as const).forEach((tone) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        const key = `${tone}Text` as 'successText';
        expect(contrastRatio(theme[scheme][key], theme[scheme].surface)).toBeGreaterThanOrEqual(
          4.5
        );
      });
    });
  });

  it('sizes from the spacing scale — the 0.5rem the base hard-coded', () => {
    renderThemed(<StatusDotV4 data-testid="dot" />);
    expect(sheet()).toContain('width: var(--xen-space-sm);');
    expect(sheet()).not.toContain('0.5rem');
  });

  it('echoes only when asked', () => {
    const on = renderThemed(<StatusDotV4 data-testid="dot" />);
    expect(on.querySelector('[data-xen-v4-status-echo]')).not.toBeNull();
    const off = renderThemed(<StatusDotV4 data-testid="dot" pulse={false} />);
    expect(off.querySelector('[data-xen-v4-status-echo]')).toBeNull();
  });

  it('removes the echo under prefers-reduced-motion — §36.10', () => {
    renderThemed(<StatusDotV4 data-testid="dot" />);
    expect(sheet()).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*animation: none; opacity: 0;/
    );
  });

  it('is decorative without a label and announced with one', () => {
    expect(renderThemed(<StatusDotV4 data-testid="dot" />).getAttribute('aria-hidden')).toBe(
      'true'
    );
    const named = renderThemed(<StatusDotV4 data-testid="dot" label="Live" />);
    expect(named.getAttribute('role')).toBe('img');
    expect(named.getAttribute('aria-label')).toBe('Live');
  });

  it('names no literal colour — every value is a token', () => {
    renderThemed(<StatusDotV4 data-testid="dot" />);
    expect(sheet()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLSpanElement | null = null;
    const el = renderThemed(
      <StatusDotV4
        data-testid="dot"
        title="status"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(el);
    expect(el.getAttribute('title')).toBe('status');
  });
});
