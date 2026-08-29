import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import type { ThemeSeed } from '../../theme/types';
import type { BannerTone } from './Banner';
import { BannerV4 } from './BannerV4';

const TONES: BannerTone[] = ['info', 'success', 'warn', 'danger'];

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

/** The banner's own flattened style (the outermost styled View). */
function bannerStyle(root: ReactTestInstance): Record<string, unknown> {
  return flatten(root.findAll((n) => n.props?.style !== undefined)[0]?.props?.style);
}

function textColor(node: ReactTestInstance): string {
  return flatten(node.props.style).color as string;
}

/** The action chip's resolved style — its `style` prop is a press-state fn. */
function chipStyle(root: ReactTestInstance, label: string): Record<string, unknown> {
  const node = root.find((n) => n.props?.accessibilityLabel === label && n.props?.onPress);
  const style = node.props.style as (s: { pressed: boolean }) => unknown;
  return flatten(typeof style === 'function' ? style({ pressed: false }) : style);
}

describe('BannerV4 (native)', () => {
  it('fills the band with the tone slot and nothing else', () => {
    const theme = compileTheme(SEED_LIGHT);
    TONES.forEach((tone) => {
      const { root } = renderThemed(<BannerV4 tone={tone}>Message</BannerV4>, SEED_LIGHT);
      const style = bannerStyle(root);
      expect(style.backgroundColor).toBe(
        theme.light[tone === 'info' ? 'primary' : tone]
      );
      expect(style.width).toBe('100%');
    });
  });

  it('carries no gradient and no shadow — the band is one flat tone, in flow', () => {
    const style = bannerStyle(renderThemed(<BannerV4 tone="danger">M</BannerV4>, SEED_LIGHT).root);
    expect(style.shadowOpacity).toBeUndefined();
    expect(style.elevation).toBeUndefined();
  });

  it('gives the action a chip mixed from the band, not a third colour', () => {
    const { root } = renderThemed(
      <BannerV4 tone="danger" actionLabel="Retry" onAction={() => undefined}>
        Message
      </BannerV4>,
      SEED_LIGHT
    );
    const chip = chipStyle(root, 'Retry');
    const band = bannerStyle(root).backgroundColor as string;
    // Opaque, and a different colour from the band it lifts off.
    expect(chip.backgroundColor).toMatch(/^#[0-9a-f]{6}$/i);
    expect(chip.backgroundColor).not.toBe(band);
  });

  it('clears AA on the band and on the chip — every tone and scheme', () => {
    ([SEED_LIGHT, SEED_DARK] as ThemeSeed[]).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        TONES.forEach((tone) => {
          const { root, getByText } = renderThemed(
            <BannerV4 tone={tone} actionLabel="Retry" onAction={() => undefined}>
              Message
            </BannerV4>,
            seed,
            scheme
          );
          const band = bannerStyle(root).backgroundColor as string;
          const chip = chipStyle(root, 'Retry').backgroundColor as string;
          expect(contrastRatio(textColor(getByText('Message')), band)).toBeGreaterThanOrEqual(4.5);
          expect(contrastRatio(textColor(getByText('Retry')), chip)).toBeGreaterThanOrEqual(4.5);
        });
      });
    });
  });

  it('gives both controls a real touch target — §46', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <BannerV4 actionLabel="Retry" onAction={() => undefined} onClose={() => undefined}>
        Message
      </BannerV4>,
      SEED_LIGHT
    );
    expect(chipStyle(root, 'Retry').minHeight).toBe(theme.spacing.xl);
    expect(chipStyle(root, 'Dismiss').minWidth).toBe(theme.spacing.xl);
  });

  it('announces danger as an alert and everything else as a summary', () => {
    const danger = renderThemed(<BannerV4 tone="danger">M</BannerV4>, SEED_LIGHT);
    expect(danger.root.findAll((n) => n.props?.accessibilityRole === 'alert').length)
      .toBeGreaterThan(0);
    const info = renderThemed(<BannerV4 tone="info">M</BannerV4>, SEED_LIGHT);
    expect(info.root.findAll((n) => n.props?.accessibilityRole === 'summary').length)
      .toBeGreaterThan(0);
  });

  it('spaces itself from the scale, not from literals', () => {
    const theme = compileTheme(SEED_LIGHT);
    const style = bannerStyle(renderThemed(<BannerV4>M</BannerV4>, SEED_LIGHT).root);
    expect(style.paddingVertical).toBe(theme.spacing.md);
    expect(style.paddingHorizontal).toBe(theme.spacing.lg);
  });
});
