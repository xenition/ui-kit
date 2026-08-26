import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_BOTH, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { SliderV4 } from './SliderV4';

const THEME = compileTheme(SEED_LIGHT);
const STRIP = THEME.spacing['2xl'];
const THUMB = THEME.spacing.lg;
const RAIL = THEME.spacing.sm;
const WIDTH = 220;

function styles(root: ReactTestInstance): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const walk = (style: unknown): void => {
    if (!style) return;
    if (Array.isArray(style)) {
      style.forEach(walk);
      return;
    }
    if (typeof style === 'object') out.push(style as Record<string, unknown>);
  };
  root.findAll(() => true).forEach((node) => walk(node.props?.style));
  return out;
}

/** Give the strip a width so the ratio maths has something to work with. */
function layout(node: ReactTestInstance): void {
  fireEvent(node, 'layout', { nativeEvent: { layout: { width: WIDTH, height: STRIP } } });
}

function strip(root: ReactTestInstance): ReactTestInstance {
  return root.findAll((n) => n.props?.accessibilityRole === 'adjustable')[0]!;
}

/** The thumb: the elevated square with the surface collar. */
function thumbStyle(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.width === THUMB && s.borderWidth === 2);
}

describe('SliderV4 (native)', () => {
  it('gives the grab strip the tap-target floor even though the rail is thin', () => {
    const { root } = renderThemed(<SliderV4 value={50} />, SEED_LIGHT);
    const s = styles(strip(root))[0] as { height: number };
    expect(s.height).toBe(STRIP);
    expect(STRIP).toBeGreaterThanOrEqual(44);
    // The rail itself has weight, so the fill reads as a quantity.
    expect(styles(root).find((s2) => s2.height === RAIL)).toBeDefined();
  });

  it('animates nothing — the thumb is drawn where the value is', () => {
    const { root } = renderThemed(<SliderV4 value={0} />, SEED_LIGHT);
    layout(strip(root));
    const at0 = thumbStyle(root)?.left;
    const moved = renderThemed(<SliderV4 value={100} />, SEED_LIGHT);
    layout(strip(moved.root));
    const at100 = thumbStyle(moved.root)?.left;
    expect(at0).toBe(0);
    expect(at100).toBe(WIDTH - THUMB);
  });

  it('jumps to the tap on grant, then tracks the finger by delta', () => {
    const onChange = jest.fn();
    const { root } = renderThemed(<SliderV4 value={0} onChange={onChange} />, SEED_LIGHT);
    const node = strip(root);
    layout(node);

    // Grant at the midpoint of the usable track.
    const usable = WIDTH - THUMB;
    fireEvent(node, 'responderGrant', {
      nativeEvent: { locationX: usable / 2 + THUMB / 2, touches: [], changedTouches: [] },
      touchHistory: { touchBank: [] },
    });
    expect(onChange).toHaveBeenLastCalledWith(50);

    // A move is a DELTA from the grabbed value, not a fresh coordinate.
    fireEvent(node, 'responderMove', {
      nativeEvent: { touches: [], changedTouches: [] },
      touchHistory: { touchBank: [] },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it('snaps to step and clamps to the range', () => {
    const onChange = jest.fn();
    const { root } = renderThemed(
      <SliderV4 value={0} min={0} max={10} step={5} onChange={onChange} />,
      SEED_LIGHT
    );
    const node = strip(root);
    layout(node);
    const usable = WIDTH - THUMB;
    fireEvent(node, 'responderGrant', {
      nativeEvent: { locationX: usable * 0.7 + THUMB / 2, touches: [], changedTouches: [] },
      touchHistory: { touchBank: [] },
    });
    // 7 of 10 snaps to 5 — a step multiple, never a raw ratio.
    expect(onChange).toHaveBeenLastCalledWith(5);
  });

  it('prefers onValueChange when both spellings are passed', () => {
    const onValueChange = jest.fn();
    const onChange = jest.fn();
    const { root } = renderThemed(
      <SliderV4 value={0} onValueChange={onValueChange} onChange={onChange} />,
      SEED_LIGHT
    );
    const node = strip(root);
    layout(node);
    fireEvent(node, 'responderGrant', {
      nativeEvent: { locationX: 0, touches: [], changedTouches: [] },
      touchHistory: { touchBank: [] },
    });
    expect(onValueChange).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('gives the thumb a surface collar and the card elevation', () => {
    const { root } = renderThemed(<SliderV4 value={50} />, SEED_LIGHT);
    const t = thumbStyle(root);
    expect(t?.backgroundColor).toBe(THEME.light.primary);
    expect(t?.borderColor).toBe(THEME.light.surface);
    const shadow = styles(root).find((s) => s.shadowOpacity !== undefined);
    expect(shadow?.shadowOpacity).toBe(THEME.lightElevation.card.opacity);
  });

  it('reserves the drag halo so grabbing never changes the geometry', () => {
    const { root } = renderThemed(<SliderV4 value={50} />, SEED_LIGHT);
    layout(strip(root));
    const haloSize = THUMB + THEME.spacing.xs * 2;
    const halo = styles(root).find((s) => s.width === haloSize);
    expect(halo?.backgroundColor).toBe('transparent');
  });

  it('resolves the fill per scheme, not from a ramp', () => {
    const theme = compileTheme(SEED_BOTH);
    const read = (scheme: 'light' | 'dark'): unknown => {
      const { root } = renderThemed(<SliderV4 value={50} />, SEED_BOTH, scheme);
      return thumbStyle(root)?.backgroundColor;
    };
    expect(read('light')).toBe(theme.light.primary);
    expect(read('dark')).toBe(theme.dark.primary);
  });

  it('is adjustable by assistive tech, not only by dragging', () => {
    const onChange = jest.fn();
    const { root } = renderThemed(
      <SliderV4 value={50} step={5} onChange={onChange} />,
      SEED_LIGHT
    );
    const node = strip(root);
    expect(node.props.accessibilityValue).toMatchObject({ min: 0, max: 100, now: 50 });
    fireEvent(node, 'accessibilityAction', { nativeEvent: { actionName: 'increment' } });
    expect(onChange).toHaveBeenLastCalledWith(55);
    fireEvent(node, 'accessibilityAction', { nativeEvent: { actionName: 'decrement' } });
    expect(onChange).toHaveBeenLastCalledWith(45);
  });

  it('ignores the gesture when disabled', () => {
    const onChange = jest.fn();
    const { root } = renderThemed(
      <SliderV4 value={50} disabled onChange={onChange} />,
      SEED_LIGHT
    );
    const node = strip(root);
    layout(node);
    fireEvent(node, 'responderGrant', {
      nativeEvent: { locationX: 0, touches: [], changedTouches: [] },
      touchHistory: { touchBank: [] },
    });
    expect(onChange).not.toHaveBeenCalled();
  });
});
