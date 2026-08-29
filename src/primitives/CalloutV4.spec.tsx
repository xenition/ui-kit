/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { CalloutV4 } from './CalloutV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(result.container).getByTestId('callout');
}

describe('CalloutV4 (web)', () => {
  it('keeps the edge NEUTRAL — a tip is not an alert', () => {
    (['info', 'success', 'warn', 'danger', 'neutral'] as const).forEach((tone) => {
      const el = renderThemed(
        <CalloutV4 data-testid="callout" tone={tone}>
          Body
        </CalloutV4>
      );
      // The base ringed the whole box in the tone, so a tip and a failed
      // payment were the same object at the same volume (§35.6).
      expect(el.className).toContain('border-border');
      expect(el.className).not.toMatch(/border-(primary|success|warn|danger)\b/);
    });
  });

  it('washes the ground more faintly than an alert — the loudness ladder', () => {
    const el = renderThemed(
      <CalloutV4 data-testid="callout" tone="danger">
        Body
      </CalloutV4>
    );
    expect(el.className).toContain(
      'bg-[color-mix(in_srgb,var(--xen-danger)_6%,var(--xen-surface))]'
    );
  });

  it('leaves `neutral` untinted — a note with no tone is not a faint warning', () => {
    const el = renderThemed(
      <CalloutV4 data-testid="callout" tone="neutral">
        Body
      </CalloutV4>
    );
    expect(el.className).toContain('bg-surface');
    expect(el.className).not.toContain('color-mix');
  });

  it('titles with the contrast-safe TEXT form, never the fill', () => {
    const el = renderThemed(
      <CalloutV4 data-testid="callout" tone="success" title="Tip">
        Body
      </CalloutV4>
    );
    const heading = el.querySelector('.font-heading');
    expect(heading?.className).toContain('text-success-text');
    expect(heading?.className).not.toMatch(/text-success(?!-text)/);
  });

  it('carries no shadow and no gradient — an aside is in the page', () => {
    const el = renderThemed(<CalloutV4 data-testid="callout">Body</CalloutV4>);
    expect(el.className).not.toMatch(/\bshadow/);
    expect(el.className).not.toMatch(/gradient/);
  });

  it('spaces and rounds itself from the scale', () => {
    const el = renderThemed(<CalloutV4 data-testid="callout">Body</CalloutV4>);
    expect(el.className).toContain('p-[var(--xen-space-md)]');
    expect(el.className).toContain('rounded-[var(--xen-radius-md)]');
  });

  it('is announced as a note', () => {
    expect(renderThemed(<CalloutV4 data-testid="callout">B</CalloutV4>).getAttribute('role'))
      .toBe('note');
  });

  it('names no literal colour — every value is a token', () => {
    const el = renderThemed(
      <CalloutV4 data-testid="callout" tone="warn" title="Heads up">
        Body
      </CalloutV4>
    );
    expect(el.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(el.className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const el = renderThemed(
      <CalloutV4
        data-testid="callout"
        ref={(n) => {
          node = n;
        }}
      >
        Body
      </CalloutV4>
    );
    expect(node).toBe(el);
  });
});
