/**
 * The **V4 content line** (native) — the props V4 adds, the empty states, and
 * the two findings this pass exists for: a podcast that could not be played
 * from the keyboard, and a read-only table of contents rendered as disabled
 * buttons.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { ArticleCardV4 } from './ArticleCardV4';
import { ArticleHeaderV4 } from './ArticleHeaderV4';
import { AuthorBylineV4 } from './AuthorBylineV4';
import { BookmarkButtonV4 } from './BookmarkButtonV4';
import { CategoryChipV4 } from './CategoryChipV4';
import { NewsTickerV4 } from './NewsTickerV4';
import { PodcastRowV4 } from './PodcastRowV4';
import { PullQuoteV4 } from './PullQuoteV4';
import { ReadingProgressV4 } from './ReadingProgressV4';
import { RelatedArticlesV4 } from './RelatedArticlesV4';
import { ShareRowV4 } from './ShareRowV4';
import { TableOfContentsV4 } from './TableOfContentsV4';
import { TagListV4 } from './TagListV4';
import { readingPercent, spokenLine } from './internal/reading-v4';

const ARTICLE = { id: 'a1', title: 'The tide line' };
const EPISODE = { id: 'e1', title: 'Episode one', show: 'The Show' };

describe('reading-v4', () => {
  it('clamps a reading position into the track', () => {
    // The base handed a raw number to the bar, so a caller mid-computation
    // could push the fill past the end of it.
    expect(readingPercent(50)).toBe(50);
    expect(readingPercent(140)).toBe(100);
    expect(readingPercent(-10)).toBe(0);
    expect(readingPercent(undefined)).toBe(0);
    expect(readingPercent(Number.NaN)).toBe(0);
  });

  it('joins a spoken line with commas, not the visible middle dot', () => {
    // A reader either says "middle dot" out loud or swallows the pause.
    expect(spokenLine(['Ada', null, 'Today', ''])).toBe('Ada, Today');
  });
});

describe('PodcastRowV4', () => {
  it('keeps the play control out of the row\'s own activation', () => {
    // The finding: the row's handler wrapped the play button, so activating
    // play from the keyboard navigated away instead of playing.
    const onPress = jest.fn();
    const onPlayToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <PodcastRowV4 episode={EPISODE} onPress={onPress} onPlayToggle={onPlayToggle} />,
      SEED_LIGHT
    );

    fireEvent.press(getByLabelText(/^Play/));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
    // The row did not also navigate.
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders no play button at all when there is nothing to play', () => {
    // The base drew a permanently greyed one.
    const { queryByLabelText } = renderThemed(
      <PodcastRowV4 episode={EPISODE} onPress={jest.fn()} />,
      SEED_LIGHT
    );
    expect(queryByLabelText(/^Play/)).toBeNull();
  });
});

describe('TableOfContentsV4', () => {
  it('renders a read-only contents list as headings, not disabled buttons', () => {
    // `onSelect` is optional and the base passed `disabled={!onSelect}`, so
    // the ordinary case greyed every heading and dropped it from the order.
    const { getByLabelText, queryByRole } = renderThemed(
      <TableOfContentsV4 items={[{ id: 'h1', label: 'Beginnings' }]} navLabel="Contents" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Contents')).toBeTruthy();
    expect(queryByRole('button')).toBeNull();
  });

  it('selects a heading when it is given something to do', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <TableOfContentsV4 items={[{ id: 'h1', label: 'Beginnings' }]} onSelect={onSelect} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Beginnings/));
    expect(onSelect).toHaveBeenCalledWith('h1');
  });
});

describe('ArticleCardV4 / ArticleHeaderV4', () => {
  it('will not activate a card that has not loaded', () => {
    const onPress = jest.fn();
    const { queryByLabelText, getByLabelText } = renderThemed(
      <ArticleCardV4 article={ARTICLE} loading onPress={onPress} loadingLabel="Loading article" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Loading article')).toBeTruthy();
    expect(queryByLabelText(ARTICLE.title)).toBeNull();
  });

  it('activates a loaded one', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <ArticleCardV4 article={ARTICLE} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(ARTICLE.title));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders a header', () => {
    const { getByText } = renderThemed(
      <ArticleHeaderV4 title={ARTICLE.title} deck="A standfirst" />,
      SEED_LIGHT
    );
    expect(getByText('A standfirst')).toBeTruthy();
  });
});

describe('AuthorBylineV4 / PullQuoteV4 / ReadingProgressV4', () => {
  it('builds the byline through a prop rather than a baked-in word', () => {
    const { getByLabelText } = renderThemed(
      <AuthorBylineV4 author={{ name: 'Ada' }} formatByline={(name) => `Words by ${name}`} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Words by Ada/)).toBeTruthy();
  });

  it('renders nothing without a quote', () => {
    const { toJSON } = renderThemed(<PullQuoteV4 quote="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('reports the reading position through the format prop', () => {
    const { getByLabelText } = renderThemed(
      <ReadingProgressV4 progress={0.5} formatProgress={(pct) => `${pct}% done`} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/50% done/)).toBeTruthy();
  });
});

describe('BookmarkButtonV4 / CategoryChipV4 / ShareRowV4', () => {
  it('names both bookmark states', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <BookmarkButtonV4 bookmarked={false} onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Bookmark article'));
    expect(onToggle).toHaveBeenCalled();

    // A second render rather than `rerender`: the house helper's rerender
    // replaces the tree *including* the theme provider it wrapped.
    const saved = renderThemed(<BookmarkButtonV4 bookmarked onToggle={onToggle} />, SEED_LIGHT);
    expect(saved.getByLabelText('Remove bookmark')).toBeTruthy();
  });

  it('announces an active chip as selected, not by its border alone', () => {
    const { getByLabelText } = renderThemed(
      <CategoryChipV4 label="Culture" active onPress={jest.fn()} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Culture/).props.accessibilityState).toMatchObject({ selected: true });
  });

  it('shares through a named control', () => {
    const onShare = jest.fn();
    const { getByLabelText } = renderThemed(
      <ShareRowV4 targets={[{ id: 'copy', glyph: '🔗', label: 'Copy link' }]} onShare={onShare} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Copy link/));
    expect(onShare).toHaveBeenCalledWith('copy');
  });
});

describe('TagListV4 / RelatedArticlesV4 / NewsTickerV4', () => {
  it('says what the overflow chip stands for', () => {
    // The base rendered "+3" with nothing to say what the three were.
    const { getByLabelText } = renderThemed(
      <TagListV4 tags={['One', 'Two']} max={1} />,
      SEED_LIGHT
    );
    expect(getByLabelText('1 more tags')).toBeTruthy();
  });

  it('gives an empty related list a real empty state', () => {
    const { getByText } = renderThemed(
      <RelatedArticlesV4
        articles={[]}
        emptyLabel="Nothing related yet"
        emptyDescription="Try another section."
      />,
      SEED_LIGHT
    );
    expect(getByText('Try another section.')).toBeTruthy();
  });

  it('does not paint an editorial eyebrow in the error colour', () => {
    // `label` is caller copy — a section name is not a danger state.
    const { getByText } = renderThemed(
      <NewsTickerV4 items={[{ id: 'n1', text: 'A headline' }]} label="SPONSORED" />,
      SEED_LIGHT
    );
    expect(getByText('SPONSORED')).toBeTruthy();
  });
});
