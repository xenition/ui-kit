import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_BOTH, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import { RULE_MIX, ZEBRA_MIX } from '../../primitives/internal/v4-data';
import { V4_STATE } from '../../primitives/internal/v4-state';
import { JsonViewerV4 } from './JsonViewerV4';

const VALUE = {
  name: 'Ada',
  count: 42,
  active: true,
  missing: null,
  nested: { deep: { deeper: 1 } },
};

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

describe('JsonViewerV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);

  it('inks every syntax role with a contrast-safe TEXT slot, never a fill', () => {
    const { getByText } = renderThemed(
      <JsonViewerV4 value={VALUE} defaultExpandDepth={3} />,
      SEED_LIGHT
    );
    expect(flat(getByText('name:').props.style).color).toBe(theme.light.accentText);
    expect(flat(getByText('"Ada"').props.style).color).toBe(theme.light.onSurface);
    expect(flat(getByText('42').props.style).color).toBe(theme.light.primaryText);
    expect(flat(getByText('true').props.style).color).toBe(theme.light.warnText);
    expect(flat(getByText('null').props.style).color).toBe(theme.light.muted);
    // The fill slots carry no contrast promise as ink on `surface`.
    expect(flat(getByText('name:').props.style).color).not.toBe(theme.light.accent);
  });

  it('sinks the tree onto the same recessed ground as the code block', () => {
    const { root } = renderThemed(<JsonViewerV4 value={VALUE} />, SEED_LIGHT);
    const shell = hostStyles(root)[0];
    expect(shell?.backgroundColor).toBe(
      mixToken(theme.light.surface, theme.light.onSurface, ZEBRA_MIX)
    );
    expect(shell?.backgroundColor).not.toBe(theme.light.surface);
  });

  it('inverts that ground with the scheme instead of reading the ramps', () => {
    const both = compileTheme(SEED_BOTH);
    const groundFor = (scheme: 'light' | 'dark'): unknown =>
      hostStyles(renderThemed(<JsonViewerV4 value={VALUE} />, SEED_BOTH, scheme).root)[0]
        ?.backgroundColor;
    expect(groundFor('light')).toBe(
      mixToken(both.light.surface, both.light.onSurface, ZEBRA_MIX)
    );
    expect(groundFor('dark')).toBe(mixToken(both.dark.surface, both.dark.onSurface, ZEBRA_MIX));
    expect(groundFor('dark')).not.toBe(both.ramps.neutral[50]);
  });

  it('draws one guide per nesting level and none at the root', () => {
    const guide = mixToken(theme.light.surface, theme.light.onSurface, RULE_MIX);
    const shallow = renderThemed(<JsonViewerV4 value={{ a: 1 }} />, SEED_LIGHT);
    // Root plus one scalar level → exactly one guide.
    expect(hostStyles(shallow.root).filter((s) => s.width === 1)).toHaveLength(1);

    const deep = renderThemed(
      <JsonViewerV4 value={VALUE} defaultExpandDepth={3} />,
      SEED_LIGHT
    );
    const guides = hostStyles(deep.root).filter((s) => s.width === 1);
    expect(guides.length).toBeGreaterThan(1);
    guides.forEach((s) => {
      expect(s.backgroundColor).toBe(guide);
      expect(s.alignSelf).toBe('stretch');
    });
  });

  it('tints a branch row when pressed and keeps the caret out of AT', () => {
    const { root } = renderThemed(<JsonViewerV4 value={VALUE} />, SEED_LIGHT);
    const branch = root.findAll(
      (n) => typeof n.props?.style === 'function' && n.props?.onPress !== undefined
    )[0];
    const resolve = (pressed: boolean): Record<string, unknown> =>
      flat((branch?.props.style as (s: { pressed: boolean }) => unknown)({ pressed }));
    expect(resolve(false).backgroundColor).toBe('transparent');
    expect(resolve(true).backgroundColor).toBe(
      mixToken(theme.light.surface, theme.light.onSurface, V4_STATE.pressed)
    );

    const caret = root.findAll(
      (n) => typeof n.type === 'string' && n.props?.accessibilityElementsHidden === true
    )[0];
    expect(caret?.props.importantForAccessibility).toBe('no');
  });

  it('collapses and expands a branch', () => {
    const { getByText, queryByText } = renderThemed(
      <JsonViewerV4 value={VALUE} defaultExpandDepth={1} />,
      SEED_LIGHT
    );
    expect(queryByText('deep:')).toBeNull();
    fireEvent.press(getByText('nested:'));
    expect(getByText('deep:')).toBeTruthy();
  });

  it('summarises a branch by its size and honours rootLabel', () => {
    const { getByText } = renderThemed(
      <JsonViewerV4 value={{ a: [1, 2, 3] }} rootLabel="payload" />,
      SEED_LIGHT
    );
    expect(getByText('payload:')).toBeTruthy();
    expect(getByText('{1}')).toBeTruthy();
  });

  it('sets everything in one monospace rhythm', () => {
    const { getByText } = renderThemed(
      <JsonViewerV4 value={VALUE} defaultExpandDepth={3} />,
      SEED_LIGHT
    );
    ['name:', '"Ada"', '42'].forEach((t) => {
      const s = flat(getByText(t).props.style);
      expect(s.fontFamily).toBe('monospace');
      expect(s.fontSize).toBe(theme.typography.scale.sm);
    });
  });

  it('carries no gradient and no brand fill anywhere — §35.11', () => {
    const { root } = renderThemed(
      <JsonViewerV4 value={VALUE} defaultExpandDepth={3} />,
      SEED_LIGHT
    );
    hostStyles(root).forEach((s) => {
      expect(s.backgroundColor).not.toBe(theme.light.primary);
      expect(s.backgroundColor).not.toBe(theme.light.accent);
    });
  });
});
