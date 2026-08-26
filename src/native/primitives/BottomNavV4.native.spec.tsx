import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import type { ThemeSeed } from '../../theme/types';
import { BottomNavV4 } from './BottomNavV4';

const ITEMS = [
  { key: 'home', label: 'Home', icon: <Text testID="icon-home">H</Text> },
  { key: 'search', label: 'Search', icon: <Text>S</Text> },
  { key: 'me', label: 'Me' },
];
const FLAT_SEED: ThemeSeed = { ...SEED_LIGHT, depth: 'flat' };
const GLASS_SEED: ThemeSeed = { ...SEED_LIGHT, depth: 'glass' };

function flatten(style: unknown): Record<string, unknown> {
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

function allStyles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flatten(n.props.style));
}

function barStyle(root: ReactTestInstance): Record<string, unknown> {
  return allStyles(root).find((s) => s.borderTopWidth === 1) ?? {};
}

function labelStyle(tab: ReactTestInstance): Record<string, unknown> {
  const texts = tab.findAll((n) => n.type === 'Text');
  return flatten(texts[texts.length - 1]?.props?.style);
}

describe('BottomNavV4 (native)', () => {
  it('renders a tablist of tabs and reports the active one', () => {
    const { getAllByRole } = renderThemed(
      <BottomNavV4 items={ITEMS} active="search" onChange={() => {}} />,
      SEED_LIGHT
    );
    const tabs = getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[1]!.props.accessibilityState.selected).toBe(true);
    expect(tabs[0]!.props.accessibilityState.selected).toBe(false);
  });

  it('says "you are here" in three independent channels', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root, getAllByRole } = renderThemed(
      <BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />,
      SEED_LIGHT
    );
    const tabs = getAllByRole('tab');
    // 1. weight, 2. a contrast-safe text colour.
    expect(labelStyle(tabs[0]!).fontWeight).toBe('600');
    expect(labelStyle(tabs[0]!).color).toBe(theme.light.primaryText);
    expect(labelStyle(tabs[1]!).fontWeight).toBe('500');
    expect(labelStyle(tabs[1]!).color).toBe(theme.light.muted);
    // 3. a contained fill, and exactly one of them.
    const fills = allStyles(root).filter(
      (s) =>
        s.borderRadius === theme.radius.full &&
        typeof s.backgroundColor === 'string' &&
        s.backgroundColor !== 'transparent'
    );
    expect(fills).toHaveLength(1);
  });

  it('composites the indicator opaquely rather than tinting through the bar', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />,
      SEED_LIGHT
    );
    const fill = allStyles(root).find(
      (s) =>
        s.borderRadius === theme.radius.full &&
        typeof s.backgroundColor === 'string' &&
        s.backgroundColor !== 'transparent'
    );
    const bg = fill!.backgroundColor as string;
    expect(bg).toMatch(/^#[0-9a-f]{6}$/i);
    expect(bg).not.toBe(theme.light.primary);
    expect(bg).not.toBe(theme.light.surface);
  });

  it('never colours the label with the bare fill slot', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getAllByRole } = renderThemed(
      <BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />,
      SEED_LIGHT
    );
    const color = labelStyle(getAllByRole('tab')[0]!).color;
    expect(color).toBe(theme.light.primaryText);
    // The base bar used `colors.primary` here — a fill with no promise as text.
    expect(theme.light.primaryText).toBeDefined();
    expect(color).not.toBe(theme.light.muted);
  });

  it('gives every cell a 44pt target and adds the safe-area inset underneath', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root, getAllByRole } = renderThemed(
      <BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />,
      SEED_LIGHT
    );
    getAllByRole('tab').forEach((tab) => {
      expect(flatten(tab.props.style).minHeight).toBe(theme.spacing['2xl'] - theme.spacing.xs);
    });
    // The mocked inset provider reports a non-zero bottom.
    expect(barStyle(root).paddingBottom).toBeGreaterThan(theme.spacing.xs);
  });

  it('floats on `elevation.sheet`, and flattens with the seed', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />,
      SEED_LIGHT
    );
    const bar = barStyle(root);
    expect(bar.shadowOpacity).toBe(theme.lightElevation.sheet.opacity);
    // Negative offset: the shadow falls onto the content passing underneath.
    expect(theme.lightElevation.sheet.offsetY).toBeLessThan(0);
    expect((bar.shadowOffset as { height: number }).height).toBe(
      theme.lightElevation.sheet.offsetY
    );

    const flat = barStyle(
      renderThemed(<BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />, FLAT_SEED).root
    );
    expect(flat.shadowOpacity).toBe(0);
    // The hairline survives, so a flat seed still has a separated bar.
    expect(flat.borderTopWidth).toBe(1);
  });

  it("frosts only when the seed said depth:'glass'", () => {
    const theme = compileTheme(SEED_LIGHT);
    const solid = barStyle(
      renderThemed(<BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />, SEED_LIGHT)
        .root
    );
    expect(solid.backgroundColor).toBe(theme.light.surface);

    const glass = barStyle(
      renderThemed(<BottomNavV4 items={ITEMS} active="home" onChange={() => {}} />, GLASS_SEED)
        .root
    );
    expect(glass.backgroundColor).not.toBe(theme.light.surface);
    expect(String(glass.backgroundColor)).toContain('rgba');
    expect(String(glass.borderTopColor)).toContain('rgba');
  });

  it('renders an item with no icon without an empty indicator', () => {
    const { getAllByRole } = renderThemed(
      <BottomNavV4 items={ITEMS} active="me" onChange={() => {}} />,
      SEED_LIGHT
    );
    const tab = getAllByRole('tab')[2]!;
    // `findAll` counts the node itself, so the tab's own View is the only one.
    expect(tab.findAll((n) => n.type === 'View' && n !== tab)).toHaveLength(0);
    expect(labelStyle(tab).fontWeight).toBe('600');
  });

  it('emits the pressed key', () => {
    const onChange = jest.fn();
    const { getAllByRole } = renderThemed(
      <BottomNavV4 items={ITEMS} active="home" onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getAllByRole('tab')[1]!);
    expect(onChange).toHaveBeenCalledWith('search');
  });
});
