/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { MIN_TAP_SQUARE_CLASS } from '../primitives/internal/nav-v4';
import { QuantityStepperV4 } from './QuantityStepperV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

const root = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-quantity-stepper]') as HTMLElement;
const dec = (c: HTMLElement): HTMLButtonElement =>
  c.querySelector('[data-xen-quantity-decrement]') as HTMLButtonElement;
const inc = (c: HTMLElement): HTMLButtonElement =>
  c.querySelector('[data-xen-quantity-increment]') as HTMLButtonElement;
const value = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-quantity-value]') as HTMLElement;

describe('QuantityStepperV4 (web)', () => {
  it('paints both tap targets at the 44 floor — the defect brief §2 names', () => {
    const { container } = renderThemed(<QuantityStepperV4 value={2} />);
    [dec(container), inc(container)].forEach((b) => {
      expect(b.className).toContain(MIN_TAP_SQUARE_CLASS);
      // Not the base's 32-point box, and not a hitSlop around one: the target
      // is the size it looks.
      expect(b.className).not.toContain('h-8');
    });
  });

  it('size="lg" takes the 48 V4 control metric instead', () => {
    const { container } = renderThemed(<QuantityStepperV4 value={2} size="lg" />);
    expect(root(container).getAttribute('data-size')).toBe('lg');
    [dec(container), inc(container)].forEach((b) => {
      expect(b.className).toContain('min-h-[var(--xen-space-2xl)]');
      expect(b.className).toContain('min-w-[var(--xen-space-2xl)]');
    });
  });

  it('defaults size to md, so the twins agree without being told', () => {
    const { container } = renderThemed(<QuantityStepperV4 value={2} />);
    expect(root(container).getAttribute('data-size')).toBe('md');
  });

  it('disables at the bounds WITHOUT changing shape', () => {
    const { container } = renderThemed(<QuantityStepperV4 value={1} min={1} max={5} />);
    expect(dec(container).disabled).toBe(true);
    expect(inc(container).disabled).toBe(false);
    // The whole point: the box is identical either side of the disable, so the
    // row does not jump on the frame the quantity reaches its bound.
    expect(dec(container).className).toBe(inc(container).className);
    expect(dec(container).className).toContain('disabled:opacity-[0.38]');
  });

  it('never emits an out-of-range value', () => {
    const onChange = jest.fn();
    const { container } = renderThemed(
      <QuantityStepperV4 value={5} min={1} max={5} onChange={onChange} />
    );
    fireEvent.click(inc(container));
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.click(dec(container));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('honours step', () => {
    const onChange = jest.fn();
    const { container } = renderThemed(
      <QuantityStepperV4 value={4} step={2} max={10} onChange={onChange} />
    );
    fireEvent.click(inc(container));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('survives its degenerate case — a fixed quantity, min === max', () => {
    const onChange = jest.fn();
    const { container } = renderThemed(
      <QuantityStepperV4 value={1} min={1} max={1} onChange={onChange} />
    );
    expect(dec(container).disabled).toBe(true);
    expect(inc(container).disabled).toBe(true);
    fireEvent.click(inc(container));
    fireEvent.click(dec(container));
    expect(onChange).not.toHaveBeenCalled();
    // Still a control, still 44, still readable.
    expect(value(container).textContent).toBe('1');
  });

  it('is labelled as a group and per button, and announces the new quantity', () => {
    const { container } = renderThemed(
      <QuantityStepperV4
        value={3}
        label="Quantity for Ceramic Mug"
        decrementLabel="One fewer mug"
        incrementLabel="One more mug"
      />
    );
    expect(root(container).getAttribute('role')).toBe('group');
    expect(root(container).getAttribute('aria-label')).toBe('Quantity for Ceramic Mug');
    expect(dec(container).getAttribute('aria-label')).toBe('One fewer mug');
    expect(inc(container).getAttribute('aria-label')).toBe('One more mug');
    expect(value(container).getAttribute('aria-live')).toBe('polite');
  });

  it('defaults its labels', () => {
    const { container } = renderThemed(<QuantityStepperV4 value={1} />);
    expect(root(container).getAttribute('aria-label')).toBe('Quantity');
    expect(dec(container).getAttribute('aria-label')).toBe('Decrease quantity');
    expect(inc(container).getAttribute('aria-label')).toBe('Increase quantity');
  });

  it('disabled disables both ends without hiding either', () => {
    const { container } = renderThemed(<QuantityStepperV4 value={3} disabled />);
    expect(dec(container).disabled).toBe(true);
    expect(inc(container).disabled).toBe(true);
    expect(dec(container)).not.toBeNull();
  });

  it('sets the quantity in tabular numerals and reserves its width', () => {
    const { container } = renderThemed(<QuantityStepperV4 value={9} />);
    expect(value(container).className).toContain('[font-variant-numeric:tabular-nums]');
    expect(value(container).className).toContain('min-w-[');
  });

  it('paints the card ground and keeps exactly one edge — §9, §1.4', () => {
    const { container } = renderThemed(<QuantityStepperV4 value={2} />);
    expect(root(container).className).toContain('bg-card');
    expect(root(container).className).not.toContain('bg-surface');
    expect(root(container).className).not.toContain('bg-neutral');
    // The base drew a hairline either side of the value; V4 keeps the
    // container's one border and nothing inside it.
    [dec(container), inc(container)].forEach((b) => {
      expect(b.className).not.toContain('border-r');
      expect(b.className).not.toContain('border-l');
    });
  });

  it('takes the V4 state layer rather than a neutral hover', () => {
    const { container } = renderThemed(<QuantityStepperV4 value={2} />);
    [dec(container), inc(container)].forEach((b) => {
      expect(b.hasAttribute('data-xen-v4-state')).toBe(true);
      expect(b.className).not.toContain('hover:bg-neutral-100');
    });
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const { container } = renderThemed(
      <QuantityStepperV4
        value={1}
        id="qs"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(container.querySelector('#qs'));
  });
});
