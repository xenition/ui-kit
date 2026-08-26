/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { SegmentedV4 } from './SegmentedV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};
const SHARP_SEED: ThemeSeed = { ...SEED, shape: 'sharp' };

const OPTIONS = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED) {
  return render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
}

describe('SegmentedV4 (web)', () => {
  it('renders a tablist of segments and reports the selected one', () => {
    const { getAllByRole } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="week" onChange={() => {}} />
    );
    const segments = getAllByRole('tab');
    expect(segments).toHaveLength(3);
    expect(segments[1]!.getAttribute('aria-selected')).toBe('true');
    expect(segments[0]!.getAttribute('aria-selected')).toBe('false');
  });

  it('says "selected" in colour AND weight', () => {
    const { getAllByRole } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="week" onChange={() => {}} />
    );
    const [idle, live] = getAllByRole('tab');
    expect(live!.className).toContain('font-semibold');
    expect(live!.className).toContain('text-on-surface');
    expect(idle!.className).toContain('font-medium');
    expect(idle!.className).toContain('text-muted');
  });

  it('gives every segment a 44px target composed from the spacing scale', () => {
    const { getAllByRole } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="day" onChange={() => {}} />
    );
    getAllByRole('tab').forEach((segment) => {
      expect(segment.className).toContain(
        'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]'
      );
    });
  });

  it('builds the rail from semantic slots, never a raw ramp step', () => {
    const { getByRole } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="day" onChange={() => {}} />
    );
    const rail = getByRole('tablist');
    expect(rail.getAttribute('data-xen-v4-nav-rail')).toBe('');
    // `bg-neutral-100` worked only because the dark block re-emits the ramp
    // inverted — an accident, not a rule.
    expect(rail.className).not.toContain('neutral');
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    expect(css).toContain('color-mix(in srgb, var(--xen-border) 55%, var(--xen-surface))');
  });

  it('lifts the thumb with `elevation.card` — the seed decision, not a utility step', () => {
    renderThemed(<SegmentedV4 options={OPTIONS} value="day" onChange={() => {}} />);
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-nav-thumb]');
    expect(css).toContain('box-shadow: var(--xen-elevation-card)');
    expect(css).not.toContain('shadow-sm');
  });

  it('defers to the seed shape rather than smuggling the capsule in', () => {
    const { getByRole } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="day" onChange={() => {}} />,
      SHARP_SEED
    );
    // The class is the same either way — the token behind it is 0 on a sharp
    // seed, so the shape stays the brand's decision.
    expect(getByRole('tablist').className).toContain('rounded-[var(--xen-radius-full)]');
  });

  it('emits the clicked value', () => {
    const onChange = jest.fn();
    const { getAllByRole } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="day" onChange={onChange} />
    );
    fireEvent.click(getAllByRole('tab')[2]!);
    expect(onChange).toHaveBeenCalledWith('month');
  });

  it('omits the thumb when there is no layout to measure, and still says which is live', () => {
    const { container, getAllByRole } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="day" onChange={() => {}} />
    );
    expect(container.querySelector('[data-xen-v4-nav-thumb]')).toBeNull();
    expect(getAllByRole('tab')[0]!.className).toContain('font-semibold');
  });

  it('names no literal colour — every value is a token', () => {
    const { getByRole } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="day" onChange={() => {}} />
    );
    expect(getByRole('tablist').outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('accepts a className without losing its own layout', () => {
    const { getByRole } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="day" onChange={() => {}} className="w-full" />
    );
    const rail = getByRole('tablist');
    expect(rail.className).toContain('w-full');
    expect(rail.className).toContain('relative');
  });

  it('degrades without a provider rather than throwing', () => {
    const { getAllByRole } = render(
      <SegmentedV4 options={OPTIONS} value="day" onChange={() => {}} />
    );
    expect(getAllByRole('tab')).toHaveLength(3);
  });
});
