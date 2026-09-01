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
import { Column, type Align, type ColumnProps, type Justify, type SpaceKey } from './Column';
import { ColumnV4 } from './ColumnV4';

const spacing = toNativeTokens(compileTheme(SEED_LIGHT)).spacing;

const SPACE_KEYS: SpaceKey[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const ALIGNS: Align[] = ['start', 'center', 'end', 'stretch'];
const JUSTIFIES: Justify[] = ['start', 'center', 'end', 'between', 'around', 'evenly'];

const flatten = (style: unknown): ViewStyle =>
  (StyleSheet.flatten(style as never) ?? {}) as ViewStyle;

/** The flattened style of the single rendered `View`. */
function styleOf(ui: React.ReactElement): ViewStyle {
  const { getByTestId } = renderThemed(ui, SEED_LIGHT);
  return flatten(getByTestId('col').props.style);
}

describe('ColumnV4 (native)', () => {
  it('STRUCTURE ONLY — resolves to exactly the base style, for every prop it takes', () => {
    const cases: ColumnProps[] = [
      {},
      { gap: 'md' },
      { align: 'center' },
      { justify: 'between' },
      { gap: 'xl', align: 'end', justify: 'evenly' },
    ];
    cases.forEach((props) => {
      expect(styleOf(<ColumnV4 testID="col" {...props} />)).toEqual(
        styleOf(<Column testID="col" {...props} />)
      );
    });
  });

  it('defaults to a stretched column that starts its content — and pays no gap', () => {
    const style = styleOf(<ColumnV4 testID="col" />);
    expect(style.flexDirection).toBe('column');
    expect(style.alignItems).toBe('stretch');
    expect(style.justifyContent).toBe('flex-start');
    // §5: gap stays undefined by default — §4.1's rhythm is the caller's.
    expect(style.gap).toBeUndefined();
  });

  it('binds gap to the compiled spacing scale for every key — never a picked number', () => {
    SPACE_KEYS.forEach((gap) => {
      expect(styleOf(<ColumnV4 testID="col" gap={gap} />).gap).toBe(spacing[gap]);
    });
  });

  it('maps align across the narrowed vocabulary — no baseline on a column', () => {
    const expected: Record<Align, ViewStyle['alignItems']> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
    };
    ALIGNS.forEach((align) => {
      expect(styleOf(<ColumnV4 testID="col" align={align} />).alignItems).toBe(expected[align]);
    });
    // §5's parity fix, at runtime as well as in the type: `baseline` is not a
    // value this twin knows, so it maps to nothing rather than quietly working
    // on one platform and not the other. (The type rejects it at build time;
    // native specs are not type-checked, hence the cast.)
    const rogue = styleOf(<ColumnV4 testID="col" align={'baseline' as Align} />);
    expect(rogue.alignItems).toBeUndefined();
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
      expect(styleOf(<ColumnV4 testID="col" justify={justify} />).justifyContent).toBe(
        expected[justify]
      );
    });
  });

  it('applies the caller style last, exactly as the base does', () => {
    const style = styleOf(<ColumnV4 testID="col" style={{ alignItems: 'flex-end' }} />);
    expect(style.alignItems).toBe('flex-end');
    expect(style.flexDirection).toBe('column');
  });

  it('§1.1 — paints no colour of its own, so there is no hex to trace', () => {
    const { root } = renderThemed(
      <ColumnV4 testID="col" gap="lg" align="center" justify="between">
        <Text>Title</Text>
      </ColumnV4>,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });

  it('passes the rest of the View props through', () => {
    const { getByTestId } = renderThemed(
      <ColumnV4 testID="col" accessibilityRole="list" accessibilityLabel="Steps" />,
      SEED_LIGHT
    );
    const node = getByTestId('col');
    expect(node.props.accessibilityRole).toBe('list');
    expect(node.props.accessibilityLabel).toBe('Steps');
  });

  it('EMPTY STATE — with no children it renders an empty View, not a placeholder', () => {
    const { getByTestId, toJSON } = renderThemed(<ColumnV4 testID="col" gap="md" />, SEED_LIGHT);
    const node = getByTestId('col');
    expect(node.children).toHaveLength(0);
    // §4.5: nothing to show must never become a blank bordered box.
    const style = flatten(node.props.style);
    expect(style.backgroundColor).toBeUndefined();
    expect(style.borderWidth).toBeUndefined();
    expect(JSON.stringify(toJSON())).not.toContain('borderWidth');
  });

  it('EMPTY STATE — an empty or falsy child list renders just as empty, and never throws', () => {
    const steps: string[] = [];
    const { getByTestId } = renderThemed(
      <ColumnV4 testID="col" gap="lg">
        {steps.map((s) => (
          <Text key={s}>{s}</Text>
        ))}
        {null}
        {false}
      </ColumnV4>,
      SEED_LIGHT
    );
    expect(getByTestId('col').children).toHaveLength(0);
  });

  it('stacks its children in source order when it has some', () => {
    const { getByText } = renderThemed(
      <ColumnV4 testID="col" gap="xs">
        <Text>Title</Text>
        <Text>Supporting</Text>
      </ColumnV4>,
      SEED_LIGHT
    );
    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Supporting')).toBeTruthy();
  });
});
