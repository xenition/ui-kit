/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { InputV4 } from './InputV4';
import { TextareaV4 } from './TextareaV4';

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

describe('TextareaV4 (web)', () => {
  it('matches the field above it — same radius, padding and minimum height', () => {
    const { q } = renderThemed(<TextareaV4 placeholder="Notes" />);
    const { q: field } = renderThemed(<InputV4 placeholder="Email" />);
    const area = q.getByPlaceholderText('Notes').className;
    const input = field.getByPlaceholderText('Email').className;
    for (const shared of ['min-h-[var(--xen-space-2xl)]', 'px-md', 'text-base']) {
      expect(area).toContain(shared);
      expect(input).toContain(shared);
    }
    expect(area).toContain('rounded-[var(--xen-radius-md)]');
    expect(area).not.toContain('rounded-[var(--xen-radius-sm)]');
  });

  it('is set to be read, not just typed into', () => {
    const { q } = renderThemed(<TextareaV4 placeholder="Notes" />);
    expect(q.getByPlaceholderText('Notes').className).toContain('leading-relaxed');
  });

  it('resizes down one axis only, so it cannot break the form column', () => {
    const { q } = renderThemed(<TextareaV4 placeholder="Notes" />);
    const area = q.getByPlaceholderText('Notes').className;
    expect(area).toContain('resize-y');
    expect(area).not.toMatch(/resize-x|resize\b(?!-y)/);
  });

  it('keeps rows driving the height', () => {
    const { q } = renderThemed(<TextareaV4 placeholder="Notes" rows={8} />);
    expect((q.getByPlaceholderText('Notes') as HTMLTextAreaElement).rows).toBe(8);
  });

  it('arms the shared V4 focus ring from the brand slot', () => {
    const { q } = renderThemed(<TextareaV4 placeholder="Notes" />);
    const area = q.getByPlaceholderText('Notes');
    expect(area.hasAttribute('data-xen-v4-field')).toBe(true);
    expect(area.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-ring)');
    const css = document.getElementById('xen-v4-field-styles')?.textContent ?? '';
    expect(css).toContain('box-shadow: 0 0 0 var(--xen-space-xs)');
    expect(css).toContain('prefers-reduced-motion');
  });

  it('turns the border and the ring danger from one flag', () => {
    const { q } = renderThemed(<TextareaV4 placeholder="Notes" invalid />);
    const area = q.getByPlaceholderText('Notes');
    expect(area.getAttribute('aria-invalid')).toBe('true');
    expect(area.className).toContain('border-danger');
    expect(area.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-danger)');
  });

  it('keeps the native change contract', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<TextareaV4 placeholder="Notes" onChange={onChange} />);
    fireEvent.change(q.getByPlaceholderText('Notes'), { target: { value: 'hello' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('forwards its ref to the textarea', () => {
    let node: HTMLTextAreaElement | null = null;
    const { q } = renderThemed(
      <TextareaV4
        placeholder="Notes"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(q.getByPlaceholderText('Notes'));
  });

  it('spends no depth on a box someone is writing in', () => {
    const { q } = renderThemed(<TextareaV4 placeholder="Notes" />);
    const area = q.getByPlaceholderText('Notes');
    expect(area.className).not.toMatch(/shadow|gradient|backdrop/);
    expect(area.className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
