import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { ProfileCard } from './ProfileCard';
import { SwipeCard } from './SwipeCard';
import { SwipeDeck } from './SwipeDeck';
import { LikePassButtons } from './LikePassButtons';
import { MatchCelebration } from './MatchCelebration';
import { CompatibilityMeter } from './CompatibilityMeter';
import { IcebreakerChip } from './IcebreakerChip';
import { ProfilePrompt } from './ProfilePrompt';
import { DistanceBadge } from './DistanceBadge';
import { PhotoCarousel } from './PhotoCarousel';
import { BoostBanner } from './BoostBanner';
import { WhoLikedYouRow, type Liker } from './WhoLikedYouRow';
import type { SwipeCardProfile } from './SwipeCard';

/** Active-scheme semantic colors for a seed. */
function colorsFor(seed: typeof SEED_LIGHT) {
  const tokens = toNativeTokens(compileTheme(seed));
  return tokens.colors[seed.mode === 'dark' ? 'dark' : 'light'];
}

const PROFILE: SwipeCardProfile = {
  id: 'p1',
  name: 'Ada',
  age: 29,
  photoUri: 'https://example.com/ada.jpg',
  tagline: 'Coffee, code, and long walks',
  distanceKm: 3,
  online: true,
  verified: true,
};

const DECK: SwipeCardProfile[] = [
  PROFILE,
  { id: 'p2', name: 'Grace', age: 31, tagline: 'Marine biologist', distanceKm: 8 },
];

describe('SwipeDeck (native)', () => {
  it('mounts the top card and reports a right swipe (like) from the action row', () => {
    const onSwipe = jest.fn();
    const onSwipeRight = jest.fn();
    const { getByLabelText } = renderThemed(
      <SwipeDeck profiles={DECK} onSwipe={onSwipe} onSwipeRight={onSwipeRight} />,
      SEED_LIGHT
    );
    // The current card is announced.
    expect(getByLabelText('Profile 1 of 2')).toBeTruthy();
    // Pressing Like commits a right swipe on the top profile.
    fireEvent.press(getByLabelText('Like'));
    expect(onSwipe).toHaveBeenCalledWith('like', DECK[0]);
    expect(onSwipeRight).toHaveBeenCalledWith(DECK[0]);
  });

  it('reports a left swipe (pass) and a super like', () => {
    const onSwipeLeft = jest.fn();
    const onSwipeUp = jest.fn();
    const pass = renderThemed(
      <SwipeDeck profiles={DECK} onSwipeLeft={onSwipeLeft} />,
      SEED_DARK
    );
    fireEvent.press(pass.getByLabelText('Pass'));
    expect(onSwipeLeft).toHaveBeenCalledWith(DECK[0]);

    const sup = renderThemed(<SwipeDeck profiles={DECK} onSwipeUp={onSwipeUp} />, SEED_LIGHT);
    fireEvent.press(sup.getByLabelText('Super like'));
    expect(onSwipeUp).toHaveBeenCalledWith(DECK[0]);
  });

  it('renders an explicit empty state when the stack is exhausted', () => {
    const { getByText } = renderThemed(
      <SwipeDeck profiles={[]} emptyTitle="Nobody left nearby" />,
      SEED_LIGHT
    );
    expect(getByText('Nobody left nearby')).toBeTruthy();
  });
});

describe('SwipeCard (native)', () => {
  it('renders name/age and a decision stamp', () => {
    const { getByText } = renderThemed(
      <SwipeCard profile={PROFILE} overlay="like" overlayOpacity={1} />,
      SEED_LIGHT
    );
    expect(getByText('Ada, 29')).toBeTruthy();
    // The decision stamp is decorative (hidden from a11y), so include hidden.
    expect(getByText('LIKE', { includeHiddenElements: true })).toBeTruthy();
  });
});

describe('MatchCelebration (native)', () => {
  it('fires the message CTA on a match', () => {
    const onMessage = jest.fn();
    const { getByText } = renderThemed(
      <MatchCelebration
        visible
        you={{ name: 'You' }}
        match={{ name: 'Ada' }}
        onMessage={onMessage}
      />,
      SEED_LIGHT
    );
    expect(getByText("It's a Match!")).toBeTruthy();
    fireEvent.press(getByText('Send a message'));
    expect(onMessage).toHaveBeenCalledTimes(1);
  });

  it('renders nothing when not visible', () => {
    const { queryByText } = renderThemed(
      <MatchCelebration visible={false} match={{ name: 'Ada' }} />,
      SEED_LIGHT
    );
    expect(queryByText("It's a Match!")).toBeNull();
  });
});

describe('CompatibilityMeter (native)', () => {
  it('tints a high score with the success token', () => {
    const c = colorsFor(SEED_LIGHT);
    const { root, getByText } = renderThemed(
      <CompatibilityMeter score={92} />,
      SEED_LIGHT
    );
    expect(getByText(/92%/)).toBeTruthy();
    expect(renderedStyleHexes(root)).toContain(c.success.toLowerCase());
  });

  it('guards out-of-range and NaN scores', () => {
    const { getByText } = renderThemed(
      <CompatibilityMeter score={Number.NaN} variant="compact" />,
      SEED_DARK
    );
    expect(getByText(/0%/)).toBeTruthy();
  });
});

describe('IcebreakerChip (native)', () => {
  it('fires onPress with the value', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <IcebreakerChip label="Coffee or tea?" value="coffee-tea" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Coffee or tea?'));
    expect(onPress).toHaveBeenCalledWith('coffee-tea');
  });
});

describe('LikePassButtons (native)', () => {
  it('reports each action', () => {
    const onAction = jest.fn();
    const { getByLabelText } = renderThemed(
      <LikePassButtons actions={['rewind', 'pass', 'superlike', 'like', 'boost']} onAction={onAction} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Rewind'));
    fireEvent.press(getByLabelText('Boost'));
    expect(onAction).toHaveBeenNthCalledWith(1, 'rewind');
    expect(onAction).toHaveBeenNthCalledWith(2, 'boost');
  });
});

describe('ProfilePrompt (native)', () => {
  it('renders the answer and likes it', () => {
    const onLike = jest.fn();
    const { getByText } = renderThemed(
      <ProfilePrompt prompt="A perfect Sunday" answer="Hiking then pancakes" onLike={onLike} />,
      SEED_LIGHT
    );
    expect(getByText('Hiking then pancakes')).toBeTruthy();
    fireEvent.press(getByText('♡'));
    expect(onLike).toHaveBeenCalledTimes(1);
  });

  it('shows an empty answer state', () => {
    const { getByText } = renderThemed(
      <ProfilePrompt prompt="A perfect Sunday" emptyLabel="Not answered" />,
      SEED_DARK
    );
    expect(getByText('Not answered')).toBeTruthy();
  });
});

describe('DistanceBadge (native)', () => {
  it('formats distance and collapses nearby', () => {
    const far = renderThemed(<DistanceBadge distance={12} unit="mi" />, SEED_LIGHT);
    expect(far.getByLabelText('12 mi away')).toBeTruthy();
    const near = renderThemed(<DistanceBadge distance={0.4} nearbyLabel="Right here" />, SEED_LIGHT);
    expect(near.getByLabelText('Right here')).toBeTruthy();
  });
});

describe('PhotoCarousel (native)', () => {
  it('steps to the next photo', () => {
    const onIndexChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <PhotoCarousel
        photos={[{ uri: 'a.jpg' }, { uri: 'b.jpg' }]}
        onIndexChange={onIndexChange}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Next photo'));
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it('renders an empty state with no photos', () => {
    const { getByText } = renderThemed(
      <PhotoCarousel photos={[]} emptyLabel="No pics" />,
      SEED_LIGHT
    );
    expect(getByText('No pics')).toBeTruthy();
  });
});

describe('BoostBanner (native)', () => {
  it('fires the CTA', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(<BoostBanner variant="boost" onPress={onPress} />, SEED_LIGHT);
    fireEvent.press(getByText('Boost me'));
    expect(onPress).toHaveBeenCalled();
  });
});

describe('WhoLikedYouRow (native)', () => {
  const LIKERS: Liker[] = [
    { id: 'l1', name: 'Ada', superLiked: true },
    { id: 'l2', name: 'Grace' },
  ];

  it('unlocks from the locked rail', () => {
    const onUnlock = jest.fn();
    const { getByText } = renderThemed(
      <WhoLikedYouRow likers={LIKERS} total={12} locked onUnlock={onUnlock} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('See all 12 likes'));
    expect(onUnlock).toHaveBeenCalledTimes(1);
  });

  it('presses an unlocked liker and shows the empty state', () => {
    const onPressLiker = jest.fn();
    const unlocked = renderThemed(
      <WhoLikedYouRow likers={LIKERS} locked={false} onPressLiker={onPressLiker} />,
      SEED_LIGHT
    );
    fireEvent.press(unlocked.getByLabelText('Ada, super liked you'));
    expect(onPressLiker).toHaveBeenCalledWith('l1');

    const empty = renderThemed(
      <WhoLikedYouRow likers={[]} emptyLabel="No likes yet" />,
      SEED_DARK
    );
    expect(empty.getByText('No likes yet')).toBeTruthy();
  });
});

describe('ProfileCard (native)', () => {
  it('renders full + compact and an empty state', () => {
    const data = {
      id: 'p1',
      name: 'Ada',
      age: 29,
      photos: [{ uri: 'a.jpg' }],
      bio: 'building things',
      distanceKm: 3,
      compatibility: 88,
      interests: ['Coffee', 'Trail running'],
      prompts: [{ id: 'q1', prompt: 'A perfect Sunday', answer: 'Pancakes' }],
      verified: true,
      online: true,
    };
    const full = renderThemed(<ProfileCard profile={data} showActions />, SEED_LIGHT);
    expect(full.getByText('Ada, 29')).toBeTruthy();
    expect(full.getByText('building things')).toBeTruthy();

    const compact = renderThemed(<ProfileCard profile={data} variant="compact" />, SEED_DARK);
    expect(compact.getByText('Ada, 29')).toBeTruthy();

    const empty = renderThemed(<ProfileCard emptyLabel="No profile" />, SEED_LIGHT);
    expect(empty.getByText('No profile')).toBeTruthy();
  });
});

describe('token purity (native dating, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <SwipeCard profile={PROFILE} overlay="nope" overlayOpacity={0.5} />
          <CompatibilityMeter score={72} variant="ring" />
          <IcebreakerChip label="Tabs or spaces?" selected onPress={() => undefined} />
          <ProfilePrompt prompt="Q" answer="A" liked onLike={() => undefined} />
          <DistanceBadge distance={5} />
          <BoostBanner variant="superboost" activeLabel="Active · 20m" />
          <WhoLikedYouRow likers={[{ id: 'l1', name: 'Ada' }]} locked onUnlock={() => undefined} />
          <LikePassButtons onAction={() => undefined} />
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
