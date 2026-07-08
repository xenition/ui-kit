import { compileTheme } from './compile';
import { toCssVars, toNativeTokens, toTailwindPreset } from './outputs';
import { RAMP_STEPS, ThemeSeed } from './types';

const baseSeed: ThemeSeed = {
  primary: '#7C3AED',
  accent: '#F59E0B',
  neutral: 'cool',
  font: { heading: 'Sora', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

describe('toCssVars', () => {
  it('emits :root with semantic slots, ramps, and scales', () => {
    const theme = compileTheme(baseSeed);
    const css = toCssVars(theme);

    expect(css).toContain(':root {');
    expect(css).toContain(`--xen-primary: ${theme.light.primary};`);
    expect(css).toContain(`--xen-on-primary: ${theme.light.onPrimary};`);
    expect(css).toContain(`--xen-surface: ${theme.light.surface};`);
    expect(css).toContain(`--xen-primary-500: ${theme.ramps.primary[500]};`);
    expect(css).toContain(`--xen-neutral-950: ${theme.ramps.neutral[950]};`);
    expect(css).toContain('--xen-radius-md: 8px;');
    expect(css).toContain('--xen-space-md: 16px;');
    expect(css).toContain('--xen-text-base: 16px;');
    expect(css).toContain('--xen-font-heading: "Sora"');
    expect(css).toContain('--xen-font-body: "Inter"');
  });

  it('adds a [data-theme="dark"] block only when mode is "both"', () => {
    const both = toCssVars(compileTheme(baseSeed));
    expect(both).toContain('[data-theme="dark"]');
    expect(both).toContain(`--xen-surface: ${compileTheme(baseSeed).dark.surface};`);

    const lightOnly = toCssVars(compileTheme({ ...baseSeed, mode: 'light' }));
    expect(lightOnly).not.toContain('[data-theme="dark"]');
  });

  it('puts dark semantics in :root when mode is "dark"', () => {
    const theme = compileTheme({ ...baseSeed, mode: 'dark' });
    const css = toCssVars(theme);
    expect(css).toContain(`--xen-surface: ${theme.dark.surface};`);
    expect(css).not.toContain('[data-theme="dark"]');
  });

  it('dark output differs from light output', () => {
    const light = toCssVars(compileTheme({ ...baseSeed, mode: 'light' }));
    const dark = toCssVars(compileTheme({ ...baseSeed, mode: 'dark' }));
    expect(dark).not.toBe(light);
  });
});

describe('toTailwindPreset', () => {
  const preset = toTailwindPreset(compileTheme(baseSeed));

  it('binds colors to the CSS variables', () => {
    const colors = preset.theme.extend.colors;
    expect((colors.primary as Record<string, string>).DEFAULT).toBe('var(--xen-primary)');
    expect((colors.primary as Record<string, string>)['500']).toBe('var(--xen-primary-500)');
    expect(colors['on-primary']).toBe('var(--xen-on-primary)');
    expect(colors.surface).toBe('var(--xen-surface)');
    expect(colors['on-surface']).toBe('var(--xen-on-surface)');
    expect((colors.neutral as Record<string, string>)['100']).toBe('var(--xen-neutral-100)');
    expect(colors.danger).toBe('var(--xen-danger)');
  });

  it('binds radius, spacing, fontSize, and fontFamily to the variables', () => {
    expect(preset.theme.extend.borderRadius.md).toBe('var(--xen-radius-md)');
    expect(preset.theme.extend.borderRadius.DEFAULT).toBe('var(--xen-radius-md)');
    expect(preset.theme.extend.spacing.md).toBe('var(--xen-space-md)');
    expect(preset.theme.extend.fontSize.base).toBe('var(--xen-text-base)');
    expect(preset.theme.extend.fontFamily.heading).toEqual(['var(--xen-font-heading)']);
  });
});

describe('toNativeTokens', () => {
  const theme = compileTheme(baseSeed);
  const tokens = toNativeTokens(theme);

  it('resolves every color to a plain hex value (no CSS vars)', () => {
    for (const mode of ['light', 'dark'] as const) {
      for (const value of Object.values(tokens.colors[mode])) {
        expect(value).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
    for (const ramp of Object.values(tokens.ramps)) {
      for (const step of RAMP_STEPS) {
        expect(ramp[step]).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
  });

  it('exposes numeric radius/spacing/type scales for StyleSheet use', () => {
    expect(tokens.radius.md).toBe(8);
    expect(typeof tokens.spacing.xl).toBe('number');
    expect(tokens.typography.scale['2xl']).toBe(24);
    expect(tokens.typography.fontHeading).toBe('Sora');
  });

  it('mirrors the compiled semantic slots', () => {
    expect(tokens.colors.light).toEqual(theme.light);
    expect(tokens.colors.dark).toEqual(theme.dark);
  });

  it('returns copies, not live references into the theme', () => {
    expect(tokens.colors.light).not.toBe(theme.light);
    expect(tokens.radius).not.toBe(theme.radius);
  });
});
