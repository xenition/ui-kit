import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, SEED_BOTH, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import { V4_STATE } from '../../primitives/internal/v4-state';
import { ListV4 } from './ListV4';

const ITEMS = [
  { title: 'Ada Lovelace', description: 'Analytical engine' },
  { title: 'Grace Hopper', description: 'Compilers' },
];

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

/** Host views laid out as a row with the V4 row padding. */
function rows(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => {
      if (typeof n.type !== 'string' || n.props?.style === undefined) return false;
      const s = flat(n.props.style);
      return s.flexDirection === 'row' && s.paddingHorizontal !== undefined;
    })
    .map((n) => flat(n.props.style));
}

describe('ListV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);

  it('typesets the hierarchy instead of drawing it', () => {
    const { getByText } = renderThemed(<ListV4 items={ITEMS} />, SEED_LIGHT);
    const title = flat(getByText('Ada Lovelace').props.style);
    const desc = flat(getByText('Analytical engine').props.style);
    expect(title.fontSize).toBe(theme.typography.scale.base);
    expect(title.fontWeight).toBe('600');
    expect(title.color).toBe(theme.light.onSurface);
    expect(desc.fontSize).toBe(theme.typography.scale.xs);
    expect(desc.color).toBe(theme.light.muted);
    // The description is genuinely smaller, not just paler.
    expect(desc.fontSize).toBeLessThan(title.fontSize as number);
  });

  it('keeps the one border a list earns and draws none between rows', () => {
    const { root } = renderThemed(<ListV4 items={ITEMS} />, SEED_LIGHT);
    const outer = flat(root.findAll((n) => n.props?.style !== undefined)[0]?.props?.style);
    expect(outer.borderWidth).toBe(1);
    expect(outer.borderColor).toBe(theme.light.border);
    rows(root).forEach((s) => {
      expect(s.borderTopWidth).toBeUndefined();
      expect(s.borderBottomWidth).toBeUndefined();
    });
  });

  it('gives every row the V4 tap target', () => {
    const { root } = renderThemed(<ListV4 items={ITEMS} />, SEED_LIGHT);
    const found = rows(root);
    expect(found).toHaveLength(2);
    found.forEach((s) => expect(s.minHeight).toBe(theme.spacing['2xl']));
  });

  it('never lifts a row', () => {
    const { root } = renderThemed(
      <ListV4 items={[{ title: 'Tap', onPress: () => {} }]} />,
      SEED_LIGHT
    );
    rows(root).forEach((s) => {
      expect(s.shadowOpacity).toBeUndefined();
      expect(s.elevation).toBeUndefined();
    });
  });

  it('tints a press from the two scheme-resolved slots, in both schemes', () => {
    const both = compileTheme(SEED_BOTH);
    const pressedStyle = (scheme: 'light' | 'dark'): Record<string, unknown> => {
      const { root } = renderThemed(
        <ListV4 items={[{ title: 'Tap', onPress: () => {} }]} />,
        SEED_BOTH,
        scheme
      );
      const node = root.findAll(
        (n) => typeof n.props?.style === 'function' && n.props?.onPress !== undefined
      )[0];
      return flat((node?.props.style as (s: { pressed: boolean }) => unknown)({ pressed: true }));
    };
    expect(pressedStyle('light').backgroundColor).toBe(
      mixToken(both.light.surface, both.light.onSurface, V4_STATE.pressed)
    );
    expect(pressedStyle('dark').backgroundColor).toBe(
      mixToken(both.dark.surface, both.dark.onSurface, V4_STATE.pressed)
    );
    // The wrong reach: ramps.neutral[50] is a near-white in BOTH schemes.
    expect(pressedStyle('dark').backgroundColor).not.toBe(both.ramps.neutral[50]);
  });

  it('fires onPress on a pressable row only', () => {
    const seen: string[] = [];
    const { getByText, root } = renderThemed(
      <ListV4 items={[{ title: 'Tap me', onPress: () => seen.push('tap') }, { title: 'Static' }]} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Tap me'));
    expect(seen).toEqual(['tap']);
    expect(
      root.findAll((n) => typeof n.type === 'string' && n.props?.accessibilityRole === 'button')
    ).toHaveLength(1);
  });

  it('renders the leading and trailing slots', () => {
    const { getByText } = renderThemed(
      <ListV4
        items={[{ title: 'Row', leading: <Text>L</Text>, trailing: <Text>T</Text> }]}
      />,
      SEED_LIGHT
    );
    expect(getByText('L')).toBeTruthy();
    expect(getByText('T')).toBeTruthy();
  });
});
