import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { mixToken } from '../../primitives/internal/v4-depth';
import { TINT } from '../../primitives/internal/feedback-v4';
import type { ThemeSeed } from '../../theme/types';
import type { AlertTone, AlertVariant } from './Alert';
import { AlertV4 } from './AlertV4';

const TONES: AlertTone[] = ['info', 'success', 'warn', 'danger'];
const VARIANTS: AlertVariant[] = ['subtle', 'solid', 'outline'];

/** The alert's own flattened style (the outermost styled View). */
function alertStyle(root: ReactTestInstance): Record<string, unknown> {
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

function textColor(node: ReactTestInstance): string {
  const style = node.props.style as Record<string, unknown> | Array<Record<string, unknown>>;
  const flat = Array.isArray(style) ? Object.assign({}, ...style) : style;
  return flat.color as string;
}

describe('AlertV4 (native)', () => {
  it('routes `warn` to the WARN slot, never to the brand accent — §35.4', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <AlertV4 tone="warn" variant="solid">
        Body
      </AlertV4>,
      SEED_LIGHT
    );
    // The base native alert painted `accent` here: a brand colour standing in
    // for a caution, and a different alert from its own web twin.
    expect(alertStyle(root).backgroundColor).toBe(theme.light.warn);
    expect(alertStyle(root).backgroundColor).not.toBe(theme.light.accent);
  });

  it('composites `subtle` into an OPAQUE tint it owns', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<AlertV4 tone="danger">Body</AlertV4>, SEED_LIGHT);
    const bg = alertStyle(root).backgroundColor as string;
    // Not `rgba(...)`: a translucent wash is a different colour on a card, on
    // glass and on the page, and the labels promise AA on only one of them.
    expect(bg).toMatch(/^#[0-9a-f]{6}$/i);
    expect(bg).toBe(mixToken(theme.light.surface, theme.light.danger, TINT));
  });

  it('keeps the left rule at full tone strength and one spacing step wide', () => {
    const theme = compileTheme(SEED_LIGHT);
    const style = alertStyle(renderThemed(<AlertV4 tone="success">Body</AlertV4>, SEED_LIGHT).root);
    expect(style.borderLeftWidth).toBe(theme.spacing.xs);
    expect(contrastRatio(style.borderLeftColor as string, style.backgroundColor as string))
      .toBeGreaterThanOrEqual(3);
  });

  it('clears AA on the fill it painted — every tone, variant and scheme', () => {
    ([SEED_LIGHT, SEED_DARK] as ThemeSeed[]).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        TONES.forEach((tone) => {
          VARIANTS.forEach((variant) => {
            const { root, getByText } = renderThemed(
              <AlertV4 tone={tone} variant={variant} title="Heading">
                Body
              </AlertV4>,
              seed,
              scheme
            );
            const bg = alertStyle(root).backgroundColor as string;
            expect(contrastRatio(textColor(getByText('Heading')), bg)).toBeGreaterThanOrEqual(4.5);
            expect(contrastRatio(textColor(getByText('Body')), bg)).toBeGreaterThanOrEqual(4.5);
          });
        });
      });
    });
  });

  it('keeps the dismiss control legible on a solid tone', () => {
    const { root, getByText } = renderThemed(
      <AlertV4 tone="danger" variant="solid" onClose={() => undefined}>
        Body
      </AlertV4>,
      SEED_LIGHT
    );
    const bg = alertStyle(root).backgroundColor as string;
    expect(contrastRatio(textColor(getByText('✕')), bg)).toBeGreaterThanOrEqual(4.5);
  });

  it('carries no shadow — an alert is IN the page, not above it', () => {
    const style = alertStyle(renderThemed(<AlertV4 tone="info">Body</AlertV4>, SEED_LIGHT).root);
    expect(style.shadowOpacity).toBeUndefined();
    expect(style.elevation).toBeUndefined();
  });

  it('announces danger as an alert and everything else as a summary', () => {
    const danger = renderThemed(<AlertV4 tone="danger">Body</AlertV4>, SEED_LIGHT);
    expect(danger.root.findAll((n) => n.props?.accessibilityRole === 'alert').length)
      .toBeGreaterThan(0);
    const info = renderThemed(<AlertV4 tone="info">Body</AlertV4>, SEED_LIGHT);
    expect(info.root.findAll((n) => n.props?.accessibilityRole === 'summary').length)
      .toBeGreaterThan(0);
  });

  it('takes its radius and padding from the seed, not from a literal', () => {
    const sharp: ThemeSeed = { ...SEED_LIGHT, shape: 'sharp' };
    const theme = compileTheme(sharp);
    const style = alertStyle(renderThemed(<AlertV4>Body</AlertV4>, sharp).root);
    expect(style.borderRadius).toBe(theme.radius.md);
    expect(style.padding).toBe(theme.spacing.md);
  });

  it('renders the action under the copy it belongs to', () => {
    const { getByText } = renderThemed(
      <AlertV4 tone="danger" title="Failed" action={<Text>Retry</Text>}>
        Body
      </AlertV4>,
      SEED_LIGHT
    );
    expect(getByText('Retry')).toBeTruthy();
  });
});
