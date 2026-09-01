/**
 * The **V4 food line** (native) — the twin of `food/v4-line.spec.tsx`. The
 * order pass is the same pure module, so the stage, diet and window findings
 * are pinned once and hold on both sides.
 */
import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import {
  deliveryWindow,
  DIET_TONE,
  ORDER_STAGES,
  stageIndex,
  stepQuantity,
} from '../../food/order-v4';
import { DishCardV4 } from './DishCardV4';
import { NutritionBadgeV4 } from './NutritionBadgeV4';

describe('order-v4', () => {
  it('spells the stages the way the component does', () => {
    // An earlier draft of this file invented 'on-the-way', so stageIndex()
    // returned undefined for every ordinary order and the tracker rendered
    // its unknown state always. Both twins wrote a local alias around it,
    // which is how it was found.
    expect(ORDER_STAGES).toEqual(['placed', 'preparing', 'out-for-delivery', 'delivered']);
    expect(stageIndex('out-for-delivery')).toBe(2);
  });

  it('refuses to guess at an unknown status', () => {
    // The base used Math.max(0, indexOf(status)), which maps a -1 miss onto
    // stage 1 — so a typo rendered a confident, wrong "Order placed".
    expect(stageIndex('nonsense')).toBeUndefined();
    expect(stageIndex('')).toBeUndefined();
  });

  it('keeps a dietary marker out of the status palette', () => {
    // Vegan is not a success and spicy is not a failure. A menu row of these
    // read as a row of alerts.
    expect(DIET_TONE.vegan).toBe('neutral');
    expect(DIET_TONE.halal).toBe('neutral');
    expect(DIET_TONE.spicy).not.toBe('danger');
  });

  it('bounds a quantity step', () => {
    expect(stepQuantity(1, -1)).toBe(0);
    expect(stepQuantity(0, -1)).toBe(0);
    expect(stepQuantity(3, 1, 0, 3)).toBe(3);
    expect(stepQuantity(Number.NaN, 1, 2)).toBe(3);
  });

  it('reads a transposed delivery window the sensible way round', () => {
    // The base tested max > min and silently dropped the max otherwise, so
    // min=35 max=20 rendered "35 min" — a transposed pair read as a
    // confident single figure.
    expect(deliveryWindow(20, 35)).toBe('20–35 min');
    expect(deliveryWindow(35, 20)).toBe('20–35 min');
    expect(deliveryWindow(30, 30)).toBe('30 min');
    expect(deliveryWindow(30, undefined)).toBe('30 min');
  });
});

describe('DishCardV4 — the allergen finding', () => {
  it('leaves the badge reachable outside the card\'s accessible leaf', () => {
    // A Pressable is `accessible` by default, so the card was a leaf on iOS
    // and every badge inside it was unreachable.
    const { getByText } = renderThemed(
      <DishCardV4
        name="Pad Thai"
        priceCents={1250}
        onPress={jest.fn()}
        badges={<NutritionBadgeV4 kind="vegan" />}
      />,
      SEED_LIGHT
    );
    expect(getByText(/vegan/i)).toBeTruthy();
  });

  it('does not wire a sold-out dish to anything', () => {
    // Asserted as a contract rather than by pressing. RNTL's `fireEvent.press`
    // resolves a handler off ANY ancestor's props — including the composite
    // element's own — so it reports a call even when no `Pressable` is wired
    // to it, and a press-based assertion here would pass whether or not the
    // fix existed. What the fix actually does is render a plain `View`:
    // no button role, and `disabled` in the state.
    const { getByLabelText } = renderThemed(
      <DishCardV4 name="Pad Thai" soldOut onPress={jest.fn()} />,
      SEED_LIGHT
    );
    const card = getByLabelText(/Pad Thai/);
    expect(card.props.accessibilityRole).toBeUndefined();
    expect(card.props.accessibilityState).toMatchObject({ disabled: true });
  });
});
