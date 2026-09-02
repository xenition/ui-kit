/** @jest-environment jsdom */
/**
 * The **V4 health line** (web) — the goal pass, and the finding this module
 * exists for: the card, the button and the meter reported three different
 * numbers for one walk.
 */
import * as React from 'react';
import { render } from '@testing-library/react';
import { goalParts, pluralizeUnit, rangeVerdict } from './goal-v4';
import { GoalCardV4 } from './GoalCardV4';
import { MoodPickerV4 } from './MoodPickerV4';
import { WaterTrackerV4 } from './WaterTrackerV4';

describe('goal-v4', () => {
  it('never rewrites the measurement to fit the goal', () => {
    // The finding. The base clamped `value` itself, so 12,400 steps against a
    // 10,000 target displayed 12400, announced "12400 of 10000, 100%" and
    // reported aria-valuenow={10000} — three readings of one walk.
    const over = goalParts(12400, 10000);
    expect(over.value).toBe(12400);
    expect(over.over).toBe(2400);
    expect(over.met).toBe(true);
    // The clamp survives, but only where it belongs: on what gets drawn.
    expect(over.ratio).toBe(1);
    expect(over.percent).toBe(100);
  });

  it('treats a goal of nought as no goal, not as nought per cent', () => {
    // `<SleepBar hours={7.5} goal={0} />` drew an EMPTY bar for a night that
    // was fully slept, and a ring with `goal: 0` announced "Move 0%" over 540
    // burned calories.
    const unset = goalParts(7.5, 0);
    expect(unset.hasGoal).toBe(false);
    expect(unset.ratio).toBeUndefined();
    expect(unset.percent).toBeUndefined();
    expect(unset.met).toBe(false);
    // The measurement is still real and still worth showing.
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
    // Native `MiniBar` rescales any max below 1 to 1, so a half-hour
    // meditation against a half-hour target drew a HALF-full bar directly
    // under the words "Goal met". Handing it this ratio removes the second
    // opinion.
    expect(goalParts(0.5, 0.5)).toMatchObject({ ratio: 1, percent: 100, met: true });
  });

  it('classifies a reading against its band, and admits when it cannot', () => {
    // Nothing in the module could say a value was out of range, so a fasting
    // glucose of 260 mg/dL rendered identically to 95.
    const band = { low: 70, high: 100 };
    expect(rangeVerdict(260, band)).toBe('high');
    expect(rangeVerdict(52, band)).toBe('low');
    expect(rangeVerdict(95, band)).toBe('in-range');
    // A one-sided band is still a band.
    expect(rangeVerdict(95, { high: 100 })).toBe('in-range');
    expect(rangeVerdict(101, { high: 100 })).toBe('high');
    // "We do not know" must stay distinct from "in range" so it never borrows
    // a status colour.
    expect(rangeVerdict(95, undefined)).toBeUndefined();
    expect(rangeVerdict(95, {})).toBeUndefined();
  });

  it('pluralises in the caller language, not only in English', () => {
    // The base appended 's' unconditionally, so `unit="día"` rendered "díass".
    expect(pluralizeUnit(1, 'day')).toBe('day');
    expect(pluralizeUnit(3, 'day')).toBe('days');
    expect(pluralizeUnit(3, 'día', 'días')).toBe('días');
    expect(pluralizeUnit(0, 'day')).toBe('days');
  });
});

describe('GoalCardV4 — the headline', () => {
  it('shows the measurement it was given, not the one that fits', () => {
    const { container } = render(
      <GoalCardV4 title="Steps" value={12400} target={10000} unit="steps" />
    );
    expect(container.textContent).toContain('12400');
  });

  it('exposes the meter as a meter, with a valid range', () => {
    const { container } = render(
      <GoalCardV4 title="Steps" value={8200} target={10000} unit="steps" />
    );
    const meter = container.querySelector('[role="progressbar"]');
    expect(meter).toBeTruthy();
    // aria-valuenow above aria-valuemax is invalid ARIA, so the drawn value is
    // the clamped one and the overshoot is carried in words.
    const now = Number(meter?.getAttribute('aria-valuenow'));
    const max = Number(meter?.getAttribute('aria-valuemax'));
    expect(now).toBeLessThanOrEqual(max);
  });

  it('keeps the meter reachable rather than pruning it inside the activation', () => {
    // The base put `role="progressbar"` inside the card's own `role="button"`,
    // which takes presentational children — so the 82% was announced to nobody.
    const { container } = render(
      <GoalCardV4 title="Steps" value={8200} target={10000} onPress={jest.fn()} />
    );
    const meter = container.querySelector('[role="progressbar"]');
    expect(meter).toBeTruthy();
    expect(meter?.closest('[role="button"]')).toBeNull();
    expect(meter?.closest('button')).toBeNull();
  });
});

describe('WaterTrackerV4', () => {
  it('does not destroy the overshoot', () => {
    // The base displayed "8 / 8 · 2000 ml" and announced "goal reached" for
    // someone who logged 10 glasses and 2500 ml.
    const { container } = render(<WaterTrackerV4 count={10} goal={8} mlPerGlass={250} />);
    expect(container.textContent).toContain('10');
  });
});

describe('MoodPickerV4', () => {
  it('can select the mood whose colour is the unselected treatment', () => {
    // "Okay" is `muted`, which IS the unselected ring and the unselected label
    // colour — so selecting it changed nothing, and with `showLabels={false}`
    // nothing distinguished it at all.
    const { getAllByRole } = render(<MoodPickerV4 value="okay" onChange={jest.fn()} />);
    const checked = getAllByRole('radio').filter(
      (r) => r.getAttribute('aria-checked') === 'true'
    );
    expect(checked).toHaveLength(1);
  });

  it('is one tab stop, not five', () => {
    // A radiogroup is a roving-tabindex widget: exactly one option is in the
    // tab order and the arrow keys move between them.
    const { getAllByRole } = render(<MoodPickerV4 value="okay" onChange={jest.fn()} />);
    const inOrder = getAllByRole('radio').filter((r) => r.getAttribute('tabindex') !== '-1');
    expect(inOrder).toHaveLength(1);
  });
});
