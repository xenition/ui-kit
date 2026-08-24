/**
 * Alternate kids/parenting designs (v2 / v3) — drop-in redesigns of the four
 * most-used native kids blocks. Each variant keeps the base component's exact
 * props, so these specs prove they (a) mount, (b) stay token-pure under BOTH
 * seeds (no hardcoded hex — every color traces to a compiled token), and (c)
 * remain interactive where the base was (chore complete / reward gesture).
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { ChildProfileCardV2 } from './ChildProfileCardV2';
import { ChildProfileCardV3 } from './ChildProfileCardV3';
import { ChoreCardV2 } from './ChoreCardV2';
import { ChoreCardV3 } from './ChoreCardV3';
import { RewardStarV2 } from './RewardStarV2';
import { RewardStarV3 } from './RewardStarV3';
import { AllowanceTrackerV2 } from './AllowanceTrackerV2';
import { AllowanceTrackerV3 } from './AllowanceTrackerV3';

describe('ChildProfileCard alternates (native)', () => {
  it('V2 renders a hero banner with identity and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ChildProfileCardV2 name="Mia" age="6 yrs" grade="Grade 1" mood="happy" interests={['Dinosaurs']} onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Mia')).toBeTruthy();
    fireEvent.press(getByLabelText(/Mia, 6 yrs/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a compact row and honors loading', () => {
    const { getByText } = renderThemed(
      <ChildProfileCardV3 name="Leo" age="4 yrs" mood="excited" />,
      SEED_DARK
    );
    expect(getByText('Leo')).toBeTruthy();

    const loading = renderThemed(<ChildProfileCardV3 name="Leo" loading />, SEED_LIGHT);
    expect(loading.getByLabelText('Loading child profile')).toBeTruthy();
  });
});

describe('ChoreCard alternates (native)', () => {
  it('V2 renders a quest card and fires onComplete', () => {
    const onComplete = jest.fn();
    const { getByText } = renderThemed(
      <ChoreCardV2 title="Make the bed" assignee="Mia" points={5} due="Today" status="todo" onComplete={onComplete} />,
      SEED_LIGHT
    );
    expect(getByText('Make the bed')).toBeTruthy();
    fireEvent.press(getByText('Mark done'));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('V3 completes via the checkbox and hides no action when done', () => {
    const onComplete = jest.fn();
    const { getByLabelText } = renderThemed(
      <ChoreCardV3 title="Feed the cat" assignee="Leo" points={3} due="5pm" status="todo" onComplete={onComplete} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Mark Feed the cat done'));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});

describe('RewardStar alternates (native)', () => {
  it('V2 awards the next star from the burst tile', () => {
    const onReward = jest.fn();
    const { getByLabelText } = renderThemed(
      <RewardStarV2 value={2} max={5} label="Great job!" onReward={onReward} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Give a star, Reward: 2 of 5 stars/));
    expect(onReward).toHaveBeenCalledWith(3);
  });

  it('V3 reports the tapped star count in the inline row', () => {
    const onReward = jest.fn();
    const { getByLabelText } = renderThemed(
      <RewardStarV3 value={1} max={5} label="Nice" onReward={onReward} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Give 4 stars'));
    expect(onReward).toHaveBeenCalledWith(4);
  });
});

describe('AllowanceTracker alternates (native)', () => {
  it('V2 renders a hero balance with a goal ring', () => {
    const { getByText, getByLabelText } = renderThemed(
      <AllowanceTrackerV2 balance={24.5} earned={10} spent={3} goal={{ label: 'Bike', target: 100 }} onAdd={() => {}} onWithdraw={() => {}} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Balance \$24\.5/)).toBeTruthy();
    expect(getByText('25%')).toBeTruthy();

    const empty = renderThemed(<AllowanceTrackerV2 balance={NaN} />, SEED_DARK);
    expect(empty.getByText('No allowance set up yet')).toBeTruthy();
  });

  it('V3 renders a compact balance row and a goal chip', () => {
    const { getByLabelText, getByText } = renderThemed(
      <AllowanceTrackerV3 balance={50} goal={{ label: 'Bike', target: 100 }} onAdd={() => {}} onWithdraw={() => {}} />,
      SEED_DARK
    );
    expect(getByLabelText(/Balance \$50/)).toBeTruthy();
    expect(getByText('🎯 50%')).toBeTruthy();
  });
});

describe('token purity — kids alternates (both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <ChildProfileCardV2 name="Mia" photoUrl="x" age="6 yrs" grade="Grade 1" birthday="May 4" mood="excited" interests={['Art', 'Soccer']} onPress={() => {}} />
          <ChildProfileCardV3 name="Leo" age="4 yrs" grade="Pre-K" birthday="Jun 1" mood="calm" onPress={() => {}} />
          <ChoreCardV2 title="Make the bed" assignee="Mia" points={5} due="Today" status="in-progress" onComplete={() => {}} onPress={() => {}} />
          <ChoreCardV3 title="Feed the cat" assignee="Leo" points={3} due="5pm" status="done" onComplete={() => {}} />
          <RewardStarV2 value={3} max={5} label="Great job!" onReward={() => {}} />
          <RewardStarV3 value={2} max={5} label="Nice" onReward={() => {}} />
          <AllowanceTrackerV2 balance={24.5} earned={10} spent={3} goal={{ label: 'Bike', target: 100 }} onAdd={() => {}} onWithdraw={() => {}} />
          <AllowanceTrackerV3 balance={50} goal={{ label: 'Bike', target: 100 }} onAdd={() => {}} onWithdraw={() => {}} />
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
