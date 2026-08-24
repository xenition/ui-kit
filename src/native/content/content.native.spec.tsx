import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  tokenHexSet,
  renderedStyleHexes,
} from '../spec-support/render-native';
import { ArticleCard } from './ArticleCard';
import { ArticleHeader } from './ArticleHeader';
import { ReadingProgress } from './ReadingProgress';
import { AuthorByline } from './AuthorByline';
import { TableOfContents } from './TableOfContents';
import { PullQuote } from './PullQuote';
import { TagList } from './TagList';
import { CategoryChip } from './CategoryChip';
import { RelatedArticles } from './RelatedArticles';
import { ShareRow } from './ShareRow';
import { BookmarkButton } from './BookmarkButton';
import { NewsTicker } from './NewsTicker';
import { PodcastRow } from './PodcastRow';
import type { ArticleSummary } from './types';

const ARTICLE: ArticleSummary = {
  id: 'a1',
  title: 'The State of Native Design Systems',
  excerpt: 'How token-driven theming crossed the web/native divide.',
  imageUrl: 'https://example.com/cover.jpg',
  category: 'Engineering',
  author: { name: 'Ada Lovelace', role: 'Principal Engineer', avatarUrl: undefined },
  date: 'Aug 24',
  readingTime: '6 min read',
};

describe('content components (native)', () => {
  it('ArticleCard mounts and fires onPress with the article', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <ArticleCard article={ARTICLE} onPress={onPress} variant="featured" />,
      SEED_LIGHT
    );
    expect(getByText(ARTICLE.title)).toBeTruthy();
    fireEvent.press(getByText(ARTICLE.title));
    expect(onPress).toHaveBeenCalledWith(ARTICLE);
  });

  it('ArticleHeader renders headline, category and byline', () => {
    const { getByText } = renderThemed(
      <ArticleHeader
        title={ARTICLE.title}
        deck="A field report."
        category="Engineering"
        author={ARTICLE.author}
        date={ARTICLE.date}
        readingTime={ARTICLE.readingTime}
        variant="hero"
      />,
      SEED_LIGHT
    );
    expect(getByText(ARTICLE.title)).toBeTruthy();
    expect(getByText('Engineering')).toBeTruthy();
    expect(getByText('Ada Lovelace')).toBeTruthy();
  });

  it('ArticleHeader loading shows a skeleton (no title text)', () => {
    const { queryByText } = renderThemed(
      <ArticleHeader title={ARTICLE.title} loading />,
      SEED_LIGHT
    );
    expect(queryByText(ARTICLE.title)).toBeNull();
  });

  it('BookmarkButton toggles: calls onToggle with the negated state', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <BookmarkButton bookmarked={false} onToggle={onToggle} variant="labeled" />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Bookmark article'));
    expect(onToggle).toHaveBeenCalledWith(true);

    const saved = renderThemed(<BookmarkButton bookmarked onToggle={onToggle} />, SEED_LIGHT);
    fireEvent.press(saved.getByLabelText('Remove bookmark'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('TagList renders tags and fires onTagPress with label + index', () => {
    const onTagPress = jest.fn();
    const { getByText } = renderThemed(
      <TagList tags={['design', 'tokens', 'native']} onTagPress={onTagPress} />,
      SEED_LIGHT
    );
    expect(getByText('#tokens')).toBeTruthy();
    fireEvent.press(getByText('#tokens'));
    expect(onTagPress).toHaveBeenCalledWith('tokens', 1);
  });

  it('TagList honours max with a +N overflow chip', () => {
    const { getByText, queryByText } = renderThemed(
      <TagList tags={['a', 'b', 'c', 'd']} max={2} />,
      SEED_LIGHT
    );
    expect(getByText('#a')).toBeTruthy();
    expect(queryByText('#c')).toBeNull();
    expect(getByText('+2')).toBeTruthy();
  });

  it('TagList renders an empty label when there are no tags', () => {
    const { getByText } = renderThemed(<TagList tags={[]} emptyLabel="No tags yet" />, SEED_LIGHT);
    expect(getByText('No tags yet')).toBeTruthy();
  });

  it('ShareRow fires onShare with the pressed target id', () => {
    const onShare = jest.fn();
    const { getByLabelText } = renderThemed(<ShareRow onShare={onShare} variant="labeled" />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Copy link'));
    expect(onShare).toHaveBeenCalledWith('link');
  });

  it('RelatedArticles renders its empty state when the list is empty', () => {
    const { getByText, queryByText } = renderThemed(
      <RelatedArticles articles={[]} emptyLabel="Nothing related yet" />,
      SEED_LIGHT
    );
    expect(getByText('Nothing related yet')).toBeTruthy();
    // heading still renders, but no article card
    expect(queryByText(ARTICLE.title)).toBeNull();
  });

  it('RelatedArticles renders cards and fires onArticlePress', () => {
    const onArticlePress = jest.fn();
    const { getByText } = renderThemed(
      <RelatedArticles articles={[ARTICLE]} onArticlePress={onArticlePress} variant="grid" />,
      SEED_LIGHT
    );
    fireEvent.press(getByText(ARTICLE.title));
    expect(onArticlePress).toHaveBeenCalledWith(ARTICLE);
  });

  it('TableOfContents highlights the active heading and fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByText } = renderThemed(
      <TableOfContents
        items={[
          { id: 'intro', label: 'Intro', level: 1 },
          { id: 'deep', label: 'Deep Dive', level: 2 },
        ]}
        activeId="deep"
        onSelect={onSelect}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Intro'));
    expect(onSelect).toHaveBeenCalledWith('intro');
  });

  it('NewsTicker renders headlines and fires onItemPress', () => {
    const onItemPress = jest.fn();
    const { getByText } = renderThemed(
      <NewsTicker
        label="LIVE"
        items={[
          { id: 'h1', text: 'Markets rally' },
          { id: 'h2', text: 'Storm warning issued' },
        ]}
        onItemPress={onItemPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('LIVE')).toBeTruthy();
    fireEvent.press(getByText('Storm warning issued'));
    expect(onItemPress).toHaveBeenCalledWith('h2');
  });

  it('NewsTicker shows an empty label when there are no headlines', () => {
    const { getByText } = renderThemed(
      <NewsTicker items={[]} emptyLabel="No headlines" />,
      SEED_LIGHT
    );
    expect(getByText('No headlines')).toBeTruthy();
  });

  it('PodcastRow toggles play and fires onPress separately', () => {
    const onPlayToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <PodcastRow
        episode={{ id: 'e1', title: 'Episode 12', show: 'The Reader', duration: '42 min' }}
        playing={false}
        onPlayToggle={onPlayToggle}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Play Episode 12'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
  });

  it('CategoryChip fires onPress and PullQuote/ReadingProgress/AuthorByline mount', () => {
    const onPress = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <>
        <CategoryChip label="Opinion" onPress={onPress} variant="outline" />
        <PullQuote quote="Tokens are the contract." attribution="A. Dev" variant="large" />
        <ReadingProgress progress={0.42} variant="labeled" />
        <AuthorByline author={ARTICLE.author!} date="Aug 24" readingTime="6 min" variant="compact" />
      </>,
      SEED_LIGHT
    );
    expect(getByText('“Tokens are the contract.”')).toBeTruthy();
    expect(getByText('42%')).toBeTruthy();
    fireEvent.press(getByLabelText('Category Opinion'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  describe('token purity: every rendered color traces to a theme token', () => {
    it.each([
      ['light', SEED_LIGHT],
      ['dark', SEED_DARK],
    ] as const)('%s scheme uses only compiled token hexes', (_name, seed) => {
      const { toJSON, root } = renderThemed(
        <>
          <ArticleCard article={ARTICLE} onPress={jest.fn()} />
          <ArticleHeader title={ARTICLE.title} category="News" author={ARTICLE.author} />
          <ReadingProgress progress={0.5} variant="labeled" />
          <TableOfContents items={[{ id: 'a', label: 'A' }]} activeId="a" onSelect={jest.fn()} />
          <PullQuote quote="Q" attribution="X" />
          <TagList tags={['x', 'y']} onTagPress={jest.fn()} />
          <CategoryChip label="News" variant="solid" />
          <RelatedArticles articles={[]} />
          <ShareRow onShare={jest.fn()} />
          <BookmarkButton bookmarked onToggle={jest.fn()} variant="labeled" />
          <NewsTicker items={[{ id: 'h', text: 'H' }]} onItemPress={jest.fn()} />
          <PodcastRow
            episode={{ id: 'e', title: 'E', show: 'S', duration: '1 min' }}
            playing
            onPlayToggle={jest.fn()}
          />
        </>,
        seed
      );
      expect(toJSON()).toBeTruthy();
      const allowed = tokenHexSet(seed);
      renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
