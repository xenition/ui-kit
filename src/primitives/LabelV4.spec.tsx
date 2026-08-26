/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { LabelV4 } from './LabelV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function label(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(container).getByTestId('label');
}

describe('LabelV4 (web)', () => {
  it('announces "required" instead of leaving it to the eye', () => {
    const el = label(
      <LabelV4 data-testid="label" required>
        Email
      </LabelV4>
    );
    // The base label hid the asterisk from assistive tech and put nothing in
    // its place, so the one fact the marker stands for never got announced.
    expect(el.textContent).toContain('(required)');
    expect(el.querySelector('.sr-only')?.textContent).toBe(' (required)');
  });

  it('keeps the asterisk itself decorative — read aloud it is noise', () => {
    const el = label(
      <LabelV4 data-testid="label" required>
        Email
      </LabelV4>
    );
    const marker = el.querySelector('[aria-hidden="true"]');
    expect(marker?.textContent).toBe('*');
  });

  it('says nothing extra when the field is optional', () => {
    const el = label(<LabelV4 data-testid="label">Email</LabelV4>);
    expect(el.textContent).toBe('Email');
    expect(el.querySelector('.sr-only')).toBeNull();
  });

  it('marks required with the measured red, not the fill slot', () => {
    const marker = label(
      <LabelV4 data-testid="label" required>
        Email
      </LabelV4>
    ).querySelector('[aria-hidden="true"]');
    expect(marker?.className).toContain('text-danger-text');
    expect(marker?.className).not.toMatch(/text-danger(?![-\w])/);
  });

  it('offsets the marker from the spacing scale, not from Tailwind’s rhythm', () => {
    const marker = label(
      <LabelV4 data-testid="label" required>
        Email
      </LabelV4>
    ).querySelector('[aria-hidden="true"]');
    expect(marker?.className).toContain('ml-[calc(var(--xen-space-xs)/2)]');
    expect(marker?.className).not.toContain('ml-0.5');
  });

  it('stays a <label> bound to the seed’s body face', () => {
    const el = label(
      <LabelV4 data-testid="label" htmlFor="email">
        Email
      </LabelV4>
    );
    expect(el.tagName).toBe('LABEL');
    expect(el.getAttribute('for')).toBe('email');
    expect(el.className).toContain('font-body');
    expect(el.className).toContain('text-sm');
    expect(el.className).toContain('text-on-surface');
  });

  it('keeps the caller’s className', () => {
    const el = label(
      <LabelV4 data-testid="label" className="mb-xs block">
        Email
      </LabelV4>
    );
    expect(el.className).toContain('mb-xs');
    expect(el.className).toContain('block');
  });
});
