/**
 * Shared assertions for the V4 surface specs (`BottomSheetV4`, `ModalV4`,
 * `ActionSheetV4`).
 *
 * Not a spec file itself — jest's `testMatch` only picks up `*.native.spec.tsx`
 * — so it can be imported by all three without re-running their tests.
 */

import type { ReactTestInstance } from 'react-test-renderer';
import { compileTheme } from '../../theme/compile';
import { elevationStyle, scrimColor } from '../primitives/internal/surface-v4';
import type { XenitionNativeTheme } from '../theme';
import type { ThemeSeed } from '../../theme/types';

export type FlatStyle = Record<string, unknown>;

/** Flatten whatever RN style shape a node carries into one object. */
export function flatStyle(style: unknown): FlatStyle {
  if (Array.isArray(style)) return Object.assign({}, ...style.map(flatStyle));
  if (style && typeof style === 'object') return style as FlatStyle;
  return {};
}

/** Every node's flattened style, in render order. */
export function allStyles(root: ReactTestInstance): FlatStyle[] {
  return root.findAll(() => true).map((node) => flatStyle(node.props?.style));
}

/** The first style matching a predicate, or `undefined`. */
export function findStyle(
  root: ReactTestInstance,
  match: (s: FlatStyle) => boolean
): FlatStyle | undefined {
  return allStyles(root).find(match);
}

/**
 * A stand-in for the resolved theme, so a spec can call the same helpers the
 * components call and compare against the exact value.
 */
export function themeFor(seed: ThemeSeed, scheme: 'light' | 'dark' = 'light'): XenitionNativeTheme {
  const compiled = compileTheme(seed);
  return {
    tokens: {
      colors: { light: compiled.light, dark: compiled.dark },
      ramps: compiled.ramps,
      radius: compiled.radius,
      spacing: compiled.spacing,
      typography: compiled.typography,
      depth: compiled.depth,
      gradient: { light: compiled.lightGradient, dark: compiled.darkGradient },
      glass: { light: compiled.lightGlass, dark: compiled.darkGlass },
      elevation: { light: compiled.lightElevation, dark: compiled.darkElevation },
    },
    scheme,
    colors: scheme === 'light' ? compiled.light : compiled.dark,
    gradient: scheme === 'light' ? compiled.lightGradient : compiled.darkGradient,
    glass: scheme === 'light' ? compiled.lightGlass : compiled.darkGlass,
    elevation: scheme === 'light' ? compiled.lightElevation : compiled.darkElevation,
    depth: compiled.depth,
  };
}

/** The scrim fill a V4 overlay should paint for this seed and scheme. */
export function expectedScrim(seed: ThemeSeed, scheme: 'light' | 'dark' = 'light'): string {
  return scrimColor(themeFor(seed, scheme));
}

/** The shadow style a V4 overlay panel should carry for this seed and scheme. */
export function expectedSheetShadow(
  seed: ThemeSeed,
  scheme: 'light' | 'dark' = 'light'
): FlatStyle {
  return elevationStyle(themeFor(seed, scheme).elevation.sheet) as FlatStyle;
}
