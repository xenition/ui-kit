import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent, waitFor } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { mixToken } from '../../primitives/internal/v4-depth';
import { TINT } from '../../primitives/internal/feedback-v4';
import type { ThemeSeed } from '../../theme/types';
import type { ResultStatus } from './Result';
import { ResultV4 } from './ResultV4';

const STATUSES: ResultStatus[] = ['success', 'error', 'empty', '404'];

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

/** The status seal — the only round, sized box in the tree. */
function discStyle(root: ReactTestInstance): Record<string, unknown> {
  return (
    root
      .findAll((n) => n.props?.style !== undefined)
      .map((n) => flatten(n.props.style))
      .find((s) => s.borderRadius !== undefined && s.width !== undefined) ?? {}
  );
}

function textStyle(node: ReactTestInstance): Record<string, unknown> {
  return flatten(node.props.style);
}

describe('ResultV4 (native)', () => {
  it('makes the action the kit button, not a local Pressable — §15', async () => {
    const onAction = jest.fn();
    const { getByRole } = renderThemed(
      <ResultV4 title="Nothing yet" actionLabel="Create habit" onAction={onAction} />,
      SEED_LIGHT
    );
    await waitFor(() => expect(getByRole('button')).toBeTruthy());
    fireEvent.press(getByRole('button'));
    expect(onAction).toHaveBeenCalled();
  });

  it('shrinks the glyph into a seal instead of leading with an illustration', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root, getByText } = renderThemed(<ResultV4 title="Done" />, SEED_LIGHT);
    const disc = discStyle(root);
    expect(disc.width).toBe(theme.spacing['2xl']);
    expect(disc.borderRadius).toBe(theme.spacing['2xl'] / 2);
    // The glyph is `xl`, not the base's `3xl`.
    expect(textStyle(getByText('✓')).fontSize).toBe(theme.typography.scale.xl);
  });

  it('gives `empty` and `404` NO semantic colour — they are not failures', () => {
    const theme = compileTheme(SEED_LIGHT);
    const neutral = mixToken(theme.light.surface, theme.light.onSurface, TINT);
    (['empty', '404'] as ResultStatus[]).forEach((status) => {
      const { root } = renderThemed(<ResultV4 status={status} title="Nothing" />, SEED_LIGHT);
      expect(discStyle(root).backgroundColor).toBe(neutral);
    });
  });

  it('tints the seal with the status it actually reports', () => {
    const theme = compileTheme(SEED_LIGHT);
    const ok = renderThemed(<ResultV4 status="success" title="Done" />, SEED_LIGHT);
    expect(discStyle(ok.root).backgroundColor).toBe(
      mixToken(theme.light.surface, theme.light.success, TINT)
    );
    const bad = renderThemed(<ResultV4 status="error" title="Failed" />, SEED_LIGHT);
    expect(discStyle(bad.root).backgroundColor).toBe(
      mixToken(theme.light.surface, theme.light.danger, TINT)
    );
  });

  it('keeps the mark legible on the seal — every status and scheme', () => {
    ([SEED_LIGHT, SEED_DARK] as ThemeSeed[]).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        STATUSES.forEach((status) => {
          const { root } = renderThemed(
            <ResultV4 status={status} title="Heading" />,
            seed,
            scheme
          );
          const disc = discStyle(root);
          const glyph = root.findAll(
            (n) => typeof n.props?.children === 'string' && n.props.children.length === 1
          )[0];
          expect(
            contrastRatio(textStyle(glyph).color as string, disc.backgroundColor as string)
          ).toBeGreaterThanOrEqual(4.5);
        });
      });
    });
  });

  it('caps the description to a reading measure — §33', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = renderThemed(
      <ResultV4 title="Heading" description="A sentence of explanation." />,
      SEED_LIGHT
    );
    expect(textStyle(getByText('A sentence of explanation.')).maxWidth).toBe(
      theme.spacing['2xl'] * 8
    );
  });

  it('respects a caller-supplied icon over the seal', () => {
    const { queryByText } = renderThemed(
      <ResultV4 title="Heading" icon={<Text>custom</Text>} />,
      SEED_LIGHT
    );
    expect(queryByText('✓')).toBeNull();
    expect(queryByText('custom')).not.toBeNull();
  });
});

