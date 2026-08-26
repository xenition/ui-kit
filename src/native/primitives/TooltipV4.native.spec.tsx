import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import type { ThemeSeed } from '../../theme/types';
import { Button } from './Button';
import { TooltipV4 } from './TooltipV4';

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

/** The bubble — the only node carrying `accessibilityRole="text"`. */
function bubbleOf(root: ReactTestInstance): Record<string, unknown> {
  const node = root.findAll((n) => n.props?.accessibilityRole === 'text')[0];
  return flatten(node?.props?.style);
}

function openTip(seed: ThemeSeed = SEED_LIGHT) {
  const result = renderThemed(
    <TooltipV4 label="Archive this order">
      <Text>Archive</Text>
    </TooltipV4>,
    seed
  );
  fireEvent(result.getByText('Archive'), 'longPress');
  return result;
}

describe('TooltipV4 (native)', () => {
  it('reveals the tip on LONG press, not on press', () => {
    const { getByText, queryByText } = renderThemed(
      <TooltipV4 label="Archive this order">
        <Text>Archive</Text>
      </TooltipV4>,
      SEED_LIGHT
    );
    expect(queryByText('Archive this order')).toBeNull();
    fireEvent.press(getByText('Archive'));
    expect(queryByText('Archive this order')).toBeNull();
    fireEvent(getByText('Archive'), 'longPress');
    expect(getByText('Archive this order')).toBeTruthy();
  });

  /*
    The trigger-clone rule, kept alive in V4 — with the one difference that
    makes Tooltip Tooltip: the injected handler is `onLongPress`. Injecting
    `onPress` would make every tooltipped Save button save AND show a bubble.
  */
  it('leaves a kit Button its own press, and reveals on long press', () => {
    const onPress = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <TooltipV4 label="Saves your work">
        <Button onPress={onPress}>Save</Button>
      </TooltipV4>,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Save'));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(queryByText('Saves your work')).toBeNull();

    fireEvent(getByText('Save'), 'longPress');
    expect(getByText('Saves your work')).toBeTruthy();
    // The control's own press ran once and only once.
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('runs whatever the child already did on long press, first', () => {
    const onLongPress = jest.fn();
    const { getByText } = renderThemed(
      <TooltipV4 label="Tip">
        <Button onLongPress={onLongPress}>Save</Button>
      </TooltipV4>,
      SEED_LIGHT
    );
    fireEvent(getByText('Save'), 'longPress');
    expect(onLongPress).toHaveBeenCalledTimes(1);
    expect(getByText('Tip')).toBeTruthy();
  });

  it('throws NO scrim over the page — an annotation is not a modal', () => {
    const theme = compileTheme(SEED_DARK);
    const { getByText, getByLabelText } = renderThemed(
      <TooltipV4 label="Tip">
        <Text>Save</Text>
      </TooltipV4>,
      SEED_DARK
    );
    fireEvent(getByText('Save'), 'longPress');
    const catcher = flatten(getByLabelText('Close', { includeHiddenElements: true }).props.style);
    // The base painted `colors.onSurface` at 0.5 here, which on a dark page is
    // a near-white veil. V4 paints nothing at all.
    expect(catcher.backgroundColor).toBeUndefined();
    expect(catcher.opacity).toBeUndefined();
    expect(theme.dark.onSurface).toBeDefined();
  });

  it('inverts with the compiler-guaranteed pair, not a raw ramp step', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root, getByText } = openTip();
    expect(bubbleOf(UNSAFE_root).backgroundColor).toBe(theme.light.onSurface);
    expect(flatten(getByText('Archive this order').props.style).color).toBe(theme.light.surface);
  });

  it('lifts on `elevation.card` — the smallest of the three — and flattens with the seed', () => {
    const theme = compileTheme(SEED_LIGHT);
    expect(bubbleOf(openTip().UNSAFE_root).shadowOpacity).toBe(theme.lightElevation.card.opacity);
    expect(bubbleOf(openTip(FLAT_SEED).UNSAFE_root).shadowOpacity).toBe(0);
  });

  it("joins the glass family only when the seed says depth:'glass'", () => {
    const theme = compileTheme(SEED_LIGHT);
    const glass = openTip(GLASS_SEED);
    const bubble = bubbleOf(glass.UNSAFE_root);
    // An inverted bubble behind a blur is neither legible nor translucent.
    expect(String(bubble.backgroundColor)).toContain('rgba');
    expect(bubble.backgroundColor).not.toBe(theme.light.onSurface);
    expect(flatten(glass.getByText('Archive this order').props.style).color).toBe(
      theme.light.onSurface
    );
  });

  it('wraps a child that is not a single element, listening for the same gesture', () => {
    const { UNSAFE_root, getByText, queryByText } = renderThemed(
      <TooltipV4 label="Tip">
        <Text>Save</Text>
        <Text>draft</Text>
      </TooltipV4>,
      SEED_LIGHT
    );
    expect(queryByText('Tip')).toBeNull();
    // Two children are not one element, so there is nothing to clone onto —
    // and nothing that could steal the responder either.
    const wrapper = UNSAFE_root.findAll((n) => n.props?.onLongPress !== undefined)[0]!;
    fireEvent(wrapper, 'longPress');
    expect(getByText('Tip')).toBeTruthy();
  });
});
