import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme, MIN_CONTRAST } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { ScrollableTabsV4 } from './ScrollableTabsV4';

const ITEMS = [
  { value: 'a', label: 'All' },
  { value: 'b', label: 'Unread', badge: 12 },
  { value: 'c', label: 'Archived' },
];

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

function labelStyle(tab: ReactTestInstance): Record<string, unknown> {
  return flatten(tab.findAll((n) => n.type === 'Text')[0]?.props?.style);
}

/** The chip's own View style — the last styled host inside the tab. */
function chipStyle(tab: ReactTestInstance): Record<string, unknown> {
  const views = tab.findAll(
    (n) => n.type === 'View' && flatten(n.props?.style).borderRadius !== undefined
  );
  return flatten(views[views.length - 1]?.props?.style);
}

describe('ScrollableTabsV4 (native)', () => {
  it('renders a scrolling tablist and reports the selected tab', () => {
    const { getAllByRole } = renderThemed(
      <ScrollableTabsV4 items={ITEMS} value="b" onValueChange={() => {}} />,
      SEED_LIGHT
    );
    const tabs = getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[1]!.props.accessibilityState.selected).toBe(true);
  });

  it('says "selected" in colour AND weight, in the contrast-safe text slot', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getAllByRole } = renderThemed(
      <ScrollableTabsV4 items={ITEMS} value="b" onValueChange={() => {}} />,
      SEED_LIGHT
    );
    const tabs = getAllByRole('tab');
    expect(labelStyle(tabs[1]!).color).toBe(theme.light.primaryText);
    expect(labelStyle(tabs[1]!).fontWeight).toBe('600');
    expect(labelStyle(tabs[0]!).color).toBe(theme.light.muted);
  });

  it('gives every tab a 44pt target composed from the spacing scale', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getAllByRole } = renderThemed(
      <ScrollableTabsV4 items={ITEMS} value="a" onValueChange={() => {}} />,
      SEED_LIGHT
    );
    getAllByRole('tab').forEach((tab) => {
      expect(flatten(tab.props.style).minHeight).toBe(theme.spacing['2xl'] - theme.spacing.xs);
    });
  });

  it('gives the count chip a ground it owns, and a label measured against it', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getAllByRole } = renderThemed(
      <ScrollableTabsV4 items={ITEMS} value="b" onValueChange={() => {}} />,
      SEED_LIGHT
    );
    const chip = chipStyle(getAllByRole('tab')[1]!);
    expect(chip.backgroundColor).toBe(theme.light.primary);
    // The base labelled this `colors.surface` — no contrast relationship at all.
    const texts = getAllByRole('tab')[1]!.findAll((n) => n.type === 'Text');
    const chipText = flatten(texts[texts.length - 1]?.props?.style);
    expect(chipText.color).not.toBe(theme.light.surface);
    expect(contrastRatio(chipText.color as string, chip.backgroundColor as string)).toBeGreaterThanOrEqual(
      MIN_CONTRAST
    );
  });

  it('composites the idle chip opaquely rather than borrowing its ground', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getAllByRole } = renderThemed(
      <ScrollableTabsV4 items={ITEMS} value="a" onValueChange={() => {}} />,
      SEED_LIGHT
    );
    const chip = chipStyle(getAllByRole('tab')[1]!);
    const bg = chip.backgroundColor as string;
    // A real opaque hex, not an rgba() that inherits whatever is behind it.
    expect(bg).toMatch(/^#[0-9a-f]{6}$/i);
    expect(bg).not.toBe(theme.light.muted);
    expect(bg).not.toBe(theme.light.surface);
  });

  it('emits the pressed tab value', () => {
    const onValueChange = jest.fn();
    const { getAllByRole } = renderThemed(
      <ScrollableTabsV4 items={ITEMS} value="a" onValueChange={onValueChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getAllByRole('tab')[2]!);
    expect(onValueChange).toHaveBeenCalledWith('c');
  });

  it('scrolls the selected tab into view once it knows where everything is', () => {
    const { getAllByRole, root } = renderThemed(
      <ScrollableTabsV4 items={ITEMS} value="c" onValueChange={() => {}} />,
      SEED_LIGHT
    );
    const list = root.findAll((n) => n.type === 'RCTScrollView')[0]!;
    fireEvent(list, 'layout', { nativeEvent: { layout: { width: 200, height: 44, x: 0, y: 0 } } });
    const tabs = getAllByRole('tab');
    // The third tab starts beyond the 200pt viewport.
    fireEvent(tabs[2]!, 'layout', {
      nativeEvent: { layout: { x: 300, y: 0, width: 120, height: 44 } },
    });
    // Nothing to assert on a mocked ScrollView beyond "it did not throw and the
    // tab is still selected" — the reveal path ran with a real measurement.
    expect(tabs[2]!.props.accessibilityState.selected).toBe(true);
  });

  it('draws the row hairline from `border` and one moving underline', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <ScrollableTabsV4 items={ITEMS} value="a" onValueChange={() => {}} />,
      SEED_LIGHT
    );
    const styles = root
      .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
      .map((n) => flatten(n.props.style));
    expect(styles.some((s) => s.borderBottomColor === theme.light.border)).toBe(true);
    const bars = styles.filter(
      (s) => s.position === 'absolute' && s.backgroundColor === theme.light.primary
    );
    expect(bars).toHaveLength(1);
    expect(bars[0]!.opacity).toBe(0);
  });
});
