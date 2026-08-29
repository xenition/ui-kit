import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { fireEvent } from '@testing-library/react-native';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { mixToken } from '../../primitives/internal/v4-depth';
import { resolveIconGlyph } from '../../primitives/icon-names';
import type { ThemeSeed } from '../../theme/types';
import type { TagTone, TagVariant } from './Tag';
import { TagV4 } from './TagV4';

const TONES: TagTone[] = ['neutral', 'primary', 'success', 'warn', 'danger', 'accent'];
const VARIANTS: TagVariant[] = ['solid', 'soft', 'outline'];

/** Host-node styles only; `findAll` also returns each composite wrapper. */
function styles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => {
      const merged: Record<string, unknown> = {};
      const walk = (style: unknown): void => {
        if (!style) return;
        if (Array.isArray(style)) {
          style.forEach(walk);
          return;
        }
        if (typeof style === 'object') Object.assign(merged, style as Record<string, unknown>);
      };
      walk(n.props.style);
      return merged;
    });
}

const chip = (root: ReactTestInstance): Record<string, unknown> => styles(root)[0];

describe('TagV4 (native)', () => {
  it('fills `solid` with the tone and its guaranteed on-pair', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root, getByText } = renderThemed(<TagV4 tone="primary">Design</TagV4>, SEED_LIGHT);
    expect(chip(root).backgroundColor).toBe(theme.light.primary);
    expect((getByText('Design').props.style as { color: string }).color).toBe(theme.light.onPrimary);
  });

  it('composites `soft` into an OPAQUE colour it owns', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <TagV4 tone="primary" variant="soft">
        Design
      </TagV4>,
      SEED_LIGHT
    );
    const bg = chip(root).backgroundColor as string;
    // The base tag used `rgba(...)` at 14% alpha, so the chip was a different
    // colour on a card, on glass and on the page — and its label was measured
    // against exactly one of the three.
    expect(bg).toMatch(/^#[0-9a-f]{6}$/i);
    expect(bg).toBe(mixToken(theme.light.surface, theme.light.primary, 0.14));
  });

  it('paints `surface` behind `outline` so its label has a known ground', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <TagV4 tone="danger" variant="outline">
        Blocked
      </TagV4>,
      SEED_LIGHT
    );
    const style = chip(root);
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
              <TagV4 tone={tone} variant={variant}>
                Label
              </TagV4>,
              seed,
              scheme
            );
            const bg = chip(root).backgroundColor as string;
            const fg = (getByText('Label').props.style as { color: string }).color;
            expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(4.5);
          });
        });
      });
    });
  });

  it('gives the remove control a 44px target without growing the chip', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByLabelText, root } = renderThemed(
      <TagV4 onRemove={() => undefined}>Design</TagV4>,
      SEED_LIGHT
    );
    const button = getByLabelText('Remove');
    const box = (button.props.style as { width: number }).width;
    const slop = button.props.hitSlop as { top: number; left: number };
    // Glyph box plus slop on both sides reaches the platform minimum.
    expect(box + slop.left * 2).toBeGreaterThanOrEqual(44);
    expect(box + slop.top * 2).toBeGreaterThanOrEqual(44);
    // …and the chip itself is still chip-sized.
    expect(chip(root).minHeight).toBe(theme.spacing.lg);
  });

  it('shows the remove affordance for `removable` as well as for `onRemove`', () => {
    const forced = renderThemed(<TagV4 removable>Design</TagV4>, SEED_LIGHT);
    expect(forced.getByLabelText('Remove')).toBeTruthy();
    const plain = renderThemed(<TagV4>Design</TagV4>, SEED_LIGHT);
    expect(plain.queryByLabelText('Remove')).toBeNull();
  });

  it('calls `onRemove` when the target is pressed', () => {
    const onRemove = jest.fn();
    const { getByLabelText } = renderThemed(<TagV4 onRemove={onRemove}>Design</TagV4>, SEED_LIGHT);
    fireEvent.press(getByLabelText('Remove'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('takes the remove glyph from the kit’s named icon set', () => {
    const { getByText } = renderThemed(<TagV4 removable>Design</TagV4>, SEED_LIGHT);
    expect(getByText(resolveIconGlyph('close'))).toBeTruthy();
  });

  it('keeps the brand corner instead of defaulting to a capsule — §8', () => {
    const theme = compileTheme(SEED_LIGHT);
    expect(chip(renderThemed(<TagV4>Design</TagV4>, SEED_LIGHT).root).borderRadius).toBe(
      theme.radius.sm
    );
    const sharp: ThemeSeed = { ...SEED_LIGHT, shape: 'sharp' };
    expect(chip(renderThemed(<TagV4>Design</TagV4>, sharp).root).borderRadius).toBe(0);
  });

  it('sizes from the spacing scale and hugs its content', () => {
    const theme = compileTheme(SEED_LIGHT);
    const md = chip(renderThemed(<TagV4>Design</TagV4>, SEED_LIGHT).root);
    const sm = chip(renderThemed(<TagV4 size="sm">Design</TagV4>, SEED_LIGHT).root);
    expect(md.minHeight).toBe(theme.spacing.lg);
    expect(sm.minHeight).toBe(theme.spacing.md + theme.spacing.xs);
    expect(md.alignSelf).toBe('flex-start');
  });

  it('keeps the leading dot visible on the fill behind it', () => {
    const { root } = renderThemed(
      <TagV4 tone="success" variant="soft" dot>
        Live
      </TagV4>,
      SEED_LIGHT
    );
    const bg = chip(root).backgroundColor as string;
    const dot = styles(root).find((s) => s.width !== undefined && s.borderRadius !== undefined);
    expect(contrastRatio(dot?.backgroundColor as string, bg)).toBeGreaterThanOrEqual(3);
  });

  it('renders non-string children untouched', () => {
    const { getByText } = renderThemed(
      <TagV4>
        <Text>custom</Text>
      </TagV4>,
      SEED_LIGHT
    );
    expect(getByText('custom')).toBeTruthy();
  });
});
