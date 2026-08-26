/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { StepsV4 } from './StepsV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const STEPS = [
  { title: 'Cart' },
  { title: 'Shipping' },
  { title: 'Pay', description: 'Card or transfer' },
  { title: 'Done' },
];

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

function rails(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll('[aria-hidden="true"]'));
}

describe('StepsV4 (web)', () => {
  it('renders one list item per step, with the titles', () => {
    const { getAllByRole, getByText } = renderThemed(<StepsV4 steps={STEPS} current={1} />);
    expect(getAllByRole('listitem')).toHaveLength(4);
    expect(getByText('Cart')).toBeTruthy();
    expect(getByText('Card or transfer')).toBeTruthy();
  });

  it('draws a rail between every neighbouring pair, and none past the ends', () => {
    const { container } = renderThemed(<StepsV4 steps={STEPS} current={1} />);
    // Each of the 3 gaps is drawn as two halves — one on each side of a marker.
    expect(rails(container)).toHaveLength(6);
    const single = renderThemed(<StepsV4 steps={[{ title: 'Only' }]} current={0} />);
    expect(rails(single.container)).toHaveLength(0);
  });

  it('fills the rail up to where you are, and no further', () => {
    const { container } = renderThemed(<StepsV4 steps={STEPS} current={2} />);
    const filled = rails(container).filter((r) => r.className.includes('bg-primary'));
    const empty = rails(container).filter((r) => r.className.includes('bg-border'));
    // The path runs from step 0 to the marker you are standing on: step 0's
    // outgoing half, both of step 1's, and step 2's incoming half.
    expect(filled).toHaveLength(4);
    expect(empty).toHaveLength(2);
  });

  it('leaves the whole rail unfilled at the first step', () => {
    const { container } = renderThemed(<StepsV4 steps={STEPS} current={0} />);
    expect(rails(container).filter((r) => r.className.includes('bg-primary'))).toHaveLength(0);
  });

  it('gives the three states three shapes', () => {
    const { getAllByRole } = renderThemed(<StepsV4 steps={STEPS} current={1} />);
    const [doneStep, activeStep, laterStep] = getAllByRole('listitem');
    const marker = (li: HTMLElement) => li.querySelector('span.relative')!;

    expect(marker(doneStep!).className).toContain('bg-primary');
    expect(marker(doneStep!).className).toContain('text-on-primary');
    expect(marker(doneStep!).textContent).toBe('✓');

    expect(marker(activeStep!).className).toContain('border-primary');
    expect(marker(activeStep!).className).toContain('bg-surface');
    expect(marker(activeStep!).textContent).toBe('2');

    expect(marker(laterStep!).className).toContain('border-border');
    expect(marker(laterStep!).className).toContain('text-muted');
  });

  it('numbers the current step with `primary-text`, never the bare fill slot', () => {
    const { getAllByRole } = renderThemed(<StepsV4 steps={STEPS} current={1} />);
    const marker = getAllByRole('listitem')[1]!.querySelector('span.relative')!;
    expect(marker.className).toContain('text-primary-text');
    expect(marker.className).not.toMatch(/\btext-primary(?![-\w])/);
  });

  it('says "you are here" with aria-current as well as colour', () => {
    const { getAllByRole } = renderThemed(<StepsV4 steps={STEPS} current={2} />);
    const items = getAllByRole('listitem');
    expect(items[2]!.getAttribute('aria-current')).toBe('step');
    expect(items[1]!.getAttribute('aria-current')).toBeNull();
  });

  it('gives the current title the only full weight in the row', () => {
    const { getByText } = renderThemed(<StepsV4 steps={STEPS} current={1} />);
    expect(getByText('Shipping').className).toContain('font-semibold');
    expect(getByText('Cart').className).toContain('font-medium');
    expect(getByText('Pay').className).toContain('font-normal');
    expect(getByText('Pay').className).toContain('text-muted');
  });

  it('hides the rail from assistive tech — the marker states carry the meaning', () => {
    const { container } = renderThemed(<StepsV4 steps={STEPS} current={1} />);
    rails(container).forEach((r) => {
      expect(r.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('names no literal colour — every value is a token', () => {
    const { getByLabelText } = renderThemed(<StepsV4 steps={STEPS} current={1} />);
    expect(getByLabelText('Progress').outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('degrades without a provider rather than throwing', () => {
    const { getAllByRole } = render(<StepsV4 steps={STEPS} current={1} />);
    expect(getAllByRole('listitem')).toHaveLength(4);
  });
});
