import * as React from 'react';
import { Text as RNText } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { AuthStickyFooterV4 } from './AuthStickyFooterV4';

/** The fixed inset the safe-area mock reports for a notch-like device. */
const MOCK_BOTTOM_INSET = 16;

const CTA = <RNText testID="cta">Continue</RNText>;

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

function allStyles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flatten(n.props.style));
}

/** The band — the one view carrying the hairline. */
function bandStyle(root: ReactTestInstance): Record<string, unknown> {
  return allStyles(root).find((s) => s.borderTopWidth === 1) ?? {};
}

describe('AuthStickyFooterV4 (native)', () => {
  it('draws the band as a hairline over an opaque surface (§5)', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<AuthStickyFooterV4>{CTA}</AuthStickyFooterV4>, SEED_LIGHT);
    const style = bandStyle(root);
    expect(style.borderTopWidth).toBe(1);
    expect(style.borderTopColor).toBe(theme.light.border);
    // Opaque, so the page passes UNDER the action instead of through it.
    expect(style.backgroundColor).toBe(theme.light.surface);
  });

  it('sits ABOVE the safe-area inset by default (§5)', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<AuthStickyFooterV4>{CTA}</AuthStickyFooterV4>, SEED_LIGHT);
    const style = bandStyle(root);
    // spacing.lg PLUS the device inset — the base read no inset at all, so the
    // CTA sat under the home indicator.
    expect(style.paddingBottom).toBe(theme.spacing.lg + MOCK_BOTTOM_INSET);
    expect(style.paddingTop).toBe(theme.spacing.lg);
    expect(style.paddingHorizontal).toBe(theme.spacing.lg);
    expect(style.gap).toBe(theme.spacing.sm);
  });

  it('gives the inset back when an ancestor already consumed it', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <AuthStickyFooterV4 safeArea={false}>{CTA}</AuthStickyFooterV4>,
      SEED_LIGHT
    );
    expect(bandStyle(root).paddingBottom).toBe(theme.spacing.lg);
  });

  it('carries no shadow — the CTA inside it already has one', () => {
    const { root } = renderThemed(<AuthStickyFooterV4>{CTA}</AuthStickyFooterV4>, SEED_LIGHT);
    const style = bandStyle(root);
    expect(style.shadowOpacity).toBeUndefined();
    expect(style.elevation).toBeUndefined();
  });

  it('renders the CTA it is handed, untouched', () => {
    const { getByTestId } = renderThemed(
      <AuthStickyFooterV4>{CTA}</AuthStickyFooterV4>,
      SEED_LIGHT
    );
    expect(getByTestId('cta').props.children).toBe('Continue');
  });

  it('puts the secondary action BELOW the CTA, at the muted volume (§5)', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText, getAllByRole } = renderThemed(
      <AuthStickyFooterV4 secondaryLabel="No thanks">{CTA}</AuthStickyFooterV4>,
      SEED_LIGHT
    );
    const label = getByText('No thanks');
    expect(flatten(label.props.style).color).toBe(theme.light.mutedText);
    // Weight steps down too — §5: never competing with the CTA.
    expect(flatten(label.props.style).fontWeight).toBe('500');
    expect(getAllByRole('button')).toHaveLength(1);
  });

  it('reports the secondary press and can freeze it independently of the CTA', () => {
    const onSecondaryPress = jest.fn();
    const { getByRole } = renderThemed(
      <AuthStickyFooterV4 secondaryLabel="No thanks" onSecondaryPress={onSecondaryPress}>
        {CTA}
      </AuthStickyFooterV4>,
      SEED_LIGHT
    );
    fireEvent.press(getByRole('button'));
    expect(onSecondaryPress).toHaveBeenCalledTimes(1);

    const frozen = renderThemed(
      <AuthStickyFooterV4 secondaryLabel="No thanks" secondaryDisabled>
        {CTA}
      </AuthStickyFooterV4>,
      SEED_LIGHT
    );
    expect(frozen.getByRole('button').props.accessibilityState.disabled).toBe(true);
  });

  it('draws no secondary line when none was asked for', () => {
    const { queryByRole } = renderThemed(
      <AuthStickyFooterV4>{CTA}</AuthStickyFooterV4>,
      SEED_LIGHT
    );
    expect(queryByRole('button')).toBeNull();
  });

  it('empty state: nothing to pin, nothing rendered (§12)', () => {
    expect(renderThemed(<AuthStickyFooterV4 />, SEED_LIGHT).toJSON()).toBeNull();
    expect(renderThemed(<AuthStickyFooterV4>{false}</AuthStickyFooterV4>, SEED_LIGHT).toJSON()).toBeNull();
    expect(renderThemed(<AuthStickyFooterV4>{null}</AuthStickyFooterV4>, SEED_LIGHT).toJSON()).toBeNull();
  });

  it('empty state: a secondary action alone still earns the band', () => {
    const { root, getByText } = renderThemed(
      <AuthStickyFooterV4 secondaryLabel="Back" />,
      SEED_LIGHT
    );
    expect(bandStyle(root).borderTopWidth).toBe(1);
    expect(getByText('Back')).toBeTruthy();
  });

  it('accepts a layout style override without losing the band', () => {
    const { root } = renderThemed(
      <AuthStickyFooterV4 style={{ marginTop: 8 }}>{CTA}</AuthStickyFooterV4>,
      SEED_LIGHT
    );
    const style = bandStyle(root);
    expect(style.marginTop).toBe(8);
    expect(style.borderTopWidth).toBe(1);
  });

  it('every colour it paints traces to a token (§10.1)', () => {
    const allowed = tokenHexSet(SEED_LIGHT);
    const { root } = renderThemed(
      <AuthStickyFooterV4 secondaryLabel="No thanks">{CTA}</AuthStickyFooterV4>,
      SEED_LIGHT
    );
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
