/** @jest-environment jsdom */
/**
 * Web social blocks: render smoke + token-class purity + the behavioral
 * contracts (PostCard header/engagement, FollowButton state callback, HashtagChip
 * bare-tag emit + aria-pressed, MentionText clickable mentions, ReactionBar and
 * FeedList empty states, Poll vote vs. results, EngagementBar counts, StoryRing
 * live badge). Plain `@testing-library/react` + bare `expect` — no jest-dom.
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { PostCard } from './PostCard';
import { FeedList } from './FeedList';
import { StoryBar } from './StoryBar';
import { StoryRing } from './StoryRing';
import { UserCard } from './UserCard';
import { FollowButton } from './FollowButton';
import { ReactionBar } from './ReactionBar';
import { CommentItem } from './CommentItem';
import { ShareSheet } from './ShareSheet';
import { Poll } from './Poll';
import { HashtagChip } from './HashtagChip';
import { MentionText, parseMentions } from './MentionText';
import { ProfileStats } from './ProfileStats';
import { EngagementBar, formatCount } from './EngagementBar';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('PostCard', () => {
  it('renders the author header on a token-bound surface and forwards its ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByText, container } = render(
      <PostCard ref={ref} variant="text" author={{ name: 'Ada Lovelace', handle: 'ada', verified: true }} timestamp="3h" text="hello world" />
    );
    expect(getByText('Ada Lovelace')).toBeTruthy();
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('bg-surface');
    expect(root.className).toContain('border-border');
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('fires the engagement handlers (like)', () => {
    const onLike = jest.fn();
    const { getByLabelText } = render(
      <PostCard author={{ name: 'Ada' }} text="hi" likeCount={5} liked onLike={onLike} />
    );
    fireEvent.click(getByLabelText('Like, 5'));
    expect(onLike).toHaveBeenCalledTimes(1);
  });

  it('exposes a keyboard-operable role="button" when clickable (so nested actions still work)', () => {
    const onClick = jest.fn();
    const { getByLabelText } = render(
      <PostCard author={{ name: 'Ada' }} text="hi" onClick={onClick} />
    );
    const root = getByLabelText('Post by Ada');
    expect(root.getAttribute('role')).toBe('button');
    fireEvent.click(root);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a skeleton in the loading state (no author text)', () => {
    const { container, queryByText } = render(
      <PostCard author={{ name: 'Ada' }} text="hi" loading />
    );
    expect(container.querySelector('[aria-busy="true"]')).not.toBeNull();
    expect(queryByText('hi')).toBeNull();
  });

  it('stays token-pure: no hex literals in inline styles', () => {
    const { container } = render(
      <PostCard variant="link" author={{ name: 'Ada' }} link={{ url: 'https://x.test', title: 'T', domain: 'x.test' }} likeCount={2} onLike={() => undefined} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('FollowButton', () => {
  it('renders the follow CTA with the primary token variant and emits the current state', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<FollowButton state="follow" onClick={onClick} />);
    const btn = getByRole('button', { name: 'Follow' });
    expect(btn.className).toContain('bg-primary');
    expect(btn.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledWith('follow');
  });

  it('marks connected/pending states as pressed', () => {
    const { getByRole } = render(<FollowButton state="following" onClick={() => undefined} />);
    expect(getByRole('button', { name: 'Following' }).getAttribute('aria-pressed')).toBe('true');
  });
});

describe('HashtagChip', () => {
  it('emits the bare tag and reflects the active state via aria-pressed + a token fill', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<HashtagChip tag="#Dev" active onClick={onClick} />);
    const chip = getByRole('button', { name: '#Dev' });
    expect(chip.getAttribute('aria-pressed')).toBe('true');
    expect(chip.className).toContain('bg-primary');
    fireEvent.click(chip);
    expect(onClick).toHaveBeenCalledWith('Dev');
  });
});

describe('MentionText', () => {
  it('splits plain / mention / hashtag segments', () => {
    expect(parseMentions('hi @ada #dev')).toEqual([
      { kind: 'text', value: 'hi ' },
      { kind: 'mention', value: '@ada' },
      { kind: 'text', value: ' ' },
      { kind: 'hashtag', value: '#dev' },
    ]);
  });

  it('renders mentions as clickable buttons that emit the bare handle', () => {
    const onPressMention = jest.fn();
    const { getByText, container } = render(
      <MentionText text="hi @ada" onPressMention={onPressMention} />
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('text-on-surface');
    const mention = getByText('@ada');
    expect(mention.tagName).toBe('BUTTON');
    fireEvent.click(mention);
    expect(onPressMention).toHaveBeenCalledWith('ada');
  });
});

describe('ReactionBar', () => {
  it('renders the empty label on the muted token when there is nothing to show', () => {
    const { getByText } = render(<ReactionBar reactions={[]} />);
    const empty = getByText('No reactions yet');
    expect(empty.className).toContain('text-muted');
  });

  it('emits the reaction key and marks the selected pill pressed', () => {
    const onReact = jest.fn();
    const { getByRole } = render(
      <ReactionBar reactions={[{ key: 'love', emoji: '❤️', count: 3, reacted: true, label: 'Love' }]} onReact={onReact} />
    );
    const pill = getByRole('button', { name: 'Love, 3' });
    expect(pill.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(pill);
    expect(onReact).toHaveBeenCalledWith('love');
  });
});

describe('Poll', () => {
  it('is a clickable radiogroup while open and emits the voted option id', () => {
    const onVote = jest.fn();
    const { getByRole } = render(
      <Poll question="Best?" options={[{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }]} onVote={onVote} />
    );
    fireEvent.click(getByRole('radio', { name: 'A' }));
    expect(onVote).toHaveBeenCalledWith('a');
  });

  it('shows labeled percentage bars once voted (token-pure widths)', () => {
    const { getByLabelText, container } = render(
      <Poll question="Best?" options={[{ id: 'a', label: 'A', votes: 3 }, { id: 'b', label: 'B', votes: 1 }]} votedOptionId="a" />
    );
    expect(getByLabelText('A, 75%')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('EngagementBar', () => {
  it('formats large counts and only interacts with the handlers passed', () => {
    expect(formatCount(1500)).toBe('1.5k');
    const onShare = jest.fn();
    const { getByLabelText } = render(<EngagementBar shareCount={2400} onShare={onShare} />);
    const share = getByLabelText('Share, 2400');
    fireEvent.click(share);
    expect(onShare).toHaveBeenCalledTimes(1);
  });
});

describe('FeedList', () => {
  it('renders the built-in EmptyState when data is empty', () => {
    const { getByText } = render(
      <FeedList data={[]} renderItem={() => null} emptyTitle="No posts" />
    );
    expect(getByText('No posts')).toBeTruthy();
  });

  it('renders each row through renderItem when data is present', () => {
    const { getByText } = render(
      <FeedList
        data={['one', 'two']}
        keyExtractor={(s) => s}
        renderItem={(s) => <div>{s.toUpperCase()}</div>}
      />
    );
    expect(getByText('ONE')).toBeTruthy();
    expect(getByText('TWO')).toBeTruthy();
  });
});

describe('StoryRing / StoryBar', () => {
  it('renders a LIVE badge on the danger token for a live story', () => {
    const { getByText } = render(<StoryRing name="Ada" state="live" />);
    const badge = getByText('LIVE');
    expect(badge.className).toContain('bg-danger');
  });

  it('emits the story id from the bar', () => {
    const onPressStory = jest.fn();
    const { getByLabelText } = render(
      <StoryBar stories={[{ id: 's1', name: 'Ada' }]} showAdd={false} onPressStory={onPressStory} />
    );
    fireEvent.click(getByLabelText('Ada'));
    expect(onPressStory).toHaveBeenCalledWith('s1');
  });
});

describe('UserCard', () => {
  it('renders the card variant with bio + stats and an inline follow button', () => {
    const onFollow = jest.fn();
    const { getByText, getByRole } = render(
      <UserCard
        variant="card"
        user={{ name: 'Ada', handle: 'ada', bio: 'Countess of computing' }}
        stats={[{ label: 'Followers', value: '12.4k' }]}
        followState="follow"
        onFollow={onFollow}
      />
    );
    expect(getByText('Countess of computing')).toBeTruthy();
    expect(getByText('12.4k')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Follow' }));
    expect(onFollow).toHaveBeenCalledWith('follow');
  });
});

describe('CommentItem', () => {
  it('renders the body and fires like/reply', () => {
    const onLike = jest.fn();
    const onReply = jest.fn();
    const { getByText, getByLabelText } = render(
      <CommentItem author="Ada" handle="ada" text="nice @grace" timestamp="2h" likeCount={4} onLike={onLike} onReply={onReply} />
    );
    expect(getByText('@grace')).toBeTruthy();
    fireEvent.click(getByLabelText('Like, 4'));
    fireEvent.click(getByLabelText('Reply'));
    expect(onLike).toHaveBeenCalledTimes(1);
    expect(onReply).toHaveBeenCalledTimes(1);
  });
});

describe('ShareSheet', () => {
  it('renders nothing while hidden', () => {
    const { container } = render(<ShareSheet visible={false} targets={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders targets and closes from the backdrop', () => {
    const onSelect = jest.fn();
    const onClose = jest.fn();
    const { getByRole, getByLabelText } = render(
      <ShareSheet visible title="Send to" targets={[{ id: 'copy', label: 'Copy link', icon: '🔗' }]} onSelect={onSelect} onClose={onClose} />
    );
    expect(getByRole('dialog').getAttribute('aria-label')).toBe('Send to');
    fireEvent.click(getByRole('menuitem', { name: 'Copy link' }));
    expect(onSelect).toHaveBeenCalledWith('copy');
    fireEvent.click(getByLabelText('Dismiss'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows the empty label with no targets', () => {
    const { getByText } = render(<ShareSheet visible targets={[]} emptyLabel="Nothing to share" />);
    expect(getByText('Nothing to share')).toBeTruthy();
  });
});

describe('ProfileStats', () => {
  it('renders clickable stat columns', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ProfileStats stats={[{ label: 'Posts', value: 10, onClick }]} />
    );
    fireEvent.click(getByRole('button', { name: '10 Posts' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
