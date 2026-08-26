import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_BOTH, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { RangeSliderV4 } from './RangeSliderV4';

const THEME = compileTheme(SEED_LIGHT);
const STRIP = THEME.spacing['2xl'];
const THUMB = THEME.spacing.lg;
const RAIL = THEME.spacing.sm;
const WIDTH = 220;
const USABLE = WIDTH - THUMB;

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

function strip(root: ReactTestInstance): ReactTestInstance {
  // The outermost View: the one that got the pan handlers and the layout.
  return root.findAll((n) => typeof n.props?.onLayout === 'function')[0]!;
}

function layout(node: ReactTestInstance): void {
  fireEvent(node, 'layout', { nativeEvent: { layout: { width: WIDTH, height: STRIP } } });
}

function grant(node: ReactTestInstance, locationX: number): void {
  fireEvent(node, 'responderGrant', {
    nativeEvent: { locationX, touches: [], changedTouches: [] },
    touchHistory: { touchBank: [] },
  });
}

function thumbStyleOf(root: ReactTestInstance, label: string): Record<string, unknown> {
  const node = root.findAll(
    (n) => n.props?.accessibilityLabel === label && n.props?.accessibilityRole === 'adjustable'
  )[0]!;
  return styles(node).find((s) => s.width === THUMB && s.borderWidth === 2)!;
}

describe('RangeSliderV4 (native)', () => {
  it('gives the grab strip the tap-target floor and the rail weight', () => {
    const { root } = renderThemed(<RangeSliderV4 value={[20, 80]} />, SEED_LIGHT);
    const s = styles(strip(root))[0] as { height: number };
    expect(s.height).toBe(STRIP);
    expect(STRIP).toBeGreaterThanOrEqual(44);
    expect(styles(root).some((x) => x.height === RAIL)).toBe(true);
  });

  it('draws both thumbs where their values are, with no animation', () => {
    const { root } = renderThemed(<RangeSliderV4 value={[0, 100]} />, SEED_LIGHT);
    layout(strip(root));
    expect(thumbStyleOf(root, 'Range minimum').left).toBe(0);
    expect(thumbStyleOf(root, 'Range maximum').left).toBe(USABLE);
  });

  it('grabs the nearer thumb, then tracks by delta', () => {
    const onChange = jest.fn();
    const { root } = renderThemed(
      <RangeSliderV4 value={[20, 80]} onChange={onChange} />,
      SEED_LIGHT
    );
    const node = strip(root);
    layout(node);

    // A tap near the low end moves the low end.
    grant(node, USABLE * 0.25 + THUMB / 2);
    expect(onChange).toHaveBeenLastCalledWith([25, 80]);

    onChange.mockClear();
    // A tap near the high end moves the high end.
    grant(node, USABLE * 0.9 + THUMB / 2);
    expect(onChange).toHaveBeenLastCalledWith([20, 90]);
  });

  it('keeps the pair ordered, so a crossed range is not representable', () => {
    const onChange = jest.fn();
    const { root } = renderThemed(
      <RangeSliderV4 value={[40, 60]} onChange={onChange} />,
      SEED_LIGHT
    );
    const node = strip(root);
    layout(node);
    // Drag the low thumb well past the high one.
    grant(node, USABLE * 0.45 + THUMB / 2);
    fireEvent(node, 'responderMove', {
      nativeEvent: { touches: [], changedTouches: [] },
      touchHistory: { touchBank: [] },
    });
    for (const call of onChange.mock.calls) {
      const [loValue, hiValue] = call[0] as [number, number];
      expect(loValue).toBeLessThanOrEqual(hiValue);
    }
  });

  it('snaps to step', () => {
    const onChange = jest.fn();
    const { root } = renderThemed(
      <RangeSliderV4 value={[0, 10]} min={0} max={10} step={5} onChange={onChange} />,
      SEED_LIGHT
    );
    const node = strip(root);
    layout(node);
    grant(node, USABLE * 0.31 + THUMB / 2);
    expect(onChange).toHaveBeenLastCalledWith([5, 10]);
  });

  it('gives each thumb a collar, the card elevation and its own value', () => {
    const { root } = renderThemed(<RangeSliderV4 value={[20, 80]} />, SEED_LIGHT);
    for (const label of ['Range minimum', 'Range maximum']) {
      const t = thumbStyleOf(root, label);
      expect(t.backgroundColor).toBe(THEME.light.primary);
      expect(t.borderColor).toBe(THEME.light.surface);
    }
    const node = root.findAll((n) => n.props?.accessibilityLabel === 'Range maximum')[0]!;
    expect(node.props.accessibilityValue).toMatchObject({ now: 80 });
  });

  it('lets assistive tech move either end', () => {
    const onChange = jest.fn();
    const { root } = renderThemed(
      <RangeSliderV4 value={[20, 80]} step={5} onChange={onChange} />,
      SEED_LIGHT
    );
    const low = root.findAll((n) => n.props?.accessibilityLabel === 'Range minimum')[0]!;
    fireEvent(low, 'accessibilityAction', { nativeEvent: { actionName: 'increment' } });
    expect(onChange).toHaveBeenLastCalledWith([25, 80]);

    const high = root.findAll((n) => n.props?.accessibilityLabel === 'Range maximum')[0]!;
    fireEvent(high, 'accessibilityAction', { nativeEvent: { actionName: 'decrement' } });
    expect(onChange).toHaveBeenLastCalledWith([20, 75]);
  });

  it('reserves both drag halos', () => {
    const { root } = renderThemed(<RangeSliderV4 value={[20, 80]} />, SEED_LIGHT);
    layout(strip(root));
    const haloSize = THUMB + THEME.spacing.xs * 2;
    // `findAll` visits the composite and the host element for one View, and
    // both carry the same style object — dedupe by reference.
    const halos = [...new Set(styles(root).filter((s) => s.width === haloSize))];
    expect(halos.length).toBe(2);
    for (const h of halos) expect(h.backgroundColor).toBe('transparent');
  });

  it('resolves the span per scheme, not from a ramp', () => {
    const theme = compileTheme(SEED_BOTH);
    const read = (scheme: 'light' | 'dark'): unknown =>
      thumbStyleOf(
        renderThemed(<RangeSliderV4 value={[20, 80]} />, SEED_BOTH, scheme).root,
        'Range minimum'
      ).backgroundColor;
    expect(read('light')).toBe(theme.light.primary);
    expect(read('dark')).toBe(theme.dark.primary);
  });

  it('ignores the gesture when disabled', () => {
    const onChange = jest.fn();
    const { root } = renderThemed(
      <RangeSliderV4 value={[20, 80]} disabled onChange={onChange} />,
      SEED_LIGHT
    );
    const node = strip(root);
    layout(node);
    grant(node, 0);
    expect(onChange).not.toHaveBeenCalled();
  });
});
