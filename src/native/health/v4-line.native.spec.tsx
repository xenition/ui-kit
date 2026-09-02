/**
 * The **V4 health line** (native) — the twin of `health/v4-line.spec.tsx`. The
 * goal pass is the same pure module, so the overshoot, the no-goal branch and
 * the fractional-target finding are pinned once and hold on both sides.
 */
import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { goalParts, pluralizeUnit, rangeVerdict } from '../../health/goal-v4';
import { GoalCardV4 } from './GoalCardV4';
import { MoodPickerV4 } from './MoodPickerV4';

describe('goal-v4', () => {
  it('never rewrites the measurement to fit the goal', () => {
    // The finding. The base clamped `value` itself, so 12,400 steps against a
    // 10,000 target displayed 12400, announced "12400 of 10000, 100%" and
    // reported a meter value of 10000 — three readings of one walk.
    const over = goalParts(12400, 10000);
    expect(over.value).toBe(12400);
    expect(over.over).toBe(2400);
    expect(over.met).toBe(true);
    expect(over.ratio).toBe(1);
    expect(over.percent).toBe(100);
  });

  it('treats a goal of nought as no goal, not as nought per cent', () => {
    const unset = goalParts(7.5, 0);
    expect(unset.hasGoal).toBe(false);
    expect(unset.ratio).toBeUndefined();
    expect(unset.percent).toBeUndefined();
    expect(unset.value).toBe(7.5);

    expect(goalParts(5, undefined).hasGoal).toBe(false);
    expect(goalParts(5, Number.NaN).hasGoal).toBe(false);
    expect(goalParts(5, -10).hasGoal).toBe(false);
  });

  it('reads an ordinary goal', () => {
    expect(goalParts(8200, 10000)).toMatchObject({
      value: 8200,
      target: 10000,
      ratio: 0.82,
      percent: 82,
      met: false,
      over: 0,
      hasGoal: true,
    });
  });

  it('survives the inputs an API sends when it is having a bad day', () => {
    expect(goalParts(Number.NaN, 100).value).toBe(0);
    expect(goalParts(-40, 100).ratio).toBe(0);
    expect(goalParts(Number.POSITIVE_INFINITY, 100).value).toBe(0);
  });

  it('gives a fractional target a full bar when it is met', () => {
    // This is the native-specific finding: `MiniBar` rescales any max below 1
    // to 1, so a half-hour meditation against a half-hour target drew a
    // HALF-full bar directly under the words "Goal met". V4 hands it this
    // ratio against 1, so there is one opinion instead of two.
    expect(goalParts(0.5, 0.5)).toMatchObject({ ratio: 1, percent: 100, met: true });
  });

  it('classifies a reading against its band, and admits when it cannot', () => {
    const band = { low: 70, high: 100 };
    expect(rangeVerdict(260, band)).toBe('high');
    expect(rangeVerdict(52, band)).toBe('low');
    expect(rangeVerdict(95, band)).toBe('in-range');
    expect(rangeVerdict(95, { high: 100 })).toBe('in-range');
    expect(rangeVerdict(101, { high: 100 })).toBe('high');
    expect(rangeVerdict(95, undefined)).toBeUndefined();
    expect(rangeVerdict(95, {})).toBeUndefined();
  });

  it('pluralises in the caller language, not only in English', () => {
    expect(pluralizeUnit(1, 'day')).toBe('day');
    expect(pluralizeUnit(3, 'day')).toBe('days');
    expect(pluralizeUnit(3, 'día', 'días')).toBe('días');
  });
});

describe('GoalCardV4 — the headline', () => {
  it('exposes the meter as a meter rather than as an image', () => {
    // `MiniBar` and `ProgressRing` hard-code `accessibilityRole="image"`, so
    // every ring and bar in this module drew a percentage that was announced
    // to nobody. V4 states the value itself.
    //
    // The two twins put the same information in different places, which is
    // allowed and is worth writing down: the native meter carries the
    // percentage and the card's own name carries the reading in its units,
    // where the web twin puts both on the meter via `aria-valuetext`. What
    // must hold on both is that the meter has a coherent value at all.
    const { getAllByRole } = renderThemed(
      <GoalCardV4 title="Steps" value={8200} target={10000} unit="steps" />,
      SEED_LIGHT
    );
    const meters = getAllByRole('progressbar');
    expect(meters.length).toBeGreaterThan(0);
    const value = meters[0]?.props.accessibilityValue;
    expect(value).toBeDefined();
    expect(value.now).toBe(82);
    expect(value.now).toBeLessThanOrEqual(value.max);
  });

  it('does not lose the units the percentage was computed from', () => {
    // A meter that announces only "82%" has thrown away the steps. The card's
    // own name is where native keeps them.
    const { getByLabelText } = renderThemed(
      <GoalCardV4 title="Steps" value={8200} target={10000} unit="steps" />,
      SEED_LIGHT
    );
    expect(getByLabelText(/8200/)).toBeTruthy();
    expect(getByLabelText(/10000/)).toBeTruthy();
  });

  it('keeps the card a plain View so the meter is not flattened away', () => {
    // A `Pressable` is `accessible` by default and collapses its whole
    // subtree, so with `onPress` set the meter was unreachable.
    const { getAllByRole } = renderThemed(
      <GoalCardV4 title="Steps" value={8200} target={10000} onPress={jest.fn()} />,
      SEED_LIGHT
    );
    expect(getAllByRole('progressbar').length).toBeGreaterThan(0);
  });
});

describe('MoodPickerV4', () => {
  it('announces the selected mood as checked, which is what a radio carries', () => {
    // The base set `accessibilityState={{ selected }}` on an
    // `accessibilityRole="radio"`. A radio's state is `checked`, so the web
    // twin announced checked and the native twin announced nothing — and
    // "Okay", whose colour IS the unselected treatment, showed no change at
    // all when picked.
    const { getAllByRole } = renderThemed(
      <MoodPickerV4 value="okay" onChange={jest.fn()} />,
      SEED_LIGHT
    );
    const checked = getAllByRole('radio').filter(
      (node) => node.props.accessibilityState?.checked === true
    );
    expect(checked).toHaveLength(1);
  });
});
