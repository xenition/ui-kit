import * as React from 'react';
import { StyleSheet, Text, type ViewStyle } from 'react-native';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { Row, type Align, type Justify, type RowProps, type SpaceKey } from './Row';
import { RowV4 } from './RowV4';

const spacing = toNativeTokens(compileTheme(SEED_LIGHT)).spacing;

const SPACE_KEYS: SpaceKey[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const ALIGNS: Align[] = ['start', 'center', 'end', 'stretch', 'baseline'];
const JUSTIFIES: Justify[] = ['start', 'center', 'end', 'between', 'around', 'evenly'];

const flatten = (style: unknown): ViewStyle =>
  (StyleSheet.flatten(style as never) ?? {}) as ViewStyle;

/** The flattened style of the single rendered `View`. */
function styleOf(ui: React.ReactElement): ViewStyle {
  const { getByTestId } = renderThemed(ui, SEED_LIGHT);
  return flatten(getByTestId('row').props.style);
}

describe('RowV4 (native)', () => {
  it('STRUCTURE ONLY — resolves to exactly the base style, for every prop it takes', () => {
    // §5 marks Row "structure only, no visual change". Asserted against the
    // base rather than promised in a comment.
    const cases: RowProps[] = [
      {},
      { gap: 'md' },
      { align: 'baseline' },
      { justify: 'between' },
      { wrap: true },
      { gap: '2xl', align: 'start', justify: 'evenly', wrap: true },
    ];
    cases.forEach((props) => {
      expect(styleOf(<RowV4 testID="row" {...props} />)).toEqual(
        styleOf(<Row testID="row" {...props} />)
      );
    });
  });

  it('defaults to a centred, non-wrapping row that starts its content — and pays no gap', () => {
    const style = styleOf(<RowV4 testID="row" />);
    expect(style.flexDirection).toBe('row');
    expect(style.alignItems).toBe('center');
    expect(style.justifyContent).toBe('flex-start');
    expect(style.flexWrap).toBe('nowrap');
    // §5: gap stays undefined by default — §4.1's rhythm is the caller's.
    expect(style.gap).toBeUndefined();
  });

  it('binds gap to the compiled spacing scale for every key — never a picked number', () => {
    SPACE_KEYS.forEach((gap) => {
      expect(styleOf(<RowV4 testID="row" gap={gap} />).gap).toBe(spacing[gap]);
    });
  });

  it('maps align — baseline included, because a row is where baseline means something', () => {
    const expected: Record<Align, ViewStyle['alignItems']> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
      baseline: 'baseline',
    };
    ALIGNS.forEach((align) => {
      expect(styleOf(<RowV4 testID="row" align={align} />).alignItems).toBe(expected[align]);
    });
  });

  it('maps justify across the whole distribution vocabulary', () => {
    const expected: Record<Justify, ViewStyle['justifyContent']> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    };
    JUSTIFIES.forEach((justify) => {
      expect(styleOf(<RowV4 testID="row" justify={justify} />).justifyContent).toBe(
        expected[justify]
      );
    });
  });

  it('wrap toggles between wrap and an explicit nowrap', () => {
    expect(styleOf(<RowV4 testID="row" wrap />).flexWrap).toBe('wrap');
    expect(styleOf(<RowV4 testID="row" wrap={false} />).flexWrap).toBe('nowrap');
  });

  it('applies the caller style last, exactly as the base does', () => {
    const style = styleOf(<RowV4 testID="row" align="center" style={{ alignItems: 'flex-end' }} />);
    expect(style.alignItems).toBe('flex-end');
    expect(style.flexDirection).toBe('row');
  });

  it('§1.1 — paints no colour of its own, so there is no hex to trace', () => {
    const { root } = renderThemed(
      <RowV4 testID="row" gap="lg" align="baseline" justify="between" wrap>
        <Text>Left</Text>
      </RowV4>,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    // A layout primitive is transparent by design; whatever hex the tree does
    // carry must still trace to a token.
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });

  it('passes the rest of the View props through', () => {
    const { getByTestId } = renderThemed(
      <RowV4 testID="row" accessibilityRole="toolbar" accessibilityLabel="Actions" />,
      SEED_LIGHT
    );
    const node = getByTestId('row');
    expect(node.props.accessibilityRole).toBe('toolbar');
    expect(node.props.accessibilityLabel).toBe('Actions');
  });

  it('EMPTY STATE — with no children it renders an empty View, not a placeholder', () => {
    const { getByTestId, toJSON } = renderThemed(<RowV4 testID="row" gap="md" />, SEED_LIGHT);
    const node = getByTestId('row');
    expect(node.children).toHaveLength(0);
    // §4.5: nothing to show must never become a blank bordered box.
    const style = flatten(node.props.style);
    expect(style.backgroundColor).toBeUndefined();
    expect(style.borderWidth).toBeUndefined();
    expect(JSON.stringify(toJSON())).not.toContain('borderWidth');
  });

  it('EMPTY STATE — an empty or falsy child list renders just as empty, and never throws', () => {
    const items: string[] = [];
    const { getByTestId } = renderThemed(
      <RowV4 testID="row" gap="sm">
        {items.map((i) => (
          <Text key={i}>{i}</Text>
        ))}
        {null}
        {false}
      </RowV4>,
      SEED_LIGHT
    );
    expect(getByTestId('row').children).toHaveLength(0);
  });

  it('lays its children out in source order when it has some', () => {
    const { getByText } = renderThemed(
      <RowV4 testID="row" gap="sm">
        <Text>Left</Text>
        <Text>Right</Text>
      </RowV4>,
      SEED_LIGHT
    );
    expect(getByText('Left')).toBeTruthy();
    expect(getByText('Right')).toBeTruthy();
  });
});
