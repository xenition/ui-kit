/**
 * The depth tokens reach the web layer as CSS custom properties.
 *
 * `toNativeTokens` already handed React Native the compiled `gradient`,
 * `glass` and `elevation` objects. The web emitter did not have them, which
 * meant a web component had no way to spend a token the compiler had gone to
 * the trouble of deriving — the twin of a native sheet would have had to
 * re-guess its shadow in Tailwind, and the two designs would drift apart on
 * the first theme change.
 */

import { compileTheme } from './compile';
import { toCssVars } from './outputs';
import type { ThemeSeed } from './types';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  accent: '#F59E0B',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

describe('toCssVars — depth', () => {
  it('emits the gradients as ready linear-gradient() values', () => {
    const theme = compileTheme(seed);
    const css = toCssVars(theme);
    const { brand } = theme.lightGradient;
    expect(css).toContain(
      `--xen-gradient-brand: linear-gradient(${brand.angle}deg, ${brand.from}, ${brand.to});`
    );
    expect(css).toContain('--xen-gradient-wash: linear-gradient(');
    expect(css).toContain('--xen-gradient-muted: linear-gradient(');
  });

  it('emits the glass tokens verbatim, so both platforms paint the same value', () => {
    const theme = compileTheme(seed);
    const css = toCssVars(theme);
    expect(css).toContain(`--xen-glass-tint: ${theme.lightGlass.tint};`);
    expect(css).toContain(`--xen-glass-border: ${theme.lightGlass.border};`);
    expect(css).toContain(`--xen-glass-blur: ${theme.lightGlass.blur}px;`);
  });

  it('emits the elevations as ready box-shadow values, plus the bare shadow colour', () => {
    const theme = compileTheme(seed);
    const css = toCssVars(theme);
    const { sheet } = theme.lightElevation;
    expect(css).toContain(`--xen-elevation-sheet: 0 ${sheet.offsetY}px ${sheet.radius}px rgba(`);
    expect(css).toContain('--xen-elevation-card: 0 ');
    expect(css).toContain('--xen-elevation-action: 0 ');
    // The scrim colour. It must NOT invert with the scheme — see below.
    expect(css).toContain(`--xen-elevation-color: ${sheet.color};`);
  });

  it('overrides the depth vars in the dark block, not just the semantic slots', () => {
    const theme = compileTheme(seed);
    const css = toCssVars(theme);
    const darkBlock = css.slice(css.indexOf('[data-theme="dark"]'));
    expect(darkBlock).toContain(`--xen-glass-tint: ${theme.darkGlass.tint};`);
    expect(darkBlock).not.toContain(`--xen-glass-tint: ${theme.lightGlass.tint};`);
    // A shadow on a dark page needs MORE opacity, not less; the dark block
    // therefore carries a different box-shadow, not the light one inherited.
    const lightBlock = css.slice(0, css.indexOf('[data-theme="dark"]'));
    const grab = (block: string): string =>
      block.slice(block.indexOf('--xen-elevation-sheet'), block.indexOf('--xen-elevation-action'));
    expect(grab(darkBlock)).not.toBe(grab(lightBlock));
  });

  it('keeps the scrim colour stable across schemes while the ramps invert', () => {
    // The reason `--xen-elevation-color` exists at all. An overlay scrim built
    // from `--xen-on-surface` or `--xen-neutral-950` turns into a WHITE veil on
    // a dark page, because both of those flip with the ramp. A shadow does not.
    const css = toCssVars(compileTheme(seed));
    const light = css.slice(0, css.indexOf('[data-theme="dark"]'));
    const dark = css.slice(css.indexOf('[data-theme="dark"]'));
    const value = (block: string): string =>
      /--xen-elevation-color: (#[0-9a-f]{6});/.exec(block)![1]!;
    expect(value(dark)).toBe(value(light));
  });

  it('a flat seed emits inert gradients and invisible shadows — no component branches', () => {
    const flat = toCssVars(compileTheme({ ...seed, depth: 'flat' }));
    // Both stops identical: a "gradient" that renders as one colour.
    const brand = /--xen-gradient-brand: linear-gradient\(\d+deg, (#[0-9a-f]{6}), (#[0-9a-f]{6})\);/.exec(
      flat
    )!;
    expect(brand[1]).toBe(brand[2]);
    expect(flat).toContain('--xen-elevation-sheet: 0 0px 0px rgba(0, 0, 0, 0);');
  });

  it('but glass is NOT flattened — it is the one depth token a component must ask about', () => {
    // `flatten()` in the compiler neutralises gradients and elevation and stops
    // there, so `glass.tint` is live even under `depth: 'flat'`. A V4 surface
    // therefore checks `depth === 'glass'` before reaching for it, and consumes
    // gradient/elevation unconditionally.
    const flat = compileTheme({ ...seed, depth: 'flat' });
    const soft = compileTheme({ ...seed, depth: 'soft' });
    expect(flat.lightGlass).toEqual(soft.lightGlass);
    expect(toCssVars(flat)).toContain(`--xen-glass-tint: ${flat.lightGlass.tint};`);
  });
});
