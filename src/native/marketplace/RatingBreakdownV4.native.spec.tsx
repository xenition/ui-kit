import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { RatingBreakdownV4 } from './RatingBreakdownV4';

const LIGHT = compileTheme(SEED_LIGHT).light;

/** Flatten a possibly-nested RN `style` into one object. */
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

const fillsOf = (root: ReactTestInstance): unknown[] =>
  root.findAll((n) => n.props?.style !== undefined).map((n) => flat(n.props.style).backgroundColor);

/** 4 × 1★, 2 × 2★, 6 × 3★, 20 × 4★, 68 × 5★ = 100 ratings. */
const COUNTS = [4, 2, 6, 20, 68];

describe('RatingBreakdownV4 (native)', () => {
  // ── it composes the chart rather than drawing bars ─────────────────

  it('is a `ProgressBarsV4`, not five hand-rolled views', () => {
    const { getAllByTestId } = renderThemed(<RatingBreakdownV4 counts={COUNTS} />, SEED_LIGHT);
    expect(getAllByTestId('progress-fill')).toHaveLength(5);
  });

  it('reads 5★ first and names every row in words', () => {
    const { getByText } = renderThemed(<RatingBreakdownV4 counts={COUNTS} />, SEED_LIGHT);
    expect(getByText('5 stars')).toBeTruthy();
    expect(getByText('1 star')).toBeTruthy();
  });

  // ── rule 6: a number AND stars AND a count ─────────────────────────

  it('summarises as a number, as stars, and as a count', () => {
    const { getByText, getByLabelText } = renderThemed(
      <RatingBreakdownV4 counts={COUNTS} />,
      SEED_LIGHT
    );
    // 4*1 + 2*2 + 6*3 + 20*4 + 68*5 = 446 / 100 = 4.46 → "4.5"
    expect(getByText('4.5')).toBeTruthy();
    expect(getByLabelText('4.46 out of 5 stars')).toBeTruthy();
    expect(getByText('100 ratings')).toBeTruthy();
  });

  it('accepts the `{1..5}` map shape as well as the array', () => {
    const { getByText } = renderThemed(<RatingBreakdownV4 counts={{ 5: 3, 4: 1 }} />, SEED_LIGHT);
    expect(getByText('4 ratings')).toBeTruthy();
  });

  it('a supplied `average` wins over the derived one', () => {
    const { getByText } = renderThemed(
      <RatingBreakdownV4 counts={COUNTS} average={3.2} />,
      SEED_LIGHT
    );
    expect(getByText('3.2')).toBeTruthy();
  });

  it('`hideSummary` drops the header and keeps the bars', () => {
    const { queryByTestId, getAllByTestId } = renderThemed(
      <RatingBreakdownV4 counts={COUNTS} hideSummary />,
      SEED_LIGHT
    );
    expect(queryByTestId('xen-v4-rating-summary')).toBeNull();
    expect(getAllByTestId('progress-fill')).toHaveLength(5);
  });

  // ── the new props ──────────────────────────────────────────────────

  it('`framed` (default) paints the `card` ground; `framed={false}` paints nothing', () => {
    const framed = renderThemed(<RatingBreakdownV4 counts={COUNTS} />, SEED_LIGHT);
    expect(fillsOf(framed.UNSAFE_root)).toContain(LIGHT.card);

    const bare = renderThemed(<RatingBreakdownV4 counts={COUNTS} framed={false} />, SEED_LIGHT);
    expect(fillsOf(bare.UNSAFE_root)).not.toContain(LIGHT.card);
  });

  it('`raised` is off by default — this block is almost never the on-page card (§4.6)', () => {
    const shadowsOf = (root: ReactTestInstance): unknown[] =>
      root.findAll((n) => n.props?.style !== undefined).map((n) => flat(n.props.style).shadowOpacity);
    const off = renderThemed(<RatingBreakdownV4 counts={COUNTS} />, SEED_LIGHT);
    const on = renderThemed(<RatingBreakdownV4 counts={COUNTS} raised />, SEED_LIGHT);
    expect(shadowsOf(off.UNSAFE_root).some((s) => typeof s === 'number')).toBe(false);
    expect(shadowsOf(on.UNSAFE_root).some((s) => typeof s === 'number')).toBe(true);
  });

  it('`loading` shows the chart’s placeholder instead of the bars', () => {
    const { queryAllByTestId } = renderThemed(
      <RatingBreakdownV4 counts={COUNTS} loading />,
      SEED_LIGHT
    );
    expect(queryAllByTestId('progress-fill')).toHaveLength(0);
  });

  // ── the empty case ─────────────────────────────────────────────────

  it('with no ratings it says so instead of claiming a 0.0 average', () => {
    const { getByText, queryByText, queryAllByTestId } = renderThemed(
      <RatingBreakdownV4 counts={[]} />,
      SEED_LIGHT
    );
    expect(getByText('No ratings yet')).toBeTruthy();
    expect(queryByText('0.0')).toBeNull();
    expect(queryAllByTestId('progress-fill')).toHaveLength(0);
  });

  it('`emptyLabel` is the caller’s words', () => {
    const { getByText } = renderThemed(
      <RatingBreakdownV4 counts={{}} emptyLabel="Nobody has reviewed this seller" />,
      SEED_LIGHT
    );
    expect(getByText('Nobody has reviewed this seller')).toBeTruthy();
  });

  it('an average with no histogram behind it is still printed', () => {
    const { getByText, getAllByText } = renderThemed(
      <RatingBreakdownV4 counts={[]} average={4.9} />,
      SEED_LIGHT
    );
    expect(getByText('4.9')).toBeTruthy();
    // Twice: once as the summary's count line, once as the chart's empty
    // state. Both are true, and neither invents a histogram.
    expect(getAllByText('No ratings yet')).toHaveLength(2);
  });

  it('never divides by zero', () => {
    expect(() => renderThemed(<RatingBreakdownV4 counts={[0, 0, 0, 0, 0]} />, SEED_LIGHT)).not.toThrow();
  });
});
