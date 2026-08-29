/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { RadioGroupV4 } from './RadioGroupV4';
import { FIELD_MOTION } from './internal/field-v4';
import { transitionCss } from './internal/v4-motion';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const OPTIONS = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
  { label: 'Never', value: 'never', disabled: true },
];

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return { ...result, q: within(result.container) };
}

const sheet = (id: string): string => document.getElementById(id)?.textContent ?? '';

describe('RadioGroupV4 (web)', () => {
  it('stays real radios in a real group, so the platform keeps its semantics', () => {
    const { q } = renderThemed(
      <RadioGroupV4 options={OPTIONS} value="monthly" onChange={() => {}} name="plan" />
    );
    expect(q.getByRole('radiogroup')).toBeTruthy();
    const radios = q.getAllByRole('radio') as HTMLInputElement[];
    expect(radios).toHaveLength(3);
    expect(radios[0]!.type).toBe('radio');
    expect(radios[0]!.name).toBe('plan');
    expect(radios[0]!.checked).toBe(true);
  });

  it('makes the whole row the target, at a full control height', () => {
    const { q } = renderThemed(
      <RadioGroupV4 options={OPTIONS} value="monthly" onChange={() => {}} />
    );
    const row = q.getByText('Monthly').closest('label');
    expect(row?.className).toContain('min-h-[var(--xen-space-2xl)]');
    // The label is the sentence being chosen, so it is read at reading size.
    expect(row?.className).toContain('text-base');
  });

  it('arms the shared V4 focus ring on each choice', () => {
    const { q } = renderThemed(
      <RadioGroupV4 options={OPTIONS} value="monthly" onChange={() => {}} />
    );
    expect(q.getAllByRole('radio')[0]!.hasAttribute('data-xen-v4-field')).toBe(true);
    expect(sheet('xen-v4-field-styles')).toContain('box-shadow: 0 0 0 var(--xen-space-xs)');
  });

  it('draws its own dot and scales it up rather than blinking it on', () => {
    renderThemed(<RadioGroupV4 options={OPTIONS} value="monthly" onChange={() => {}} />);
    const css = sheet('xen-v4-radio-styles');
    expect(css).toContain('appearance: none');
    expect(css).toContain('[data-xen-v4-radio]:checked::after');
    expect(css).toContain(`transition: ${transitionCss(['opacity', 'transform'], FIELD_MOTION)}`);
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    // Colour and roundness are tokens, never literals.
    expect(css).toContain('background-color: var(--xen-primary)');
    expect(css).toContain('border-radius: var(--xen-radius-full)');
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('reports the chosen value and leaves a disabled option alone', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(
      <RadioGroupV4 options={OPTIONS} value="monthly" onChange={onChange} />
    );
    fireEvent.click(q.getByRole('radio', { name: 'Yearly' }));
    expect(onChange).toHaveBeenCalledWith('yearly');

    const disabled = q.getByRole('radio', { name: 'Never' }) as HTMLInputElement;
    expect(disabled.disabled).toBe(true);
  });

  it('lays out vertically or horizontally on request', () => {
    const { q } = renderThemed(
      <RadioGroupV4 options={OPTIONS} value="monthly" onChange={() => {}} />
    );
    expect(q.getByRole('radiogroup').className).toContain('flex-col');

    const { q: row } = renderThemed(
      <RadioGroupV4
        options={OPTIONS}
        value="monthly"
        onChange={() => {}}
        orientation="horizontal"
      />
    );
    expect(row.getByRole('radiogroup').className).toContain('flex-row');
  });

  it('spends no depth on a list of choices', () => {
    const { q } = renderThemed(
      <RadioGroupV4 options={OPTIONS} value="monthly" onChange={() => {}} />
    );
    expect(q.getByRole('radiogroup').className).not.toMatch(/shadow|gradient|backdrop/);
    expect(sheet('xen-v4-radio-styles')).not.toMatch(/gradient|backdrop-filter/);
  });
});
