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

describe('WorkoutCard (native)', () => {
  it('renders the title, tag, and fires onStart', () => {
    const onStart = jest.fn();
    const { getByText } = renderThemed(
      <WorkoutCard title="Upper body push" variant="strength" durationMin={45} calories={320} onStart={onStart} />,
      SEED_LIGHT
    );
    expect(getByText('Upper body push')).toBeTruthy();
    expect(getByText('Strength')).toBeTruthy();
    expect(getByText('45 min')).toBeTruthy();
    fireEvent.press(getByText('Start'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('shows a completed state instead of the CTA', () => {
    const { getByText, queryByText } = renderThemed(
      <WorkoutCard title="Morning run" variant="running" completed onStart={() => {}} />,
      SEED_DARK
    );
    expect(getByText('✓ Completed')).toBeTruthy();
    expect(queryByText('Start')).toBeNull();
  });
});

describe('HabitRow (native)', () => {
  it('announces streak and toggles', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <HabitRow name="Meditate" done={false} streak={5} meta="Daily" onToggle={onToggle} />,
      SEED_LIGHT
    );
    const node = getByLabelText(/Meditate, not done, 5 day streak/);
    fireEvent.press(node);
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('StreakCounter (native)', () => {
  it('renders the count in a token color and prompts when zero', () => {
    const { getByText, root } = renderThemed(<StreakCounter count={12} tone="warn" />, SEED_LIGHT);
    const number = getByText('12');
    const allowed = tokenHexSet(SEED_LIGHT);
    const color = (number.props.style as { color?: string }).color?.toLowerCase();
    expect(color && allowed.has(color)).toBe(true);
    void root;

    const zero = renderThemed(<StreakCounter count={0} />, SEED_DARK);
    expect(zero.getByText('Start your streak')).toBeTruthy();
  });
});

describe('MetricRing (native)', () => {
  it('mounts with an a11y label and degrades when goal is zero', () => {
    const { getByLabelText } = renderThemed(
      <MetricRing label="Move" value={320} goal={500} unit="kcal" color="danger" />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Move: 320 of 500 kcal, 64%/)).toBeTruthy();

    const noGoal = renderThemed(<MetricRing label="Move" value={0} goal={0} />, SEED_DARK);
    expect(noGoal.getByText('No goal set')).toBeTruthy();
  });
});

describe('WaterTracker (native)', () => {
  it('sets the count from a tapped glass', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <WaterTracker count={2} goal={8} mlPerGlass={250} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Glass 5, empty'));
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('guards a non-positive goal', () => {
    const { getByText } = renderThemed(<WaterTracker count={0} goal={0} />, SEED_DARK);
    expect(getByText('No hydration goal set')).toBeTruthy();
  });
});

describe('ActivityRings (native)', () => {
  it('summarizes every ring in one a11y label', () => {
    const { getByLabelText } = renderThemed(
      <ActivityRings
        rings={[
          { label: 'Move', value: 320, goal: 500, color: 'danger' },
          { label: 'Exercise', value: 30, goal: 30, color: 'success' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Move 64%, Exercise 100%/)).toBeTruthy();
  });

  it('renders a No data note when empty', () => {
    const { getByText } = renderThemed(<ActivityRings rings={[]} />, SEED_DARK);
    expect(getByText('No data')).toBeTruthy();
  });
});

describe('GoalCard (native)', () => {
  it('flags a met goal in the success tone', () => {
    const { getByText, getByLabelText } = renderThemed(
      <GoalCard title="Steps" value={10000} target={8000} unit="steps" />,
      SEED_LIGHT
    );
    expect(getByText('✓ Goal met')).toBeTruthy();
    const label = getByLabelText(/Steps: 10000 of 8000 steps, 100%, goal met/);
    const allowed = tokenHexSet(SEED_LIGHT);
    const value = getByText('10000');
    const color = (value.props.style as { color?: string }).color?.toLowerCase();
    expect(color && allowed.has(color)).toBe(true);
    void label;
  });
});

describe('VitalStat (native)', () => {
  it('uses variant defaults and fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <VitalStat variant="heart-rate" value={72} onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('bpm')).toBeTruthy();
    fireEvent.press(getByLabelText('Heart rate: 72 bpm'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('ExerciseRow (native)', () => {
  it('shows the prescription and toggles done', () => {
    const onToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ExerciseRow name="Bench press" sets={4} reps={8} weight="60 kg" onToggle={onToggle} />,
      SEED_LIGHT
    );
    expect(getByText(/4 × 8/)).toBeTruthy();
    fireEvent.press(getByLabelText(/Bench press.*not done/));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('MoodPicker (native)', () => {
  it('fires onChange with the tapped mood', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(<MoodPicker value="okay" onChange={onChange} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Great'));
    expect(onChange).toHaveBeenCalledWith('great');
  });
});

describe('MealCard / SleepBar / BodyMetricCard (native)', () => {
  it('renders meal macros, a sleep quality tag, and a body metric trend', () => {
    const meal = renderThemed(
      <MealCard name="Yogurt bowl" variant="breakfast" calories={320} macros={{ protein: 20, carbs: 40, fat: 8 }} />,
      SEED_LIGHT
    );
    expect(meal.getByText('Breakfast')).toBeTruthy();
    expect(meal.getByText(/Protein 20g/)).toBeTruthy();

    const sleep = renderThemed(<SleepBar hours={7.5} goal={8} quality="good" bedtime="11:20 PM" />, SEED_DARK);
    expect(sleep.getByText('Good')).toBeTruthy();

    const body = renderThemed(
      <BodyMetricCard variant="weight" value={72.4} delta={-0.6} lowerIsBetter trend={[74, 73, 72.4]} />,
      SEED_LIGHT
    );
    expect(body.getByLabelText('Weight: 72.4 kg')).toBeTruthy();
  });
});

describe('appearance diversity (native health)', () => {
  it('mounts elevated + soft treatments token-pure in both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root, getByText, getByLabelText } = renderThemed(
        <>
          <WorkoutCard title="Push" variant="strength" durationMin={45} calories={300} appearance="elevated" />
          <MealCard name="Salad" variant="lunch" calories={210} macros={{ protein: 12 }} appearance="soft" />
          <GoalCard title="Steps" value={9000} target={8000} unit="steps" appearance="outline" />
          <VitalStat variant="steps" value={8421} delta={340} appearance="filled" />
          <SleepBar hours={6.5} goal={8} quality="fair" appearance="elevated" />
          <WaterTracker count={3} goal={6} appearance="soft" />
          <StreakCounter count={9} best={20} appearance="elevated" />
          <HabitRow name="Water" done streak={3} onToggle={() => {}} appearance="soft" />
          <ExerciseRow name="Squat" sets={5} reps={5} done onToggle={() => {}} appearance="filled" />
          <ActivityRings rings={[{ label: 'Move', value: 200, goal: 400 }]} appearance="elevated" />
          <MetricRing label="Move" value={200} goal={400} unit="kcal" appearance="soft" />
        </>,
        seed
      );
      expect(getByText('Push')).toBeTruthy();
      expect(getByLabelText(/Steps: 9000 of 8000 steps/)).toBeTruthy();
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});

describe('motion (native health)', () => {
  it('a pressable card with press-scale mounts and fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <GoalCard title="Steps" value={4000} target={8000} unit="steps" onPress={onPress} />,
      SEED_LIGHT
    );
    const node = getByLabelText(/Steps: 4000 of 8000 steps/);
    fireEvent(node, 'pressIn');
    fireEvent.press(node);
    fireEvent(node, 'pressOut');
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('token purity (native health, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <WorkoutCard title="Push" variant="strength" durationMin={45} calories={300} onStart={() => {}} />
          <HabitRow name="Water" done streak={3} onToggle={() => {}} />
          <StreakCounter count={9} best={20} />
          <MetricRing label="Move" value={200} goal={400} unit="kcal" />
          <MealCard name="Salad" variant="lunch" calories={210} macros={{ protein: 12, carbs: 18 }} />
          <WaterTracker count={3} goal={6} mlPerGlass={250} onChange={() => {}} />
          <SleepBar hours={6.5} goal={8} quality="fair" bedtime="12:10 AM" wakeTime="6:40 AM" />
          <ActivityRings
            rings={[
              { label: 'Move', value: 200, goal: 400 },
              { label: 'Stand', value: 8, goal: 12 },
            ]}
            showLegend
          />
          <GoalCard title="Steps" value={9000} target={8000} unit="steps" />
          <VitalStat variant="steps" value={8421} delta={340} />
          <ExerciseRow name="Squat" sets={5} reps={5} weight="80 kg" done onToggle={() => {}} />
          <MoodPicker value="good" onChange={() => {}} />
          <BodyMetricCard variant="body-fat" value={18.2} delta={-0.4} lowerIsBetter trend={[19, 18.6, 18.2]} />
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
