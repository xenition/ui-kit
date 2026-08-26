import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme, MIN_CONTRAST } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import type { ThemeSeed } from '../../theme/types';
import { Button } from './Button';
import { MenuV4 } from './MenuV4';

const ITEMS = [
  { label: 'Edit' },
  { label: 'Duplicate' },
  { label: 'Delete', danger: true },
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

function styleOf(node: ReactTestInstance | undefined): Record<string, unknown> {
  return flatten(node?.props?.style);
}

/**
 * The menu panel. Queried by prop rather than by role: the panel is a plain
 * `View` carrying `accessibilityRole="menu"` and is deliberately NOT an
 * accessibility element itself — making it one would collapse every row into a
 * single announcement.
 */
function panelOf(root: ReactTestInstance): ReactTestInstance | undefined {
  return root.findAll((n) => n.props?.accessibilityRole === 'menu')[0];
}

function openMenu(seed: ThemeSeed = SEED_LIGHT) {
  const result = renderThemed(<MenuV4 trigger={<Text>Actions</Text>} items={ITEMS} />, seed);
  fireEvent.press(result.getByText('Actions'));
  return result;
}

describe('MenuV4 (native)', () => {
  it('opens on trigger press and fires the item onSelect', () => {
    const onSelect = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <MenuV4 trigger={<Text>Actions</Text>} items={[{ label: 'Edit', onSelect }]} />,
      SEED_LIGHT
    );
    expect(queryByText('Edit')).toBeNull();
    fireEvent.press(getByText('Actions'));
    fireEvent.press(getByText('Edit'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  /*
    The trigger-clone regression, kept alive in V4. A kit `Button` is itself a
    `Pressable`, and on native the deepest `Pressable` under the finger wins the
    touch responder — so a V4 that went back to wrapping the trigger would be
    unopenable from the most obvious trigger there is.
  */
  it('opens from a kit Button trigger, and still runs the trigger own onPress', () => {
    const onPress = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <MenuV4 trigger={<Button onPress={onPress}>Actions</Button>} items={ITEMS} />,
      SEED_LIGHT
    );
    expect(queryByText('Edit')).toBeNull();
    fireEvent.press(getByText('Actions'));
    expect(getByText('Edit')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not open from a disabled trigger', () => {
    const { getByText, queryByText } = renderThemed(
      <MenuV4 trigger={<Button disabled>Actions</Button>} items={ITEMS} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Actions'));
    expect(queryByText('Edit')).toBeNull();
  });

  it('wraps a non-element trigger, which has no responder to steal', () => {
    const { UNSAFE_root: root, queryByText } = renderThemed(
      <MenuV4 trigger="Actions" items={ITEMS} />,
      SEED_LIGHT
    );
    // A bare string cannot be cloned, so it keeps the transparent wrapper.
    const wrapper = root.findAll((n) => n.props?.children === 'Actions')[0];
    expect(wrapper).toBeTruthy();
    expect(queryByText('Edit')).toBeNull();
  });

  it('scrims with black at a fixed alpha, never with `onSurface`', () => {
    const theme = compileTheme(SEED_DARK);
    const { getByLabelText, getByText } = renderThemed(
      <MenuV4 trigger={<Text>Actions</Text>} items={ITEMS} />,
      SEED_DARK
    );
    fireEvent.press(getByText('Actions'));
    const scrim = styleOf(getByLabelText('Close', { includeHiddenElements: true }));
    const fill = String(scrim.backgroundColor);
    // `onSurface` on a dark page is near-WHITE — a scrim built from it paints a
    // white veil over the app. The shadow colour does not invert.
    expect(fill).toContain('rgba(0, 0, 0');
    expect(fill).not.toContain(theme.dark.onSurface.replace('#', ''));
    // Faded into the colour, not applied as a view-wide `opacity` that would
    // also fade anything the scrim contains.
    expect(scrim.opacity).toBeUndefined();
  });

  it('floats on `elevation.sheet` — the same altitude as the V4 sheets', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root: root } = openMenu();
    const panel = styleOf(panelOf(root));
    expect(panel.shadowOpacity).toBe(theme.lightElevation.sheet.opacity);
    expect(panel.shadowRadius).toBe(theme.lightElevation.sheet.radius);
    expect(panel.backgroundColor).toBe(theme.light.surface);
  });

  it("falls flat for a depth:'flat' seed without branching on depth", () => {
    const { UNSAFE_root: root } = openMenu(FLAT_SEED);
    expect(styleOf(panelOf(root)).shadowOpacity).toBe(0);
  });

  it("wears the translucent pair only when the seed says depth:'glass'", () => {
    const theme = compileTheme(SEED_LIGHT);
    expect(styleOf(panelOf(openMenu().UNSAFE_root)).backgroundColor).toBe(theme.light.surface);
    const glass = styleOf(panelOf(openMenu(GLASS_SEED).UNSAFE_root));
    expect(String(glass.backgroundColor)).toContain('rgba');
    expect(glass.borderWidth).toBe(1);
  });

  it('makes the destructive row the only coloured thing in the list', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = openMenu();
    expect(styleOf(getByText('Edit')).color).toBe(theme.light.onSurface);
    expect(styleOf(getByText('Duplicate')).color).toBe(theme.light.onSurface);
    // `dangerText`, not the `danger` FILL slot the base used as text — the same
    // red, walked until it actually clears AA on the surface it sits on.
    const red = styleOf(getByText('Delete')).color as string;
    expect(red).toBe(theme.light.dangerText);
    expect(contrastRatio(red, theme.light.surface)).toBeGreaterThanOrEqual(MIN_CONTRAST);
  });

  it('gives every row a 44pt target composed from the spacing scale', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getAllByRole } = openMenu();
    getAllByRole('menuitem').forEach((row) => {
      expect(styleOf(row).minHeight).toBe(theme.spacing['2xl'] - theme.spacing.xs);
    });
  });

  it('does not fire a disabled item', () => {
    const onSelect = jest.fn();
    const { getByText } = renderThemed(
      <MenuV4
        trigger={<Text>Actions</Text>}
        items={[{ label: 'Archive', onSelect, disabled: true }]}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Actions'));
    fireEvent.press(getByText('Archive'));
    expect(onSelect).not.toHaveBeenCalled();
  });
});
