/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { BannerV4 } from './BannerV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(result.container).getByTestId('banner');
}

describe('BannerV4 (web)', () => {
  it('fills the band with the tone and its guaranteed on-pair', () => {
    const el = renderThemed(
      <BannerV4 data-testid="banner" tone="warn">
        Message
      </BannerV4>
    );
    expect(el.className).toContain('bg-warn');
    expect(el.className).toContain('text-on-warn');
  });

  it('gives the action a chip mixed from the band, not a third colour', () => {
    const el = renderThemed(
      <BannerV4 data-testid="banner" tone="danger" actionLabel="Retry" onAction={() => undefined}>
        Message
      </BannerV4>
    );
    const chip = el.querySelector('button');
    // Both operands are the banner's own tokens — the band and its ink.
    expect(chip?.className).toContain(
      'bg-[color-mix(in_srgb,var(--xen-on-danger)_20%,var(--xen-danger))]'
    );
    // And it is no longer an underlined sentence pretending to be a control.
    expect(chip?.className).not.toContain('underline');
  });

  it('gives both controls a real target — §46', () => {
    const el = renderThemed(
      <BannerV4
        data-testid="banner"
        actionLabel="Retry"
        onAction={() => undefined}
        onClose={() => undefined}
      >
        Message
      </BannerV4>
    );
    const buttons = Array.from(el.querySelectorAll('button'));
    expect(buttons).toHaveLength(2);
    buttons.forEach((b) => expect(b.className).toContain('min-h-[var(--xen-space-xl)]'));
  });

  it('carries no gradient and no shadow — the band is one flat tone, in flow', () => {
    (['info', 'success', 'warn', 'danger'] as const).forEach((tone) => {
      const el = renderThemed(
        <BannerV4 data-testid="banner" tone={tone}>
          Message
        </BannerV4>
      );
      expect(el.className).not.toMatch(/gradient/);
      expect(el.className).not.toMatch(/\bshadow/);
    });
  });

  it('spaces itself from the scale, not from a fixed px utility', () => {
    const el = renderThemed(<BannerV4 data-testid="banner">Message</BannerV4>);
    expect(el.className).toContain('px-[var(--xen-space-lg)]');
    expect(el.className).toContain('py-[var(--xen-space-md)]');
  });

  it('announces danger as an alert and everything else as a status', () => {
    expect(
      renderThemed(<BannerV4 data-testid="banner" tone="danger">M</BannerV4>).getAttribute('role')
    ).toBe('alert');
    expect(
      renderThemed(<BannerV4 data-testid="banner" tone="success">M</BannerV4>).getAttribute('role')
    ).toBe('status');
  });

  it('names no literal colour in its classes — every value is a token', () => {
    const el = renderThemed(
      <BannerV4 data-testid="banner" tone="success" actionLabel="Undo" onAction={() => undefined}>
        Message
      </BannerV4>
    );
    expect(el.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const el = renderThemed(
      <BannerV4
        data-testid="banner"
        ref={(n) => {
          node = n;
        }}
      >
        Message
      </BannerV4>
    );
    expect(node).toBe(el);
  });
});
