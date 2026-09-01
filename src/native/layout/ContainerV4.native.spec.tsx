import * as React from 'react';
import { Text } from 'react-native';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { flatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { Container } from './Container';
import { ContainerV4, type ContainerV4Props } from './ContainerV4';

/**
 * The shared safe-area mock reports `left: 0, right: 0` — a portrait phone,
 * where a horizontal inset is unobservable. `safeArea` is a *horizontal* gutter
 * decision, so this file substitutes a landscape-notch device instead: the one
 * orientation in which the bug the prop exists to fix is visible.
 */
const INSET_LEFT = 44;
const INSET_RIGHT = 34;

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 44, right: 34 }),
}));

const theme = compileTheme(SEED_LIGHT);

function style(props: ContainerV4Props = {}): Record<string, unknown> {
  const { getByTestId } = renderThemed(<ContainerV4 testID="c" {...props} />, SEED_LIGHT);
  return flatStyle(getByTestId('c').props.style);
}

describe('ContainerV4 (native)', () => {
  it('is additive: the base props still render the base layout', () => {
    const v4 = style();
    const { getByTestId } = renderThemed(<Container testID="base" />, SEED_LIGHT);
    const base = flatStyle(getByTestId('base').props.style);
    expect(v4.width).toBe(base.width);
    expect(v4.maxWidth).toBe(base.maxWidth);
    expect(v4.alignSelf).toBe(base.alignSelf);
    // The base spells the gutter `paddingHorizontal`; V4 spells it per side so
    // an asymmetric safe-area inset can land on one edge only. Same number.
    expect(v4.paddingLeft).toBe(base.paddingHorizontal);
    expect(v4.paddingRight).toBe(base.paddingHorizontal);
  });

  it('centres a full-width column and caps it at the reading measure', () => {
    const s = style();
    expect(s.width).toBe('100%');
    expect(s.alignSelf).toBe('center');
    expect(s.maxWidth).toBe(480);
  });

  it('takes a numeric cap', () => {
    expect(style({ maxWidth: 960 }).maxWidth).toBe(960);
  });

  it('uncaps on maxWidth="none" — the prop the base could not express', () => {
    const s = style({ maxWidth: 'none' });
    expect(s.maxWidth).toBeUndefined();
    // Still a centred, gutter-bearing column — only the cap is gone.
    expect(s.alignSelf).toBe('center');
    expect(s.paddingLeft).toBe(theme.spacing.lg);
  });

  it('binds the page gutter to §4.1, straight off the compiled scale', () => {
    // `lg` (24) is the default: M3's medium-window margin and the house gutter.
    expect(style().paddingLeft).toBe(theme.spacing.lg);
    expect(style().paddingRight).toBe(theme.spacing.lg);
    expect(style({ padding: 'xs' }).paddingLeft).toBe(theme.spacing.xs);
    expect(style({ padding: 'md' }).paddingLeft).toBe(theme.spacing.md);
    expect(style({ padding: '2xl' }).paddingLeft).toBe(theme.spacing['2xl']);
  });

  it('does not pay the safe-area inset unless asked — additive rule', () => {
    expect(style().paddingLeft).toBe(theme.spacing.lg);
    expect(style({ safeArea: false }).paddingRight).toBe(theme.spacing.lg);
  });

  it('adds the horizontal safe-area inset to the gutter on safeArea', () => {
    // HIG asks every layout to respect the system safe areas and nothing in
    // this module did. Gutter PLUS inset, not `max(gutter, inset)`, so content
    // keeps its breathing room instead of sitting flush against the notch —
    // the same arithmetic `AuthStickyFooterV4` uses at the bottom edge.
    const s = style({ safeArea: true });
    expect(s.paddingLeft).toBe(theme.spacing.lg + INSET_LEFT);
    expect(s.paddingRight).toBe(theme.spacing.lg + INSET_RIGHT);
  });

  it('scales the safe gutter with the padding token', () => {
    const s = style({ safeArea: true, padding: 'md' });
    expect(s.paddingLeft).toBe(theme.spacing.md + INSET_LEFT);
    expect(s.paddingRight).toBe(theme.spacing.md + INSET_RIGHT);
  });

  it('keeps prop parity with the web twin — same names, same defaults', () => {
    // The mechanism differs (`useSafeAreaInsets()` here, `env(safe-area-inset-*)`
    // on web) and the props do not. Compile-time half of the parity rule.
    const props: ContainerV4Props = { maxWidth: 'none', padding: 'lg', safeArea: true };
    expect(props.safeArea).toBe(true);
  });

  it('survives its empty case: no children, nothing painted', () => {
    // §4.5 — a component with nothing to show renders nothing, never a blank
    // bordered box. A container paints no ground and draws no edge.
    const s = style({ maxWidth: 'none', safeArea: true });
    expect(s.backgroundColor).toBeUndefined();
    expect(s.borderWidth).toBeUndefined();
    expect(s.borderRadius).toBeUndefined();
    expect(s.shadowOpacity).toBeUndefined();
    expect(s.elevation).toBeUndefined();

    const { getByTestId } = renderThemed(<ContainerV4 testID="empty" />, SEED_LIGHT);
    expect(getByTestId('empty').children).toHaveLength(0);
  });

  it('renders its children as-is', () => {
    const { getByText } = renderThemed(
      <ContainerV4>
        <Text>page</Text>
      </ContainerV4>,
      SEED_LIGHT
    );
    expect(getByText('page')).toBeTruthy();
  });

  it('lets a caller’s style win over the computed cap', () => {
    expect(style({ style: { maxWidth: 800 } }).maxWidth).toBe(800);
  });

  it('paints no colour at all, so every hex it could show traces to a token', () => {
    const { root } = renderThemed(
      <ContainerV4 safeArea padding="2xl">
        <Text>page</Text>
      </ContainerV4>,
      SEED_LIGHT
    );
    const hexes = renderedStyleHexes(root);
    const tokens = tokenHexSet(SEED_LIGHT);
    hexes.forEach((hex) => expect(tokens.has(hex)).toBe(true));
  });
});
