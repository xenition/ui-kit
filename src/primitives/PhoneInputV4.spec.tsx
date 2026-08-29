/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { PhoneInputV4 } from './PhoneInputV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return { ...result, q: within(result.container) };
}

describe('PhoneInputV4 (web)', () => {
  it('keeps the mask on screen and the raw digits in the callback', () => {
    const onChangeText = jest.fn();
    const { q, rerender } = renderThemed(
      <PhoneInputV4 value="5551234567" onChangeText={onChangeText} />
    );
    expect((q.getByLabelText('Phone number') as HTMLInputElement).value).toBe('(555) 123-4567');

    fireEvent.change(q.getByLabelText('Phone number'), { target: { value: '(555) 123-45' } });
    expect(onChangeText).toHaveBeenCalledWith('55512345');
    void rerender;
  });

  it('caps the number at ten digits', () => {
    const onChangeText = jest.fn();
    const { q } = renderThemed(<PhoneInputV4 onChangeText={onChangeText} />);
    fireEvent.change(q.getByLabelText('Phone number'), { target: { value: '5551234567890' } });
    expect(onChangeText).toHaveBeenCalledWith('5551234567');
  });

  it('is a field like the others, on the shared V4 metrics', () => {
    const { q } = renderThemed(<PhoneInputV4 />);
    const shell = q.getByLabelText('Phone number').parentElement!;
    expect(shell.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(shell.className).toContain('rounded-[var(--xen-radius-md)]');
    expect(shell.className).toContain('px-md');
  });

  it('sets both the code and the number in tabular figures', () => {
    const { q } = renderThemed(<PhoneInputV4 />);
    expect(q.getByLabelText('Phone number').className).toContain('tabular-nums');
    expect(q.getByText('+1').className).toContain('tabular-nums');
  });

  it('separates the country code with the field hairline, and mutes it', () => {
    const { q } = renderThemed(<PhoneInputV4 countryCode="+44" />);
    const code = q.getByText('+44');
    expect(code.className).toContain('border-r');
    expect(code.className).toContain('border-border');
    expect(code.className).toContain('text-muted');
  });

  it('rings the whole control, country code included', () => {
    const { q } = renderThemed(<PhoneInputV4 />);
    const shell = q.getByLabelText('Phone number').parentElement!;
    expect(shell.hasAttribute('data-xen-v4-shell')).toBe(true);
    expect(shell.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-ring)');
    expect(document.getElementById('xen-v4-field-styles')?.textContent).toContain(
      '[data-xen-v4-shell]:focus-within'
    );
  });

  it('turns the border and the ring danger from one flag', () => {
    const { q } = renderThemed(<PhoneInputV4 invalid />);
    const shell = q.getByLabelText('Phone number').parentElement!;
    expect(q.getByLabelText('Phone number').getAttribute('aria-invalid')).toBe('true');
    expect(shell.className).toContain('border-danger');
    expect(shell.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-danger)');
  });

  it('keeps the platform autofill hints the base already had', () => {
    const { q } = renderThemed(<PhoneInputV4 />);
    const input = q.getByLabelText('Phone number');
    expect(input.getAttribute('type')).toBe('tel');
    expect(input.getAttribute('inputmode')).toBe('tel');
    expect(input.getAttribute('autocomplete')).toBe('tel');
  });

  it('spends no depth on a form control', () => {
    const { q } = renderThemed(<PhoneInputV4 />);
    const shell = q.getByLabelText('Phone number').parentElement!;
    expect(shell.className).not.toMatch(/shadow|gradient|backdrop/);
  });
});
