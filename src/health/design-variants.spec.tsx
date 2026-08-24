/** @jest-environment jsdom */
/**
 * Web health V2/V3 alternate designs: render smoke, token-class purity (no
 * literal hex in the rendered markup), and one key interaction / state per
 * variant. Drop-in parity with the base props — plain `expect`, no jest-dom.
 */
import { fireEvent, render } from '@testing-library/react';
import {
  GoalCardV2,
  GoalCardV3,
  HabitRowV2,
  HabitRowV3,
  MealCardV2,
  MealCardV3,
  WorkoutCardV2,
  WorkoutCardV3,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

describe('GoalCard variants (web)', () => {
  it('V2 renders the ring hero, met tone, and fires onPress', () => {
    const onPress = jest.fn();
    const { container, getByText, getByRole } = render(
      <GoalCardV2 title="Weekly steps" value={70000} target={70000} unit="steps" onPress={onPress} />
    );
    expect(getByText('✓ Goal met')).toBeTruthy();
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders the value-first line with a trailing percent', () => {
    const { container, getByText } = render(
      <GoalCardV3 title="Water" value={5} target={8} unit="glasses" />
    );
    expect(getByText('63%')).toBeTruthy();
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });
});

describe('HabitRow variants (web)', () => {
  it('V2 renders the tile, streak chip, and toggles via role=checkbox', () => {
    const onToggle = jest.fn();
    const { container, getByRole } = render(
      <HabitRowV2 name="Meditate" done={false} streak={4} onToggle={onToggle} />
    );
    const box = getByRole('checkbox');
    expect(box.getAttribute('aria-checked')).toBe('false');
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
    fireEvent.click(box);
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('V3 renders the minimal line with week dots and toggles', () => {
    const onToggle = jest.fn();
    const { container, getByRole } = render(
      <HabitRowV3 name="Stretch" done meta="Daily" streak={3} onToggle={onToggle} />
    );
    expect(getByRole('checkbox').getAttribute('aria-checked')).toBe('true');
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });
});

describe('MealCard variants (web)', () => {
  it('V2 renders the image hero, tag, calories chip, and fires onPress', () => {
    const onPress = jest.fn();
    const { container, getByText, getByRole } = render(
      <MealCardV2 name="Greek yogurt bowl" variant="breakfast" calories={320} macros={{ protein: 20 }} onPress={onPress} />
    );
    expect(getByText('Breakfast')).toBeTruthy();
    expect(getByText('320 kcal')).toBeTruthy();
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders the dense macro-bar line with counts', () => {
    const { container, getByText } = render(
      <MealCardV3 name="Chicken salad" variant="lunch" calories={450} macros={{ protein: 40, carbs: 20, fat: 15 }} />
    );
    expect(getByText('Protein 40g')).toBeTruthy();
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });
});

describe('WorkoutCard variants (web)', () => {
  it('V2 renders the hero, stat pair, and fires the start FAB', () => {
    const onStart = jest.fn();
    const { container, getByText, getByLabelText } = render(
      <WorkoutCardV2 title="Upper body push" variant="strength" durationMin={45} calories={320} onStart={onStart} />
    );
    expect(getByText('Strength')).toBeTruthy();
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Start Upper body push'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('V3 renders the compact row and shows a completed check instead of the CTA', () => {
    const { container, queryByText } = render(
      <WorkoutCardV3 title="Morning run" variant="running" durationMin={30} completed onStart={() => {}} />
    );
    expect(queryByText('Start')).toBeNull();
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });
});
