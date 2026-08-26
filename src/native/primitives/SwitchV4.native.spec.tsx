import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import type { ThemeSeed } from '../../theme/types';
import { SwitchV4 } from './SwitchV4';
import { V4_STATE } from '../../primitives/internal/v4-state';

const THEME = compileTheme(SEED_LIGHT);
const RING = THEME.spacing.xs;
const KNOB = THEME.spacing.lg;
const TRACK_H = KNOB + THEME.spacing.xs;

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

function halo(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.padding === RING && s.margin === -RING);
}

function knob(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.width === KNOB && s.height === KNOB);
}

/** The track itself — the Pressable's own style, flattened out of its array. */
function track(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.height !== undefined && s.borderRadius !== undefined && s.width !== undefined && s.justifyContent === 'center');
}

describe('SwitchV4 (native)', () => {
  it('is a pill by derivation, so a sharp seed still gets a round switch', () => {
    const sharp: ThemeSeed = { ...SEED_LIGHT, shape: 'sharp' };
    const theme = compileTheme(sharp);
    expect(theme.radius.full).toBe(0);

    const { root } = renderThemed(<SwitchV4 accessibilityLabel="Alerts" />, sharp);
    expect(track(root)?.height).toBe(TRACK_H);
    expect(track(root)?.borderRadius).toBe(TRACK_H / 2);
  });

  it('takes the track width from the same scale step every control is tall', () => {
    const { root } = renderThemed(<SwitchV4 accessibilityLabel="Alerts" />, SEED_LIGHT);
    expect(track(root)?.width).toBe(THEME.spacing['2xl']);
  });

  it('rests on the semantic border, not a ramp step that keeps its light orientation', () => {
    const seed: ThemeSeed = { ...SEED_LIGHT, mode: 'both' };
    const theme = compileTheme(seed);
    const { root } = renderThemed(<SwitchV4 accessibilityLabel="Alerts" />, seed, 'dark');
    expect(track(root)?.backgroundColor).toBe(theme.dark.border);
  });

  it('raises the knob on the compiled elevation token', () => {
    const { root } = renderThemed(<SwitchV4 accessibilityLabel="Alerts" />, SEED_LIGHT);
    const style = styles(root).find((s) => s.width === KNOB && s.shadowColor !== undefined);
    expect(style?.backgroundColor).toBe(THEME.light.surface);
    expect(style?.shadowColor).toBe(THEME.lightElevation.card.color);
    expect(style?.shadowOpacity).toBe(THEME.lightElevation.card.opacity);
  });

  it('flattens the knob for free under a flat seed — no branch in the component', () => {
    const flat: ThemeSeed = { ...SEED_LIGHT, depth: 'flat' };
    const { root } = renderThemed(<SwitchV4 accessibilityLabel="Alerts" />, flat);
    expect(
      styles(root).find((s) => s.width === KNOB && s.shadowOpacity !== undefined)?.shadowOpacity
    ).toBe(0);
  });

  it('lights the brand track when it is on', () => {
    const { root } = renderThemed(<SwitchV4 accessibilityLabel="Alerts" checked />, SEED_LIGHT);
    expect(styles(root).find((s) => s.backgroundColor === THEME.light.primary)).toBeDefined();
  });

  it('opens the touch area out to a full control height', () => {
    const { getByRole } = renderThemed(<SwitchV4 accessibilityLabel="Alerts" />, SEED_LIGHT);
    expect(getByRole('switch').props.hitSlop).toBe((THEME.spacing['2xl'] - TRACK_H) / 2);
  });

  it('reserves the halo and lights it while held', () => {
    const { root, getByRole } = renderThemed(<SwitchV4 accessibilityLabel="Alerts" />, SEED_LIGHT);
    expect(halo(root)?.backgroundColor).toBe('transparent');
    fireEvent(getByRole('switch'), 'pressIn');
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
    fireEvent(getByRole('switch'), 'pressOut');
    expect(halo(root)?.backgroundColor).toBe('transparent');
  });

  it('reports the requested state, preferring the original spelling', () => {
    const onCheckedChange = jest.fn();
    const onChange = jest.fn();
    const { getByRole } = renderThemed(
      <SwitchV4
        accessibilityLabel="Alerts"
        checked
        onCheckedChange={onCheckedChange}
        onChange={onChange}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(false);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('dims and blocks when disabled', () => {
    const emit = jest.fn();
    const { root, getByRole } = renderThemed(
      <SwitchV4 accessibilityLabel="Alerts" disabled onCheckedChange={emit} />,
      SEED_LIGHT
    );
    expect(track(root)?.opacity).toBe(V4_STATE.disabledContent);
    fireEvent.press(getByRole('switch'));
    expect(emit).not.toHaveBeenCalled();
  });
});
