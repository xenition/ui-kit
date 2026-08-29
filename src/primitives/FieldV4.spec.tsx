/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import { resolveIconGlyph } from './icon-names';
import type { ThemeSeed } from '../theme/types';
import { FieldV4 } from './FieldV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(container);
}

describe('FieldV4 (web)', () => {
  it('wires the control to the message and marks it invalid', () => {
    const { getByRole } = renderThemed(
      <FieldV4 label="Email" htmlFor="email" error="Enter a work address">
        <input id="email" />
      </FieldV4>
    );
    const input = getByRole('textbox');
    // The base field had no `aria-describedby` and no `aria-invalid` at all,
    // so the message was visible and the input said nothing was wrong.
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(document.getElementById(describedBy as string)?.textContent).toContain(
      'Enter a work address'
    );
  });

  it('describes with the hint, without claiming invalid', () => {
    const { getByRole } = renderThemed(
      <FieldV4 label="Email" htmlFor="email" hint="We never share this">
        <input id="email" />
      </FieldV4>
    );
    const input = getByRole('textbox');
    expect(document.getElementById(input.getAttribute('aria-describedby') as string)?.textContent)
      .toBe('We never share this');
    expect(input.hasAttribute('aria-invalid')).toBe(false);
  });

  it('leaves a description the caller already set alone — §23', () => {
    const { getByRole } = renderThemed(
      <FieldV4 label="Email" error="Bad">
        <input aria-describedby="mine" aria-invalid={false} />
      </FieldV4>
    );
    const input = getByRole('textbox');
    expect(input.getAttribute('aria-describedby')).toBe('mine');
    expect(input.getAttribute('aria-invalid')).toBe('false');
  });

  it('adds nothing when there is no message at all', () => {
    const { getByRole } = renderThemed(
      <FieldV4 label="Email">
        <input />
      </FieldV4>
    );
    expect(getByRole('textbox').hasAttribute('aria-describedby')).toBe(false);
  });

  it('gives the error a shape as well as a hue, and announces it', () => {
    const { getByRole } = renderThemed(
      <FieldV4 error="Enter a work address">
        <input />
      </FieldV4>
    );
    const alert = getByRole('alert');
    // Red alone is invisible to a red-green viewer (§46).
    expect(alert.querySelector('[aria-hidden="true"]')?.textContent).toBe(
      resolveIconGlyph('error')
    );
    expect(alert.className).toContain('text-danger-text');
    expect(alert.className).not.toMatch(/text-danger(?![-\w])/);
  });

  it('measures the hint against the page, in both schemes', () => {
    const theme = compileTheme(SEED);
    const { container } = render(
      <XenitionUIProvider theme={SEED}>
        <FieldV4 hint="We never share this">
          <input />
        </FieldV4>
      </XenitionUIProvider>
    );
    const field = container.querySelector('[data-xen-v4-field]') as HTMLElement;
    expect(field).not.toBeNull();
    // The hint is `mutedText`, corrected once by the compiler, rather than a
    // per-scheme correction this component used to make for itself.
    expect(contrastRatio(theme.light.mutedText, theme.light.surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(theme.dark.mutedText, theme.dark.surface)).toBeGreaterThanOrEqual(4.5);
  });

  it('lets an error take the hint’s place', () => {
    const { queryByText, getByText } = renderThemed(
      <FieldV4 hint="We never share this" error="Enter a work address">
        <input />
      </FieldV4>
    );
    expect(getByText('Enter a work address')).toBeTruthy();
    expect(queryByText('We never share this')).toBeNull();
  });

  it('stacks on the spacing scale, so both twins are the same height', () => {
    const { container } = render(
      <XenitionUIProvider theme={SEED}>
        <FieldV4 label="Email">
          <input />
        </FieldV4>
      </XenitionUIProvider>
    );
    const field = container.querySelector('[data-xen-v4-field]') as HTMLElement;
    // `gap-1.5` was 6px of Tailwind's rhythm against native's 4px.
    expect(field.className).toContain('gap-xs');
    expect(field.className).not.toContain('gap-1.5');
  });

  it('labels through LabelV4, so "required" is announced there too', () => {
    const { getByText } = renderThemed(
      <FieldV4 label="Email" htmlFor="email" required>
        <input id="email" />
      </FieldV4>
    );
    expect(getByText('(required)').className).toContain('sr-only');
  });
});
