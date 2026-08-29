import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { formatMoney } from './money';
import { PriceTagV4 } from './PriceTagV4';

function flat(style: unknown): Record<string, unknown> {
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

function texts(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAll((n) => typeof n.type === 'string' && n.type === 'Text');
}

describe('PriceTagV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);

  it('formats every amount through formatMoney, never by hand', () => {
    const { getByText } = renderThemed(
      <PriceTagV4 cents={120450} compareAtCents={150000} />,
      SEED_LIGHT
    );
    expect(getByText(formatMoney(120450))).toBeTruthy();
    expect(getByText(formatMoney(150000))).toBeTruthy();
  });

  it('honours a formatMoney override', () => {
    const { getByText } = renderThemed(
      <PriceTagV4 cents={1200} formatMoney={(c, cur) => `${cur} ${c}`} currency="EUR" />,
      SEED_LIGHT
    );
    expect(getByText('EUR 1200')).toBeTruthy();
  });

  it('sets both figures in tabular numerals so a column of prices lines up', () => {
    const { root } = renderThemed(
      <PriceTagV4 cents={999} compareAtCents={1111} />,
      SEED_LIGHT
    );
    texts(root).forEach((t) => {
      expect(flat(t.props.style).fontVariant).toEqual(['tabular-nums']);
    });
  });

  it('wears the display face — the base left native on the body face', () => {
    const dark = compileTheme(SEED_DARK);
    const { getByText } = renderThemed(<PriceTagV4 cents={1200} />, SEED_DARK);
    const style = flat(getByText(formatMoney(1200)).props.style);
    expect(style.fontFamily).toBe(dark.typography.fontHeading);
    expect(style.fontFamily).not.toBe(dark.typography.fontBody);
    expect(style.fontWeight).toBe('700');
  });

  it('sits both figures on one baseline', () => {
    const { root } = renderThemed(
      <PriceTagV4 cents={1400} compareAtCents={2000} />,
      SEED_LIGHT
    );
    const wrap = flat(root.findAll((n) => n.props?.style !== undefined)[0]?.props?.style);
    expect(wrap.alignItems).toBe('baseline');
  });

  it('steps the price up and keeps the struck price one step under it', () => {
    const expected = [
      ['sm', theme.typography.scale.base, theme.typography.scale.xs],
      ['md', theme.typography.scale.lg, theme.typography.scale.sm],
      ['lg', theme.typography.scale['2xl'], theme.typography.scale.base],
    ] as const;
    expected.forEach(([size, priceSize, wasSize]) => {
      const { getByText } = renderThemed(
        <PriceTagV4 cents={1400} compareAtCents={2000} size={size} />,
        SEED_LIGHT
      );
      expect(flat(getByText(formatMoney(1400)).props.style).fontSize).toBe(priceSize);
      expect(flat(getByText(formatMoney(2000)).props.style).fontSize).toBe(wasSize);
      expect(wasSize).toBeLessThan(priceSize);
    });
  });

  it('announces the struck price instead of leaving two bare numbers', () => {
    const { getByText } = renderThemed(
      <PriceTagV4 cents={1400} compareAtCents={2000} />,
      SEED_LIGHT
    );
    const struck = getByText(formatMoney(2000));
    expect(struck.props.accessibilityLabel).toBe(`Was ${formatMoney(2000)}`);
    expect(flat(struck.props.style).textDecorationLine).toBe('line-through');
  });

  it('does not paint a discounted price in the danger tone — §35.4', () => {
    const { getByText } = renderThemed(
      <PriceTagV4 cents={1400} compareAtCents={2000} />,
      SEED_LIGHT
    );
    const style = flat(getByText(formatMoney(1400)).props.style);
    expect(style.color).toBe(theme.light.onSurface);
    expect(style.color).not.toBe(theme.light.danger);
    expect(style.color).not.toBe(theme.light.dangerText);
  });

  it('draws no discount badge and no container — §7, §11', () => {
    const { root, queryByText } = renderThemed(
      <PriceTagV4 cents={1400} compareAtCents={2000} />,
      SEED_LIGHT
    );
    expect(texts(root)).toHaveLength(2);
    expect(queryByText(/%/)).toBeNull();
    root
      .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
      .map((n) => flat(n.props.style))
      .forEach((s) => {
        expect(s.borderWidth).toBeUndefined();
        expect(s.backgroundColor).toBeUndefined();
        expect(s.shadowOpacity).toBeUndefined();
      });
  });

  it('hides the compare-at when it is not actually higher', () => {
    const { root } = renderThemed(
      <PriceTagV4 cents={2000} compareAtCents={2000} />,
      SEED_LIGHT
    );
    expect(texts(root)).toHaveLength(1);
  });
});
