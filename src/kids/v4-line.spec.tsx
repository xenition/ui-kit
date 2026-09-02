/** @jest-environment jsdom */
/**
 * The **V4 kids line** (web) — the family pass, and the two findings this
 * module exists for: a child's conduct drawn in the error colour, and a
 * measurement clamped where only the drawing should have been.
 */
import * as React from 'react';
import { render } from '@testing-library/react';
import { meterParts, needsExplanation, nextAward, starParts } from './family-v4';
import { ScreenTimeBarV4 } from './ScreenTimeBarV4';

describe('family-v4', () => {
  it('never rewrites the measurement to fit the limit', () => {
    // `<ScreenTimeBar used={180} limit={120} />` drew a full bar and announced
    // valuenow=180 against valuemax=120 — an invalid range.
    const over = meterParts(180, 120);
    expect(over.value).toBe(180);
    expect(over.over).toBe(60);
    expect(over.reached).toBe(true);
    // The clamp survives only where it belongs: on what gets drawn.
    expect(over.ratio).toBe(1);
    expect(over.percent).toBe(100);
  });

  it('keeps a broken reading distinct from a real nought', () => {
    // `used={-30}` rendered "0 min / 2h - 2h left" as though the data were
    // sound, laundering a broken sync into a plausible reading.
    const negative = meterParts(-30, 120);
    expect(negative.value).toBe(-30);
    expect(negative.ratio).toBe(0);

    // `used={NaN}` reached the screen as "NaNh NaNm" and a CSS width of "NaN%".
    const broken = meterParts(Number.NaN, 120);
    expect(broken.valid).toBe(false);
    expect(Number.isNaN(broken.value)).toBe(false);
  });

  it('treats no limit as no limit, and still keeps the reading', () => {
    // `limit={0}` threw the reading away entirely: the parent was told "No
    // screen-time limit set" and never told the child had been on the device
    // four hours.
    const unset = meterParts(240, 0);
    expect(unset.hasLimit).toBe(false);
    expect(unset.ratio).toBeUndefined();
    expect(unset.value).toBe(240);
    expect(unset.valid).toBe(true);

    expect(meterParts(240, undefined).hasLimit).toBe(false);
    expect(meterParts(240, Number.NaN).hasLimit).toBe(false);
  });

  it('reads an ordinary allowance', () => {
    expect(meterParts(90, 120)).toMatchObject({
      value: 90,
      limit: 120,
      ratio: 0.75,
      percent: 75,
      over: 0,
      remaining: 30,
      reached: false,
      hasLimit: true,
      valid: true,
    });
  });

  it('never takes a star away on an award', () => {
    // The worst bug in the module: `RewardStarV2` computed
    // `filled >= total ? 1 : filled + 1`, so a parent at five of five who
    // tapped once more silently dropped the child to ONE star, with no undo.
    expect(nextAward(5, 5)).toBeUndefined();
    expect(nextAward(4, 5)).toBe(5);
    expect(nextAward(0, 5)).toBe(1);
    // A scale of zero is not an invitation to award against nothing.
    expect(nextAward(0, 0)).toBeUndefined();
  });

  it('reports an out-of-range star count instead of laundering it', () => {
    // `<RewardStar value={9} max={5} />` drew and announced "5 of 5 stars"
    // with no hint the caller was out of range.
    expect(starParts(9, 5)).toMatchObject({ filled: 5, max: 5, outOfRange: true });
    expect(starParts(-2, 5)).toMatchObject({ filled: 0, outOfRange: true });
    expect(starParts(3, 5)).toMatchObject({ filled: 3, outOfRange: false, hasScale: true });
    expect(starParts(0, 0).hasScale).toBe(false);
  });

  it('knows which states owe a neutral explanation', () => {
    // Note: an explanation, not a reprimand. Nothing in this module draws a
    // child's conduct in the error colour.
    expect(needsExplanation('skipped')).toBe(true);
    expect(needsExplanation('missed')).toBe(true);
    expect(needsExplanation('delayed')).toBe(true);
    expect(needsExplanation('done')).toBe(false);
    expect(needsExplanation('todo')).toBe(false);
  });
});

describe('ScreenTimeBarV4 — the headline', () => {
  it('still shows the reading when no limit is set', () => {
    const { container } = render(<ScreenTimeBarV4 used={240} limit={0} />);
    // The four hours must survive. The base replaced them with an empty state.
    expect(container.textContent).toMatch(/4h|240/);
  });

  it('never announces a value past its own maximum', () => {
    const { container } = render(<ScreenTimeBarV4 used={180} limit={120} />);
    const meter = container.querySelector('[role="progressbar"]');
    expect(meter).toBeTruthy();
    const now = Number(meter?.getAttribute('aria-valuenow'));
    const max = Number(meter?.getAttribute('aria-valuemax'));
    expect(now).toBeLessThanOrEqual(max);
  });

  it('does not render NaN', () => {
    const { container } = render(<ScreenTimeBarV4 used={Number.NaN} limit={120} />);
    expect(container.textContent ?? '').not.toContain('NaN');
  });
});
