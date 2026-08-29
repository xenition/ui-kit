/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { SearchInputV4 } from './SearchInputV4';

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

const css = (): string => document.getElementById('xen-v4-picker-styles')?.textContent ?? '';

describe('SearchInputV4 (web)', () => {
  it('stops being a pill and wears InputV4 s field treatment', () => {
    const { container } = renderThemed(<SearchInputV4 />);
    const field = container.querySelector('[data-xen-v4-field]');
    expect(field?.className).toContain('rounded-[var(--xen-radius-md)]');
    expect(field?.className).not.toContain('rounded-[var(--xen-radius-full)]');
    expect(field?.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(field?.className).toContain('px-md');
  });

  it('arms the same halo InputV4 does, on focus-within', () => {
    const { container } = renderThemed(<SearchInputV4 />);
    const field = container.querySelector('[data-xen-v4-field]') as HTMLElement;
    expect(field.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-ring)');
    expect(css()).toContain('[data-xen-v4-field]:focus-within');
    expect(css()).toContain('box-shadow: 0 0 0 var(--xen-space-xs)');
  });

  it('grows the clear target to the floor without growing the field', () => {
    const { q } = renderThemed(<SearchInputV4 value="invoices" />);
    expect(q.getByLabelText('Clear search').hasAttribute('data-xen-v4-hit')).toBe(true);
    expect(css()).toContain('[data-xen-v4-hit]::after');
    expect(css()).toContain('width: var(--xen-space-2xl)');
    expect(css()).toContain('transform: translate(-50%, -50%)');
  });

  it('only offers a clear affordance when there is something to clear', () => {
    const { q } = renderThemed(<SearchInputV4 />);
    expect(q.queryByLabelText('Clear search')).toBeNull();
  });

  it('clears through both callbacks', () => {
    const onChangeText = jest.fn();
    const onClear = jest.fn();
    const { q } = renderThemed(
      <SearchInputV4 value="invoices" onChangeText={onChangeText} onClear={onClear} />
    );
    fireEvent.click(q.getByLabelText('Clear search'));
    expect(onChangeText).toHaveBeenCalledWith('');
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('reports typing', () => {
    const onChangeText = jest.fn();
    const { q } = renderThemed(<SearchInputV4 onChangeText={onChangeText} />);
    fireEvent.change(q.getByLabelText('Search'), { target: { value: 'inv' } });
    expect(onChangeText).toHaveBeenCalledWith('inv');
  });

  it('turns the field and its ring danger when invalid', () => {
    const { container, q } = renderThemed(<SearchInputV4 invalid />);
    const field = container.querySelector('[data-xen-v4-field]') as HTMLElement;
    expect(field.getAttribute('data-xen-v4-field')).toBe('invalid');
    expect(field.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-danger)');
    expect(q.getByLabelText('Search').getAttribute('aria-invalid')).toBe('true');
  });

  it('keeps the search glyph out of the accessibility tree', () => {
    const { container } = renderThemed(<SearchInputV4 />);
    const glyph = container.querySelector('span[aria-hidden="true"]');
    expect(glyph?.textContent).toBe('⌕');
  });

  it('dims and blocks when disabled', () => {
    const { container, q } = renderThemed(<SearchInputV4 disabled />);
    expect(container.querySelector('[data-xen-v4-field]')?.className).toContain(
      'pointer-events-none'
    );
    expect((q.getByLabelText('Search') as HTMLInputElement).disabled).toBe(true);
  });

  it('paints no literal colour', () => {
    const { container } = renderThemed(<SearchInputV4 value="x" />);
    expect(container.querySelector('[data-xen-v4-field]')?.outerHTML).not.toMatch(
      /#[0-9a-fA-F]{3,8}\b/
    );
  });
});
