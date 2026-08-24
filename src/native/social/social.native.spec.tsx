import * as React from 'react';
import { StyleSheet } from 'react-native';
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
import { PostCard } from './PostCard';
import { FeedList } from './FeedList';
import { FollowButton } from './FollowButton';
import { ReactionBar } from './ReactionBar';
import { EngagementBar } from './EngagementBar';
import { Poll } from './Poll';
import { HashtagChip } from './HashtagChip';
import { MentionText, parseMentions } from './MentionText';
import { ShareSheet } from './ShareSheet';
import { StoryBar } from './StoryBar';
import { UserCard } from './UserCard';
import { CommentItem } from './CommentItem';
import { ProfileStats } from './ProfileStats';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

/** The active-scheme semantic colors for a seed. */
function colorsFor(seed: typeof SEED_LIGHT) {
  const compiled = compileTheme(seed);
  const tokens = toNativeTokens(compiled);
  const scheme = seed.mode === 'dark' ? 'dark' : 'light';
  return tokens.colors[scheme];
}

describe('PostCard (native)', () => {
  it('renders every variant and mounts author + body', () => {
    (['text', 'image', 'link', 'video'] as const).forEach((variant) => {
      const { getByText } = renderThemed(
        <PostCard
          variant={variant}
          author={{ name: 'Ada Lovelace', handle: 'ada', verified: true }}
          timestamp="3h"
          text="shipping #native today"
          imageUrl="https://example.com/a.jpg"
          link={{ url: 'https://x.com', title: 'A link', domain: 'x.com' }}
          video={{ duration: '1:24' }}
        />,
        SEED_LIGHT
      );
      expect(getByText('Ada Lovelace')).toBeTruthy();
    });
  });

  it('fires onLike from the engagement footer', () => {
    const onLike = jest.fn();
    const { getByLabelText } = renderThemed(
      <PostCard author={{ name: 'Grace' }} text="hi" likeCount={2} onLike={onLike} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Like, 2'));
    expect(onLike).toHaveBeenCalledTimes(1);
  });

  it('renders a loading skeleton without crashing', () => {
    const { getByLabelText } = renderThemed(
      <PostCard author={{ name: '' }} loading />,
      SEED_DARK
    );
    expect(getByLabelText('Loading post')).toBeTruthy();
  });
});

describe('FeedList (native)', () => {
  it('renders rows through renderItem', () => {
    const posts = [
      { id: '1', name: 'Ada' },
      { id: '2', name: 'Grace' },
    ];
    const { getByText } = renderThemed(
      <FeedList
        data={posts}
        keyExtractor={(p) => p.id}
        scrollEnabled={false}
        renderItem={(p) => <PostCard author={{ name: p.name }} text="post" />}
      />,
      SEED_LIGHT
    );
    expect(getByText('Ada')).toBeTruthy();
    expect(getByText('Grace')).toBeTruthy();
  });

  it('shows the empty state when data is empty', () => {
    const { getByText } = renderThemed(
      <FeedList
        data={[]}
        scrollEnabled={false}
        emptyTitle="No posts yet"
        renderItem={() => null}
      />,
      SEED_LIGHT
    );
    expect(getByText('No posts yet')).toBeTruthy();
  });
});

describe('FollowButton (native)', () => {
  it('renders each state label and reports the current state on press', () => {
    const onPress = jest.fn();
    (['follow', 'following', 'requested'] as const).forEach((state) => {
      const { getByText } = renderThemed(
        <FollowButton state={state} onPress={onPress} />,
        SEED_LIGHT
      );
      const label = state.charAt(0).toUpperCase() + state.slice(1);
      fireEvent.press(getByText(label));
    });
    expect(onPress).toHaveBeenNthCalledWith(1, 'follow');
    expect(onPress).toHaveBeenNthCalledWith(2, 'following');
    expect(onPress).toHaveBeenNthCalledWith(3, 'requested');
  });
});

describe('ReactionBar (native)', () => {
  it('fires onReact with the reaction key', () => {
    const onReact = jest.fn();
    const { getByLabelText } = renderThemed(
      <ReactionBar
        reactions={[
          { key: 'like', emoji: '👍', label: 'Like', count: 3, reacted: true },
          { key: 'love', emoji: '❤️', label: 'Love', count: 1 },
        ]}
        onReact={onReact}
      />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Love, 1'));
    expect(onReact).toHaveBeenCalledWith('love');
  });

  it('shows the empty label with no reactions', () => {
    const { getByText } = renderThemed(<ReactionBar reactions={[]} />, SEED_LIGHT);
    expect(getByText('No reactions yet')).toBeTruthy();
  });
});

describe('EngagementBar (native)', () => {
  it('tints a liked heart with the danger token', () => {
    const c = colorsFor(SEED_LIGHT);
    const { getByLabelText } = renderThemed(
      <EngagementBar liked likeCount={5} onLike={() => undefined} />,
      SEED_LIGHT
    );
    const like = getByLabelText('Like, 5');
    // The heart glyph Text is the first child; assert the danger tint appears.
    const hexes = renderedStyleHexes(like);
    expect(hexes).toContain(c.danger.toLowerCase());
  });
});

describe('Poll (native)', () => {
  it('votes when open, and shows percentages once voted', () => {
    const onVote = jest.fn();
    const open = renderThemed(
      <Poll
        question="Best stack?"
        options={[
          { id: 'a', label: 'RN', votes: 3 },
          { id: 'b', label: 'Flutter', votes: 1 },
        ]}
        onVote={onVote}
      />,
      SEED_LIGHT
    );
    fireEvent.press(open.getByLabelText('RN'));
    expect(onVote).toHaveBeenCalledWith('a');

    const voted = renderThemed(
      <Poll
        question="Best stack?"
        votedOptionId="a"
        options={[
          { id: 'a', label: 'RN', votes: 3 },
          { id: 'b', label: 'Flutter', votes: 1 },
        ]}
      />,
      SEED_LIGHT
    );
    expect(voted.getByText('75%')).toBeTruthy();
    expect(voted.getByText('25%')).toBeTruthy();
  });

  it('guards an all-zero tally (no division by zero)', () => {
    const { getByText } = renderThemed(
      <Poll question="Q" closed options={[{ id: 'a', label: 'A', votes: 0 }]} />,
      SEED_LIGHT
    );
    expect(getByText('0%')).toBeTruthy();
  });
});

describe('HashtagChip (native)', () => {
  it('normalizes the tag and fires the bare value', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <HashtagChip tag="reactnative" active onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('#reactnative'));
    expect(onPress).toHaveBeenCalledWith('reactnative');
  });
});

describe('MentionText (native)', () => {
  it('parses mentions and hashtags in order', () => {
    expect(parseMentions('hi @ada see #rn')).toEqual([
      { kind: 'text', value: 'hi ' },
      { kind: 'mention', value: '@ada' },
      { kind: 'text', value: ' see ' },
      { kind: 'hashtag', value: '#rn' },
    ]);
  });

  it('fires the mention handler with the bare handle', () => {
    const onPressMention = jest.fn();
    const { getByText } = renderThemed(
      <MentionText text="ping @grace now" onPressMention={onPressMention} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('@grace'));
    expect(onPressMention).toHaveBeenCalledWith('grace');
  });
});

describe('ShareSheet (native)', () => {
  it('renders nothing when hidden', () => {
    const { queryByText } = renderThemed(
      <ShareSheet visible={false} targets={[{ id: 'c', label: 'Copy link' }]} />,
      SEED_LIGHT
    );
    expect(queryByText('Copy link')).toBeNull();
  });

  it('selects a target when visible', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <ShareSheet visible targets={[{ id: 'c', label: 'Copy link', icon: '🔗' }]} onSelect={onSelect} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Copy link'));
    expect(onSelect).toHaveBeenCalledWith('c');
  });
});

describe('StoryBar / UserCard / CommentItem / ProfileStats (native)', () => {
  it('StoryBar fires onPressStory', () => {
    const onPressStory = jest.fn();
    const { getByLabelText } = renderThemed(
      <StoryBar stories={[{ id: 's1', name: 'Ada', state: 'live' }]} showAdd={false} onPressStory={onPressStory} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Ada, live'));
    expect(onPressStory).toHaveBeenCalledWith('s1');
  });

  it('UserCard card variant renders bio + follow + stats', () => {
    const onFollow = jest.fn();
    const { getByText } = renderThemed(
      <UserCard
        variant="card"
        user={{ name: 'Ada', handle: 'ada', bio: 'building things', verified: true }}
        stats={[{ label: 'Posts', value: 12 }, { label: 'Followers', value: '3.4k' }]}
        followState="follow"
        onFollow={onFollow}
      />,
      SEED_LIGHT
    );
    expect(getByText('building things')).toBeTruthy();
    expect(getByText('3.4k')).toBeTruthy();
    fireEvent.press(getByText('Follow'));
    expect(onFollow).toHaveBeenCalledWith('follow');
  });

  it('CommentItem fires reply', () => {
    const onReply = jest.fn();
    const { getByText } = renderThemed(
      <CommentItem author="Ada" text="nice @grace" timestamp="2h" onReply={onReply} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Reply'));
    expect(onReply).toHaveBeenCalledTimes(1);
  });

  it('ProfileStats fires the column handler', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <ProfileStats stats={[{ label: 'Followers', value: '1.2k', onPress }]} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('1.2k Followers'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('token purity (native social, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <PostCard
            variant="image"
            author={{ name: 'Ada', handle: 'ada', verified: true }}
            timestamp="3h"
            text="hello @grace #native"
            imageUrl="https://example.com/a.jpg"
            likeCount={4}
            liked
            onLike={() => undefined}
            onComment={() => undefined}
            onShare={() => undefined}
            onBookmark={() => undefined}
          />
          <FollowButton state="following" onPress={() => undefined} />
          <ReactionBar reactions={[{ key: 'like', emoji: '👍', count: 3, reacted: true }]} onAddReaction={() => undefined} />
          <Poll question="Q" votedOptionId="a" options={[{ id: 'a', label: 'A', votes: 2 }, { id: 'b', label: 'B', votes: 1 }]} />
          <HashtagChip tag="rn" active onPress={() => undefined} />
          <UserCard variant="card" user={{ name: 'Ada', bio: 'hi' }} stats={[{ label: 'Posts', value: 1 }]} followState="requested" onFollow={() => undefined} />
          <CommentItem author="Ada" text="hi @grace #rn" liked likeCount={2} pinned onLike={() => undefined} onReply={() => undefined} />
          <ShareSheet visible targets={[{ id: 'c', label: 'Copy', icon: '🔗' }]} subtitle="https://x.com" onClose={() => undefined} onSelect={() => undefined} />
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
