import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, SEED_BOTH, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import { SELECT_MIX } from '../../primitives/internal/v4-data';
import { V4_STATE } from '../../primitives/internal/v4-state';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';
import { TreeV4 } from './TreeV4';

const DATA = [
  {
    id: 'src',
    label: 'src',
    children: [
      { id: 'a', label: 'app.ts' },
      { id: 'b', label: 'lib', children: [{ id: 'c', label: 'util.ts' }] },
    ],
  },
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

/** The row Pressable whose subtree contains `label`, with its style resolved. */
function rowStyle(
  root: ReactTestInstance,
  label: string,
  state: { pressed: boolean } = { pressed: false }
): Record<string, unknown> {
  const node = root
    .findAll((n) => typeof n.props?.style === 'function' && n.props?.onPress !== undefined)
    .find((n) => {
      const texts = n.findAll((m) => typeof m.type === 'string' && m.type === 'Text');
      return texts.some((t) => t.children.includes(label));
    });
  return flat((node?.props.style as (s: { pressed: boolean }) => unknown)(state));
}

describe('TreeV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);
  const selectedBg = mixToken(theme.light.surface, theme.light.primary, SELECT_MIX);

  it('tints the selected row instead of repainting it', () => {
    const { root, getByText } = renderThemed(
      <TreeV4 data={DATA} defaultExpanded={['src']} selectedId="a" />,
      SEED_LIGHT
    );
    expect(rowStyle(root, 'app.ts').backgroundColor).toBe(selectedBg);
    // Emphatically not the solid brand bar the base painted.
    expect(rowStyle(root, 'app.ts').backgroundColor).not.toBe(theme.light.primary);

    const label = flat(getByText('app.ts').props.style);
    expect(label.fontWeight).toBe('600');
    expect(label.color).toBe(
      ensureContrast(theme.light.primaryText, selectedBg, MIN_CONTRAST)
    );
    expect(label.color).not.toBe(theme.light.onPrimary);
  });

  it('lets selection win over the press tint', () => {
    const { root } = renderThemed(
      <TreeV4 data={DATA} defaultExpanded={['src']} selectedId="a" />,
      SEED_LIGHT
    );
    expect(rowStyle(root, 'app.ts', { pressed: true }).backgroundColor).toBe(selectedBg);
  });

  it('tints a press from the two scheme-resolved neutral slots', () => {
    const { root } = renderThemed(<TreeV4 data={DATA} />, SEED_LIGHT);
    expect(rowStyle(root, 'src', { pressed: true }).backgroundColor).toBe(
      mixToken(theme.light.surface, theme.light.onSurface, V4_STATE.pressed)
    );
    expect(rowStyle(root, 'src').backgroundColor).toBe('transparent');
  });

  it('follows the scheme for both grounds', () => {
    const both = compileTheme(SEED_BOTH);
    const dark = renderThemed(
      <TreeV4 data={DATA} selectedId="src" />,
      SEED_BOTH,
      'dark'
    ).root;
    expect(rowStyle(dark, 'src').backgroundColor).toBe(
      mixToken(both.dark.surface, both.dark.primary, SELECT_MIX)
    );
    // The wrong reach: ramps.primary[50] is a near-white in BOTH schemes.
    expect(rowStyle(dark, 'src').backgroundColor).not.toBe(both.ramps.primary[50]);
  });

  it('indents one lg step per level, matching the web twin', () => {
    const { root } = renderThemed(
      <TreeV4 data={DATA} defaultExpanded={['src', 'b']} />,
      SEED_LIGHT
    );
    expect(rowStyle(root, 'src').paddingLeft).toBe(theme.spacing.sm);
    expect(rowStyle(root, 'app.ts').paddingLeft).toBe(theme.spacing.sm + theme.spacing.lg);
    expect(rowStyle(root, 'util.ts').paddingLeft).toBe(theme.spacing.sm + 2 * theme.spacing.lg);
  });

  it('gives every row the data-display row height and never a card', () => {
    const { root } = renderThemed(<TreeV4 data={DATA} defaultExpanded={['src']} />, SEED_LIGHT);
    ['src', 'app.ts', 'lib'].forEach((label) => {
      const s = rowStyle(root, label);
      expect(s.minHeight).toBe(theme.spacing.xl + theme.spacing.xs);
      expect(s.borderWidth).toBeUndefined();
      expect(s.shadowOpacity).toBeUndefined();
      expect(s.elevation).toBeUndefined();
    });
  });

  it('still expands and selects', () => {
    const picked: string[] = [];
    const { getByText, queryByText } = renderThemed(
      <TreeV4 data={DATA} onSelect={(n) => picked.push(n.id)} />,
      SEED_LIGHT
    );
    expect(queryByText('app.ts')).toBeNull();
    fireEvent.press(getByText('src'));
    expect(queryByText('app.ts')).toBeTruthy();
    expect(picked).toEqual(['src']);
    fireEvent.press(getByText('app.ts'));
    expect(picked).toEqual(['src', 'a']);
  });

  it('turns the caret only for a node that has children', () => {
    const { root, getAllByText } = renderThemed(
      <TreeV4 data={DATA} defaultExpanded={['src']} />,
      SEED_LIGHT
    );
    const carets = getAllByText('▸');
    expect(carets).toHaveLength(2); // src (open) and lib (closed); app.ts has none
    expect(flat(carets[0]?.props.style).transform).toEqual([{ rotate: '90deg' }]);
    expect(flat(carets[1]?.props.style).transform).toEqual([{ rotate: '0deg' }]);
    expect(root).toBeTruthy();
  });
});
