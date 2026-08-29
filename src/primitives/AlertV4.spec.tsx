/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { AlertV4 } from './AlertV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(result.container).getByTestId('alert');
}

describe('AlertV4 (web)', () => {
  it('tints `subtle` with `color-mix` instead of a ramp step that inverts', () => {
    const el = renderThemed(
      <AlertV4 data-testid="alert" tone="danger">
        Body
      </AlertV4>
    );
    // The base painted `bg-neutral-50`, which the dark block re-emits inverted:
    // a light card on a dark page wearing the name "subtle".
    expect(el.className).not.toContain('bg-neutral-50');
    expect(el.className).toContain(
      'bg-[color-mix(in_srgb,var(--xen-danger)_10%,var(--xen-surface))]'
    );
  });

  it('routes `warn` to the WARN slot, never to the brand accent — §35.4', () => {
    const el = renderThemed(
      <AlertV4 data-testid="alert" tone="warn" variant="solid">
        Body
      </AlertV4>
    );
    expect(el.className).toContain('bg-warn');
    expect(el.className).toContain('text-on-warn');
    expect(el.className).not.toContain('accent');
  });

  it('keeps the left rule in the tone, one spacing step wide', () => {
    const el = renderThemed(
      <AlertV4 data-testid="alert" tone="success">
        Body
      </AlertV4>
    );
    expect(el.className).toContain('border-l-[length:var(--xen-space-xs)]');
    expect(el.className).toContain('border-l-success');
  });

  it('labels a tinted alert with the contrast-safe TEXT form, not the fill', () => {
    (['info', 'success', 'warn', 'danger'] as const).forEach((tone) => {
      const el = renderThemed(
        <AlertV4 data-testid="alert" tone={tone} title="Heading">
          Body
        </AlertV4>
      );
      const heading = el.querySelector('.font-heading');
      expect(heading?.className).toMatch(/text-(primary|success|warn|danger)-text/);
    });
  });

  it('paints `surface` behind `outline` so its label has a known ground', () => {
    const el = renderThemed(
      <AlertV4 data-testid="alert" tone="danger" variant="outline">
        Body
      </AlertV4>
    );
    expect(el.className).toContain('bg-surface');
    expect(el.className).toContain('border-danger');
  });

  it('never carries a gradient or a shadow — §35.11, and a lie about layer', () => {
    (['subtle', 'solid', 'outline'] as const).forEach((variant) => {
      const el = renderThemed(
        <AlertV4 data-testid="alert" tone="info" variant={variant}>
          Body
        </AlertV4>
      );
      expect(el.className).not.toMatch(/gradient/);
      expect(el.className).not.toMatch(/\bshadow/);
    });
  });

  it('announces danger as an alert and everything else as a status', () => {
    expect(renderThemed(<AlertV4 data-testid="alert" tone="danger">B</AlertV4>).getAttribute('role'))
      .toBe('alert');
    expect(renderThemed(<AlertV4 data-testid="alert" tone="info">B</AlertV4>).getAttribute('role'))
      .toBe('status');
  });

  it('renders the dismiss control with an accessible name', () => {
    const el = renderThemed(
      <AlertV4 data-testid="alert" onClose={() => undefined}>
        Body
      </AlertV4>
    );
    expect(el.querySelector('button')?.getAttribute('aria-label')).toBe('Dismiss');
  });

  it('names no literal colour in its classes — every value is a token', () => {
    (['subtle', 'solid', 'outline'] as const).forEach((variant) => {
      const el = renderThemed(
        <AlertV4 data-testid="alert" tone="success" variant={variant}>
          Body
        </AlertV4>
      );
      expect(el.className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    });
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const el = renderThemed(
      <AlertV4
        data-testid="alert"
        title="status"
        ref={(n) => {
          node = n;
        }}
      >
        Body
      </AlertV4>
    );
    expect(node).toBe(el);
  });
});
