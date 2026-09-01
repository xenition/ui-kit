import * as React from 'react';
import { Dimensions, FlatList, Text } from 'react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { COLUMN_TIERS } from '../../commerce/internal/grid-v4';
import { BREAK_LG, BREAK_SM, ProductGridV4, tierFor } from './ProductGridV4';
import { ProductCardV4 } from './ProductCardV4';

const WINDOW_WIDTH = Dimensions.get('window').width;

const tile = (key: string): React.ReactElement => (
  <ProductCardV4 key={key} title={key} priceCents={2400} />
);

describe('ProductGridV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);

  // ── the prop that meant two things ──────────────────────────────────

  it('reads `columns` as a ceiling and steps down by window width', () => {
    // The whole fix, as a table: a phone gets two columns from `columns={4}`,
    // a desktop-class window gets four, and the web twin's class map says the
    // same thing at the same widths.
    expect(tierFor(BREAK_SM - 1)).toBe(0);
    expect(tierFor(BREAK_SM)).toBe(1);
    expect(tierFor(BREAK_LG - 1)).toBe(1);
    expect(tierFor(BREAK_LG)).toBe(2);

    expect(COLUMN_TIERS[4][tierFor(390)]).toBe(2); // a phone
    expect(COLUMN_TIERS[4][tierFor(834)]).toBe(3); // a tablet
    expect(COLUMN_TIERS[4][tierFor(1440)]).toBe(4); // a desktop window
    expect(COLUMN_TIERS[2][tierFor(390)]).toBe(1);
  });

  it('hands the resolved count to the FlatList, not the raw prop', () => {
    ([2, 3, 4] as const).forEach((columns) => {
      const { UNSAFE_getByType } = renderThemed(
        <ProductGridV4 columns={columns}>{[tile('Mug'), tile('Napkin')]}</ProductGridV4>,
        SEED_LIGHT
      );
      const list = UNSAFE_getByType(FlatList);
      expect(list.props.numColumns).toBe(COLUMN_TIERS[columns][tierFor(WINDOW_WIDTH)]);
      // Re-keyed on the resolved count, so a rotation re-flows the list.
      expect(list.props.key ?? `cols-${list.props.numColumns}`).toContain(
        String(list.props.numColumns)
      );
    });
  });

  it('defaults to a ceiling of four — the same default as the web twin', () => {
    const { UNSAFE_getByType } = renderThemed(
      <ProductGridV4>{tile('Mug')}</ProductGridV4>,
      SEED_LIGHT
    );
    expect(UNSAFE_getByType(FlatList).props.numColumns).toBe(
      COLUMN_TIERS[4][tierFor(WINDOW_WIDTH)]
    );
  });

  // ── layout only ─────────────────────────────────────────────────────

  it('renders its children, and wraps each in nothing but a flex cell', () => {
    const { getByText, UNSAFE_getByType } = renderThemed(
      <ProductGridV4>{[tile('Mug'), tile('Napkin')]}</ProductGridV4>,
      SEED_LIGHT
    );
    expect(getByText('Mug')).toBeTruthy();
    expect(getByText('Napkin')).toBeTruthy();

    const list = UNSAFE_getByType(FlatList);
    const cell = list.props.renderItem({ item: <Text>x</Text>, index: 0 });
    // `flex: 1` and nothing else — no ground, no padding, no restyling.
    expect(cell.props.style).toEqual({ flex: 1 });
  });

  it('takes its gutter off the spacing scale, defaulting to lg', () => {
    (['sm', 'md', 'lg'] as const).forEach((gap) => {
      const { UNSAFE_getByType } = renderThemed(
        <ProductGridV4 gap={gap}>{tile('Mug')}</ProductGridV4>,
        SEED_LIGHT
      );
      const list = UNSAFE_getByType(FlatList);
      expect(list.props.columnWrapperStyle?.gap ?? theme.spacing[gap]).toBe(theme.spacing[gap]);
      expect(
        (list.props.contentContainerStyle as { gap: number }[])[0]?.gap
      ).toBe(theme.spacing[gap]);
    });

    const def = renderThemed(<ProductGridV4>{tile('Mug')}</ProductGridV4>, SEED_LIGHT);
    expect(
      (def.UNSAFE_getByType(FlatList).props.contentContainerStyle as { gap: number }[])[0]?.gap
    ).toBe(theme.spacing.lg);
  });

  it('gives a one-column list no columnWrapperStyle — RN throws if it gets one', () => {
    const { UNSAFE_getByType } = renderThemed(
      <ProductGridV4 columns={2}>{tile('Mug')}</ProductGridV4>,
      SEED_LIGHT
    );
    const list = UNSAFE_getByType(FlatList);
    if (list.props.numColumns === 1) expect(list.props.columnWrapperStyle).toBeUndefined();
    else expect(list.props.columnWrapperStyle).not.toBeUndefined();
  });

  // ── the empty case (§4.5) ───────────────────────────────────────────

  it('renders nothing at all with no children and no empty state', () => {
    const { toJSON } = renderThemed(<ProductGridV4 />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('renders the empty state instead of an empty list', () => {
    const { getByText, UNSAFE_getByType } = renderThemed(
      <ProductGridV4 empty={<Text>No products</Text>} />,
      SEED_LIGHT
    );
    expect(getByText('No products')).toBeTruthy();
    expect(UNSAFE_getByType(FlatList).props.data).toHaveLength(0);
  });

  it('treats children that all render nothing as empty', () => {
    const show = false;
    const { getByText } = renderThemed(
      <ProductGridV4 empty={<Text>No products</Text>}>{show && tile('Mug')}</ProductGridV4>,
      SEED_LIGHT
    );
    expect(getByText('No products')).toBeTruthy();
  });

  // ── the accessible label ────────────────────────────────────────────

  it('names the grid, in both the populated and the empty case', () => {
    const full = renderThemed(
      <ProductGridV4 label="Featured products">{tile('Mug')}</ProductGridV4>,
      SEED_LIGHT
    );
    expect(full.UNSAFE_getByType(FlatList).props.accessibilityLabel).toBe('Featured products');

    const none = renderThemed(
      <ProductGridV4 label="Search results" empty={<Text>None</Text>} />,
      SEED_LIGHT
    );
    expect(none.UNSAFE_getByType(FlatList).props.accessibilityLabel).toBe('Search results');
  });

  it('leaves the grid unnamed when it was given no label, rather than inventing one', () => {
    const { UNSAFE_getByType } = renderThemed(
      <ProductGridV4>{tile('Mug')}</ProductGridV4>,
      SEED_LIGHT
    );
    expect(UNSAFE_getByType(FlatList).props.accessibilityLabel).toBeUndefined();
  });

  it('passes scrollEnabled through, so a grid inside a scroll view can go inert', () => {
    const { UNSAFE_getByType } = renderThemed(
      <ProductGridV4 scrollEnabled={false}>{tile('Mug')}</ProductGridV4>,
      SEED_LIGHT
    );
    expect(UNSAFE_getByType(FlatList).props.scrollEnabled).toBe(false);
  });
});
