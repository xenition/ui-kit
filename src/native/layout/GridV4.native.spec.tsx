import * as React from 'react';
import { Text } from 'react-native';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { flatStyle, type FlatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { Grid } from './Grid';
import { GridV4, type GridV4Props } from './GridV4';

const THEME = compileTheme(SEED_LIGHT);

const CELLS = [<Text key="a">a</Text>, <Text key="b">b</Text>, <Text key="c">c</Text>];

function grid(props: GridV4Props = {}, children: React.ReactNode = CELLS) {
  const { getByTestId, root } = renderThemed(
    <GridV4 testID="g" {...props}>
      {children}
    </GridV4>,
    SEED_LIGHT
  );
  const node = getByTestId('g');
  return {
    root,
    node,
    style: flatStyle(node.props.style),
    cells: node.children.map((c) =>
      flatStyle((c as { props?: { style?: unknown } }).props?.style)
    ) as FlatStyle[],
  };
}

describe('GridV4 (native)', () => {
  it('is additive: the base props still render the base layout', () => {
    const v4 = grid({ columns: 3, gap: 'lg' });
    const { getByTestId } = renderThemed(
      <Grid testID="base" columns={3} gap="lg">
        {CELLS}
      </Grid>,
      SEED_LIGHT
    );
    const base = flatStyle(getByTestId('base').props.style);
    expect(v4.style.flexDirection).toBe(base.flexDirection);
    expect(v4.style.flexWrap).toBe(base.flexWrap);
    expect(v4.style.marginHorizontal).toBe(base.marginHorizontal);
    expect(v4.style.marginVertical).toBe(base.marginVertical);
  });

  it('defaults to two equal cells — §3’s "two per row, never four"', () => {
    const { cells } = grid();
    expect(cells).toHaveLength(3);
    cells.forEach((cell) => expect(cell.width).toBe('50%'));
  });

  it('splits the token gutter between the container and its cells', () => {
    // §4.1's grid gutter is `md` (16): half cancelled on the container, half
    // paid by every cell, so the outer edge stays flush with the page gutter.
    const { style, cells } = grid();
    const half = THEME.spacing.md / 2;
    expect(style.marginHorizontal).toBe(-half);
    expect(style.marginVertical).toBe(-half);
    cells.forEach((cell) => {
      expect(cell.paddingHorizontal).toBe(half);
      expect(cell.paddingVertical).toBe(half);
    });
  });

  it('takes any step of the spacing scale for the gutter', () => {
    expect(grid({ gap: 'xs' }).style.marginHorizontal).toBe(-THEME.spacing.xs / 2);
    expect(grid({ gap: '2xl' }).cells[0].paddingHorizontal).toBe(THEME.spacing['2xl'] / 2);
  });

  it('divides the row evenly for any column count', () => {
    expect(grid({ columns: 3 }).cells[0].width).toBe(`${100 / 3}%`);
    expect(grid({ columns: 4 }).cells[0].width).toBe('25%');
  });

  it('never emits an invalid cell width', () => {
    // Zero columns would make the width `Infinity%`; a negative count would
    // make it negative. Neither renders, and neither warns.
    expect(grid({ columns: 0 }).cells[0].width).toBe('100%');
    expect(grid({ columns: -3 }).cells[0].width).toBe('100%');
    expect(grid({ columns: 2.7 }).cells[0].width).toBe('50%');
  });

  it('accepts minItemWidth and degrades to `columns` — the documented divergence', () => {
    // React Native has no CSS grid and no container queries: there is no
    // `auto-fit`/`minmax()` to reach for, and measuring the container with
    // `onLayout` to derive a column count would re-render the grid on every
    // layout pass. So the prop is accepted for parity and this twin renders
    // its `columns` tracks exactly as it would without it. The web twin turns
    // it into `repeat(auto-fit, minmax(<n>px, 1fr))`.
    const withProp = grid({ columns: 2, minItemWidth: 240 });
    const without = grid({ columns: 2 });
    expect(withProp.cells[0].width).toBe(without.cells[0].width);
    expect(withProp.style).toEqual(without.style);
  });

  it('never leaks minItemWidth onto the underlying View', () => {
    // Destructured, not spread — an unknown prop on a host component is a
    // React warning on native and a stray DOM attribute on web.
    const { node } = grid({ minItemWidth: 240 });
    expect(node.props.minItemWidth).toBeUndefined();
  });

  it('survives its empty case: no cells, and no dent left in the page', () => {
    // §4.5 — never a blank box. The base applied its negative margins even with
    // nothing to gutter, so an empty grid pulled its siblings a half gutter
    // closer on every side. With no cells there is no gutter to cancel.
    const { node, style } = grid({}, null);
    expect(node.children).toHaveLength(0);
    expect(style.marginHorizontal).toBeUndefined();
    expect(style.marginVertical).toBeUndefined();
    // And it still paints nothing at all.
    expect(style.backgroundColor).toBeUndefined();
    expect(style.borderWidth).toBeUndefined();
    expect(style.borderRadius).toBeUndefined();
  });

  it('carries no depth of its own — §4.6, never a shadow inside a shadow', () => {
    const { style } = grid();
    expect(style.shadowOpacity).toBeUndefined();
    expect(style.elevation).toBeUndefined();
  });

  it('renders its children, in order', () => {
    const { getByText } = renderThemed(<GridV4>{CELLS}</GridV4>, SEED_LIGHT);
    expect(getByText('a')).toBeTruthy();
    expect(getByText('c')).toBeTruthy();
  });

  it('keeps prop parity with the web twin — same names, same defaults', () => {
    const props: GridV4Props = { columns: 2, gap: 'md', minItemWidth: 240 };
    expect(props.columns).toBe(2);
  });

  it('lets a caller’s style merge over the computed container style', () => {
    expect(grid({ style: { marginHorizontal: 0 } }).style.marginHorizontal).toBe(0);
  });

  it('paints no colour at all, so every hex it could show traces to a token', () => {
    const { root } = grid({ columns: 2, gap: 'lg', minItemWidth: 200 });
    const tokens = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(tokens.has(hex)).toBe(true));
  });
});
