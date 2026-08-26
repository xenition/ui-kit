import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { StatisticV4 } from './StatisticV4';

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

function hostStyles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flat(n.props.style));
}

/** The decorative trend arrow — out of the accessibility tree, so text queries
 *  cannot see it. */
function arrowNode(root: ReactTestInstance): ReactTestInstance | undefined {
  return root.findAll(
    (n) => typeof n.type === 'string' && n.props?.accessibilityElementsHidden === true
  )[0];
}

describe('StatisticV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);

  it('sets the hero number in tabular figures on the display face', () => {
    // SEED_DARK is the seed whose heading and body faces actually differ, so
    // "the hero wears the display face" is a testable claim on it.
    const dark = compileTheme(SEED_DARK);
    const { getByText } = renderThemed(<StatisticV4 label="Revenue" value="1,204" />, SEED_DARK);
    const hero = flat(getByText('1,204').props.style);
    expect(hero.fontVariant).toEqual(['tabular-nums']);
    expect(hero.fontFamily).toBe(dark.typography.fontHeading);
    expect(hero.fontFamily).not.toBe(dark.typography.fontBody);
    expect(hero.fontSize).toBe(dark.typography.scale['3xl']);
    expect(hero.lineHeight).toBe(dark.typography.scale['3xl']);
    expect(hero.fontWeight).toBe('700');
  });

  it('demotes the label to a caption so the number grows without growing', () => {
    const { getByText } = renderThemed(
      <StatisticV4 label="Revenue" value="1,204" />,
      SEED_LIGHT
    );
    const label = flat(getByText('Revenue').props.style);
    expect(label.fontSize).toBe(theme.typography.scale.xs);
    expect(label.color).toBe(theme.light.muted);
  });

  it('sits the suffix on the number baseline instead of nudging it', () => {
    const { root, getByText } = renderThemed(
      <StatisticV4 label="Storage" value="12" suffix="GB" />,
      SEED_LIGHT
    );
    const row = hostStyles(root).find((s) => s.flexDirection === 'row');
    expect(row?.alignItems).toBe('baseline');
    expect(flat(getByText('GB').props.style).marginBottom).toBeUndefined();
  });

  it('inks the delta with the contrast-safe TEXT slot, not the fill colour', () => {
    const up = renderThemed(<StatisticV4 label="a" value="1" delta={12} />, SEED_LIGHT);
    expect(flat(up.getByText('12').props.style).color).toBe(theme.light.successText);
    // The fill colour is what the base used; the compiler only guarantees the
    // *Text form as ink on `surface`.
    expect(flat(up.getByText('12').props.style).color).not.toBe(theme.light.success);

    const down = renderThemed(<StatisticV4 label="a" value="1" delta={-3} />, SEED_LIGHT);
    expect(flat(down.getByText('-3').props.style).color).toBe(theme.light.dangerText);

    const flatTrend = renderThemed(<StatisticV4 label="a" value="1" delta={0} />, SEED_LIGHT);
    expect(flat(flatTrend.getByText('0').props.style).color).toBe(theme.light.muted);
  });

  it('resolves the delta ink per scheme', () => {
    const dark = compileTheme(SEED_DARK);
    const { getByText } = renderThemed(<StatisticV4 label="a" value="1" delta={12} />, SEED_DARK);
    expect(flat(getByText('12').props.style).color).toBe(dark.dark.successText);
  });

  it('sets the delta in tabular figures and hides the arrow from AT', () => {
    const { root, getByText, queryByText } = renderThemed(
      <StatisticV4 label="a" value="1" delta="12%" trend="up" />,
      SEED_LIGHT
    );
    expect(flat(getByText('12%').props.style).fontVariant).toEqual(['tabular-nums']);
    // The arrow is unreachable by text query precisely BECAUSE it is out of
    // the accessibility tree — "▲ 12%" is announced as "12%".
    expect(queryByText('▲')).toBeNull();
    const arrow = arrowNode(root);
    expect(arrow?.props.accessibilityElementsHidden).toBe(true);
    expect(arrow?.props.importantForAccessibility).toBe('no');
  });

  it('infers the trend from a numeric delta and honours an explicit one', () => {
    const inferred = renderThemed(<StatisticV4 label="a" value="1" delta={-5} />, SEED_LIGHT);
    expect(arrowNode(inferred.root)?.children).toEqual(['▼']);
    const forced = renderThemed(
      <StatisticV4 label="a" value="1" delta={-5} trend="up" />,
      SEED_LIGHT
    );
    expect(arrowNode(forced.root)?.children).toEqual(['▲']);
  });

  it('renders bare — no card, no border, no shadow (§11)', () => {
    const { root } = renderThemed(<StatisticV4 label="a" value="1" delta={1} />, SEED_LIGHT);
    hostStyles(root).forEach((s) => {
      expect(s.borderWidth).toBeUndefined();
      expect(s.backgroundColor).toBeUndefined();
      expect(s.shadowOpacity).toBeUndefined();
      expect(s.elevation).toBeUndefined();
    });
  });

  it('renders a node value untouched', () => {
    const { getByText } = renderThemed(
      <StatisticV4 label="a" value={<Text>Live</Text>} />,
      SEED_LIGHT
    );
    expect(getByText('Live')).toBeTruthy();
  });
});
