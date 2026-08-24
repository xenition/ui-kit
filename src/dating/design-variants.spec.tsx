/** @jest-environment jsdom */
/**
 * Web dating design-variant (V2/V3) smoke + token purity + one key interaction each.
 * Plain `@testing-library/react` + bare `expect` — no jest-dom.
 */
import { fireEvent, render } from '@testing-library/react';
import { CompatibilityMeterV2 } from './CompatibilityMeterV2';
import { CompatibilityMeterV3 } from './CompatibilityMeterV3';
import { ProfileCardV2 } from './ProfileCardV2';
import { ProfileCardV3 } from './ProfileCardV3';
import { MatchCelebrationV2 } from './MatchCelebrationV2';
import { MatchCelebrationV3 } from './MatchCelebrationV3';
import { SwipeCardV2 } from './SwipeCardV2';
import { SwipeCardV3 } from './SwipeCardV3';
import type { ProfileCardData } from './ProfileCard';
import type { SwipeCardProfile } from './SwipeCard';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

/** No rendered inline style should carry a raw hex color — every color is a token class. */
function assertNoHexLiterals(root: HTMLElement): void {
  const styles = Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');
  expect(HEX_LITERAL.test(styles)).toBe(false);
}

const PROFILE: ProfileCardData = {
  id: 'p1',
  name: 'Ada',
  age: 29,
  headline: 'Coffee, code, and long walks',
  bio: 'Marine biologist by day.',
  distanceKm: 3,
  compatibility: 88,
  interests: ['Coffee', 'Hiking'],
  prompts: [{ id: 'q1', prompt: 'A perfect Sunday', answer: 'Tide pools' }],
  online: true,
  verified: true,
};

const SWIPE: SwipeCardProfile = {
  id: 's1',
  name: 'Grace',
  age: 31,
  tagline: 'Marine biologist',
  distanceKm: 8,
  online: true,
  verified: true,
};

const YOU = { name: 'You' };
const MATCH = { name: 'Ada' };

describe('CompatibilityMeter variants (web)', () => {
  it('V2 renders the dial with the score and stays token-pure', () => {
    const { getByRole, container } = render(<CompatibilityMeterV2 score={88} />);
    expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('88');
    assertNoHexLiterals(container as HTMLElement);
  });

  it('V3 clamps NaN to 0 and renders segments', () => {
    const { getByRole, container } = render(<CompatibilityMeterV3 score={Number.NaN} />);
    expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('0');
    assertNoHexLiterals(container as HTMLElement);
  });
});

describe('ProfileCard variants (web)', () => {
  it('V2 renders the profile and fires an interest click', () => {
    const onClickInterest = jest.fn();
    const { getByText, container } = render(<ProfileCardV2 profile={PROFILE} onClickInterest={onClickInterest} />);
    expect(getByText('Ada, 29')).toBeTruthy();
    fireEvent.click(getByText('Coffee'));
    expect(onClickInterest).toHaveBeenCalledWith('Coffee');
    assertNoHexLiterals(container as HTMLElement);
  });

  it('V3 renders the prompt centrepiece and an empty state', () => {
    const { getByText, container } = render(<ProfileCardV3 profile={PROFILE} />);
    expect(getByText('A perfect Sunday')).toBeTruthy();
    assertNoHexLiterals(container as HTMLElement);
    const empty = render(<ProfileCardV3 emptyLabel="Nothing here" />);
    expect(empty.getByText('Nothing here')).toBeTruthy();
  });
});

describe('MatchCelebration variants (web)', () => {
  it('V2 fires the message CTA and stays token-pure', () => {
    const onMessage = jest.fn();
    const { getByText, container } = render(
      <MatchCelebrationV2 visible you={YOU} match={MATCH} onMessage={onMessage} />
    );
    fireEvent.click(getByText('Send a message'));
    expect(onMessage).toHaveBeenCalledTimes(1);
    assertNoHexLiterals(container as HTMLElement);
  });

  it('V3 renders nothing when not visible', () => {
    const { container } = render(<MatchCelebrationV3 visible={false} match={MATCH} />);
    expect(container.firstChild).toBeNull();
  });
});

describe('SwipeCard variants (web)', () => {
  it('V2 reveals a filled decision stamp and stays token-pure', () => {
    const { getByText, container } = render(<SwipeCardV2 profile={SWIPE} overlay="like" />);
    expect(getByText('LIKE')).toBeTruthy();
    assertNoHexLiterals(container as HTMLElement);
  });

  it('V3 renders the caption strip name below the framed photo', () => {
    const { getByText, container } = render(<SwipeCardV3 profile={SWIPE} overlay="nope" />);
    expect(getByText('Grace, 31')).toBeTruthy();
    expect(getByText('NOPE')).toBeTruthy();
    assertNoHexLiterals(container as HTMLElement);
  });
});
