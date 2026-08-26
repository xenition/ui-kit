/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { RangeSliderV4 } from './RangeSliderV4';

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

const css = (): string => document.getElementById('xen-v4-slider-styles')?.textContent ?? '';

describe('RangeSliderV4 (web)', () => {
  it('keeps two real range inputs, one per end', () => {
    const { q } = renderThemed(<RangeSliderV4 value={[20, 80]} />);
    const lo = q.getByLabelText('Range minimum') as HTMLInputElement;
    const hi = q.getByLabelText('Range maximum') as HTMLInputElement;
    expect(lo.type).toBe('range');
    expect(hi.type).toBe('range');
    expect(lo.value).toBe('20');
    expect(hi.value).toBe('80');
  });

  it('paints the span once, from the rail', () => {
    const { container } = renderThemed(<RangeSliderV4 value={[20, 80]} />);
    const wrap = container.querySelector('[data-xen-v4-rail]')?.parentElement;
    expect(wrap?.style.getPropertyValue('--xen-v4-slider-from')).toBe('20%');
    expect(wrap?.style.getPropertyValue('--xen-v4-slider-pct')).toBe('80%');
    expect(css()).toContain('[data-xen-v4-rail]');
    expect(css()).toContain('var(--xen-primary) var(--xen-v4-slider-from, 0%)');
  });

  it('blanks both input tracks so only the rail draws the span', () => {
    const { q } = renderThemed(<RangeSliderV4 value={[20, 80]} />);
    expect(q.getByLabelText('Range minimum').hasAttribute('data-overlay')).toBe(true);
    expect(q.getByLabelText('Range maximum').hasAttribute('data-overlay')).toBe(true);
    expect(css()).toContain(
      '[data-xen-v4-slider][data-overlay]::-webkit-slider-runnable-track { background: transparent; }'
    );
  });

  it('lets a click on the rail reach the nearer thumb', () => {
    renderThemed(<RangeSliderV4 value={[20, 80]} />);
    expect(css()).toContain('pointer-events: none');
    expect(css()).toContain(
      '[data-xen-v4-slider][data-overlay]::-webkit-slider-thumb { pointer-events: auto; }'
    );
  });

  it('turns the browser appearance off and redraws both thumbs from tokens', () => {
    const { q } = renderThemed(<RangeSliderV4 value={[20, 80]} />);
    expect(q.getByLabelText('Range minimum').className).not.toContain('accent-primary');
    expect(css()).toContain('appearance: none');
    expect(css()).toContain('border: 2px solid var(--xen-surface)');
    expect(css()).toContain('box-shadow: var(--xen-elevation-card)');
  });

  it('never transitions a thumb — §36.4 rules out a canned animation', () => {
    renderThemed(<RangeSliderV4 value={[20, 80]} />);
    expect(css()).not.toContain('transition');
  });

  it('keeps the pair ordered, so a crossed range is not representable', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<RangeSliderV4 value={[20, 80]} onChange={onChange} />);
    fireEvent.change(q.getByLabelText('Range minimum'), { target: { value: '95' } });
    expect(onChange).toHaveBeenLastCalledWith([80, 80]);
    fireEvent.change(q.getByLabelText('Range maximum'), { target: { value: '5' } });
    expect(onChange).toHaveBeenLastCalledWith([20, 20]);
  });

  it('passes min, max and step to both ends', () => {
    const { q } = renderThemed(<RangeSliderV4 value={[2, 8]} min={0} max={10} step={2} />);
    for (const label of ['Range minimum', 'Range maximum']) {
      const el = q.getByLabelText(label) as HTMLInputElement;
      expect(el.min).toBe('0');
      expect(el.max).toBe('10');
      expect(el.step).toBe('2');
    }
  });

  it('paints no literal colour', () => {
    const { container } = renderThemed(<RangeSliderV4 value={[20, 80]} />);
    const wrap = container.querySelector('[data-xen-v4-rail]')?.parentElement;
    expect(wrap?.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(css()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('dims and disables both ends together', () => {
    const { q, container } = renderThemed(<RangeSliderV4 value={[20, 80]} disabled />);
    expect((q.getByLabelText('Range minimum') as HTMLInputElement).disabled).toBe(true);
    expect((q.getByLabelText('Range maximum') as HTMLInputElement).disabled).toBe(true);
    expect(container.querySelector('[data-xen-v4-rail]')?.parentElement?.className).toContain(
      'opacity-[0.38]'
    );
  });
});
