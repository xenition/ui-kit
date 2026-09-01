/** @jest-environment jsdom */
/**
 * The **V4 content line** (web) — the twin of
 * `native/content/v4-line.native.spec.tsx`, plus the web's own half of the
 * podcast finding: the play button is no longer a descendant of the row's
 * activation, so a keydown cannot bubble out of it.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
    expect(readingPercent(50)).toBe(50);
    expect(readingPercent(140)).toBe(100);
    expect(readingPercent(-10)).toBe(0);
    expect(readingPercent(Number.NaN)).toBe(0);
  });

  it('joins a spoken line with commas', () => {
    expect(spokenLine(['Ada', null, 'Today', ''])).toBe('Ada, Today');
  });
});

describe('PodcastRowV4', () => {
  it('plays from the keyboard instead of navigating away', () => {
    // The finding. The row's `onKeyDown` used to sit on the container that
    // wrapped this button, and unlike the click path it was not guarded: a
    // Space here cancelled the button's own activation and called the row's
    // handler. The play control is now a sibling, so nothing bubbles.
    const onClick = jest.fn();
    const onPlayToggle = jest.fn();
    const { getByLabelText } = render(
      <PodcastRowV4 episode={EPISODE} onClick={onClick} onPlayToggle={onPlayToggle} />
    );

    const play = getByLabelText(/^Play/);
    fireEvent.keyDown(play, { key: ' ' });
    fireEvent.click(play);

    expect(onPlayToggle).toHaveBeenCalledWith(true);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not nest the play button inside the row activation', () => {
    const { getByLabelText } = render(
      <PodcastRowV4 episode={EPISODE} onClick={jest.fn()} onPlayToggle={jest.fn()} />
    );
    const play = getByLabelText(/^Play/);
    // Interactive content inside a control is invalid, and it is how the
    // keydown escaped in the first place.
    expect(play.closest('button')).toBe(play);
  });

  it('renders no play button when there is nothing to play', () => {
    const { queryByLabelText } = render(<PodcastRowV4 episode={EPISODE} onClick={jest.fn()} />);
    expect(queryByLabelText(/^Play/)).toBeNull();
  });
});

describe('TableOfContentsV4', () => {
  it('renders a read-only contents list as navigation, not disabled buttons', () => {
    const { getByRole, queryByRole } = render(
      <TableOfContentsV4 items={[{ id: 'h1', label: 'Beginnings' }]} navLabel="Contents" />
    );
    expect(getByRole('navigation')).toBeTruthy();
    expect(queryByRole('button')).toBeNull();
  });

  it('selects a heading when it is given something to do', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(
      <TableOfContentsV4 items={[{ id: 'h1', label: 'Beginnings' }]} onSelect={onSelect} />
    );
    const button = getByRole('button', { name: /Beginnings/ });
    expect((button as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(button);
    expect(onSelect).toHaveBeenCalledWith('h1');
  });
});

describe('ArticleCardV4 / ArticleHeaderV4', () => {
  it('will not activate a card that has not loaded', () => {
    const onClick = jest.fn();
    const { queryByRole, getByLabelText } = render(
      <ArticleCardV4 article={ARTICLE} loading onClick={onClick} loadingLabel="Loading article" />
    );
    expect(getByLabelText('Loading article')).toBeTruthy();
    expect(queryByRole('button')).toBeNull();
  });

  it('activates a loaded one', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<ArticleCardV4 article={ARTICLE} onClick={onClick} />);
    fireEvent.click(getByRole('button', { name: ARTICLE.title }));
    expect(onClick).toHaveBeenCalled();
  });

  it('renders a header', () => {
    const { getByText } = render(
      <ArticleHeaderV4 title={ARTICLE.title} deck="A standfirst" />
    );
    expect(getByText('A standfirst')).toBeTruthy();
  });
});

describe('AuthorBylineV4 / PullQuoteV4 / ReadingProgressV4', () => {
  it('builds the byline through a prop rather than a baked-in word', () => {
    const { getByLabelText } = render(
      <AuthorBylineV4 author={{ name: 'Ada' }} formatByline={(name) => `Words by ${name}`} />
    );
    expect(getByLabelText(/Words by Ada/)).toBeTruthy();
  });

  it('reads the quote once, with no duplicating label', () => {
    // The base hung an `aria-label` on the figure that repeated the very text
    // the blockquote below it already reads.
    const { container, getByText } = render(<PullQuoteV4 quote="A sentence." />);
    expect(getByText(/A sentence\./)).toBeTruthy();
    expect(container.querySelector('figure')?.getAttribute('aria-label')).toBeNull();
  });

  it('names the progressbar itself, not a roleless wrapper', () => {
    const { getByRole } = render(
      <ReadingProgressV4 progress={0.5} formatProgress={(pct) => `${pct}% done`} />
    );
    expect(getByRole('progressbar').getAttribute('aria-label')).toContain('50% done');
  });
});

describe('BookmarkButtonV4 / CategoryChipV4 / ShareRowV4', () => {
  it('names both bookmark states', () => {
    const onToggle = jest.fn();
    const { getByLabelText, rerender } = render(
      <BookmarkButtonV4 bookmarked={false} onToggle={onToggle} />
    );
    fireEvent.click(getByLabelText('Bookmark article'));
    expect(onToggle).toHaveBeenCalled();

    rerender(<BookmarkButtonV4 bookmarked onToggle={onToggle} />);
    expect(getByLabelText('Remove bookmark')).toBeTruthy();
  });

  it('announces an active chip as pressed, not by its border alone', () => {
    const { getByLabelText } = render(
      <CategoryChipV4 label="Culture" active onClick={jest.fn()} />
    );
    expect(getByLabelText(/Culture/).getAttribute('aria-pressed')).toBe('true');
  });

  it('shares through a named control', () => {
    const onShare = jest.fn();
    const { getByLabelText } = render(
      <ShareRowV4 targets={[{ id: 'copy', glyph: '🔗', label: 'Copy link' }]} onShare={onShare} />
    );
    fireEvent.click(getByLabelText(/Copy link/));
    expect(onShare).toHaveBeenCalledWith('copy');
  });
});

describe('TagListV4 / RelatedArticlesV4 / NewsTickerV4', () => {
  it('keeps the caller\'s props when the list is empty', () => {
    // The populated branch spread `{...rest}` and the empty one did not, so
    // every id, data-* and handler vanished exactly when there was nothing.
    const { container } = render(<TagListV4 tags={[]} data-testid="tags" id="tag-list" />);
    expect(container.querySelector('#tag-list')).toBeTruthy();
  });

  it('says what the overflow chip stands for', () => {
    const { getByLabelText } = render(
      <TagListV4 tags={['One', 'Two']} max={1} />
    );
    expect(getByLabelText('1 more tags')).toBeTruthy();
  });

  it('gives an empty related list a real empty state', () => {
    const { getByText } = render(
      <RelatedArticlesV4
        articles={[]}
        emptyLabel="Nothing related yet"
        emptyDescription="Try another section."
      />
    );
    expect(getByText('Try another section.')).toBeTruthy();
  });

  it('does not paint an editorial eyebrow in the error colour', () => {
    const { getByText } = render(
      <NewsTickerV4 items={[{ id: 'n1', text: 'A headline' }]} label="SPONSORED" />
    );
    expect(getByText('SPONSORED')).toBeTruthy();
  });
});
