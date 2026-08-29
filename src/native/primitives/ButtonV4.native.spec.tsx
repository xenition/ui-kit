import * as React from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { fireEvent, waitFor } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, SEED_DARK, SEED_BOTH, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio, hexToHsl } from '../../theme/color';
import { gradientInk } from '../../primitives/internal/v4-depth';
import type { ThemeSeed } from '../../theme/types';
import { ButtonV4 } from './ButtonV4';

/** Every style object in the tree, flattened one level out of arrays. */
function styles(root: ReactTestInstance): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const walk = (style: unknown): void => {
    if (!style) return;
    if (Array.isArray(style)) {
      style.forEach(walk);
      return;
    }
    if (typeof style === 'object') out.push(style as Record<string, unknown>);
  };
  root.findAll(() => true).forEach((node) => walk(node.props?.style));
  return out;
}

/** The stops the mocked `expo-linear-gradient` was handed, or `null`. */
function gradientStops(queryByLabelText: (t: string) => unknown): string[] | null {
  const node = queryByLabelText('linear-gradient') as { props?: { colors?: string[] } } | null;
  return node?.props?.colors ?? null;
}

const FLAT_SEED: ThemeSeed = { ...SEED_LIGHT, depth: 'flat' };
const GLASS_SEED: ThemeSeed = { ...SEED_DARK, depth: 'glass' };

describe('ButtonV4 (native)', () => {
  it('paints the primary action with the compiled brand gradient', () => {
    const theme = compileTheme(SEED_LIGHT);
    const brand = theme.lightGradient.brand;
    const legible = gradientInk(brand, theme.light.onPrimary, {
      darkest: theme.ramps.neutral[950],
      lightest: theme.ramps.neutral[50],
    });
    const { queryByLabelText } = renderThemed(<ButtonV4>Continue</ButtonV4>, SEED_LIGHT);
    expect(gradientStops(queryByLabelText)).toEqual([legible.from, legible.to]);
    // Whatever contrast correction ran, the brand's two hues survived it —
    // only lightness is allowed to move.
    expect(hexToHsl(legible.from).h).toBeCloseTo(hexToHsl(brand.from).h, 0);
    expect(hexToHsl(legible.to).h).toBeCloseTo(hexToHsl(brand.to).h, 0);
  });

  it('leaves the compiler gradient untouched when it already reads', () => {
    // The ember seed's two stops sit close in luminance, so the compiler's own
    // `onPrimary` clears both and the correction is a no-op — proving V4 only
    // moves a gradient it has to.
    const seed: ThemeSeed = { ...SEED_DARK, mode: 'light' };
    const theme = compileTheme(seed);
    const { queryByLabelText, getByText } = renderThemed(<ButtonV4>Continue</ButtonV4>, seed);
    expect(gradientStops(queryByLabelText)).toEqual([
      theme.lightGradient.brand.from,
      theme.lightGradient.brand.to,
    ]);
    expect((getByText('Continue').props.style as { color: string }).color).toBe(
      theme.light.onPrimary
    );
  });

  it('keeps the gradient off every other variant — §35.11, gradients stay rare', () => {
    (['secondary', 'ghost', 'outline', 'soft', 'link', 'elevated'] as const).forEach((variant) => {
      const { queryByLabelText } = renderThemed(
        <ButtonV4 variant={variant}>Later</ButtonV4>,
        SEED_LIGHT
      );
      expect(gradientStops(queryByLabelText)).toBeNull();
    });
  });

  it('keeps the gradient off a semantic tone — §35.4, semantic is not brand', () => {
    (['danger', 'success'] as const).forEach((tone) => {
      const { queryByLabelText } = renderThemed(
        <ButtonV4 tone={tone}>Delete</ButtonV4>,
        SEED_LIGHT
      );
      expect(gradientStops(queryByLabelText)).toBeNull();
    });
  });

  it('labels the gradient with a colour that clears AA against BOTH stops', () => {
    // Every seed the kit tests with, including a teal whose raw brand stops
    // span so much luminance that NO colour clears both of them.
    [SEED_LIGHT, SEED_DARK, SEED_BOTH, GLASS_SEED].forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        const { getByText, queryByLabelText } = renderThemed(
          <ButtonV4>Continue</ButtonV4>,
          seed,
          scheme
        );
        const stops = gradientStops(queryByLabelText);
        const color = (getByText('Continue').props.style as { color: string }).color;
        expect(stops).toHaveLength(2);
        stops?.forEach((stop) => expect(contrastRatio(color, stop)).toBeGreaterThanOrEqual(4.5));
      });
    });
  });

  it("falls flat for a depth:'flat' seed without branching on depth", () => {
    const theme = compileTheme(FLAT_SEED);
    const { queryByLabelText, root } = renderThemed(<ButtonV4>Continue</ButtonV4>, FLAT_SEED);
    // Both stops collapse to one colour, so the "gradient" is a solid fill.
    const stops = gradientStops(queryByLabelText);
    expect(theme.lightGradient.brand.from).toBe(theme.lightGradient.brand.to);
    expect(stops?.[0]).toBe(stops?.[1]);
    // …and every shadow the button asked for is already zeroed by the compiler.
    const shadows = styles(root).filter((s) => s.shadowOpacity !== undefined);
    expect(shadows.length).toBeGreaterThan(0);
    shadows.forEach((s) => expect(s.shadowOpacity).toBe(0));
  });

  it('raises the primary action with elevation.action, and sits it back down on press', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByRole, root } = renderThemed(<ButtonV4>Continue</ButtonV4>, SEED_LIGHT);
    const resting = styles(root).find((s) => s.shadowOpacity !== undefined);
    expect(resting?.shadowOpacity).toBeCloseTo(theme.lightElevation.action.opacity);

    fireEvent(getByRole('button'), 'pressIn');
    const held = styles(root).find((s) => s.shadowOpacity !== undefined);
    expect(held?.shadowOpacity).toBeCloseTo(theme.lightElevation.action.opacity * 0.5);

    fireEvent(getByRole('button'), 'pressOut');
    const released = styles(root).find((s) => s.shadowOpacity !== undefined);
    expect(released?.shadowOpacity).toBeCloseTo(theme.lightElevation.action.opacity);
  });

  it("uses the surface elevation for 'elevated' and none for the flat variants", () => {
    const theme = compileTheme(SEED_LIGHT);
    const raised = renderThemed(<ButtonV4 variant="elevated">Open</ButtonV4>, SEED_LIGHT);
    expect(
      styles(raised.root).find((s) => s.shadowOpacity !== undefined)?.shadowOpacity
    ).toBeCloseTo(theme.lightElevation.card.opacity);

    const flat = renderThemed(<ButtonV4 variant="ghost">Open</ButtonV4>, SEED_LIGHT);
    expect(styles(flat.root).find((s) => s.shadowOpacity !== undefined)).toBeUndefined();
  });

  it('still calls the caller onPress / onPressIn / onPressOut', () => {
    const onPress = jest.fn();
    const onPressIn = jest.fn();
    const onPressOut = jest.fn();
    const { getByRole } = renderThemed(
      <ButtonV4 onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
        Continue
      </ButtonV4>,
      SEED_LIGHT
    );
    fireEvent(getByRole('button'), 'pressIn');
    fireEvent.press(getByRole('button'));
    fireEvent(getByRole('button'), 'pressOut');
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPressIn).toHaveBeenCalledTimes(1);
    expect(onPressOut).toHaveBeenCalledTimes(1);
  });

  it('blocks presses and marks itself busy while loading', () => {
    const onPress = jest.fn();
    const { getByRole } = renderThemed(
      <ButtonV4 loading onPress={onPress}>
        Continue
      </ButtonV4>,
      SEED_LIGHT
    );
    const button = getByRole('button');
    expect(button.props.accessibilityState).toMatchObject({ disabled: true, busy: true });
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('holds the press scale at 1 under reduced motion — §36.10', async () => {
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
    const { getByRole, root } = renderThemed(<ButtonV4>Continue</ButtonV4>, SEED_LIGHT);
    await waitFor(() => expect(getByRole('button')).toBeTruthy());
    fireEvent(getByRole('button'), 'pressIn');
    const transformed = styles(root).find((s) => s.transform !== undefined) as
      | { transform: { scale: unknown }[] }
      | undefined;
    const scale = transformed?.transform[0]?.scale as
      | number
      | { __getValue?: () => number; _value?: number }
      | undefined;
    const value =
      typeof scale === 'number' ? scale : (scale?.__getValue?.() ?? scale?._value);
    expect(value).toBe(1);
    // The elevation change alone still reports the press, so the feedback does
    // not depend on the animation.
    expect(styles(root).find((s) => s.shadowOpacity !== undefined)?.shadowOpacity).not.toBe(
      compileTheme(SEED_LIGHT).lightElevation.action.opacity
    );
  });

  it('renders non-string children untouched', () => {
    const { getByText } = renderThemed(
      <ButtonV4>
        <Text>custom</Text>
      </ButtonV4>,
      SEED_LIGHT
    );
    expect(getByText('custom')).toBeTruthy();
  });
});
