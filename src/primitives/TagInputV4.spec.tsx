/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { TagInputV4 } from './TagInputV4';

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

describe('TagInputV4 (web)', () => {
  it('wears InputV4 s metrics and wraps as tags accumulate', () => {
    const { container } = renderThemed(<TagInputV4 value={['a', 'b']} />);
    const field = container.querySelector('[data-xen-v4-field]');
    expect(field?.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(field?.className).toContain('rounded-[var(--xen-radius-md)]');
    expect(field?.className).toContain('flex-wrap');
    expect(css()).toContain('[data-xen-v4-field]:focus-within');
  });

  it('adds a tag on Enter', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<TagInputV4 value={['React']} onChange={onChange} />);
    const input = q.getByLabelText('Add a tag');
    fireEvent.change(input, { target: { value: 'Vue' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['React', 'Vue']);
  });

  it('keeps the draft and says so on a duplicate — §38, help recovery', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<TagInputV4 value={['React']} onChange={onChange} />);
    const input = q.getByLabelText('Add a tag') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).not.toHaveBeenCalled();
    // What you typed is still there…
    expect(input.value).toBe('react');
    // …and the reason is on screen, and wired to the field.
    const message = q.getByRole('status');
    expect(message.textContent).toBe('“react” is already added');
    expect(input.getAttribute('aria-describedby')).toBe(message.id);
  });

  it('clears the message on the next keystroke', () => {
    const { q } = renderThemed(<TagInputV4 value={['React']} />);
    const input = q.getByLabelText('Add a tag');
    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(q.queryByRole('status')).not.toBeNull();
    fireEvent.change(input, { target: { value: 'Reactx' } });
    expect(q.queryByRole('status')).toBeNull();
  });

  it('lets dedupe={false} through', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<TagInputV4 value={['React']} dedupe={false} onChange={onChange} />);
    const input = q.getByLabelText('Add a tag');
    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['React', 'React']);
  });

  it('grows the remove target to the floor without growing the chip', () => {
    const { q } = renderThemed(<TagInputV4 value={['React']} />);
    expect(q.getByLabelText('Remove React').hasAttribute('data-xen-v4-hit')).toBe(true);
    expect(css()).toContain('[data-xen-v4-hit]::after');
    expect(css()).toContain('width: var(--xen-space-2xl)');
  });

  it('removes a tag by its ✕ and by backspace on an empty field', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<TagInputV4 value={['React', 'Vue']} onChange={onChange} />);
    fireEvent.click(q.getByLabelText('Remove React'));
    expect(onChange).toHaveBeenLastCalledWith(['Vue']);

    fireEvent.keyDown(q.getByLabelText('Add a tag'), { key: 'Backspace' });
    expect(onChange).toHaveBeenLastCalledWith(['React']);
  });

  it('draws chips with the contrast-checked accent pair, readable at sm', () => {
    const { container } = renderThemed(<TagInputV4 value={['React']} />);
    const chip = container.querySelector('span.bg-accent');
    expect(chip?.className).toContain('text-on-accent');
    expect(chip?.className).toContain('text-sm');
    expect(chip?.className).not.toContain('text-xs');
    expect(chip?.className).toContain('h-[var(--xen-space-xl)]');
  });

  it('turns the field danger when invalid', () => {
    const { container, q } = renderThemed(<TagInputV4 invalid />);
    expect(container.querySelector('[data-xen-v4-field]')?.getAttribute('data-xen-v4-field')).toBe(
      'invalid'
    );
    expect(q.getByLabelText('Add a tag').getAttribute('aria-invalid')).toBe('true');
  });

  it('paints no literal colour', () => {
    const { container } = renderThemed(<TagInputV4 value={['React']} />);
    expect(container.querySelector('[data-xen-v4-field]')?.outerHTML).not.toMatch(
      /#[0-9a-fA-F]{3,8}\b/
    );
  });
});
