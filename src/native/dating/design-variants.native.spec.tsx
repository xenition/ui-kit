import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, SEED_DARK, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import { ProfileCardV2 } from './ProfileCardV2';
import { ProfileCardV3 } from './ProfileCardV3';
import { SwipeCardV2 } from './SwipeCardV2';
import { SwipeCardV3 } from './SwipeCardV3';
import { MatchCelebrationV2 } from './MatchCelebrationV2';
import { MatchCelebrationV3 } from './MatchCelebrationV3';
import { CompatibilityMeterV2 } from './CompatibilityMeterV2';
import { CompatibilityMeterV3 } from './CompatibilityMeterV3';
import type { ProfileCardData } from './ProfileCard';
import type { SwipeCardProfile } from './SwipeCard';

const PROFILE: ProfileCardData = {
  id: 'p1',
  name: 'Ada',
  age: 29,
  photos: [{ uri: 'https://example.com/ada.jpg' }],
  bio: 'Coffee, code, and long walks',
  headline: 'Systems engineer',
  distanceKm: 3,
  compatibility: 88,
  interests: ['Coffee', 'Trail running', 'Jazz'],
  prompts: [{ id: 'q1', prompt: 'A perfect Sunday', answer: 'Pancakes then a hike' }],
  verified: true,
  online: true,
};

const SWIPE: SwipeCardProfile = {
  id: 's1',
  name: 'Grace',
  age: 31,
  photoUri: 'https://example.com/grace.jpg',
  tagline: 'Marine biologist',
  distanceKm: 8,
  online: true,
  verified: true,
};

describe('dating design variants — mount (both seeds)', () => {
  [SEED_LIGHT, SEED_DARK].forEach((seed) => {
    it(`every V2/V3 mounts under ${seed.mode}`, () => {
      const pc2 = renderThemed(<ProfileCardV2 profile={PROFILE} showActions />, seed);
      expect(pc2.getByText('Ada, 29')).toBeTruthy();

      const pc3 = renderThemed(<ProfileCardV3 profile={PROFILE} showActions />, seed);
      expect(pc3.getByText('Ada, 29')).toBeTruthy();
      expect(pc3.getByText('Pancakes then a hike')).toBeTruthy();

      const sc2 = renderThemed(<SwipeCardV2 profile={SWIPE} overlay="like" overlayOpacity={1} />, seed);
      expect(sc2.getByText('Grace, 31')).toBeTruthy();
      expect(sc2.getByText('LIKE', { includeHiddenElements: true })).toBeTruthy();

      const sc3 = renderThemed(<SwipeCardV3 profile={SWIPE} overlay="nope" overlayOpacity={0.6} />, seed);
      expect(sc3.getByText('Grace, 31')).toBeTruthy();
      expect(sc3.getByText('NOPE', { includeHiddenElements: true })).toBeTruthy();

      const mc2 = renderThemed(
        <MatchCelebrationV2 visible you={{ name: 'You' }} match={{ name: 'Ada' }} />,
        seed
      );
      expect(mc2.getByText("It's a Match!")).toBeTruthy();

      const mc3 = renderThemed(
        <MatchCelebrationV3 visible you={{ name: 'You' }} match={{ name: 'Ada' }} />,
        seed
      );
      expect(mc3.getByText("It's a Match!")).toBeTruthy();

      const cm2 = renderThemed(<CompatibilityMeterV2 score={88} />, seed);
      expect(cm2.getByText('Great match')).toBeTruthy();

      const cm3 = renderThemed(<CompatibilityMeterV3 score={88} />, seed);
      expect(cm3.getByText(/88%/)).toBeTruthy();
    });
  });
});

describe('dating design variants — empty / loading / guards', () => {
  it('renders empty and loading states without a profile', () => {
    const empty = renderThemed(<ProfileCardV2 emptyLabel="No one here" />, SEED_LIGHT);
    expect(empty.getByText('No one here')).toBeTruthy();

    const empty3 = renderThemed(<ProfileCardV3 emptyLabel="No one here" />, SEED_DARK);
    expect(empty3.getByText('No one here')).toBeTruthy();

    renderThemed(<ProfileCardV2 loading />, SEED_LIGHT);
    renderThemed(<CompatibilityMeterV2 score={50} loading />, SEED_LIGHT);
    renderThemed(<CompatibilityMeterV3 score={50} loading />, SEED_DARK);
  });

  it('clamps NaN / out-of-range compatibility scores', () => {
    const nan = renderThemed(<CompatibilityMeterV2 score={Number.NaN} />, SEED_DARK);
    expect(nan.getByText(/0/)).toBeTruthy();
    const over = renderThemed(<CompatibilityMeterV3 score={250} />, SEED_LIGHT);
    expect(over.getByText(/100%/)).toBeTruthy();
  });
});

describe('dating design variants — interaction', () => {
  it('fires the ProfileCardV2 action row and the match CTAs', () => {
    const onAction = jest.fn();
    const pc = renderThemed(<ProfileCardV2 profile={PROFILE} showActions onAction={onAction} />, SEED_LIGHT);
    fireEvent.press(pc.getByLabelText('Like'));
    expect(onAction).toHaveBeenCalledWith('like');

    const onMessage = jest.fn();
    const mc2 = renderThemed(
      <MatchCelebrationV2 visible match={{ name: 'Ada' }} onMessage={onMessage} messageLabel="Say hi" />,
      SEED_LIGHT
    );
    fireEvent.press(mc2.getByText('Say hi'));
    expect(onMessage).toHaveBeenCalledTimes(1);

    const onMessage3 = jest.fn();
    const mc3 = renderThemed(
      <MatchCelebrationV3 visible match={{ name: 'Ada' }} onMessage={onMessage3} messageLabel="Say hi" />,
      SEED_LIGHT
    );
    fireEvent.press(mc3.getByText('Say hi'));
    expect(onMessage3).toHaveBeenCalledTimes(1);
  });
});

describe('dating design variants — token purity (both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <ProfileCardV2 profile={PROFILE} showActions />
          <ProfileCardV3 profile={PROFILE} showActions />
          <SwipeCardV2 profile={SWIPE} overlay="superlike" overlayOpacity={0.5} />
          <SwipeCardV3 profile={SWIPE} overlay="like" overlayOpacity={1} />
          <MatchCelebrationV2 visible you={{ name: 'You' }} match={{ name: 'Ada' }} />
          <MatchCelebrationV3 visible you={{ name: 'You' }} match={{ name: 'Ada' }} />
          <CompatibilityMeterV2 score={72} />
          <CompatibilityMeterV3 score={41} />
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
