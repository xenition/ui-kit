/** @jest-environment jsdom */
/**
 * Web health blocks: render smoke (jsdom, plain expect), token-class purity (no
 * literal hex in className / inline paint), and the behavioral contracts
 * (WorkoutCard onStart + completed state, HabitRow / ExerciseRow toggle,
 * WaterTracker glass set + guard, ActivityRings a11y + empty, GoalCard met tone,
 * VitalStat variant defaults + onPress, MoodPicker onChange, StreakCounter zero
 * prompt, BodyMetricCard trend).
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import {
  WorkoutCard,
  HabitRow,
  StreakCounter,
  MetricRing,
  MealCard,
  WaterTracker,
  SleepBar,
  ActivityRings,
  GoalCard,
  VitalStat,
  ExerciseRow,
  MoodPicker,
  BodyMetricCard,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

describe('WorkoutCard (web)', () => {
  it('renders the title, tag, stat strip, and fires onStart', () => {
    const onStart = jest.fn();
    const { getByText } = render(
      <WorkoutCard title="Upper body push" variant="strength" durationMin={45} calories={320} onStart={onStart} />
    );
    expect(getByText('Upper body push')).toBeTruthy();
    expect(getByText('Strength')).toBeTruthy();
    expect(getByText('45 min')).toBeTruthy();
    // Accent tag class is a token class, not a literal color.
    expect(getByText('Strength').className).toContain('text-primary');
    fireEvent.click(getByText('Start'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('shows a completed state instead of the CTA and forwards its ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByText, queryByText } = render(
      <WorkoutCard ref={ref} title="Morning run" variant="running" completed onStart={() => {}} />
    );
    expect(getByText('✓ Completed')).toBeTruthy();
    expect(queryByText('Start')).toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
    expect(getByText('✓ Completed').className).toContain('text-success');
  });
});

describe('HabitRow (web)', () => {
  it('announces the streak and toggles via role=checkbox', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(
      <HabitRow name="Meditate" done={false} streak={5} meta="Daily" onToggle={onToggle} />
    );
    const box = getByRole('checkbox');
    expect(box.getAttribute('aria-label')).toMatch(/Meditate, not done, 5 day streak/);
    expect(box.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(box);
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('StreakCounter (web)', () => {
  it('renders the count in a token color and prompts when zero', () => {
    const { getByText } = render(<StreakCounter count={12} tone="warn" />);
    expect(getByText('12').className).toContain('text-warn');

    const zero = render(<StreakCounter count={0} />);
    expect(zero.getByText('Start your streak')).toBeTruthy();
  });
});

describe('MetricRing (web)', () => {
  it('mounts with an a11y label and degrades when goal is zero', () => {
    const { getByLabelText } = render(
      <MetricRing label="Move" value={320} goal={500} unit="kcal" color="danger" />
    );
    expect(getByLabelText(/Move: 320 of 500 kcal, 64%/)).toBeTruthy();

    const noGoal = render(<MetricRing label="Move" value={0} goal={0} />);
    expect(noGoal.getByText('No goal set')).toBeTruthy();
  });
});

describe('WaterTracker (web)', () => {
  it('sets the count from a tapped glass', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <WaterTracker count={2} goal={8} mlPerGlass={250} onChange={onChange} />
    );
    fireEvent.click(getByLabelText('Glass 5, empty'));
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('guards a non-positive goal', () => {
    const { getByText } = render(<WaterTracker count={0} goal={0} />);
    expect(getByText('No hydration goal set')).toBeTruthy();
  });
});

describe('ActivityRings (web)', () => {
  it('summarizes every ring in one a11y label with token-var paint only', () => {
    const { getByLabelText } = render(
      <ActivityRings
        rings={[
          { label: 'Move', value: 320, goal: 500, color: 'danger' },
          { label: 'Exercise', value: 30, goal: 30, color: 'success' },
        ]}
      />
    );
    const fig = getByLabelText(/Move 64%, Exercise 100%/);
    // Arc paint is a CSS var, never a hex literal.
    expect(fig.querySelector('circle')?.getAttribute('stroke')).toMatch(/var\(--xen-/);
    expect(fig.innerHTML).not.toMatch(HEX_LITERAL);
  });

  it('renders a No data note when empty', () => {
    const { getByText } = render(<ActivityRings rings={[]} />);
    expect(getByText('No data')).toBeTruthy();
  });
});

describe('GoalCard (web)', () => {
  it('flags a met goal in the success tone', () => {
    const { getByText, getByLabelText } = render(
      <GoalCard title="Steps" value={10000} target={8000} unit="steps" />
    );
    expect(getByText('✓ Goal met')).toBeTruthy();
    expect(getByLabelText(/Steps: 10000 of 8000 steps, 100%, goal met/)).toBeTruthy();
    expect(getByText('10000').className).toContain('text-success');
  });
});

describe('VitalStat (web)', () => {
  it('uses variant defaults and fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText, getByText } = render(<VitalStat variant="heart-rate" value={72} onPress={onPress} />);
    expect(getByText('bpm')).toBeTruthy();
    // Heart-rate accents in the danger token color.
    expect(getByText('72').className).toContain('text-danger');
    fireEvent.click(getByLabelText('Heart rate: 72 bpm'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('ExerciseRow (web)', () => {
  it('shows the prescription and toggles done', () => {
    const onToggle = jest.fn();
    const { getByText, getByRole } = render(
      <ExerciseRow name="Bench press" sets={4} reps={8} weight="60 kg" onToggle={onToggle} />
    );
    expect(getByText(/4 × 8/)).toBeTruthy();
    fireEvent.click(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('MoodPicker (web)', () => {
  it('fires onChange with the tapped mood', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<MoodPicker value="okay" onChange={onChange} />);
    fireEvent.click(getByLabelText('Great'));
    expect(onChange).toHaveBeenCalledWith('great');
  });
});

describe('MealCard / SleepBar / BodyMetricCard (web)', () => {
  it('renders meal macros, a sleep quality tag, and a body metric trend', () => {
    const meal = render(
      <MealCard name="Yogurt bowl" variant="breakfast" calories={320} macros={{ protein: 20, carbs: 40, fat: 8 }} />
    );
    expect(meal.getByText('Breakfast')).toBeTruthy();
    expect(meal.getByText(/Protein 20g/)).toBeTruthy();

    const sleep = render(<SleepBar hours={7.5} goal={8} quality="good" bedtime="11:20 PM" />);
    expect(sleep.getByText('Good')).toBeTruthy();
    expect(sleep.getByText('Good').className).toContain('text-primary');

    const body = render(
      <BodyMetricCard variant="weight" value={72.4} delta={-0.6} lowerIsBetter trend={[74, 73, 72.4]} />
    );
    expect(body.getByLabelText('Weight: 72.4 kg')).toBeTruthy();
    // A negative delta on a lower-is-better metric reads success.
    expect(body.getByText(/0.6 kg/).className).toContain('text-success');
  });
});
