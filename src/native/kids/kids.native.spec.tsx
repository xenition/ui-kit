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
  ChildProfileCard,
  ChoreCard,
  AllowanceTracker,
  MilestoneCard,
  RewardStar,
  ScreenTimeBar,
  GrowthChart,
  RoutineRow,
  BehaviorBadge,
  SchoolEventRow,
  FamilyMemberRow,
  StickerReward,
} from './index';

describe('ChildProfileCard (native)', () => {
  it('renders identity and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ChildProfileCard name="Mia" age="6 yrs" grade="Grade 1" mood="happy" interests={['Dinosaurs']} onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Mia')).toBeTruthy();
    fireEvent.press(getByLabelText(/Mia, 6 yrs/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows a loading skeleton', () => {
    const { getByLabelText } = renderThemed(<ChildProfileCard name="Mia" loading />, SEED_DARK);
    expect(getByLabelText('Loading child profile')).toBeTruthy();
  });
});

describe('ChoreCard (native)', () => {
  it('mounts, paints the title in a token color, and fires onComplete', () => {
    const onComplete = jest.fn();
    const { getByText } = renderThemed(
      <ChoreCard title="Make the bed" assignee="Mia" points={5} due="Today" status="todo" onComplete={onComplete} />,
      SEED_LIGHT
    );
    const title = getByText('Make the bed');
    const allowed = tokenHexSet(SEED_LIGHT);
    const color = (title.props.style as { color?: string }).color?.toLowerCase();
    expect(color && allowed.has(color)).toBe(true);

    fireEvent.press(getByText('Mark done'));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('hides the action once done', () => {
    const { queryByText } = renderThemed(
      <ChoreCard title="Feed the cat" status="done" onComplete={() => {}} />,
      SEED_DARK
    );
    expect(queryByText('Mark done')).toBeNull();
  });
});

describe('AllowanceTracker (native)', () => {
  it('renders a balance and an empty state', () => {
    const filled = renderThemed(
      <AllowanceTracker balance={24.5} earned={10} spent={3} goal={{ label: 'Bike', target: 100 }} onAdd={() => {}} onWithdraw={() => {}} />,
      SEED_LIGHT
    );
    expect(filled.getByLabelText(/Balance \$24\.5/)).toBeTruthy();

    const empty = renderThemed(<AllowanceTracker balance={NaN} />, SEED_DARK);
    expect(empty.getByText('No allowance set up yet')).toBeTruthy();
  });
});

describe('RewardStar (native)', () => {
  it('reports the tapped star count', () => {
    const onReward = jest.fn();
    const { getByLabelText } = renderThemed(
      <RewardStar value={2} max={5} label="Great job!" onReward={onReward} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Reward: 2 of 5 stars/)).toBeTruthy();
    fireEvent.press(getByLabelText('Give 4 stars'));
    expect(onReward).toHaveBeenCalledWith(4);
  });
});

describe('ScreenTimeBar (native)', () => {
  it('flags the over-limit state and renders a no-limit state', () => {
    const over = renderThemed(<ScreenTimeBar used={150} limit={120} />, SEED_LIGHT);
    expect(over.getByLabelText(/over by/)).toBeTruthy();

    const noLimit = renderThemed(<ScreenTimeBar used={30} limit={0} />, SEED_DARK);
    expect(noLimit.getByText('No screen-time limit set')).toBeTruthy();
  });
});

describe('GrowthChart (native)', () => {
  it('renders a series and an explicit empty state', () => {
    const filled = renderThemed(
      <GrowthChart data={[104, 108, 112]} metric="height" unit="cm" percentile="75th percentile" />,
      SEED_LIGHT
    );
    expect(filled.getByText(/112/)).toBeTruthy();

    const empty = renderThemed(<GrowthChart data={[]} metric="weight" />, SEED_DARK);
    expect(empty.getByText('No measurements logged yet')).toBeTruthy();
  });
});

describe('RoutineRow (native)', () => {
  it('toggles done state via the checkbox role', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <RoutineRow label="Brush teeth" slot="morning" time="7:30 AM" done={false} onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Brush teeth, 7:30 AM, not done/));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('BehaviorBadge (native)', () => {
  it('mounts positive/negative variants', () => {
    const { getByLabelText } = renderThemed(
      <BehaviorBadge label="Shared toys" tone="positive" points={2} />,
      SEED_DARK
    );
    expect(getByLabelText(/positive behavior: Shared toys/)).toBeTruthy();
  });
});

describe('StickerReward (native)', () => {
  it('collects a sticker and renders an empty state', () => {
    const onCollect = jest.fn();
    const filled = renderThemed(
      <StickerReward
        stickers={[
          { glyph: '🌟', label: 'Star', earned: true },
          { glyph: '🎈', label: 'Balloon', earned: false },
        ]}
        onCollect={onCollect}
      />,
      SEED_LIGHT
    );
    fireEvent.press(filled.getByLabelText(/Balloon, locked/));
    expect(onCollect).toHaveBeenCalledWith(1);

    const empty = renderThemed(<StickerReward stickers={[]} />, SEED_DARK);
    expect(empty.getByText('No stickers yet')).toBeTruthy();
  });
});

describe('token purity (native kids, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <ChildProfileCard name="Mia" photoUrl="x" age="6 yrs" grade="Grade 1" birthday="May 4" mood="excited" interests={['Art', 'Soccer']} onPress={() => {}} />
          <ChoreCard title="Make the bed" assignee="Mia" points={5} due="Today" status="in-progress" onComplete={() => {}} onPress={() => {}} />
          <AllowanceTracker balance={24.5} earned={10} spent={3} goal={{ label: 'Bike', target: 100 }} onAdd={() => {}} onWithdraw={() => {}} />
          <MilestoneCard title="First steps" category="physical" date="Jan 2025" ageLabel="12–15 mo" description="Walked across the room" achieved onPress={() => {}} />
          <RewardStar value={3} max={5} label="Great job!" onReward={() => {}} />
          <ScreenTimeBar used={150} limit={120} />
          <ScreenTimeBar used={100} limit={120} />
          <GrowthChart data={[104, 108, 112]} metric="height" unit="cm" percentile="75th" />
          <RoutineRow label="Brush teeth" slot="bedtime" time="8:00 PM" done onToggle={() => {}} />
          <BehaviorBadge label="Shared toys" tone="positive" points={2} onPress={() => {}} />
          <BehaviorBadge label="Interrupted" tone="negative" points={1} />
          <SchoolEventRow title="Parent-teacher conference" type="meeting" date="Mon, Sep 4" time="3:00 PM" location="Room 12" childName="Mia" onPress={() => {}} />
          <FamilyMemberRow name="Dad" role="parent" relationLabel="Father" online onPress={() => {}} />
          <FamilyMemberRow name="Leo" role="child" relationLabel="Age 6" online={false} />
          <StickerReward stickers={[{ glyph: '🌟', label: 'Star', earned: true }, { glyph: '🎈', label: 'Balloon', earned: false }]} onCollect={() => {}} />
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
