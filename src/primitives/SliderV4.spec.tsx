/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { SliderV4 } from './SliderV4';

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

const noop = (): void => undefined;

describe('SliderV4 (web)', () => {
  it('stays a real range input, so the thumb tracks the pointer for free', () => {
    const { q } = renderThemed(<SliderV4 value={50} onChange={noop} />);
    const el = q.getByRole('slider') as HTMLInputElement;
    expect(el.tagName).toBe('INPUT');
    expect(el.type).toBe('range');
  });

  it('turns the browser appearance off and redraws from tokens', () => {
    renderThemed(<SliderV4 value={50} onChange={noop} />);
    expect(css()).toContain('[data-xen-v4-slider]');
    expect(css()).toContain('appearance: none');
    expect(css()).toContain('::-webkit-slider-thumb');
    expect(css()).toContain('::-moz-range-thumb');
    expect(css()).toContain('background: var(--xen-primary)');
    // Never the browser's own accent — that is a different control per engine.
    const { q } = renderThemed(<SliderV4 value={50} onChange={noop} />);
    expect(q.getAllByRole('slider')[0]!.className).not.toContain('accent-primary');
  });

  it('gives the grab strip the tap-target floor even though the rail is thin', () => {
    renderThemed(<SliderV4 value={50} onChange={noop} />);
    expect(css()).toContain('height: var(--xen-space-2xl)');
    expect(css()).toContain('height: var(--xen-space-sm)');
  });

  it('paints the fill from the track, at the value', () => {
    const { q } = renderThemed(<SliderV4 value={25} min={0} max={100} onChange={noop} />);
    const el = q.getByRole('slider');
    expect(el.style.getPropertyValue('--xen-v4-slider-pct')).toBe('25%');
    expect(css()).toContain('var(--xen-primary) var(--xen-v4-slider-pct, 0%)');
    expect(css()).toContain('var(--xen-border) var(--xen-v4-slider-pct, 0%)');
  });

  it('never transitions the thumb — §36.4 rules out a canned animation', () => {
    renderThemed(<SliderV4 value={50} onChange={noop} />);
    expect(css()).not.toContain('transition');
  });

  it('gives the thumb a surface collar and the card elevation', () => {
    renderThemed(<SliderV4 value={50} onChange={noop} />);
    expect(css()).toContain('border: 2px solid var(--xen-surface)');
    expect(css()).toContain('box-shadow: var(--xen-elevation-card)');
  });

  it('arms the same focus halo InputV4 does', () => {
    renderThemed(<SliderV4 value={50} onChange={noop} />);
    expect(css()).toContain('0 0 0 var(--xen-space-xs)');
    expect(css()).toContain('color-mix(in srgb, var(--xen-ring) 12%, transparent)');
  });

  it('reports the new value as a number', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<SliderV4 value={50} onChange={onChange} />);
    fireEvent.change(q.getByRole('slider'), { target: { value: '70' } });
    expect(onChange).toHaveBeenCalledWith(70);
  });

  it('passes min, max and step through to the element', () => {
    const { q } = renderThemed(
      <SliderV4 value={4} min={0} max={10} step={2} onChange={noop} />
    );
    const el = q.getByRole('slider') as HTMLInputElement;
    expect(el.min).toBe('0');
    expect(el.max).toBe('10');
    expect(el.step).toBe('2');
    expect(el.style.getPropertyValue('--xen-v4-slider-pct')).toBe('40%');
  });

  it('paints no literal colour', () => {
    const { q } = renderThemed(<SliderV4 value={50} onChange={noop} />);
    expect(q.getByRole('slider').outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(css()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('dims and blocks when disabled', () => {
    const { q } = renderThemed(<SliderV4 value={50} disabled onChange={noop} />);
    expect((q.getByRole('slider') as HTMLInputElement).disabled).toBe(true);
    expect(css()).toContain('[data-xen-v4-slider]:disabled');
  });
});
