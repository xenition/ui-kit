/**
 * `TextV4` (native) — the twin of the web `TextV4`. Same props, same defaults;
 * the assertions are the native form of the same invariants: the seed's face is
 * bound (the base bound none), leading and tracking come off one shared ratio
 * table, the three new props are additive, and every colour traces to a token.
 */
import * as React from 'react';
import {
  SEED_DARK,
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { TextV4 } from './TextV4';

function flat(style: unknown): Record<string, unknown> {
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

/** Render under `SEED_LIGHT` and return the flattened style of the one node. */
function styleOf(ui: React.ReactElement): Record<string, unknown> {
  const { getByTestId } = renderThemed(ui, SEED_LIGHT);
  return flat(getByTestId('t').props.style);
}

const THEME = compileTheme(SEED_LIGHT);

describe('TextV4 (native)', () => {
  it('keeps the base defaults — base step, onSurface, regular', () => {
    const style = styleOf(<TextV4 testID="t">Pantry is empty</TextV4>);
    expect(style.fontSize).toBe(THEME.typography.scale.base);
    expect(style.color).toBe(THEME.light.onSurface);
    expect(style.fontWeight).toBe('400');
  });

  it('binds the seed’s body face — the base fell through to the system font', () => {
    // `Text` set no fontFamily at all, so a native screen rendered in San
    // Francisco / Roboto while its web twin inherited the seed's face.
    expect(styleOf(<TextV4 testID="t">Copy</TextV4>).fontFamily).toBe(THEME.typography.fontBody);
  });

  it('sets display steps in the heading face automatically', () => {
    // SEED_DARK carries a genuinely different heading face (Fraunces / Inter),
    // so this cannot pass by the two faces happening to be equal.
    const dark = compileTheme(SEED_DARK);
    expect(dark.typography.fontHeading).not.toBe(dark.typography.fontBody);
    (['xl', '2xl', '3xl'] as const).forEach((size) => {
      const { getByTestId } = renderThemed(
        <TextV4 testID="t" size={size}>
          Welcome
        </TextV4>,
        SEED_DARK
      );
      expect(flat(getByTestId('t').props.style).fontFamily).toBe(dark.typography.fontHeading);
    });
  });

  it('lets `face` override the automatic pick in both directions', () => {
    const dark = compileTheme(SEED_DARK);
    const render1 = renderThemed(
      <TextV4 testID="t" size="3xl" face="body">
        Welcome
      </TextV4>,
      SEED_DARK
    );
    expect(flat(render1.getByTestId('t').props.style).fontFamily).toBe(dark.typography.fontBody);

    const render2 = renderThemed(
      <TextV4 testID="t" size="sm" face="heading">
        Caption
      </TextV4>,
      SEED_DARK
    );
    expect(flat(render2.getByTestId('t').props.style).fontFamily).toBe(dark.typography.fontHeading);
  });

  it('opens the leading on copy and closes it on display type', () => {
    const scale = THEME.typography.scale;
    expect(styleOf(<TextV4 testID="t">Copy</TextV4>).lineHeight).toBeCloseTo(scale.base * 1.6);
    expect(
      styleOf(
        <TextV4 testID="t" size="3xl">
          Welcome
        </TextV4>
      ).lineHeight as number
    ).toBeCloseTo(scale['3xl'] * 1.2);
    // Roomier than the base's flat 1.5 at the body step, tighter at display.
    expect(styleOf(<TextV4 testID="t">Copy</TextV4>).lineHeight as number).toBeGreaterThan(
      scale.base * 1.5
    );
  });

  it('tracks optically, as a ratio of the resolved size rather than a point value', () => {
    const scale = THEME.typography.scale;
    expect(
      styleOf(
        <TextV4 testID="t" size="3xl">
          Welcome
        </TextV4>
      ).letterSpacing as number
    ).toBeCloseTo(scale['3xl'] * -0.02);
    expect(
      styleOf(
        <TextV4 testID="t" size="xs">
          Legal
        </TextV4>
      ).letterSpacing as number
    ).toBeCloseTo(scale.xs * 0.01);
    expect(styleOf(<TextV4 testID="t">Copy</TextV4>).letterSpacing).toBe(0);
  });

  it('caps `measure` off the spacing scale, and leaves it open by default', () => {
    expect(
      styleOf(
        <TextV4 testID="t" measure>
          A supporting line
        </TextV4>
      ).maxWidth
    ).toBe(THEME.spacing['2xl'] * 7);
    expect(styleOf(<TextV4 testID="t">Copy</TextV4>).maxWidth).toBeUndefined();
  });

  it('sets tabular figures on request and proportional by default', () => {
    expect(
      styleOf(
        <TextV4 testID="t" numeric="tabular">
          $9.99
        </TextV4>
      ).fontVariant
    ).toEqual(['tabular-nums']);
    expect(styleOf(<TextV4 testID="t">$9.99</TextV4>).fontVariant).toBeUndefined();
  });

  it('maps `tone` onto a semantic slot, including the contrast-safe text forms', () => {
    expect(
      styleOf(
        <TextV4 testID="t" tone="muted">
          Caption
        </TextV4>
      ).color
    ).toBe(THEME.light.muted);
    expect(
      styleOf(
        <TextV4 testID="t" tone="dangerText">
          Out of date
        </TextV4>
      ).color
    ).toBe(THEME.light.dangerText);
  });

  it('maps weight and align through unchanged', () => {
    const style = styleOf(
      <TextV4 testID="t" weight="bold" align="center">
        Headline
      </TextV4>
    );
    expect(style.fontWeight).toBe('700');
    expect(style.textAlign).toBe('center');
  });

  it('resolves the dark scheme’s slots, not the light ones', () => {
    const dark = compileTheme(SEED_DARK);
    const { getByTestId } = renderThemed(<TextV4 testID="t">Copy</TextV4>, SEED_DARK);
    expect(flat(getByTestId('t').props.style).color).toBe(dark.dark.onSurface);
  });

  it('emits no colour that is not a token', () => {
    ([SEED_LIGHT, SEED_DARK] as const).forEach((seed) => {
      const tokens = tokenHexSet(seed);
      const { root } = renderThemed(
        <TextV4 testID="t" size="2xl" tone="danger" weight="bold">
          Expired
        </TextV4>,
        seed
      );
      const hexes = renderedStyleHexes(root);
      expect(hexes.length).toBeGreaterThan(0);
      hexes.forEach((hex) => expect(tokens.has(hex)).toBe(true));
    });
  });

  it('passes RN Text props through and lets `style` override for layout', () => {
    const { getByTestId } = renderThemed(
      <TextV4 testID="t" numberOfLines={2} style={{ marginTop: 4 }}>
        Long method step
      </TextV4>,
      SEED_LIGHT
    );
    const node = getByTestId('t');
    expect(node.props.numberOfLines).toBe(2);
    expect(flat(node.props.style).marginTop).toBe(4);
  });

  it('survives its empty state — no children, still fully set', () => {
    // §12. A headline slot with nothing in it yet must render as a styled,
    // zero-height line rather than throwing or losing its typography.
    const { getByTestId } = renderThemed(<TextV4 testID="t" size="2xl" measure />, SEED_LIGHT);
    const node = getByTestId('t');
    expect(node.props.children).toBeUndefined();
    const style = flat(node.props.style);
    expect(style.fontFamily).toBe(THEME.typography.fontHeading);
    expect(style.fontSize).toBe(THEME.typography.scale['2xl']);
    expect(style.lineHeight).toBeCloseTo(THEME.typography.scale['2xl'] * 1.25);
    expect(style.maxWidth).toBe(THEME.spacing['2xl'] * 7);
  });
});
