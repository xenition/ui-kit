import * as React from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import type { SpacingScale } from '../../theme/types';
import { Divider } from './Divider';
import { DividerV4 } from './DividerV4';

const THEME = compileTheme(SEED_LIGHT);
const SPACE_KEYS: (keyof SpacingScale)[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

/** The row's 44 leading slot plus the slot-to-text gap (BRIEF §4.3/§4.4). */
const LEADING = 44 + THEME.spacing.md;

/** The flattened style of a rendered divider. */
function styleOf(ui: React.ReactElement): ViewStyle {
  const { getByTestId } = renderThemed(ui, SEED_LIGHT);
  return StyleSheet.flatten(getByTestId('rule').props.style) as ViewStyle;
}

describe('DividerV4 (native)', () => {
  it('is 1 unit of the border token and nothing else — §4.4', () => {
    const s = styleOf(<DividerV4 testID="rule" />);
    expect(s.height).toBe(1);
    expect(s.backgroundColor).toBe(THEME.light.border);
    // Never two weights, never a tinted rule.
    expect(s.borderWidth).toBeUndefined();
    expect(s.opacity).toBeUndefined();
  });

  it('draws on the right axis for both orientations', () => {
    const h = styleOf(<DividerV4 testID="rule" />);
    expect(h.height).toBe(1);
    expect(h.width).toBeUndefined();
    expect(h.alignSelf).toBe('stretch');

    const v = styleOf(<DividerV4 testID="rule" orientation="vertical" />);
    expect(v.width).toBe(1);
    expect(v.height).toBeUndefined();
    expect(v.alignSelf).toBe('stretch');
  });

  it('stays out of the accessibility tree, as the base does', () => {
    const { getByTestId } = renderThemed(<DividerV4 testID="rule" />, SEED_LIGHT);
    const el = getByTestId('rule');
    expect(el.props.accessible).toBe(false);
    expect(el.props.accessibilityRole).toBe('none');
  });

  it('EMPTY STATE — with no props at all it is one composed hairline, not a blank box', () => {
    const { toJSON } = renderThemed(<DividerV4 testID="rule" />, SEED_LIGHT);
    const tree = toJSON();
    expect(tree).not.toBeNull();
    expect((tree as { children: unknown }).children).toBeNull();
    const s = styleOf(<DividerV4 testID="rule" />);
    // Flush by default: no inset invented for a divider nobody insetted.
    expect(s.marginHorizontal).toBe(0);
    expect(s.marginLeft).toBeUndefined();
  });

  it('every SpaceKey inset stays symmetric on the cross axis — horizontal', () => {
    SPACE_KEYS.forEach((key) => {
      const s = styleOf(<DividerV4 testID="rule" inset={key} />);
      expect(s.marginHorizontal).toBe(THEME.spacing[key]);
      expect(s.marginLeft).toBeUndefined();
    });
  });

  it('every SpaceKey inset stays symmetric on the cross axis — vertical', () => {
    SPACE_KEYS.forEach((key) => {
      const s = styleOf(<DividerV4 testID="rule" orientation="vertical" inset={key} />);
      expect(s.marginVertical).toBe(THEME.spacing[key]);
      expect(s.marginTop).toBeUndefined();
    });
  });

  it('inset="leading" clears the 44 slot, composed as 44 + spacing.md — horizontal', () => {
    const s = styleOf(<DividerV4 testID="rule" inset="leading" />);
    expect(s.marginLeft).toBe(LEADING);
    expect(s.marginLeft).toBe(44 + THEME.spacing.md);
    // One end only: the rule aligns with the row title and still runs out to
    // the container edge.
    expect(s.marginHorizontal).toBe(0);
    expect(s.marginRight).toBeUndefined();
  });

  it('inset="leading" insets the leading end on a vertical rule too', () => {
    const s = styleOf(<DividerV4 testID="rule" orientation="vertical" inset="leading" />);
    expect(s.marginTop).toBe(LEADING);
    expect(s.marginVertical).toBe(0);
    expect(s.marginBottom).toBeUndefined();
    expect(s.width).toBe(1);
  });

  it('the gap half of the leading inset is a token, not a second literal', () => {
    // If someone retypes 16 the two halves can drift; composing means only 44
    // is ever written down.
    const s = styleOf(<DividerV4 testID="rule" inset="leading" />);
    const md = styleOf(<DividerV4 testID="rule" inset="md" />);
    expect((s.marginLeft as number) - (md.marginHorizontal as number)).toBe(44);
  });

  it('ADDITIVE — the default and every existing inset render exactly as the base does', () => {
    const base = (ui: React.ReactElement): ViewStyle => {
      const { getByTestId } = renderThemed(ui, SEED_LIGHT);
      return StyleSheet.flatten(getByTestId('rule').props.style) as ViewStyle;
    };

    expect(styleOf(<DividerV4 testID="rule" />)).toEqual(base(<Divider testID="rule" />));
    expect(styleOf(<DividerV4 testID="rule" orientation="vertical" />)).toEqual(
      base(<Divider testID="rule" orientation="vertical" />)
    );
    SPACE_KEYS.forEach((key) => {
      expect(styleOf(<DividerV4 testID="rule" inset={key} />)).toEqual(
        base(<Divider testID="rule" inset={key} />)
      );
      expect(styleOf(<DividerV4 testID="rule" orientation="vertical" inset={key} />)).toEqual(
        base(<Divider testID="rule" orientation="vertical" inset={key} />)
      );
    });
  });

  it('every colour it paints traces to a token — no literal hex', () => {
    const { root } = renderThemed(
      <DividerV4 testID="rule" inset="leading" />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    const used = renderedStyleHexes(root);
    expect(used.length).toBeGreaterThan(0);
    used.forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });

  it('accepts a style override and forwards the rest of the View props', () => {
    const { getByTestId } = renderThemed(
      <DividerV4 testID="rule" inset="leading" style={{ marginTop: 12 }} pointerEvents="none" />,
      SEED_LIGHT
    );
    const el = getByTestId('rule');
    const s = StyleSheet.flatten(el.props.style) as ViewStyle;
    expect(s.marginTop).toBe(12);
    expect(s.marginLeft).toBe(LEADING);
    expect(el.props.pointerEvents).toBe('none');
  });
});
