import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, SEED_DARK, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { mixToken } from '../../primitives/internal/v4-depth';
import type { ThemeSeed } from '../../theme/types';
import type { BadgeTone, BadgeVariant } from './Badge';
import { BadgeV4 } from './BadgeV4';

const TONES: BadgeTone[] = ['neutral', 'primary', 'success', 'warn', 'danger', 'accent'];
const VARIANTS: BadgeVariant[] = ['solid', 'soft', 'outline'];

/** The badge's own flattened style (the outermost styled View). */
function badgeStyle(root: ReactTestInstance): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (style: unknown): void => {
    if (!style) return;
    if (Array.isArray(style)) {
      style.forEach(walk);
      return;
    }
    if (typeof style === 'object') Object.assign(merged, style as Record<string, unknown>);
  };
  walk(root.findAll((n) => n.props?.style !== undefined)[0]?.props?.style);
  return merged;
}

describe('BadgeV4 (native)', () => {
  it('fills `solid` with the tone and its guaranteed on-pair', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root, getByText } = renderThemed(<BadgeV4 tone="primary">New</BadgeV4>, SEED_LIGHT);
    expect(badgeStyle(root).backgroundColor).toBe(theme.light.primary);
    expect((getByText('New').props.style as { color: string }).color).toBe(theme.light.onPrimary);
  });

  it('composites `soft` into an OPAQUE colour it owns', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <BadgeV4 tone="primary" variant="soft">
        New
      </BadgeV4>,
      SEED_LIGHT
    );
    const bg = badgeStyle(root).backgroundColor as string;
    // Not `rgba(...)` — a translucent fill would change colour on a filled
    // card, on glass, and on the page, and its label is guaranteed on one only.
    expect(bg).toMatch(/^#[0-9a-f]{6}$/i);
    expect(bg).toBe(mixToken(theme.light.surface, theme.light.primary, 0.14));
  });

  it('paints `surface` behind `outline` so its label has a known ground', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <BadgeV4 tone="danger" variant="outline">
        Overdue
      </BadgeV4>,
      SEED_LIGHT
    );
    const style = badgeStyle(root);
    expect(style.backgroundColor).toBe(theme.light.surface);
    expect(style.borderWidth).toBe(1);
    expect(style.borderColor).toBe(theme.light.danger);
  });

  it('clears AA against the fill it painted — every tone, variant and scheme', () => {
    ([SEED_LIGHT, SEED_DARK] as ThemeSeed[]).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        TONES.forEach((tone) => {
          VARIANTS.forEach((variant) => {
            const { root, getByText } = renderThemed(
              <BadgeV4 tone={tone} variant={variant}>
                Label
              </BadgeV4>,
              seed,
              scheme
            );
            const bg = badgeStyle(root).backgroundColor as string;
            const fg = (getByText('Label').props.style as { color: string }).color;
            expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(4.5);
          });
        });
      });
    });
  });

  it('keeps a count and a dot round, and gives a word the brand corner', () => {
    const theme = compileTheme(SEED_LIGHT);
    const word = badgeStyle(renderThemed(<BadgeV4>Draft</BadgeV4>, SEED_LIGHT).root);
    expect(word.borderRadius).toBe(theme.radius.sm);

    const counted = badgeStyle(renderThemed(<BadgeV4 count={3} />, SEED_LIGHT).root);
    expect(counted.borderRadius).toBe(theme.radius.full);
    expect(counted.minWidth).toBe(counted.minHeight);

    const dotted = badgeStyle(renderThemed(<BadgeV4 dot>Live</BadgeV4>, SEED_LIGHT).root);
    expect(dotted.borderRadius).toBe(theme.radius.full);
  });

  it('follows a `sharp` seed instead of defaulting to a capsule — §8', () => {
    const sharp: ThemeSeed = { ...SEED_LIGHT, shape: 'sharp' };
    const theme = compileTheme(sharp);
    expect(theme.radius.sm).toBe(0);
    expect(badgeStyle(renderThemed(<BadgeV4>Draft</BadgeV4>, sharp).root).borderRadius).toBe(0);
  });

  it('caps a count at max', () => {
    const { getByText } = renderThemed(<BadgeV4 count={140} />, SEED_LIGHT);
    expect(getByText('99+')).toBeTruthy();
    const custom = renderThemed(<BadgeV4 count={12} max={9} />, SEED_LIGHT);
    expect(custom.getByText('9+')).toBeTruthy();
  });

  it('sizes from the spacing scale and hugs its content', () => {
    const theme = compileTheme(SEED_LIGHT);
    const md = badgeStyle(renderThemed(<BadgeV4>Draft</BadgeV4>, SEED_LIGHT).root);
    const sm = badgeStyle(renderThemed(<BadgeV4 size="sm">Draft</BadgeV4>, SEED_LIGHT).root);
    expect(md.minHeight).toBe(theme.spacing.lg);
    expect(sm.minHeight).toBe(theme.spacing.md + theme.spacing.xs);
    expect(md.alignSelf).toBe('flex-start');
  });

  it('keeps the status dot visible on the fill behind it', () => {
    const { root } = renderThemed(<BadgeV4 tone="success" dot>Live</BadgeV4>, SEED_LIGHT);
    const badge = badgeStyle(root);
    const dot = root
      .findAll((n) => n.props?.style !== undefined)
      .map((n) => n.props.style as Record<string, unknown>)
      .find((s) => s !== null && typeof s === 'object' && s.width !== undefined);
    expect(dot).toBeDefined();
    expect(contrastRatio(dot?.backgroundColor as string, badge.backgroundColor as string))
      .toBeGreaterThanOrEqual(3);
  });

  it('renders non-string children untouched', () => {
    const { getByText } = renderThemed(
      <BadgeV4>
        <Text>custom</Text>
      </BadgeV4>,
      SEED_LIGHT
    );
    expect(getByText('custom')).toBeTruthy();
  });

  it('never carries a gradient — a badge is not a hero', () => {
    const { queryByLabelText } = renderThemed(
      <BadgeV4 tone="primary">New</BadgeV4>,
      SEED_LIGHT
    );
    expect(queryByLabelText('linear-gradient')).toBeNull();
  });
});
