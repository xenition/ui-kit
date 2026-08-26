import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_BOTH, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import { RULE_MIX, ZEBRA_MIX } from '../../primitives/internal/v4-data';
import { V4_STATE } from '../../primitives/internal/v4-state';
import { CodeBlockV4 } from './CodeBlockV4';

const CODE = 'const a = 1;\nconst b = 2;\n';

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

describe('CodeBlockV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);
  const ground = mixToken(theme.light.surface, theme.light.onSurface, ZEBRA_MIX);
  const rule = mixToken(theme.light.surface, theme.light.onSurface, RULE_MIX);

  it('sinks the body onto a calm derived ground, not onto the page colour', () => {
    const { root } = renderThemed(<CodeBlockV4 code={CODE} />, SEED_LIGHT);
    const body = hostStyles(root).find((s) => s.padding === theme.spacing.md);
    expect(body?.backgroundColor).toBe(ground);
    expect(body?.backgroundColor).not.toBe(theme.light.surface);
    // The shell stays on `surface`, so the two layers differ by ground.
    expect(hostStyles(root)[0]?.backgroundColor).toBe(theme.light.surface);
  });

  it('inverts that ground with the scheme instead of reading the ramps', () => {
    const both = compileTheme(SEED_BOTH);
    const bodyFor = (scheme: 'light' | 'dark'): unknown =>
      hostStyles(renderThemed(<CodeBlockV4 code={CODE} />, SEED_BOTH, scheme).root).find(
        (s) => s.padding === both.spacing.md
      )?.backgroundColor;
    expect(bodyFor('light')).toBe(
      mixToken(both.light.surface, both.light.onSurface, ZEBRA_MIX)
    );
    expect(bodyFor('dark')).toBe(mixToken(both.dark.surface, both.dark.onSurface, ZEBRA_MIX));
    expect(bodyFor('dark')).not.toBe(both.ramps.neutral[50]);
  });

  it('gives the gutter an edge', () => {
    const { root } = renderThemed(<CodeBlockV4 code={CODE} />, SEED_LIGHT);
    const gutter = hostStyles(root).find((s) => s.borderRightWidth === 1);
    expect(gutter?.borderColor).toBe(rule);
    expect(gutter?.alignItems).toBe('flex-end');
  });

  it('hides the gutter when asked', () => {
    const { root, queryByText } = renderThemed(
      <CodeBlockV4 code={CODE} lineNumbers={false} />,
      SEED_LIGHT
    );
    expect(hostStyles(root).find((s) => s.borderRightWidth === 1)).toBeUndefined();
    expect(queryByText('1')).toBeNull();
  });

  it('numbers every line and keeps blank lines visible', () => {
    const { getByText, queryByText } = renderThemed(<CodeBlockV4 code={'a\n\nb\n'} />, SEED_LIGHT);
    expect(getByText('1')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(queryByText('4')).toBeNull();
  });

  it('sets the code and the gutter in one monospace rhythm', () => {
    const { getByText } = renderThemed(<CodeBlockV4 code={CODE} />, SEED_LIGHT);
    const line = flat(getByText('const a = 1;').props.style);
    const number = flat(getByText('1').props.style);
    expect(line.fontFamily).toBe('monospace');
    expect(number.fontFamily).toBe('monospace');
    expect(line.lineHeight).toBe(number.lineHeight);
    expect(line.color).toBe(theme.light.onSurface);
    expect(number.color).toBe(theme.light.muted);
  });

  it('gives the copy control a real target and a press tint', () => {
    const seen: string[] = [];
    const { root, getByLabelText } = renderThemed(
      <CodeBlockV4 code={CODE} language="ts" onCopy={(c) => seen.push(c)} />,
      SEED_LIGHT
    );
    const btn = root.findAll(
      (n) => typeof n.props?.style === 'function' && n.props?.accessibilityLabel === 'Copy code'
    )[0];
    const resolve = (pressed: boolean): Record<string, unknown> =>
      flat((btn?.props.style as (s: { pressed: boolean }) => unknown)({ pressed }));
    expect(resolve(false).minHeight).toBe(theme.spacing.xl);
    expect(resolve(false).backgroundColor).toBe('transparent');
    expect(resolve(true).backgroundColor).toBe(
      mixToken(theme.light.surface, theme.light.onSurface, V4_STATE.pressed)
    );

    fireEvent.press(getByLabelText('Copy code'));
    expect(seen).toEqual([CODE]);
  });

  it('shows no header when there is nothing to put in it', () => {
    const { queryByLabelText, root } = renderThemed(<CodeBlockV4 code={CODE} />, SEED_LIGHT);
    expect(queryByLabelText('Copy code')).toBeNull();
    expect(hostStyles(root).find((s) => s.borderBottomWidth === 1)).toBeUndefined();
  });

  it('carries no gradient and no syntax palette — §35.11', () => {
    const { root, getByText } = renderThemed(
      <CodeBlockV4 code={CODE} language="ts" onCopy={() => {}} />,
      SEED_LIGHT
    );
    // Every code line reads the one ink; nothing is brand-tinted.
    [getByText('const a = 1;'), getByText('const b = 2;')].forEach((t) => {
      expect(flat(t.props.style).color).toBe(theme.light.onSurface);
    });
    hostStyles(root).forEach((s) => {
      expect(s.backgroundColor).not.toBe(theme.light.primary);
      expect(s.backgroundColor).not.toBe(theme.light.accent);
    });
  });
});
