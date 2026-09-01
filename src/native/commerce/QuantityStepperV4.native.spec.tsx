import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { QuantityStepperV4 } from './QuantityStepperV4';

/** Flatten an RN style prop (array / nested arrays / objects) into one object. */
function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

/** A `Pressable`'s style is a function of its press state; resolve it. */
function pressableStyle(node: ReactTestInstance, pressed = false): Record<string, unknown> {
  const s = node.props.style;
  return flat(typeof s === 'function' ? s({ pressed }) : s);
}

const theme = compileTheme(SEED_LIGHT);
const tokens = toNativeTokens(theme);
const TAP = tokens.spacing['2xl'] - tokens.spacing.xs; // 44 — the HIG floor
const FIELD = tokens.spacing['2xl']; // 48 — the V4 control metric

describe('QuantityStepperV4 (native)', () => {
  it('paints both tap targets at the 44 floor — the defect brief §2 names', () => {
    const { getByTestId } = renderThemed(<QuantityStepperV4 value={2} />, SEED_LIGHT);
    ['xen-quantity-decrement', 'xen-quantity-increment'].forEach((id) => {
      const s = pressableStyle(getByTestId(id));
      expect(s.width).toBe(TAP);
      expect(s.height).toBe(TAP);
      // The base drew 32 — twelve short of the floor on the one control a
      // shopper taps repeatedly.
      expect(s.width).toBeGreaterThan(32);
    });
  });

  it('size="lg" takes the 48 V4 control metric instead', () => {
    const { getByTestId } = renderThemed(<QuantityStepperV4 value={2} size="lg" />, SEED_LIGHT);
    const s = pressableStyle(getByTestId('xen-quantity-increment'));
    expect(s.width).toBe(FIELD);
    expect(s.height).toBe(FIELD);
  });

  it('defaults size to md, so the twins agree without being told', () => {
    const { getByTestId } = renderThemed(<QuantityStepperV4 value={2} />, SEED_LIGHT);
    expect(pressableStyle(getByTestId('xen-quantity-increment')).width).toBe(TAP);
  });

  it('disables at the bounds WITHOUT changing shape', () => {
    const { getByTestId } = renderThemed(
      <QuantityStepperV4 value={1} min={1} max={5} />,
      SEED_LIGHT
    );
    const decNode = getByTestId('xen-quantity-decrement');
    const incNode = getByTestId('xen-quantity-increment');
    const disabled = pressableStyle(decNode);
    const enabled = pressableStyle(incNode);

    expect(decNode.props.accessibilityState).toEqual({ disabled: true });
    expect(incNode.props.accessibilityState).toEqual({ disabled: false });
    // The whole point: the box is identical either side of the disable, so the
    // row does not jump on the frame the quantity reaches its bound.
    expect(disabled.width).toBe(enabled.width);
    expect(disabled.height).toBe(enabled.height);
    // Only the content fades, and at M3's 0.38 — not a hand-picked 0.4.
    expect(disabled.opacity).toBeCloseTo(theme.state.disabledContent, 5);
    expect(enabled.opacity).toBe(1);
  });

  it('never emits an out-of-range value', () => {
    const onChange = jest.fn();
    const { getByTestId } = renderThemed(
      <QuantityStepperV4 value={5} min={1} max={5} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByTestId('xen-quantity-increment'));
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.press(getByTestId('xen-quantity-decrement'));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('honours step', () => {
    const onChange = jest.fn();
    const { getByTestId } = renderThemed(
      <QuantityStepperV4 value={4} step={2} max={10} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByTestId('xen-quantity-increment'));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('survives its degenerate case — a fixed quantity, min === max', () => {
    const onChange = jest.fn();
    const { getByTestId, getByText } = renderThemed(
      <QuantityStepperV4 value={1} min={1} max={1} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByTestId('xen-quantity-increment'));
    fireEvent.press(getByTestId('xen-quantity-decrement'));
    expect(onChange).not.toHaveBeenCalled();
    expect(getByText('1')).toBeTruthy();
  });

  it('is labelled as an adjustable with a live value, and per button', () => {
    const { getByTestId } = renderThemed(
      <QuantityStepperV4
        value={3}
        min={1}
        max={9}
        label="Quantity for Ceramic Mug"
        decrementLabel="One fewer mug"
        incrementLabel="One more mug"
      />,
      SEED_LIGHT
    );
    const group = getByTestId('xen-quantity-stepper');
    expect(group.props.accessibilityRole).toBe('adjustable');
    expect(group.props.accessibilityLabel).toBe('Quantity for Ceramic Mug');
    expect(group.props.accessibilityValue).toEqual({ now: 3, min: 1, max: 9 });
    expect(getByTestId('xen-quantity-decrement').props.accessibilityLabel).toBe('One fewer mug');
    expect(getByTestId('xen-quantity-increment').props.accessibilityLabel).toBe('One more mug');
    expect(getByTestId('xen-quantity-value').props.accessibilityLiveRegion).toBe('polite');
  });

  it('defaults its labels, and omits an infinite max from the announced value', () => {
    const { getByTestId } = renderThemed(<QuantityStepperV4 value={1} />, SEED_LIGHT);
    const group = getByTestId('xen-quantity-stepper');
    expect(group.props.accessibilityLabel).toBe('Quantity');
    expect(group.props.accessibilityValue).toEqual({ now: 1, min: 1, max: undefined });
    expect(getByTestId('xen-quantity-decrement').props.accessibilityLabel).toBe(
      'Decrease quantity'
    );
    expect(getByTestId('xen-quantity-increment').props.accessibilityLabel).toBe(
      'Increase quantity'
    );
  });

  it('disabled disables both ends without hiding either', () => {
    const { getByTestId } = renderThemed(<QuantityStepperV4 value={3} disabled />, SEED_LIGHT);
    expect(getByTestId('xen-quantity-decrement').props.accessibilityState).toEqual({
      disabled: true,
    });
    expect(getByTestId('xen-quantity-increment').props.accessibilityState).toEqual({
      disabled: true,
    });
  });

  it('sets the quantity in tabular numerals and reserves its width', () => {
    const { getByTestId } = renderThemed(<QuantityStepperV4 value={9} />, SEED_LIGHT);
    const s = flat(getByTestId('xen-quantity-value').props.style);
    expect(s.fontVariant).toEqual(['tabular-nums']);
    expect(s.minWidth).toBe(TAP);
  });

  it('paints the card ground and keeps exactly one edge — §9, §1.4', () => {
    const { getByTestId } = renderThemed(<QuantityStepperV4 value={2} />, SEED_LIGHT);
    const s = flat(getByTestId('xen-quantity-stepper').props.style);
    expect(s.backgroundColor).toBe(theme.light.card);
    expect(s.backgroundColor).not.toBe(theme.light.surface);
    expect(s.borderWidth).toBe(1);
    // The base drew a hairline either side of the value; V4 keeps the
    // container's one border and nothing inside it.
    ['xen-quantity-decrement', 'xen-quantity-increment'].forEach((id) => {
      const b = pressableStyle(getByTestId(id));
      expect(b.borderLeftWidth).toBeUndefined();
      expect(b.borderRightWidth).toBeUndefined();
    });
  });

  it('presses with the state layer, not by dimming its own content', () => {
    const { root } = renderThemed(<QuantityStepperV4 value={2} max={9} />, SEED_LIGHT);
    // The composite `Pressable` still carries the unresolved style function;
    // the host view RNTL's `getByTestId` returns has already been resolved for
    // the idle state, so the pressed branch is only reachable from here.
    const styleFn = root
      .findAll((n) => n.props?.testID === 'xen-quantity-increment')
      .map((n) => n.props.style)
      .find((s) => typeof s === 'function') as (state: { pressed: boolean }) => unknown;

    const idle = flat(styleFn({ pressed: false }));
    const held = flat(styleFn({ pressed: true }));
    expect(idle.backgroundColor).toBe('transparent');
    expect(held.backgroundColor).not.toBe('transparent');
    // Every hex a press paints still traces to a token pair of the theme.
    expect(String(held.backgroundColor).startsWith('#')).toBe(true);
    // 0.38 is reserved for "unavailable"; a held button is fully available.
    expect(held.opacity).toBe(1);
  });
});
