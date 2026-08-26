/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { ColorPickerV4 } from './ColorPickerV4';

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

describe('ColorPickerV4 (web)', () => {
  it('gives every swatch the tap-target floor, not a 36px chip', () => {
    const { q } = renderThemed(<ColorPickerV4 />);
    const swatch = q.getByLabelText('Primary');
    expect(swatch.className).toContain('h-[var(--xen-space-2xl)]');
    expect(swatch.className).toContain('w-[var(--xen-space-2xl)]');
    expect(swatch.className).not.toContain('h-9');
  });

  it('draws the coloured chip smaller than the target it sits in', () => {
    const { q } = renderThemed(<ColorPickerV4 />);
    const chip = q.getByLabelText('Primary').querySelector('span');
    expect(chip?.className).toContain('h-[calc(var(--xen-space-2xl)_-_var(--xen-space-md))]');
    expect(chip?.className).toContain('bg-primary');
  });

  it('marks the selection with a ring, never with ink on the swatch', () => {
    const { q } = renderThemed(<ColorPickerV4 value="success" />);
    const swatch = q.getByLabelText('Success');
    expect(swatch.getAttribute('aria-checked')).toBe('true');
    expect(swatch.className).toContain('border-primary');
    // No tick: `on-primary` over an arbitrary swatch carries no contrast promise.
    expect(swatch.textContent).toBe('');
  });

  it('reserves the ring so choosing a colour never reflows the grid', () => {
    const { q } = renderThemed(<ColorPickerV4 />);
    const swatch = q.getByLabelText('Primary');
    expect(swatch.className).toContain('border-2');
    expect(swatch.className).toContain('border-transparent');
  });

  it('gives every chip a hairline, so a low-contrast swatch still has an edge', () => {
    const { q } = renderThemed(<ColorPickerV4 />);
    expect(q.getByLabelText('Border').querySelector('span')?.className).toContain('border-border');
  });

  it('reports the chosen swatch value', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<ColorPickerV4 onChange={onChange} />);
    fireEvent.click(q.getByLabelText('Danger'));
    expect(onChange).toHaveBeenCalledWith('danger');
  });

  it('takes caller swatches as given, className or raw value', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(
      <ColorPickerV4
        swatches={[{ label: 'Brand', value: 'brand', className: 'bg-primary' }]}
        onChange={onChange}
      />
    );
    expect(q.queryByLabelText('Success')).toBeNull();
    fireEvent.click(q.getByLabelText('Brand'));
    expect(onChange).toHaveBeenCalledWith('brand');
  });

  it('paints no literal colour for the token palette', () => {
    const { container } = renderThemed(<ColorPickerV4 value="primary" />);
    const grid = container.querySelector('[role="radiogroup"]');
    expect(grid?.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('is inert and dimmed when disabled', () => {
    const { container } = renderThemed(<ColorPickerV4 disabled />);
    const grid = container.querySelector('[role="radiogroup"]');
    expect(grid?.className).toContain('pointer-events-none');
    expect(grid?.className).toContain('opacity-[0.38]');
  });
});
