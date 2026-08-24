/** @jest-environment jsdom */
/**
 * Web dating blocks: render smoke + token-class purity + the behavioral contracts
 * (SwipeDeck like button → onSwipe/onSwipeRight and empty state, MatchCelebration
 * role="dialog" + message CTA, IcebreakerChip bare-value emit + aria-pressed,
 * CompatibilityMeter band tone + NaN guard, LikePassButtons per-action, ProfileCard
 * full + empty). Plain `@testing-library/react` + bare `expect` — no jest-dom.
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { SwipeDeck } from './SwipeDeck';
import { SwipeCard, type SwipeCardProfile } from './SwipeCard';
import { MatchCelebration } from './MatchCelebration';
import { CompatibilityMeter } from './CompatibilityMeter';
import { IcebreakerChip } from './IcebreakerChip';
import { LikePassButtons } from './LikePassButtons';
import { ProfileCard } from './ProfileCard';
import { DistanceBadge } from './DistanceBadge';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

/** No rendered inline style should carry a raw hex color — every color is a token class. */
function assertNoHexLiterals(root: HTMLElement): void {
  const styles = Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');
  expect(HEX_LITERAL.test(styles)).toBe(false);
}

const ADA: SwipeCardProfile = {
  id: 'p1',
  name: 'Ada',
  age: 29,
  tagline: 'Coffee, code, and long walks',
  distanceKm: 3,
  online: true,
  verified: true,
};
const GRACE: SwipeCardProfile = { id: 'p2', name: 'Grace', age: 31, tagline: 'Marine biologist', distanceKm: 8 };
const DECK: SwipeCardProfile[] = [ADA, GRACE];

describe('SwipeDeck (web)', () => {
  it('mounts the top card and reports a right swipe (like) from the action row', () => {
    const onSwipe = jest.fn();
    const onSwipeRight = jest.fn();
    const { getByLabelText } = render(
      <SwipeDeck profiles={DECK} onSwipe={onSwipe} onSwipeRight={onSwipeRight} />
    );
    expect(getByLabelText('Profile 1 of 2')).toBeTruthy();
    fireEvent.click(getByLabelText('Like'));
    expect(onSwipe).toHaveBeenCalledWith('like', ADA);
    expect(onSwipeRight).toHaveBeenCalledWith(ADA);
  });

  it('reports a pass and a super like from the buttons', () => {
    const onSwipeLeft = jest.fn();
    const onSwipeUp = jest.fn();
    const { getByLabelText } = render(
      <SwipeDeck profiles={DECK} onSwipeLeft={onSwipeLeft} onSwipeUp={onSwipeUp} />
    );
    fireEvent.click(getByLabelText('Pass'));
    expect(onSwipeLeft).toHaveBeenCalledWith(ADA);
    fireEvent.click(getByLabelText('Super like'));
    // The stack advanced to Grace after the pass.
    expect(onSwipeUp).toHaveBeenCalledWith(GRACE);
  });

  it('renders an explicit empty state on a token-bound surface when exhausted', () => {
    const onEmpty = jest.fn();
    const { getByText, container } = render(
      <SwipeDeck profiles={[]} emptyTitle="Nobody left nearby" onEmpty={onEmpty} />
    );
    expect(getByText('Nobody left nearby')).toBeTruthy();
    // EmptyState carries the dashed token surface.
    expect(container.querySelector('[data-xen-empty-state]')?.className).toContain('border-border');
  });

  it('fires onEmpty and forwards its ref', () => {
    const ref = createRef<HTMLDivElement>();
    const onEmpty = jest.fn();
    const { getByLabelText } = render(<SwipeDeck ref={ref} profiles={[ADA]} onEmpty={onEmpty} />);
    expect(ref.current?.tagName).toBe('DIV');
    fireEvent.click(getByLabelText('Like'));
    expect(onEmpty).toHaveBeenCalledTimes(1);
  });
});

describe('SwipeCard (web)', () => {
  it('renders name/age and a decision stamp with no hex literals', () => {
    const { getByText, container } = render(
      <SwipeCard profile={ADA} overlay="like" overlayOpacity={1} />
    );
    expect(getByText('Ada, 29')).toBeTruthy();
    expect(getByText('LIKE')).toBeTruthy();
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute('role')).toBe('img');
    assertNoHexLiterals(container as HTMLElement);
  });
});

describe('MatchCelebration (web)', () => {
  it('is a role="dialog" and fires the message CTA', () => {
    const onMessage = jest.fn();
    const { getByRole, getByText } = render(
      <MatchCelebration visible you={{ name: 'You' }} match={{ name: 'Ada' }} onMessage={onMessage} />
    );
    const dialog = getByRole('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(getByText("It's a Match!")).toBeTruthy();
    fireEvent.click(getByText('Send a message'));
    expect(onMessage).toHaveBeenCalledTimes(1);
  });

  it('renders nothing when not visible', () => {
    const { queryByText } = render(<MatchCelebration visible={false} match={{ name: 'Ada' }} />);
    expect(queryByText("It's a Match!")).toBeNull();
  });
});

describe('CompatibilityMeter (web)', () => {
  it('tints a high score with the success token class and announces the band', () => {
    const { getByText } = render(<CompatibilityMeter score={92} />);
    const value = getByText(/92%/);
    expect(value.className).toContain('text-success');
    // The band is spelled out in words, never color-alone.
    expect(value.textContent).toContain('Great match');
  });

  it('guards NaN scores to 0%', () => {
    const { getByText } = render(<CompatibilityMeter score={Number.NaN} variant="compact" />);
    expect(getByText(/0%/)).toBeTruthy();
  });
});

describe('IcebreakerChip (web)', () => {
  it('is a real button that emits its bare value and exposes aria-pressed', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <IcebreakerChip label="Coffee or tea?" value="coffee-tea" selected onClick={onClick} />
    );
    const btn = getByRole('button');
    expect(btn.tagName).toBe('BUTTON');
    expect(btn.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledWith('coffee-tea');
  });
});

describe('LikePassButtons (web)', () => {
  it('reports each action from its labelled button', () => {
    const onAction = jest.fn();
    const { getByLabelText } = render(
      <LikePassButtons actions={['rewind', 'pass', 'superlike', 'like', 'boost']} onAction={onAction} />
    );
    fireEvent.click(getByLabelText('Rewind'));
    fireEvent.click(getByLabelText('Boost'));
    expect(onAction).toHaveBeenNthCalledWith(1, 'rewind');
    expect(onAction).toHaveBeenNthCalledWith(2, 'boost');
  });
});

describe('ProfileCard (web)', () => {
  it('renders the full profile on a token surface and an empty state', () => {
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
    const full = render(<ProfileCard profile={data} showActions />);
    expect(full.getByText('Ada, 29')).toBeTruthy();
    expect(full.getByText('building things')).toBeTruthy();
    expect((full.container.firstElementChild as HTMLElement).className).toContain('bg-surface');

    const empty = render(<ProfileCard emptyLabel="No profile" />);
    expect(empty.getByText('No profile')).toBeTruthy();
  });

  it('emits the interest chip value through onClickInterest', () => {
    const onClickInterest = jest.fn();
    const { getByText } = render(
      <ProfileCard profile={{ id: 'p', name: 'Ada', interests: ['Coffee'] }} onClickInterest={onClickInterest} />
    );
    fireEvent.click(getByText('Coffee'));
    expect(onClickInterest).toHaveBeenCalledWith('Coffee');
  });
});

describe('DistanceBadge (web)', () => {
  it('formats distance and collapses nearby, announced as one label', () => {
    const far = render(<DistanceBadge distance={12} unit="mi" />);
    expect(far.getByLabelText('12 mi away')).toBeTruthy();
    const near = render(<DistanceBadge distance={0.4} nearbyLabel="Right here" />);
    expect(near.getByLabelText('Right here')).toBeTruthy();
  });
});
