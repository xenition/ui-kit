/**
 * Shared helpers for native component specs: render a subtree under a compiled
 * theme (light or dark seed), plus the token-purity utilities that back the
 * "no hardcoded hex" assertion adapted for React Native.
 *
 * On web the token-purity test asserts NO hex appears (colors are CSS vars).
 * On native the tokens ARE resolved hex, so the adaptation asserts the
 * opposite-but-equivalent invariant: **every** hex that appears in a rendered
 * style is a value that exists in the compiled theme — i.e. every color traces
 * to a token, none is a hardcoded literal.
 */
import * as React from 'react';
import { render, type RenderResult } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { XenitionNativeThemeProvider, type NativeColorScheme } from '../theme';
import type { ThemeSeed } from '../../theme/types';

/** Violet / light. */
export const SEED_LIGHT: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'light',
};

/** Ember / dark. */
export const SEED_DARK: ThemeSeed = {
  primary: '#EA580C',
  accent: '#D4A24E',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'sharp',
  mode: 'dark',
};

/** Teal / both — used to exercise scheme toggling. */
export const SEED_BOTH: ThemeSeed = {
  primary: '#0D9488',
  neutral: 'pure',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'pill',
  mode: 'both',
};

const HEX_G = /#[0-9a-fA-F]{3,8}\b/g;

/** Every hex value present in a compiled theme (both schemes + all ramps). */
export function tokenHexSet(seed: ThemeSeed): Set<string> {
  const tokens = toNativeTokens(compileTheme(seed));
  const set = new Set<string>();
  const add = (value: string): void => {
    const matches = value.match(HEX_G);
    matches?.forEach((m) => set.add(m.toLowerCase()));
  };
  (['light', 'dark'] as const).forEach((scheme) => {
    Object.values(tokens.colors[scheme]).forEach(add);
  });
  (['primary', 'accent', 'neutral'] as const).forEach((ramp) => {
    Object.values(tokens.ramps[ramp]).forEach(add);
  });
  // The depth tokens are tokens too. They arrived after this helper did, and
  // a component painting a compiled gradient stop or the elevation colour was
  // failing purity for using the theme correctly.
  (['light', 'dark'] as const).forEach((scheme) => {
    Object.values(tokens.gradient[scheme]).forEach((g) => {
      add(g.from);
      add(g.to);
    });
    add(tokens.glass[scheme].tint);
    add(tokens.glass[scheme].border);
    Object.values(tokens.elevation[scheme]).forEach((e) => add(e.color));
  });
  return set;
}

/** Render `ui` under the compiled theme for `seed` at the given `scheme`. */
export function renderThemed(
  ui: React.ReactElement,
  seed: ThemeSeed,
  scheme?: NativeColorScheme
): RenderResult {
  return render(
    <XenitionNativeThemeProvider theme={seed} scheme={scheme}>
      {ui}
    </XenitionNativeThemeProvider>
  );
}

function collectStyleHexes(style: unknown, out: string[]): void {
  if (!style) return;
  if (Array.isArray(style)) {
    style.forEach((s) => collectStyleHexes(s, out));
    return;
  }
  if (typeof style === 'object') {
    for (const value of Object.values(style as Record<string, unknown>)) {
      if (typeof value === 'string') {
        const matches = value.match(HEX_G);
        matches?.forEach((m) => out.push(m.toLowerCase()));
      }
    }
  }
}

/** Every hex literal found in the `style` prop of any node in the tree. */
export function renderedStyleHexes(root: ReactTestInstance): string[] {
  const out: string[] = [];
  root.findAll(() => true).forEach((node) => {
    collectStyleHexes(node.props?.style, out);
  });
  return out;
}
