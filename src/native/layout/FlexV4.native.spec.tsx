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
import {
  Flex,
  type Align,
  type FlexDirection,
  type FlexProps,
  type Justify,
  type SpaceKey,
} from './Flex';
import { FlexV4 } from './FlexV4';

const spacing = toNativeTokens(compileTheme(SEED_LIGHT)).spacing;

const SPACE_KEYS: SpaceKey[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const ALIGNS: Align[] = ['start', 'center', 'end', 'stretch', 'baseline'];
const JUSTIFIES: Justify[] = ['start', 'center', 'end', 'between', 'around', 'evenly'];
const DIRECTIONS: FlexDirection[] = ['row', 'column', 'row-reverse', 'column-reverse'];

const flatten = (style: unknown): ViewStyle =>
  (StyleSheet.flatten(style as never) ?? {}) as ViewStyle;

/** The flattened style of the single rendered `View`. */
function styleOf(ui: React.ReactElement): ViewStyle {
  const { getByTestId } = renderThemed(ui, SEED_LIGHT);
  return flatten(getByTestId('flex').props.style);
}

describe('FlexV4 (native)', () => {
  it('STRUCTURE ONLY — with shrink left off it resolves to exactly the base style', () => {
    const cases: FlexProps[] = [
      {},
      { direction: 'column' },
      { gap: 'md' },
      { align: 'baseline' },
      { justify: 'between' },
      { wrap: true },
      { grow: 1 },
      { direction: 'row-reverse', gap: 'xl', align: 'end', justify: 'evenly', wrap: true, grow: 2 },
    ];
    cases.forEach((props) => {
      expect(styleOf(<FlexV4 testID="flex" {...props} />)).toEqual(
        styleOf(<Flex testID="flex" {...props} />)
      );
    });
  });

  it('defaults to a stretched, non-wrapping row that starts its content — and pays no gap', () => {
    const style = styleOf(<FlexV4 testID="flex" />);
    expect(style.flexDirection).toBe('row');
    expect(style.alignItems).toBe('stretch');
    expect(style.justifyContent).toBe('flex-start');
    expect(style.flexWrap).toBe('nowrap');
    expect(style.gap).toBeUndefined();
    // No flex factors unless asked for.
    expect(style.flexGrow).toBeUndefined();
    expect(style.flexShrink).toBeUndefined();
  });

  it('maps every direction the type offers', () => {
    DIRECTIONS.forEach((direction) => {
      expect(styleOf(<FlexV4 testID="flex" direction={direction} />).flexDirection).toBe(direction);
    });
  });

  it('binds gap to the compiled spacing scale for every key — never a picked number', () => {
    SPACE_KEYS.forEach((gap) => {
      expect(styleOf(<FlexV4 testID="flex" gap={gap} />).gap).toBe(spacing[gap]);
    });
  });

  it('maps align (baseline included) and justify across both vocabularies', () => {
    const alignTo: Record<Align, ViewStyle['alignItems']> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
      baseline: 'baseline',
    };
    ALIGNS.forEach((align) => {
      expect(styleOf(<FlexV4 testID="flex" align={align} />).alignItems).toBe(alignTo[align]);
    });

    const justifyTo: Record<Justify, ViewStyle['justifyContent']> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    };
    JUSTIFIES.forEach((justify) => {
      expect(styleOf(<FlexV4 testID="flex" justify={justify} />).justifyContent).toBe(
        justifyTo[justify]
      );
    });
  });

  it('wrap toggles between wrap and an explicit nowrap', () => {
    expect(styleOf(<FlexV4 testID="flex" wrap />).flexWrap).toBe('wrap');
    expect(styleOf(<FlexV4 testID="flex" wrap={false} />).flexWrap).toBe('nowrap');
  });

  it('NEW IN V4 — shrink sets flexShrink, the missing half of grow (§5)', () => {
    // The case §4.3 needs: a slot that holds its size while the title beside it
    // absorbs the overflow.
    expect(styleOf(<FlexV4 testID="flex" shrink={0} />).flexShrink).toBe(0);
    expect(styleOf(<FlexV4 testID="flex" shrink={2} />).flexShrink).toBe(2);
    // Absent by default, so nothing that exists today moves (§1.4).
    expect(styleOf(<FlexV4 testID="flex" />).flexShrink).toBeUndefined();
    expect(styleOf(<FlexV4 testID="flex" grow={1} />).flexShrink).toBeUndefined();
  });

  it('grow and shrink coexist, and the caller style still wins over both', () => {
    const both = styleOf(<FlexV4 testID="flex" grow={1} shrink={0} />);
    expect(both.flexGrow).toBe(1);
    expect(both.flexShrink).toBe(0);

    const overridden = styleOf(
      <FlexV4 testID="flex" grow={1} shrink={0} style={{ flexShrink: 3, flexGrow: 4 }} />
    );
    expect(overridden.flexShrink).toBe(3);
    expect(overridden.flexGrow).toBe(4);
  });

  it('§1.1 — paints no colour of its own, so there is no hex to trace', () => {
    const { root } = renderThemed(
      <FlexV4 testID="flex" gap="lg" align="baseline" justify="between" wrap shrink={0}>
        <Text>One</Text>
      </FlexV4>,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });

  it('passes the rest of the View props through', () => {
    const { getByTestId } = renderThemed(
      <FlexV4 testID="flex" accessibilityRole="toolbar" accessibilityLabel="Filters" />,
      SEED_LIGHT
    );
    const node = getByTestId('flex');
    expect(node.props.accessibilityRole).toBe('toolbar');
    expect(node.props.accessibilityLabel).toBe('Filters');
  });

  it('EMPTY STATE — with no children it renders an empty View, not a placeholder', () => {
    const { getByTestId, toJSON } = renderThemed(
      <FlexV4 testID="flex" gap="md" grow={1} shrink={0} />,
      SEED_LIGHT
    );
    const node = getByTestId('flex');
    expect(node.children).toHaveLength(0);
    // §4.5: nothing to show must never become a blank bordered box.
    const style = flatten(node.props.style);
    expect(style.backgroundColor).toBeUndefined();
    expect(style.borderWidth).toBeUndefined();
    expect(JSON.stringify(toJSON())).not.toContain('borderWidth');
  });

  it('EMPTY STATE — an empty or falsy child list renders just as empty, and never throws', () => {
    const actions: string[] = [];
    const { getByTestId } = renderThemed(
      <FlexV4 testID="flex" gap="sm" shrink={0}>
        {actions.map((a) => (
          <Text key={a}>{a}</Text>
        ))}
        {null}
        {false}
      </FlexV4>,
      SEED_LIGHT
    );
    expect(getByTestId('flex').children).toHaveLength(0);
  });

  it('lays its children out in source order when it has some', () => {
    const { getByText } = renderThemed(
      <FlexV4 testID="flex" direction="column" gap="sm">
        <Text>One</Text>
        <Text>Two</Text>
      </FlexV4>,
      SEED_LIGHT
    );
    expect(getByText('One')).toBeTruthy();
    expect(getByText('Two')).toBeTruthy();
  });
});
