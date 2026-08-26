/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { BadgeV4 } from './BadgeV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(result.container).getByTestId('badge');
}

describe('BadgeV4 (web)', () => {
  it('fills `solid` with the tone and its guaranteed on-pair', () => {
    const el = renderThemed(
      <BadgeV4 data-testid="badge" tone="primary">
        New
      </BadgeV4>
    );
    // The base web badge painted `bg-primary-50 text-primary` here — a soft
    // tint wearing the solid name, and a different badge from its native twin.
    expect(el.className).toContain('bg-primary');
    expect(el.className).toContain('text-on-primary');
    expect(el.className).not.toContain('bg-primary-50');
  });

  it('composites `soft` into an OPAQUE colour it owns', () => {
    const el = renderThemed(
      <BadgeV4 data-testid="badge" tone="primary" variant="soft">
        New
      </BadgeV4>
    );
    // Mixed into `surface`, not into `transparent` — so the fill does not
    // change when the badge moves onto a filled card or a glass panel.
    expect(el.className).toContain(
      'bg-[color-mix(in_srgb,var(--xen-primary)_14%,var(--xen-surface))]'
    );
    expect(el.className).toContain('text-primary-text');
  });

  it('paints `surface` behind `outline` so its label has a known ground', () => {
    const el = renderThemed(
      <BadgeV4 data-testid="badge" tone="danger" variant="outline">
        Overdue
      </BadgeV4>
    );
    expect(el.className).toContain('bg-surface');
    expect(el.className).toContain('border-danger');
    // The label is the contrast-safe text form, the ring keeps the vivid slot.
    expect(el.className).toContain('text-danger-text');
  });

  it('labels every tone with a contrast-safe slot, never a raw fill', () => {
    (['primary', 'accent', 'success', 'warn', 'danger'] as const).forEach((tone) => {
      const el = renderThemed(
        <BadgeV4 data-testid="badge" tone={tone} variant="soft">
          Label
        </BadgeV4>
      );
      expect(el.className).toContain(`text-${tone}-text`);
    });
  });

  it('keeps a count and a dot round, and gives a word the brand corner', () => {
    const word = renderThemed(<BadgeV4 data-testid="badge">Draft</BadgeV4>);
    expect(word.className).toContain('rounded-[var(--xen-radius-sm)]');

    const counted = renderThemed(<BadgeV4 data-testid="badge" count={3} />);
    expect(counted.className).toContain('rounded-[var(--xen-radius-full)]');
    expect(counted.className).toContain('min-w-[var(--xen-space-lg)]');

    const dotted = renderThemed(
      <BadgeV4 data-testid="badge" dot>
        Live
      </BadgeV4>
    );
    expect(dotted.className).toContain('rounded-[var(--xen-radius-full)]');
  });

  it('caps a count at max', () => {
    expect(renderThemed(<BadgeV4 data-testid="badge" count={140} />).textContent).toBe('99+');
    expect(renderThemed(<BadgeV4 data-testid="badge" count={12} max={9} />).textContent).toBe(
      '9+'
    );
  });

  it('sizes from the spacing scale', () => {
    const md = renderThemed(<BadgeV4 data-testid="badge">Draft</BadgeV4>);
    const sm = renderThemed(
      <BadgeV4 data-testid="badge" size="sm">
        Draft
      </BadgeV4>
    );
    expect(md.className).toContain('min-h-[var(--xen-space-lg)]');
    expect(sm.className).toContain('min-h-[calc(var(--xen-space-md)_+_var(--xen-space-xs))]');
  });

  it('renders a hidden status dot alongside the label', () => {
    const el = renderThemed(
      <BadgeV4 data-testid="badge" tone="success" dot>
        Live
      </BadgeV4>
    );
    const dot = el.querySelector('[aria-hidden]');
    expect(dot).not.toBeNull();
    expect(dot?.className).toContain('bg-success');
    expect(el.textContent).toBe('Live');
  });

  it('supports the web-only `muted` tone', () => {
    const el = renderThemed(
      <BadgeV4 data-testid="badge" tone="muted">
        Archived
      </BadgeV4>
    );
    expect(el.className).toContain('text-muted');
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLSpanElement | null = null;
    const el = renderThemed(
      <BadgeV4
        data-testid="badge"
        title="status"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(el);
    expect(el.getAttribute('title')).toBe('status');
  });

  it('names no literal colour in its classes — every value is a token', () => {
    (['solid', 'soft', 'outline'] as const).forEach((variant) => {
      const el = renderThemed(
        <BadgeV4 data-testid="badge" tone="accent" variant={variant}>
          Label
        </BadgeV4>
      );
      expect(el.className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    });
  });
});
