/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { PinInputV4 } from './PinInputV4';

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

const boxes = (container: HTMLElement): HTMLInputElement[] =>
  Array.from(container.querySelectorAll('input'));

describe('PinInputV4 (web)', () => {
  it('renders one box per character at the form control height', () => {
    const { container } = renderThemed(<PinInputV4 value="" onChange={() => {}} />);
    const all = boxes(container);
    expect(all).toHaveLength(6);
    expect(all[0]!.className).toContain('h-[var(--xen-space-2xl)]');
    expect(all[0]!.className).toContain(
      'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-sm))]'
    );
    expect(all[0]!.className).toContain('tabular-nums');
    expect(all[0]!.className).toContain('text-center');
  });

  it('spreads a pasted code across the boxes instead of dropping five of six', () => {
    const onChange = jest.fn();
    const { container } = renderThemed(<PinInputV4 value="" onChange={onChange} />);
    fireEvent.paste(boxes(container)[0]!, {
      clipboardData: { getData: () => '123456' },
    });
    expect(onChange).toHaveBeenCalledWith('123456');
  });

  it('pastes forward from the box that received it, and stops at the end', () => {
    const onChange = jest.fn();
    const { container } = renderThemed(<PinInputV4 value="12" onChange={onChange} />);
    fireEvent.paste(boxes(container)[2]!, {
      clipboardData: { getData: () => '9876543' },
    });
    expect(onChange).toHaveBeenCalledWith('129876');
  });

  it('asks the browser for the code once, not six times', () => {
    const { container } = renderThemed(<PinInputV4 value="" onChange={() => {}} />);
    const all = boxes(container);
    expect(all[0]!.getAttribute('autocomplete')).toBe('one-time-code');
    expect(all[1]!.getAttribute('autocomplete')).toBe('off');
    expect(all[0]!.getAttribute('inputmode')).toBe('numeric');
  });

  it('advances on entry and retreats on backspace', () => {
    const onChange = jest.fn();
    const { container } = renderThemed(<PinInputV4 value="" onChange={onChange} />);
    const all = boxes(container);
    fireEvent.change(all[0]!, { target: { value: '4' } });
    expect(onChange).toHaveBeenCalledWith('4');
    expect(document.activeElement).toBe(all[1]);

    fireEvent.keyDown(all[1]!, { key: 'Backspace' });
    expect(document.activeElement).toBe(all[0]);
  });

  it('shows its own progress: a filled box keeps the brand edge', () => {
    const { container } = renderThemed(<PinInputV4 value="12" onChange={() => {}} />);
    const all = boxes(container);
    expect(all[0]!.className).toContain('border-primary');
    expect(all[2]!.className).toContain('border-border');
  });

  it('arms the shared V4 focus ring on every box', () => {
    const { container } = renderThemed(<PinInputV4 value="" onChange={() => {}} />);
    const box = boxes(container)[0]!;
    expect(box.hasAttribute('data-xen-v4-field')).toBe(true);
    expect(box.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-ring)');
    expect(document.getElementById('xen-v4-field-styles')?.textContent).toContain(
      'box-shadow: 0 0 0 var(--xen-space-xs)'
    );
  });

  it('honours a custom length', () => {
    const { container } = renderThemed(<PinInputV4 length={4} value="" onChange={() => {}} />);
    expect(boxes(container)).toHaveLength(4);
  });

  it('spends no depth on a form control', () => {
    const { container } = renderThemed(<PinInputV4 value="" onChange={() => {}} />);
    expect(boxes(container)[0]!.className).not.toMatch(/shadow|gradient|backdrop/);
  });
});
