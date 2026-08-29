import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme, MIN_CONTRAST } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { TabsV4 } from './TabsV4';

const ITEMS = [
  { value: 'a', label: 'Overview' },
  { value: 'b', label: 'Activity' },
  { value: 'c', label: 'Settings' },
];

/** Flatten an RN `style` prop, including the array form. */
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

/**
 * Every flattened style on a HOST element in the tree. Composite nodes carry
 * the same `style` prop as the host they render, so filtering to host elements
 * is what keeps one painted box from being counted three times.
 */
function allStyles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flatten(n.props.style));
}

function labelStyle(tab: ReactTestInstance): Record<string, unknown> {
  return flatten(tab.findAll((n) => n.type === 'Text')[0]?.props?.style);
}

describe('TabsV4 (native)', () => {
  it('renders a tablist of tabs and reports the selected one', () => {
    const { getAllByRole } = renderThemed(
      <TabsV4 items={ITEMS} value="b" onChange={() => {}} />,
      SEED_LIGHT
    );
    const tabs = getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[1]!.props.accessibilityState.selected).toBe(true);
    expect(tabs[0]!.props.accessibilityState.selected).toBe(false);
  });

  it('says "selected" in colour AND weight, so neither channel is load-bearing alone', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getAllByRole } = renderThemed(
      <TabsV4 items={ITEMS} value="b" onChange={() => {}} />,
      SEED_LIGHT
    );
    const tabs = getAllByRole('tab');
    expect(labelStyle(tabs[1]!).color).toBe(theme.light.primaryText);
    expect(labelStyle(tabs[1]!).fontWeight).toBe('600');
    expect(labelStyle(tabs[0]!).color).toBe(theme.light.muted);
    expect(labelStyle(tabs[0]!).fontWeight).toBe('500');
  });

  it('labels the selected tab with a colour that actually clears AA on the surface', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getAllByRole } = renderThemed(
      <TabsV4 items={ITEMS} value="a" onChange={() => {}} />,
      SEED_LIGHT
    );
    // `colors.primary` is a FILL slot and carries no promise as text;
    // `primaryText` is the same hue walked until it does.
    const color = labelStyle(getAllByRole('tab')[0]!).color as string;
    expect(color).toBe(theme.light.primaryText);
    expect(contrastRatio(color, theme.light.surface)).toBeGreaterThanOrEqual(MIN_CONTRAST);
  });

  it('gives every tab a 44pt target composed from the spacing scale', () => {
    const theme = compileTheme(SEED_LIGHT);
    const expected = theme.spacing['2xl'] - theme.spacing.xs;
    expect(expected).toBe(44);
    const { getAllByRole } = renderThemed(
      <TabsV4 items={ITEMS} value="a" onChange={() => {}} />,
      SEED_LIGHT
    );
    getAllByRole('tab').forEach((tab) => {
      expect(flatten(tab.props.style).minHeight).toBe(expected);
    });
  });

  it('emits through `onValueChange`, and lets it win over `onChange`', () => {
    const onValueChange = jest.fn();
    const onChange = jest.fn();
    const { getAllByRole } = renderThemed(
      <TabsV4 items={ITEMS} value="a" onValueChange={onValueChange} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getAllByRole('tab')[2]!);
    expect(onValueChange).toHaveBeenCalledWith('c');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('falls back to `onChange` when that is the only spelling passed', () => {
    const onChange = jest.fn();
    const { getAllByRole } = renderThemed(
      <TabsV4 items={ITEMS} value="a" onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getAllByRole('tab')[1]!);
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('slides ONE underline rather than blinking a border on each tab', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root, getAllByRole } = renderThemed(
      <TabsV4 items={ITEMS} value="a" onChange={() => {}} />,
      SEED_LIGHT
    );
    const bars = allStyles(root).filter(
      (s) => s.backgroundColor === theme.light.primary && s.position === 'absolute'
    );
    expect(bars).toHaveLength(1);
    expect(bars[0]!.height).toBe(2);
    // No tab draws a selected border of its own — the one bar is the indicator.
    getAllByRole('tab').forEach((tab) => {
      expect(flatten(tab.props.style).borderBottomWidth).toBeUndefined();
    });
  });

  it('stays hidden until it has an honest position to sit at', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <TabsV4 items={ITEMS} value="a" onChange={() => {}} />,
      SEED_LIGHT
    );
    const bar = allStyles(root).find(
      (s) => s.backgroundColor === theme.light.primary && s.position === 'absolute'
    );
    // No `onLayout` has fired in the test renderer, so the indicator would be
    // parked at zero — it must not paint there.
    expect(bar!.opacity).toBe(0);
  });

  it('draws the row hairline from `border`, resolved per scheme', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <TabsV4 items={ITEMS} value="a" onChange={() => {}} />,
      SEED_LIGHT
    );
    const row = allStyles(root).find((s) => s.borderBottomWidth === 1);
    expect(row?.borderBottomColor).toBe(theme.light.border);
  });

  it('passes a non-string label through untouched', () => {
    const { getByTestId } = renderThemed(
      <TabsV4
        items={[{ value: 'a', label: <Text testID="custom">X</Text> }, ITEMS[1]!]}
        value="a"
        onChange={() => {}}
      />,
      SEED_LIGHT
    );
    expect(getByTestId('custom')).toBeTruthy();
  });
});
