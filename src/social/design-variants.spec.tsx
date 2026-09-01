/** @jest-environment jsdom */
/**
 * Web social V2/V3 alternate designs: render smoke, token-class purity (no inline
 * hex), and one key interaction per variant. Plain `@testing-library/react` +
 * bare `expect` — no jest-dom.
 */
import { fireEvent, render } from '@testing-library/react';
import { CommentItemV2 } from './CommentItemV2';
import { CommentItemV3 } from './CommentItemV3';
import { PostCardV2 } from './PostCardV2';
import { PostCardV3 } from './PostCardV3';
import { StoryBarV2 } from './StoryBarV2';
import { StoryBarV3 } from './StoryBarV3';
import { UserCardV2 } from './UserCardV2';
import { UserCardV3 } from './UserCardV3';
import {
  PostCardV4,
  CommentItemV4,
  StoryBarV4,
  UserCardV4,
  EngagementBarV4,
  ReactionBarV4,
  FollowButtonV4,
  HashtagChipV4,
  MentionTextV4,
  PollV4,
  ProfileStatsV4,
  ShareSheetV4,
  StoryRingV4,
  FeedListV4,
  ProfileHeader,
  StoryViewer,
  PostComposer,
  NotificationRow,
  TrendingCard,
  SuggestedUsers,
  type PostAuthor,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const stories = [
  { id: '1', name: 'Ada', state: 'unseen' as const },
  { id: '2', name: 'Grace', state: 'live' as const },
  { id: '3', name: 'Alan', state: 'seen' as const },
];

describe('CommentItemV2 (chat bubble)', () => {
  it('renders and stays token-pure (no inline hex)', () => {
    const { getByText, container } = render(
      <CommentItemV2 author="Ada" handle="ada" text="hello @grace" timestamp="2h" pinned likeCount={3} />
    );
    expect(getByText('Ada')).toBeTruthy();
    expect(HEX_LITERAL.test(inlineStyles(container))).toBe(false);
  });
  it('fires onLike', () => {
    const onLike = jest.fn();
    const { getByLabelText } = render(<CommentItemV2 author="Ada" text="hi" likeCount={2} liked onLike={onLike} />);
    fireEvent.click(getByLabelText('Like, 2'));
    expect(onLike).toHaveBeenCalledTimes(1);
  });
});

describe('CommentItemV3 (flat threaded rail)', () => {
  it('renders a nested reply and stays token-pure', () => {
    const { getByText, container } = render(
      <CommentItemV3 author="Grace" text="reply body" depth={1} timestamp="1h" />
    );
    expect(getByText('Grace')).toBeTruthy();
    expect(HEX_LITERAL.test(inlineStyles(container))).toBe(false);
  });
  it('fires onReply', () => {
    const onReply = jest.fn();
    const { getByLabelText } = render(<CommentItemV3 author="Ada" text="hi" onReply={onReply} />);
    fireEvent.click(getByLabelText('Reply'));
    expect(onReply).toHaveBeenCalledTimes(1);
  });
});

describe('PostCardV2 (elevated media-forward)', () => {
  it('renders an image post on a shadowed surface, token-pure', () => {
    const { getByText, container } = render(
      <PostCardV2 variant="image" author={{ name: 'Ada', verified: true }} timestamp="3h" imageUrl="/x.jpg" text="cap" likeCount={5} onLike={() => {}} />
    );
    expect(getByText('Ada')).toBeTruthy();
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('shadow-lg');
    expect(HEX_LITERAL.test(inlineStyles(container))).toBe(false);
  });
  it('exposes a keyboard-operable role="button" when clickable', () => {
    const onClick = jest.fn();
    const { getByLabelText } = render(<PostCardV2 author={{ name: 'Ada' }} text="hi" onClick={onClick} />);
    fireEvent.keyDown(getByLabelText('Post by Ada'), { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('PostCardV3 (borderless left-accent)', () => {
  it('renders on a borderless accent rail, token-pure', () => {
    const { getByText, container } = render(
      <PostCardV3 author={{ name: 'Grace' }} text="minimal" timestamp="1h" likeCount={2} onLike={() => {}} />
    );
    expect(getByText('Grace')).toBeTruthy();
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('border-primary');
    expect(HEX_LITERAL.test(inlineStyles(container))).toBe(false);
  });
  it('fires onComment', () => {
    const onComment = jest.fn();
    const { getByLabelText } = render(<PostCardV3 author={{ name: 'Ada' }} text="hi" commentCount={1} onComment={onComment} />);
    fireEvent.click(getByLabelText(/Comment/i));
    expect(onComment).toHaveBeenCalledTimes(1);
  });
});

describe('StoryBarV2 (gradient-ring circles)', () => {
  it('renders rings and stays token-pure', () => {
    const { getByLabelText, container } = render(<StoryBarV2 stories={stories} onPressStory={() => {}} />);
    expect(getByLabelText(/Grace, live/)).toBeTruthy();
    expect(HEX_LITERAL.test(inlineStyles(container))).toBe(false);
  });
  it('fires onPressStory with the id', () => {
    const onPressStory = jest.fn();
    const { getByLabelText } = render(<StoryBarV2 stories={stories} showAdd={false} onPressStory={onPressStory} />);
    fireEvent.click(getByLabelText('Ada'));
    expect(onPressStory).toHaveBeenCalledWith('1');
  });
});

describe('StoryBarV3 (compact square tiles)', () => {
  it('renders the add tile and stays token-pure', () => {
    const { getByLabelText, container } = render(<StoryBarV3 stories={stories} onPressAdd={() => {}} />);
    expect(getByLabelText('Add to your story')).toBeTruthy();
    expect(HEX_LITERAL.test(inlineStyles(container))).toBe(false);
  });
  it('fires onPressStory with the id', () => {
    const onPressStory = jest.fn();
    const { getByLabelText } = render(<StoryBarV3 stories={stories} showAdd={false} onPressStory={onPressStory} />);
    fireEvent.click(getByLabelText('Alan'));
    expect(onPressStory).toHaveBeenCalledWith('3');
  });
});

describe('UserCardV2 (banner profile card)', () => {
  it('renders the card variant with stats, token-pure', () => {
    const { getByText, container } = render(
      <UserCardV2
        variant="card"
        user={{ name: 'Ada', handle: 'ada', bio: 'Mathematician', verified: true }}
        stats={[{ label: 'Followers', value: 12 }]}
        followState="follow"
        onFollow={() => {}}
      />
    );
    expect(getByText('Mathematician')).toBeTruthy();
    expect(HEX_LITERAL.test(inlineStyles(container))).toBe(false);
  });
  it('fires onClick when the card is activated', () => {
    const onClick = jest.fn();
    const { getByLabelText } = render(<UserCardV2 user={{ name: 'Ada' }} onClick={onClick} />);
    fireEvent.click(getByLabelText('Ada'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('UserCardV3 (compact follow row)', () => {
  it('renders an inline stats summary, token-pure', () => {
    const { getByText, container } = render(
      <UserCardV3
        variant="card"
        user={{ name: 'Grace', handle: 'grace' }}
        stats={[{ label: 'Posts', value: 12 }, { label: 'Followers', value: '3.4k' }]}
      />
    );
    expect(getByText('12 Posts · 3.4k Followers')).toBeTruthy();
    expect(HEX_LITERAL.test(inlineStyles(container))).toBe(false);
  });
  it('fires onFollow with the current state', () => {
    const onFollow = jest.fn();
    const { getByRole } = render(
      <UserCardV3 user={{ name: 'Ada' }} followState="follow" onFollow={onFollow} />
    );
    fireEvent.click(getByRole('button', { name: 'Follow' }));
    expect(onFollow).toHaveBeenCalledWith('follow');
  });
});

// ── V4 "feed" line ── smoke render + token-purity (no inline hex) + interaction.
const author: PostAuthor = { name: 'Ada Lovelace', handle: 'ada', verified: true };

describe('social V4 "feed" line (web)', () => {
  it('mounts all 14 V4 variants token-pure (no inline hex)', () => {
    const { container } = render(
      <div>
        <PostCardV4
          variant="image"
          author={author}
          timestamp="3h"
          text="shipping @grace #v4 today"
          imageUrl="/a.jpg"
          likeCount={5}
          commentCount={2}
          liked
          onLike={() => {}}
          onComment={() => {}}
        />
        <CommentItemV4 author="Ada" handle="ada" text="nice @grace #v4" timestamp="2h" likeCount={3} liked pinned>
          <CommentItemV4 author="Grace" text="thanks!" timestamp="1h" depth={1} />
        </CommentItemV4>
        <StoryBarV4 stories={stories} onPressStory={() => {}} onPressAdd={() => {}} />
        <UserCardV4
          variant="card"
          user={{ name: 'Ada', handle: 'ada', bio: 'Mathematician', verified: true }}
          stats={[{ label: 'Followers', value: 12 }]}
          followState="follow"
          onFollow={() => {}}
        />
        <EngagementBarV4 likeCount={5} commentCount={2} shareCount={1} liked onLike={() => {}} onComment={() => {}} onShare={() => {}} onBookmark={() => {}} />
        <ReactionBarV4
          reactions={[
            { key: 'like', emoji: '👍', count: 4, reacted: true, label: 'Like' },
            { key: 'love', emoji: '❤️', count: 2, label: 'Love' },
          ]}
          onReact={() => {}}
          onAddReaction={() => {}}
        />
        <FollowButtonV4 state="follow" onClick={() => {}} />
        <HashtagChipV4 tag="v4" count="1.2k" onClick={() => {}} />
        <MentionTextV4 text="hi @grace check #v4" onPressMention={() => {}} onPressHashtag={() => {}} />
        <PollV4
          question="Best design line?"
          options={[
            { id: 'a', label: 'V2', votes: 3 },
            { id: 'b', label: 'V4', votes: 7 },
          ]}
          votedOptionId="b"
        />
        <ProfileStatsV4 stats={[{ label: 'Posts', value: 12 }, { label: 'Followers', value: '3.4k' }]} dividers />
        <ShareSheetV4 visible title="Share" targets={[{ id: 't1', label: 'Copy link', icon: '🔗' }]} onSelect={() => {}} onClose={() => {}} />
        <StoryRingV4 name="Ada" state="unseen" onClick={() => {}} />
        <FeedListV4 data={['p1', 'p2']} renderItem={(id) => <PostCardV4 key={id} author={author} text={id} />} />
      </div>
    );
    expect(HEX_LITERAL.test(inlineStyles(container))).toBe(false);
  });

  it('FollowButtonV4 fires onClick with the current state', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<FollowButtonV4 state="follow" onClick={onClick} />);
    fireEvent.click(getByRole('button', { name: 'Follow' }));
    expect(onClick).toHaveBeenCalledWith('follow');
  });

  it('PollV4 fires onVote with the option id', () => {
    const onVote = jest.fn();
    const { getByLabelText } = render(
      <PollV4 question="Q?" options={[{ id: 'a', label: 'Option A' }, { id: 'b', label: 'Option B' }]} onVote={onVote} />
    );
    fireEvent.click(getByLabelText('Option B'));
    expect(onVote).toHaveBeenCalledWith('b');
  });
});

describe('social V4 new blocks (web)', () => {
  it('mounts all 6 new components token-pure (no inline hex)', () => {
    const { container } = render(
      <div>
        <ProfileHeader
          name="Ada Lovelace"
          handle="ada"
          verified
          bio="Mathematician & first programmer"
          stats={[{ label: 'Posts', value: '128' }, { label: 'Followers', value: '3.4k' }]}
          coverUrl="/cover.jpg"
          following={false}
          onFollow={() => {}}
        />
        <StoryViewer
          segments={4}
          activeIndex={1}
          author={{ name: 'Grace' }}
          timeLabel="2h"
          imageUrl="/s.jpg"
          caption="on tour"
          onNext={() => {}}
          onPrev={() => {}}
          onClose={() => {}}
          onReply={() => {}}
        />
        <PostComposer
          authorName="Ada"
          value="hello"
          onChangeText={() => {}}
          maxLength={280}
          onPost={() => {}}
          onAddPhoto={() => {}}
          onAddPoll={() => {}}
          onAddEmoji={() => {}}
        />
        <NotificationRow kind="like" actor={{ name: 'Grace', verified: true }} time="2h" unread thumbnailUrl="/t.jpg" onPress={() => {}} />
        <TrendingCard rank={1} category="Trending in Tech" topic="#Xenition" postCount="12.4K posts" onPress={() => {}} onMenu={() => {}} />
        <SuggestedUsers
          users={[
            { id: 'u1', name: 'Grace', handle: 'grace', verified: true, bio: 'Compiler pioneer' },
            { id: 'u2', name: 'Alan', handle: 'alan', following: true },
          ]}
          onFollow={() => {}}
          onPressUser={() => {}}
          onSeeAll={() => {}}
        />
      </div>
    );
    expect(HEX_LITERAL.test(inlineStyles(container))).toBe(false);
  });

  it('PostComposer fires onChangeText then onPost', () => {
    const onChangeText = jest.fn();
    const onPost = jest.fn();
    const { getByLabelText } = render(
      <PostComposer authorName="Ada" value="hi" onChangeText={onChangeText} onPost={onPost} />
    );
    fireEvent.change(getByLabelText("What's on your mind?"), { target: { value: 'hello world' } });
    expect(onChangeText).toHaveBeenCalledWith('hello world');
    fireEvent.click(getByLabelText('Post'));
    expect(onPost).toHaveBeenCalledTimes(1);
  });

  it('NotificationRow fires onPress', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <NotificationRow kind="comment" actor={{ name: 'Grace' }} time="1h" onPress={onPress} />
    );
    fireEvent.click(getByRole('button', { name: /Grace commented on your post/ }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('SuggestedUsers fires onFollow with the user id', () => {
    const onFollow = jest.fn();
    const { getByRole } = render(
      <SuggestedUsers
        users={[{ id: 'u1', name: 'Grace', handle: 'grace' }]}
        onFollow={onFollow}
      />
    );
    fireEvent.click(getByRole('button', { name: 'Follow' }));
    expect(onFollow).toHaveBeenCalledWith('u1');
  });
});
