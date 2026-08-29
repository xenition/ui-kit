/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { InputV4 } from './InputV4';
import { SelectV4 } from './SelectV4';

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

const OPTIONS = (
  <>
    <option value="eu">Europe</option>
    <option value="us">Americas</option>
  </>
);

describe('SelectV4 (web)', () => {
  it('stays a real select with real options, caret and picker included', () => {
    const { q } = renderThemed(<SelectV4 aria-label="Region">{OPTIONS}</SelectV4>);
    const el = q.getByLabelText('Region') as HTMLSelectElement;
    expect(el.tagName).toBe('SELECT');
    expect(el.options).toHaveLength(2);
    // The platform caret is left alone on purpose — §31, §46.
    expect(el.className).not.toContain('appearance-none');
  });

  it('shares its height, radius and padding with the shipped InputV4', () => {
    const { q } = renderThemed(<SelectV4 aria-label="Region">{OPTIONS}</SelectV4>);
    const { q: field } = renderThemed(<InputV4 placeholder="Email" />);
    const select = q.getByLabelText('Region').className;
    const input = field.getByPlaceholderText('Email').className;
    for (const shared of ['min-h-[var(--xen-space-2xl)]', 'px-md', 'text-base']) {
      expect(select).toContain(shared);
      expect(input).toContain(shared);
    }
    expect(select).toContain('rounded-[var(--xen-radius-md)]');
  });

  it('is a box, not a pill — the seed still owns the corners', () => {
    const { q } = renderThemed(<SelectV4 aria-label="Region">{OPTIONS}</SelectV4>);
    expect(q.getByLabelText('Region').className).not.toContain('--xen-radius-full');
  });

  it('arms the shared V4 focus ring from the brand slot', () => {
    const { q } = renderThemed(<SelectV4 aria-label="Region">{OPTIONS}</SelectV4>);
    const el = q.getByLabelText('Region');
    expect(el.hasAttribute('data-xen-v4-field')).toBe(true);
    expect(el.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-ring)');
    const css = document.getElementById('xen-v4-field-styles')?.textContent ?? '';
    expect(css).toContain('box-shadow: 0 0 0 var(--xen-space-xs)');
    expect(css).toContain('prefers-reduced-motion');
  });

  it('turns the border and the ring danger from one flag', () => {
    const { q } = renderThemed(
      <SelectV4 aria-label="Region" invalid>
        {OPTIONS}
      </SelectV4>
    );
    const el = q.getByLabelText('Region');
    expect(el.getAttribute('aria-invalid')).toBe('true');
    expect(el.className).toContain('border-danger');
    expect(el.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-danger)');
  });

  it('keeps the native change contract the base already had', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(
      <SelectV4 aria-label="Region" defaultValue="eu" onChange={onChange}>
        {OPTIONS}
      </SelectV4>
    );
    fireEvent.change(q.getByLabelText('Region'), { target: { value: 'us' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((q.getByLabelText('Region') as HTMLSelectElement).value).toBe('us');
  });

  it('forwards its ref to the select', () => {
    let node: HTMLSelectElement | null = null;
    const { q } = renderThemed(
      <SelectV4
        aria-label="Region"
        ref={(n) => {
          node = n;
        }}
      >
        {OPTIONS}
      </SelectV4>
    );
    expect(node).toBe(q.getByLabelText('Region'));
  });

  it('spends no depth on a form control', () => {
    const { q } = renderThemed(<SelectV4 aria-label="Region">{OPTIONS}</SelectV4>);
    expect(q.getByLabelText('Region').className).not.toMatch(/shadow|gradient|backdrop/);
    expect(q.getByLabelText('Region').className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
