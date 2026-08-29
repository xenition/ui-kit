import * as React from 'react';
import { StyleSheet, Text as RNText, View, type ViewStyle } from 'react-native';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import type { SpacingScale } from '../../theme/types';
import { ListSeparator } from './ListSeparator';
import { ListSeparatorV4 } from './ListSeparatorV4';

const THEME = compileTheme(SEED_LIGHT);
const SPACE_KEYS: (keyof SpacingScale)[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

/** The row's 44 leading slot plus the slot-to-text gap (BRIEF §4.3/§4.4). */
const LEADING = 44 + THEME.spacing.md;

/** The flattened style of a rendered separator. */
function styleOf(ui: React.ReactElement): ViewStyle {
  const { getByTestId } = renderThemed(ui, SEED_LIGHT);
  return StyleSheet.flatten(getByTestId('sep').props.style) as ViewStyle;
}

describe('ListSeparatorV4 (native)', () => {
  it('is 1 unit of the border token and nothing else — §4.4', () => {
    const s = styleOf(<ListSeparatorV4 testID="sep" />);
    expect(s.height).toBe(1);
    expect(s.backgroundColor).toBe(THEME.light.border);
    // Never two weights, never a tinted rule.
    expect(s.borderWidth).toBeUndefined();
    expect(s.opacity).toBeUndefined();
  });

  it('stays out of the accessibility tree — the rows carry the list structure', () => {
    const { getByTestId } = renderThemed(<ListSeparatorV4 testID="sep" />, SEED_LIGHT);
    const el = getByTestId('sep');
    expect(el.props.accessible).toBe(false);
    expect(el.props.accessibilityRole).toBe('none');
  });

  it('EMPTY STATE — with no props at all it is one composed hairline, not a blank box', () => {
    const { toJSON } = renderThemed(<ListSeparatorV4 testID="sep" />, SEED_LIGHT);
    const tree = toJSON();
    expect(tree).not.toBeNull();
    expect((tree as { children: unknown }).children).toBeNull();
    // Flush by default: no inset invented for rows that have no leading slot.
    expect(styleOf(<ListSeparatorV4 testID="sep" />).marginLeft).toBe(0);
  });

  it('EMPTY STATE — as an ItemSeparatorComponent, zero or one row draws no rule', () => {
    const list = (items: string[]): ReturnType<typeof renderThemed> =>
      renderThemed(
        <View>
          {items.map((item, i) => (
            <React.Fragment key={item}>
              {i > 0 ? <ListSeparatorV4 testID="sep" inset="leading" /> : null}
              <RNText>{item}</RNText>
            </React.Fragment>
          ))}
        </View>,
        SEED_LIGHT
      );

    expect(list([]).queryAllByTestId('sep')).toHaveLength(0);
    expect(list(['only']).queryAllByTestId('sep')).toHaveLength(0);
    expect(list(['a', 'b']).queryAllByTestId('sep')).toHaveLength(1);
    expect(list(['a', 'b', 'c']).queryAllByTestId('sep')).toHaveLength(2);
  });

  it('every SpaceKey inset is a leading inset off the token scale', () => {
    SPACE_KEYS.forEach((key) => {
      const s = styleOf(<ListSeparatorV4 testID="sep" inset={key} />);
      expect(s.marginLeft).toBe(THEME.spacing[key]);
      // Leading end only — the rule still runs out to the container edge.
      expect(s.marginRight).toBeUndefined();
      expect(s.marginHorizontal).toBeUndefined();
    });
  });

  it('inset="leading" clears the 44 slot, composed as 44 + spacing.md', () => {
    const s = styleOf(<ListSeparatorV4 testID="sep" inset="leading" />);
    expect(s.marginLeft).toBe(LEADING);
    expect(s.marginLeft).toBe(44 + THEME.spacing.md);
    expect(s.marginRight).toBeUndefined();
    expect(s.height).toBe(1);
  });

  it('the gap half of the leading inset is a token, not a second literal', () => {
    // If someone retypes 16 the two halves can drift; composing means only 44
    // is ever written down.
    const leading = styleOf(<ListSeparatorV4 testID="sep" inset="leading" />);
    const md = styleOf(<ListSeparatorV4 testID="sep" inset="md" />);
    expect((leading.marginLeft as number) - (md.marginLeft as number)).toBe(44);
  });

  it('ADDITIVE — the default and every existing inset render exactly as the base does', () => {
    const base = (ui: React.ReactElement): ViewStyle => {
      const { getByTestId } = renderThemed(ui, SEED_LIGHT);
      return StyleSheet.flatten(getByTestId('sep').props.style) as ViewStyle;
    };

    expect(styleOf(<ListSeparatorV4 testID="sep" />)).toEqual(base(<ListSeparator testID="sep" />));
    SPACE_KEYS.forEach((key) => {
      expect(styleOf(<ListSeparatorV4 testID="sep" inset={key} />)).toEqual(
        base(<ListSeparator testID="sep" inset={key} />)
      );
    });
  });

  it('every colour it paints traces to a token — no literal hex', () => {
    const { root } = renderThemed(<ListSeparatorV4 testID="sep" inset="leading" />, SEED_LIGHT);
    const allowed = tokenHexSet(SEED_LIGHT);
    const used = renderedStyleHexes(root);
    expect(used.length).toBeGreaterThan(0);
    used.forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });

  it('accepts a style override and forwards the rest of the View props', () => {
    const { getByTestId } = renderThemed(
      <ListSeparatorV4 testID="sep" inset="leading" style={{ marginTop: 12 }} pointerEvents="none" />,
      SEED_LIGHT
    );
    const el = getByTestId('sep');
    const s = StyleSheet.flatten(el.props.style) as ViewStyle;
    expect(s.marginTop).toBe(12);
    expect(s.marginLeft).toBe(LEADING);
    expect(el.props.pointerEvents).toBe('none');
  });
});
