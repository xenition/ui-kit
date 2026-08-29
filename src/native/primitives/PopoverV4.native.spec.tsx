import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import type { ThemeSeed } from '../../theme/types';
import { Button } from './Button';
import { PopoverV4 } from './PopoverV4';

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

/** The popover panel — the modal view, which is the only `accessibilityViewIsModal`. */
function panelOf(root: ReactTestInstance): Record<string, unknown> {
  const node = root.findAll((n) => n.props?.accessibilityViewIsModal === true)[0];
  return flatten(node?.props?.style);
}

function openPopover(seed: ThemeSeed = SEED_LIGHT) {
  const result = renderThemed(
    <PopoverV4 trigger={<Text>Open</Text>}>
      <Text>popover panel</Text>
    </PopoverV4>,
    seed
  );
  fireEvent.press(result.getByText('Open'));
  return result;
}

describe('PopoverV4 (native)', () => {
  it('reveals its panel when the trigger is pressed', () => {
    const { getByText, queryByText } = renderThemed(
      <PopoverV4 trigger={<Text>Open</Text>}>
        <Text>popover panel</Text>
      </PopoverV4>,
      SEED_LIGHT
    );
    expect(queryByText('popover panel')).toBeNull();
    fireEvent.press(getByText('Open'));
    expect(getByText('popover panel')).toBeTruthy();
  });

  it('reports open state through onOpenChange, and honours a controlled `open`', () => {
    const onOpenChange = jest.fn();
    const { getByText } = renderThemed(
      <PopoverV4 trigger={<Text>Open</Text>} onOpenChange={onOpenChange}>
        <Text>panel</Text>
      </PopoverV4>,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Open'));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    const controlled = renderThemed(
      <PopoverV4 trigger={<Text>Open</Text>} open>
        <Text>controlled panel</Text>
      </PopoverV4>,
      SEED_LIGHT
    );
    expect(controlled.getByText('controlled panel')).toBeTruthy();
  });

  /*
    The trigger-clone regression, kept alive in V4. A kit `Button` is itself a
    `Pressable`, and on native the deepest `Pressable` under the finger wins the
    touch responder — a V4 that went back to wrapping the trigger would never
    open from the most obvious trigger there is.
  */
  it('opens from a kit Button trigger, and still runs the trigger own onPress', () => {
    const onPress = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <PopoverV4 trigger={<Button onPress={onPress}>Open</Button>}>
        <Text>popover panel</Text>
      </PopoverV4>,
      SEED_LIGHT
    );
    expect(queryByText('popover panel')).toBeNull();
    fireEvent.press(getByText('Open'));
    expect(getByText('popover panel')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not open from a disabled trigger', () => {
    const { getByText, queryByText } = renderThemed(
      <PopoverV4 trigger={<Button disabled>Open</Button>}>
        <Text>popover panel</Text>
      </PopoverV4>,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Open'));
    expect(queryByText('popover panel')).toBeNull();
  });

  it('scrims with black at a fixed alpha, never with `onSurface`', () => {
    const theme = compileTheme(SEED_DARK);
    const { getByText, getByLabelText } = renderThemed(
      <PopoverV4 trigger={<Text>Open</Text>}>
        <Text>panel</Text>
      </PopoverV4>,
      SEED_DARK
    );
    fireEvent.press(getByText('Open'));
    const scrim = flatten(
      getByLabelText('Close', { includeHiddenElements: true }).props.style
    );
    // `onSurface` on a dark page is near-WHITE; a scrim built from it paints a
    // white veil over the app. The shadow colour does not invert.
    expect(String(scrim.backgroundColor)).toContain('rgba(0, 0, 0');
    expect(String(scrim.backgroundColor)).not.toContain(theme.dark.onSurface.replace('#', ''));
    expect(scrim.opacity).toBeUndefined();
  });

  it('floats on `elevation.sheet` — the same altitude as every V4 panel', () => {
    const theme = compileTheme(SEED_LIGHT);
    const panel = panelOf(openPopover().UNSAFE_root);
    expect(panel.shadowOpacity).toBe(theme.lightElevation.sheet.opacity);
    expect(panel.shadowRadius).toBe(theme.lightElevation.sheet.radius);
    expect(panel.backgroundColor).toBe(theme.light.surface);
  });

  it("falls flat for a depth:'flat' seed without branching on depth", () => {
    expect(panelOf(openPopover(FLAT_SEED).UNSAFE_root).shadowOpacity).toBe(0);
  });

  it("wears the translucent pair only when the seed says depth:'glass'", () => {
    const glass = panelOf(openPopover(GLASS_SEED).UNSAFE_root);
    expect(String(glass.backgroundColor)).toContain('rgba');
    expect(glass.borderWidth).toBe(1);
  });

  it('pads on the same step as CardV4 and the V4 sheets', () => {
    const theme = compileTheme(SEED_LIGHT);
    // The base used `spacing.sm`, which reads as cramped beside every other
    // surface in the kit.
    expect(panelOf(openPopover().UNSAFE_root).padding).toBe(theme.spacing.md);
  });

  it('lets a caller style override the panel', () => {
    const { getByText, UNSAFE_root } = renderThemed(
      <PopoverV4 trigger={<Text>Open</Text>} style={{ minWidth: 320 }}>
        <Text>panel</Text>
      </PopoverV4>,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Open'));
    expect(panelOf(UNSAFE_root).minWidth).toBe(320);
  });
});
