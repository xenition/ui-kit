import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import {
  WorkoutCardV2,
  WorkoutCardV3,
  HabitRowV2,
  HabitRowV3,
  MealCardV2,
  MealCardV3,
  GoalCardV2,
  GoalCardV3,
} from './index';

/** Render every V2/V3 health variant once, in both seeds. */
function AllVariants(): React.ReactElement {
  return (
    <>
      <WorkoutCardV2 title="Upper body push" variant="strength" durationMin={45} calories={320} description="Focus: chest" onStart={() => {}} />
      <WorkoutCardV2 title="Morning run" variant="running" completed onStart={() => {}} />
      <WorkoutCardV3 title="Intervals" variant="hiit" durationMin={20} calories={260} onStart={() => {}} />
      <WorkoutCardV3 title="Evening swim" variant="swimming" completed />

      <HabitRowV2 name="Meditate" done streak={5} meta="Daily" onToggle={() => {}} />
      <HabitRowV2 name="Read" done={false} onToggle={() => {}} />
      <HabitRowV3 name="Drink water" done={false} streak={3} meta="8 glasses" onToggle={() => {}} />
      <HabitRowV3 name="Stretch" done streak={12} onToggle={() => {}} />

      <MealCardV2 name="Greek yogurt bowl" variant="breakfast" calories={320} macros={{ protein: 20, carbs: 40, fat: 8 }} time="8:30 AM" onPress={() => {}} />
      <MealCardV2 name="Almonds" variant="snack" />
      <MealCardV3 name="Chicken salad" variant="lunch" calories={410} macros={{ protein: 35, carbs: 18, fat: 22 }} onPress={() => {}} />
      <MealCardV3 name="Apple" variant="snack" time="3:00 PM" />

      <GoalCardV2 title="Weekly steps" value={9200} target={8000} unit="steps" onPress={() => {}} />
      <GoalCardV2 title="Water" value={3} target={0} unit="L" />
      <GoalCardV3 title="Distance" value={4} target={10} unit="km" onPress={() => {}} />
      <GoalCardV3 title="Active minutes" value={0} target={0} unit="min" />
    </>
  );
}

describe('health design variants (native) — mount', () => {
  it('renders every V2/V3 variant in the light seed', () => {
    const { getByText, getByLabelText } = renderThemed(<AllVariants />, SEED_LIGHT);
    expect(getByText('Upper body push')).toBeTruthy();
    expect(getByText('Intervals')).toBeTruthy();
    expect(getByText('Greek yogurt bowl')).toBeTruthy();
    expect(getByText('Chicken salad')).toBeTruthy();
    expect(getByLabelText(/Weekly steps: 9200 of 8000 steps, 100%, goal met/)).toBeTruthy();
    expect(getByLabelText(/Distance: 4 of 10 km, 40%/)).toBeTruthy();
  });
});

describe('health design variants (native) — token purity (both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(<AllVariants />, seed);
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});

describe('health design variants (native) — interaction', () => {
  it('HabitRowV2 toggles done on tap', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <HabitRowV2 name="Meditate" done={false} streak={5} meta="Daily" onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Meditate, not done, 5 day streak/));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('GoalCardV2 fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <GoalCardV2 title="Steps" value={4000} target={8000} unit="steps" onPress={onPress} />,
      SEED_DARK
    );
    const node = getByLabelText(/Steps: 4000 of 8000 steps, 50%/);
    fireEvent(node, 'pressIn');
    fireEvent.press(node);
    fireEvent(node, 'pressOut');
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
