/** @jest-environment jsdom */
/**
 * `TextV4` (web) — the twin of the native `TextV4`. The assertions are the web
 * form of the same invariants: the seed's face is bound, leading and tracking
 * come off one shared ratio table, the three new props are additive, and no
 * literal colour or font size is ever emitted.
 */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { TextV4 } from './TextV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function text(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(container).getByTestId('t');
}

describe('TextV4 (web)', () => {
  it('keeps the base defaults — base step, onSurface, regular', () => {
    const cls = text(<TextV4 data-testid="t">Pantry is empty</TextV4>).className;
    expect(cls).toContain('text-base');
    expect(cls).toContain('text-on-surface');
    expect(cls).toContain('font-normal');
  });

  it('binds the seed’s body face — the base emitted no face at all', () => {
    // The base `Text` inherits whatever the page is set in, so the same
    // sentence rendered in a different typeface from its native twin.
    expect(text(<TextV4 data-testid="t">Copy</TextV4>).className).toContain('font-body');
  });

  it('sets display steps in the heading face automatically', () => {
    (['xl', '2xl', '3xl'] as const).forEach((size) => {
      const cls = text(
        <TextV4 data-testid="t" size={size}>
          Welcome
        </TextV4>
      ).className;
      expect(cls).toContain('font-heading');
      expect(cls).not.toContain('font-body');
    });
  });

  it('lets `face` override the automatic pick in both directions', () => {
    const forcedBody = text(
      <TextV4 data-testid="t" size="3xl" face="body">
        Welcome
      </TextV4>
    ).className;
    expect(forcedBody).toContain('font-body');
    expect(forcedBody).not.toContain('font-heading');

    const forcedHeading = text(
      <TextV4 data-testid="t" size="sm" face="heading">
        Caption
      </TextV4>
    ).className;
    expect(forcedHeading).toContain('font-heading');
  });

  it('opens the leading on copy and closes it on display type', () => {
    // The base carried Tailwind's named ratios (1.5 / 1.375 / 1.25). Roomy body
    // copy and a tight headline is the whole "airy" difference.
    expect(text(<TextV4 data-testid="t">Copy</TextV4>).className).toContain('leading-[1.6]');
    expect(
      text(
        <TextV4 data-testid="t" size="3xl">
          Welcome
        </TextV4>
      ).className
    ).toContain('leading-[1.2]');
    expect(
      text(
        <TextV4 data-testid="t" size="xs">
          Legal
        </TextV4>
      ).className
    ).toContain('leading-[1.5]');
  });

  it('tracks optically — negative on display, positive on the smallest step', () => {
    expect(
      text(
        <TextV4 data-testid="t" size="3xl">
          Welcome
        </TextV4>
      ).className
    ).toContain('tracking-[-0.02em]');
    expect(
      text(
        <TextV4 data-testid="t" size="xs">
          Legal
        </TextV4>
      ).className
    ).toContain('tracking-[0.01em]');
    expect(text(<TextV4 data-testid="t">Copy</TextV4>).className).toContain('tracking-[0em]');
  });

  it('expresses tracking as an em ratio so the twins land on one width', () => {
    const cls = text(
      <TextV4 data-testid="t" size="2xl">
        Welcome
      </TextV4>
    ).className;
    expect(cls).toMatch(/tracking-\[-?[\d.]+em\]/);
    expect(cls).not.toMatch(/tracking-\[-?[\d.]+px\]/);
  });

  it('balances the wrap of display type only', () => {
    expect(
      text(
        <TextV4 data-testid="t" size="2xl">
          A headline that wraps
        </TextV4>
      ).className
    ).toContain('[text-wrap:balance]');
    expect(text(<TextV4 data-testid="t">Copy</TextV4>).className).not.toContain(
      '[text-wrap:balance]'
    );
  });

  it('caps `measure` off the spacing scale, not at a literal width', () => {
    const cls = text(
      <TextV4 data-testid="t" measure>
        A supporting line
      </TextV4>
    ).className;
    expect(cls).toContain('max-w-[calc(var(--xen-space-2xl)*7)]');
    // A max-width on an inline span does nothing at all.
    expect(cls).toContain('inline-block');
    expect(cls).not.toMatch(/max-w-\[\d+px\]/);
  });

  it('leaves the measure unconstrained by default', () => {
    expect(text(<TextV4 data-testid="t">Copy</TextV4>).className).not.toContain('max-w-');
  });

  it('sets tabular figures on request and proportional by default', () => {
    expect(
      text(
        <TextV4 data-testid="t" numeric="tabular">
          $9.99
        </TextV4>
      ).className
    ).toContain('[font-variant-numeric:tabular-nums]');
    expect(text(<TextV4 data-testid="t">$9.99</TextV4>).className).not.toContain(
      'font-variant-numeric'
    );
  });

  it('maps `tone` onto a semantic token class, including the contrast-safe forms', () => {
    expect(
      text(
        <TextV4 data-testid="t" tone="muted">
          Caption
        </TextV4>
      ).className
    ).toContain('text-muted');
    expect(
      text(
        <TextV4 data-testid="t" tone="dangerText">
          Out of date
        </TextV4>
      ).className
    ).toContain('text-danger-text');
  });

  it('maps weight and align onto token-free utility classes', () => {
    const cls = text(
      <TextV4 data-testid="t" weight="bold" align="center">
        Headline
      </TextV4>
    ).className;
    expect(cls).toContain('font-bold');
    expect(cls).toContain('text-center');
  });

  it('never emits a literal colour or an inline font size', () => {
    const { container } = render(
      <XenitionUIProvider theme={SEED}>
        <TextV4 data-testid="t" size="3xl" tone="danger" weight="bold" measure>
          Expired
        </TextV4>
      </XenitionUIProvider>
    );
    const span = within(container).getByTestId('t').outerHTML;
    expect(span).not.toMatch(/#[0-9a-fA-F]{6}/);
    expect(span).not.toMatch(/rgb\(/);
    expect(span).not.toMatch(/font-size/i);
  });

  it('clamps for `numberOfLines`, keeping the base’s parity prop', () => {
    // jsdom drops the vendor-prefixed `-webkit-line-clamp` / `box-orient` pair,
    // so the observable half is the overflow rule that comes with them.
    expect(
      text(
        <TextV4 data-testid="t" numberOfLines={2}>
          Long method step
        </TextV4>
      ).style.overflow
    ).toBe('hidden');
    expect(text(<TextV4 data-testid="t">Unclamped</TextV4>).style.overflow).toBe('');
  });

  it('stays a <span> tagged with its step, and forwards className and rest props', () => {
    const el = text(
      <TextV4 data-testid="t" size="lg" className="mt-md" id="hint">
        Hint
      </TextV4>
    );
    expect(el.tagName).toBe('SPAN');
    expect(el.getAttribute('data-xen-v4-text')).toBe('lg');
    expect(el.className).toContain('mt-md');
    expect(el.id).toBe('hint');
  });

  it('survives its empty state — no children, still fully set', () => {
    // §12. A headline slot with nothing in it yet must render as a styled,
    // zero-height line rather than throwing or losing its typography.
    const el = text(<TextV4 data-testid="t" size="2xl" measure />);
    expect(el.textContent).toBe('');
    expect(el.className).toContain('font-heading');
    expect(el.className).toContain('text-2xl');
    expect(el.className).toContain('leading-[1.25]');
    expect(el.className).toContain('max-w-[calc(var(--xen-space-2xl)*7)]');
  });
});
