import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import type { ThemeSeed } from '../../theme/types';
import { PostCardV2 } from './PostCardV2';
import { PostCardV3 } from './PostCardV3';
import { UserCardV2 } from './UserCardV2';
import { UserCardV3 } from './UserCardV3';
import { CommentItemV2 } from './CommentItemV2';
import { CommentItemV3 } from './CommentItemV3';
import { StoryBarV2 } from './StoryBarV2';
import { StoryBarV3 } from './StoryBarV3';
import type { PostVariant } from './PostCard';
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

const SEEDS: ReadonlyArray<ThemeSeed> = [SEED_LIGHT, SEED_DARK];
const POST_VARIANTS: ReadonlyArray<PostVariant> = ['text', 'image', 'link', 'video'];

/** Assert every rendered hex in the tree traces to a compiled token. */
function expectTokenPure(root: Parameters<typeof renderedStyleHexes>[0], seed: ThemeSeed): void {
  const allowed = tokenHexSet(seed);
  const found = renderedStyleHexes(root);
  expect(found.length).toBeGreaterThan(0);
  found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
}

describe('PostCard alternate designs (V2 / V3, native)', () => {
  (['V2', 'V3'] as const).forEach((tag) => {
    const Comp = tag === 'V2' ? PostCardV2 : PostCardV3;
    POST_VARIANTS.forEach((variant) => {
      SEEDS.forEach((seed) => {
        it(`PostCard${tag} mounts the "${variant}" variant token-pure (${seed.mode})`, () => {
          const { getByText, root } = renderThemed(
            <Comp
              variant={variant}
              author={{ name: 'Ada Lovelace', handle: 'ada', verified: true }}
              timestamp="3h"
              text="shipping @grace #native today"
              imageUrl="https://example.com/a.jpg"
              imageAlt="a photo"
              link={{ url: 'https://x.com', title: 'A link', domain: 'x.com', description: 'desc', imageUrl: 'https://example.com/l.jpg' }}
              video={{ thumbnailUrl: 'https://example.com/v.jpg', duration: '1:24' }}
              likeCount={4}
              liked
              onLike={() => undefined}
              onComment={() => undefined}
              onShare={() => undefined}
              onBookmark={() => undefined}
            />,
            seed
          );
          expect(getByText('Ada Lovelace')).toBeTruthy();
          expectTokenPure(root, seed);
        });
      });
    });
  });

  it('PostCardV2 fires onLike from the floating engagement pill', () => {
    const onLike = jest.fn();
    const { getByLabelText } = renderThemed(
      <PostCardV2 variant="image" author={{ name: 'Grace' }} imageUrl="https://example.com/a.jpg" likeCount={2} onLike={onLike} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Like, 2'));
    expect(onLike).toHaveBeenCalledTimes(1);
  });

  it('PostCardV3 fires onPress through the pressable container', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <PostCardV3 author={{ name: 'Grace' }} text="tap me" onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Post by Grace'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('both render a loading skeleton without crashing', () => {
    const v2 = renderThemed(<PostCardV2 author={{ name: '' }} loading />, SEED_DARK);
    expect(v2.getByLabelText('Loading post')).toBeTruthy();
    const v3 = renderThemed(<PostCardV3 author={{ name: '' }} loading />, SEED_LIGHT);
    expect(v3.getByLabelText('Loading post')).toBeTruthy();
  });
});

describe('UserCard alternate designs (V2 / V3, native)', () => {
  (['V2', 'V3'] as const).forEach((tag) => {
    const Comp = tag === 'V2' ? UserCardV2 : UserCardV3;
    (['row', 'card'] as const).forEach((variant) => {
      SEEDS.forEach((seed) => {
        it(`UserCard${tag} mounts the "${variant}" variant token-pure (${seed.mode})`, () => {
          const { getByText, root } = renderThemed(
            <Comp
              variant={variant}
              user={{ name: 'Ada', handle: 'ada', bio: 'building things', verified: true }}
              stats={[{ label: 'Posts', value: 12 }, { label: 'Followers', value: '3.4k' }]}
              followState="follow"
              onFollow={() => undefined}
            />,
            seed
          );
          expect(getByText('Ada')).toBeTruthy();
          expectTokenPure(root, seed);
        });
      });
    });
  });

  it('UserCardV2 fires onFollow with the current state', () => {
    const onFollow = jest.fn();
    const { getByText } = renderThemed(
      <UserCardV2 variant="card" user={{ name: 'Ada', bio: 'hi' }} stats={[{ label: 'Posts', value: 1 }]} followState="follow" onFollow={onFollow} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Follow'));
    expect(onFollow).toHaveBeenCalledWith('follow');
  });

  it('UserCardV3 fires onPress through the pressable row', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <UserCardV3 user={{ name: 'Ada', handle: 'ada' }} onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Ada'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('CommentItem alternate designs (V2 / V3, native)', () => {
  (['V2', 'V3'] as const).forEach((tag) => {
    const Comp = tag === 'V2' ? CommentItemV2 : CommentItemV3;
    SEEDS.forEach((seed) => {
      it(`CommentItem${tag} mounts (pinned + nested) token-pure (${seed.mode})`, () => {
        const { getByText, root } = renderThemed(
          <Comp author="Ada" handle="ada" text="nice @grace #rn" timestamp="2h" likeCount={3} liked pinned depth={1} onLike={() => undefined} onReply={() => undefined}>
            <Comp author="Grace" text="thanks!" timestamp="1h" depth={2} />
          </Comp>,
          seed
        );
        expect(getByText('Ada')).toBeTruthy();
        expectTokenPure(root, seed);
      });
    });
  });

  it('CommentItemV2 fires reply', () => {
    const onReply = jest.fn();
    const { getByText } = renderThemed(
      <CommentItemV2 author="Ada" text="hi @grace" timestamp="2h" onReply={onReply} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Reply'));
    expect(onReply).toHaveBeenCalledTimes(1);
  });

  it('CommentItemV3 fires like', () => {
    const onLike = jest.fn();
    const { getByLabelText } = renderThemed(
      <CommentItemV3 author="Ada" text="hi" likeCount={5} onLike={onLike} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Like, 5'));
    expect(onLike).toHaveBeenCalledTimes(1);
  });
});

describe('StoryBar alternate designs (V2 / V3, native)', () => {
  const stories = [
    { id: 's1', name: 'Ada', state: 'unseen' as const, src: 'https://example.com/a.jpg' },
    { id: 's2', name: 'Grace', state: 'seen' as const },
    { id: 's3', name: 'Lin', state: 'live' as const },
  ];

  (['V2', 'V3'] as const).forEach((tag) => {
    const Comp = tag === 'V2' ? StoryBarV2 : StoryBarV3;
    SEEDS.forEach((seed) => {
      it(`StoryBar${tag} mounts (add + stories) token-pure (${seed.mode})`, () => {
        const { root } = renderThemed(<Comp stories={stories} onPressStory={() => undefined} />, seed);
        expectTokenPure(root, seed);
      });
    });

    it(`StoryBar${tag} renders an empty rail without crashing`, () => {
      const { root } = renderThemed(<Comp stories={[]} showAdd={false} />, SEED_LIGHT);
      expect(root).toBeTruthy();
    });
  });

  it('StoryBarV2 fires onPressStory', () => {
    const onPressStory = jest.fn();
    const { getByLabelText } = renderThemed(
      <StoryBarV2 stories={[{ id: 's1', name: 'Ada', state: 'live' }]} showAdd={false} onPressStory={onPressStory} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Ada, live'));
    expect(onPressStory).toHaveBeenCalledWith('s1');
  });

  it('StoryBarV3 fires onPressStory', () => {
    const onPressStory = jest.fn();
    const { getByLabelText } = renderThemed(
      <StoryBarV3 stories={[{ id: 's1', name: 'Ada', state: 'unseen' }]} showAdd={false} onPressStory={onPressStory} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Ada'));
    expect(onPressStory).toHaveBeenCalledWith('s1');
  });
});

// ── V4 "feed" line (native) ── aggregate both-seeds render + token-purity.
const v4Author: PostAuthor = { name: 'Ada Lovelace', handle: 'ada', verified: true };
const v4Stories = [
  { id: 's1', name: 'Ada', state: 'unseen' as const, src: 'https://example.com/a.jpg' },
  { id: 's2', name: 'Grace', state: 'live' as const },
  { id: 's3', name: 'Lin', state: 'seen' as const },
];

describe('social V4 "feed" line (native)', () => {
  // All 14 V4 variants — including the gradient pieces (StoryBarV4, StoryRingV4)
  // — mount in one aggregate tree per seed so every rendered hex traces to a
  // compiled token across both light and dark seeds.
  SEEDS.forEach((seed) => {
    it(`mounts all 14 V4 variants token-pure (${seed.mode})`, () => {
      const { getAllByText, root } = renderThemed(
        <>
          <PostCardV4
            variant="image"
            author={v4Author}
            timestamp="3h"
            text="shipping @grace #v4 today"
            imageUrl="https://example.com/a.jpg"
            likeCount={5}
            commentCount={2}
            liked
            onLike={() => undefined}
            onComment={() => undefined}
          />
          <CommentItemV4 author="Ada" handle="ada" text="nice @grace #v4" timestamp="2h" likeCount={3} liked pinned onLike={() => undefined} onReply={() => undefined}>
            <CommentItemV4 author="Grace" text="thanks!" timestamp="1h" depth={1} />
          </CommentItemV4>
          <StoryBarV4 stories={v4Stories} onPressStory={() => undefined} onPressAdd={() => undefined} />
          <StoryRingV4 name="Ada" state="unseen" onPress={() => undefined} />
          <UserCardV4
            variant="card"
            user={{ name: 'Ada', handle: 'ada', bio: 'Mathematician', verified: true }}
            stats={[{ label: 'Posts', value: 12 }, { label: 'Followers', value: '3.4k' }]}
            followState="follow"
            onFollow={() => undefined}
          />
          <EngagementBarV4 likeCount={5} commentCount={2} shareCount={1} liked onLike={() => undefined} onComment={() => undefined} onShare={() => undefined} onBookmark={() => undefined} />
          <ReactionBarV4
            reactions={[
              { key: 'like', emoji: '👍', count: 4, reacted: true, label: 'Like' },
              { key: 'love', emoji: '❤️', count: 2, label: 'Love' },
            ]}
            onReact={() => undefined}
            onAddReaction={() => undefined}
          />
          <FollowButtonV4 state="follow" onPress={() => undefined} />
          <HashtagChipV4 tag="v4" count="1.2k" onPress={() => undefined} />
          <MentionTextV4 text="hi @grace check #v4" onPressMention={() => undefined} onPressHashtag={() => undefined} />
          <PollV4
            question="Best design line?"
            options={[
              { id: 'a', label: 'V2', votes: 3 },
              { id: 'b', label: 'V4', votes: 7 },
            ]}
            votedOptionId="b"
          />
          <ProfileStatsV4 stats={[{ label: 'Posts', value: 12 }, { label: 'Followers', value: '3.4k' }]} dividers />
          <ShareSheetV4 visible title="Share" targets={[{ id: 't1', label: 'Copy link', icon: '🔗' }]} onSelect={() => undefined} onClose={() => undefined} />
          <FeedListV4 data={['p1', 'p2']} renderItem={(id: string) => <PostCardV4 key={id} author={v4Author} text={id} />} />
        </>,
        seed
      );
      expect(getAllByText('Ada Lovelace').length).toBeGreaterThan(0);
      expectTokenPure(root, seed);
    });
  });

  it('FollowButtonV4 fires onPress with the current state', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(<FollowButtonV4 state="follow" onPress={onPress} />, SEED_LIGHT);
    fireEvent.press(getByText('Follow'));
    expect(onPress).toHaveBeenCalledWith('follow');
  });

  it('PollV4 fires onVote with the option id', () => {
    const onVote = jest.fn();
    const { getByLabelText } = renderThemed(
      <PollV4 question="Q?" options={[{ id: 'a', label: 'Option A' }, { id: 'b', label: 'Option B' }]} onVote={onVote} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Option B'));
    expect(onVote).toHaveBeenCalledWith('b');
  });
});

describe('social V4 new blocks (native)', () => {
  // The gradient identity moments (ProfileHeader, StoryViewer) mount in the
  // both-seeds aggregate render alongside the surface blocks.
  SEEDS.forEach((seed) => {
    it(`mounts all 6 new components token-pure (${seed.mode})`, () => {
      const { getByText, root } = renderThemed(
        <>
          <ProfileHeader
            name="Ada Lovelace"
            handle="ada"
            verified
            bio="Mathematician & first programmer"
            stats={[{ label: 'Posts', value: '128' }, { label: 'Followers', value: '3.4k' }]}
            coverUrl="https://example.com/cover.jpg"
            following={false}
            onFollow={() => undefined}
          />
          <StoryViewer
            segments={4}
            activeIndex={1}
            author={{ name: 'Grace' }}
            timeLabel="2h"
            imageUrl="https://example.com/s.jpg"
            caption="on tour"
            onNext={() => undefined}
            onPrev={() => undefined}
            onClose={() => undefined}
            onReply={() => undefined}
          />
          <PostComposer
            authorName="Ada"
            value="hello"
            onChangeText={() => undefined}
            maxLength={280}
            onPost={() => undefined}
            onAddPhoto={() => undefined}
            onAddPoll={() => undefined}
            onAddEmoji={() => undefined}
          />
          <NotificationRow kind="like" actor={{ name: 'Grace', verified: true }} time="2h" unread thumbnailUrl="https://example.com/t.jpg" onPress={() => undefined} />
          <TrendingCard rank={1} category="Trending in Tech" topic="#Xenition" postCount="12.4K posts" onPress={() => undefined} onMenu={() => undefined} />
          <SuggestedUsers
            users={[
              { id: 'u1', name: 'Grace', handle: 'grace', verified: true, bio: 'Compiler pioneer' },
              { id: 'u2', name: 'Alan', handle: 'alan', following: true },
            ]}
            onFollow={() => undefined}
            onPressUser={() => undefined}
            onSeeAll={() => undefined}
          />
        </>,
        seed
      );
      expect(getByText('Ada Lovelace')).toBeTruthy();
      expectTokenPure(root, seed);
    });
  });

  it('PostComposer fires onChangeText then onPost', () => {
    const onChangeText = jest.fn();
    const onPost = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <PostComposer authorName="Ada" value="hi" onChangeText={onChangeText} onPost={onPost} />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByLabelText("What's on your mind?"), 'hello world');
    expect(onChangeText).toHaveBeenCalledWith('hello world');
    fireEvent.press(getByText('Post'));
    expect(onPost).toHaveBeenCalledTimes(1);
  });

  it('NotificationRow fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <NotificationRow kind="comment" actor={{ name: 'Grace' }} time="1h" onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText(/Grace commented on your post/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('SuggestedUsers fires onFollow with the user id', () => {
    const onFollow = jest.fn();
    const { getByText } = renderThemed(
      <SuggestedUsers users={[{ id: 'u1', name: 'Grace', handle: 'grace' }]} onFollow={onFollow} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Follow'));
    expect(onFollow).toHaveBeenCalledWith('u1');
  });
});
