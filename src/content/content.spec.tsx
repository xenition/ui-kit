/** @jest-environment jsdom */
/**
 * Content components (web / React DOM): render smoke, token-class purity
 * (every color traces to a `--xen-*` utility, no literal hex), and the
 * behavioral contracts (article click, bookmark toggle, tag click, ToC select,
 * share, news-ticker item click, empty RelatedArticles).
 */
import { fireEvent, render } from '@testing-library/react';
import { ArticleCard } from './ArticleCard';
import { ArticleHeader } from './ArticleHeader';
import { AuthorByline } from './AuthorByline';
import { ReadingProgress } from './ReadingProgress';
import { PullQuote } from './PullQuote';
import { TagList } from './TagList';
import { CategoryChip } from './CategoryChip';
import { TableOfContents } from './TableOfContents';
import { RelatedArticles } from './RelatedArticles';
import { ShareRow } from './ShareRow';
import { BookmarkButton } from './BookmarkButton';
import { NewsTicker } from './NewsTicker';
import { PodcastRow } from './PodcastRow';
import type { ArticleSummary } from './types';

const ARTICLE: ArticleSummary = {
  id: 'a1',
  title: 'The State of Web Design Systems',
  excerpt: 'How token-driven theming crossed the web/native divide.',
  imageUrl: 'https://example.com/cover.jpg',
  category: 'Engineering',
  author: { name: 'Ada Lovelace', role: 'Principal Engineer' },
  date: 'Aug 24',
  readingTime: '6 min read',
};

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

describe('content components (web)', () => {
  it('ArticleCard renders headline + token surface and fires onClick with the article', () => {
    const onClick = jest.fn();
    const { getByText, getByRole } = render(
      <ArticleCard article={ARTICLE} onClick={onClick} variant="featured" />
    );
    expect(getByText(ARTICLE.title)).toBeTruthy();
    const card = getByRole('button', { name: ARTICLE.title });
    // token class (Card composes bg-surface); no literal color anywhere.
    expect(card.className).toContain('bg-surface');
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledWith(ARTICLE);
  });

  it('ArticleHeader renders headline, category chip and byline; loading hides the title', () => {
    const { getByText, getByRole, unmount } = render(
      <ArticleHeader
        title={ARTICLE.title}
        deck="A field report."
        category="Engineering"
        author={ARTICLE.author}
        date={ARTICLE.date}
        readingTime={ARTICLE.readingTime}
        variant="hero"
      />
    );
    expect(getByRole('heading', { name: ARTICLE.title })).toBeTruthy();
    expect(getByText('Engineering')).toBeTruthy();
    expect(getByText('Ada Lovelace')).toBeTruthy();
    unmount();

    const { queryByText } = render(<ArticleHeader title={ARTICLE.title} loading />);
    expect(queryByText(ARTICLE.title)).toBeNull();
  });

  it('BookmarkButton toggles: reflects state and calls onToggle with the negated value', () => {
    const onToggle = jest.fn();
    const { getByRole, rerender } = render(
      <BookmarkButton bookmarked={false} onToggle={onToggle} variant="labeled" />
    );
    const btn = getByRole('button', { name: 'Bookmark article' });
    expect(btn.getAttribute('aria-pressed')).toBe('false');
    // token text class present (no hex).
    expect(btn.querySelector('.text-on-surface')).toBeTruthy();
    fireEvent.click(btn);
    expect(onToggle).toHaveBeenCalledWith(true);

    rerender(<BookmarkButton bookmarked onToggle={onToggle} variant="labeled" />);
    const saved = getByRole('button', { name: 'Remove bookmark' });
    expect(saved.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(saved);
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('TagList renders tags, honours max with +N overflow, and fires onTagClick with label + index', () => {
    const onTagClick = jest.fn();
    const { getByText, queryByText } = render(
      <TagList tags={['design', 'tokens', 'native', 'web']} max={2} onTagClick={onTagClick} />
    );
    expect(getByText('#design')).toBeTruthy();
    expect(queryByText('#native')).toBeNull();
    expect(getByText('+2')).toBeTruthy();
    fireEvent.click(getByText('#tokens'));
    expect(onTagClick).toHaveBeenCalledWith('tokens', 1);
  });

  it('TableOfContents highlights the active heading (accent token) and fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <TableOfContents
        items={[
          { id: 'intro', label: 'Intro', level: 1 },
          { id: 'deep', label: 'Deep Dive', level: 2 },
        ]}
        activeId="deep"
        onSelect={onSelect}
      />
    );
    // active row uses the accent token color.
    expect(getByText('Deep Dive').className).toContain('text-accent');
    fireEvent.click(getByText('Intro'));
    expect(onSelect).toHaveBeenCalledWith('intro');
  });

  it('ShareRow fires onShare with the clicked target id', () => {
    const onShare = jest.fn();
    const { getByLabelText } = render(<ShareRow onShare={onShare} variant="labeled" />);
    fireEvent.click(getByLabelText('Copy link'));
    expect(onShare).toHaveBeenCalledWith('link');
  });

  it('NewsTicker renders the label badge + headlines and fires onItemClick', () => {
    const onItemClick = jest.fn();
    const { getByText } = render(
      <NewsTicker
        label="LIVE"
        items={[
          { id: 'h1', text: 'Markets rally' },
          { id: 'h2', text: 'Storm warning issued' },
        ]}
        onItemClick={onItemClick}
      />
    );
    // Badge label uses the danger token background (no hex).
    expect(getByText('LIVE').className).toContain('bg-danger');
    fireEvent.click(getByText('Storm warning issued'));
    expect(onItemClick).toHaveBeenCalledWith('h2');
  });

  it('PodcastRow toggles play separately from the row click', () => {
    const onPlayToggle = jest.fn();
    const onClick = jest.fn();
    const { getByLabelText } = render(
      <PodcastRow
        episode={{ id: 'e1', title: 'Episode 12', show: 'The Reader', duration: '42 min' }}
        playing={false}
        onPlayToggle={onPlayToggle}
        onClick={onClick}
      />
    );
    fireEvent.click(getByLabelText('Play Episode 12'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
    // stopPropagation keeps the row handler from also firing.
    expect(onClick).not.toHaveBeenCalled();
  });

  it('RelatedArticles renders its empty state (heading, no card) and its populated cards', () => {
    const empty = render(<RelatedArticles articles={[]} emptyLabel="Nothing related yet" />);
    expect(empty.getByText('Nothing related yet')).toBeTruthy();
    expect(empty.queryByText(ARTICLE.title)).toBeNull();

    const onArticleClick = jest.fn();
    const filled = render(
      <RelatedArticles articles={[ARTICLE]} onArticleClick={onArticleClick} variant="grid" />
    );
    fireEvent.click(filled.getByRole('button', { name: ARTICLE.title }));
    expect(onArticleClick).toHaveBeenCalledWith(ARTICLE);
  });

  it('CategoryChip fires onClick; PullQuote / ReadingProgress / AuthorByline mount', () => {
    const onClick = jest.fn();
    const { getByLabelText, getByText } = render(
      <>
        <CategoryChip label="Opinion" onClick={onClick} variant="outline" />
        <PullQuote quote="Tokens are the contract." attribution="A. Dev" variant="large" />
        <ReadingProgress progress={0.42} variant="labeled" />
        <AuthorByline author={ARTICLE.author!} date="Aug 24" readingTime="6 min" variant="compact" />
      </>
    );
    expect(getByText('“Tokens are the contract.”')).toBeTruthy();
    expect(getByText('42%')).toBeTruthy();
    fireEvent.click(getByLabelText('Category Opinion'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('token purity: no literal hex color appears in any rendered className', () => {
    const { container } = render(
      <>
        <ArticleCard article={ARTICLE} onClick={jest.fn()} />
        <ArticleHeader title={ARTICLE.title} category="News" author={ARTICLE.author} />
        <ReadingProgress progress={0.5} variant="labeled" />
        <TableOfContents items={[{ id: 'a', label: 'A' }]} activeId="a" onSelect={jest.fn()} />
        <PullQuote quote="Q" attribution="X" />
        <TagList tags={['x', 'y']} onTagClick={jest.fn()} />
        <CategoryChip label="News" variant="solid" />
        <RelatedArticles articles={[]} />
        <ShareRow onShare={jest.fn()} />
        <BookmarkButton bookmarked onToggle={jest.fn()} variant="labeled" />
        <NewsTicker items={[{ id: 'h', text: 'H' }]} onItemClick={jest.fn()} />
        <PodcastRow episode={{ id: 'e', title: 'E', show: 'S', duration: '1 min' }} playing onPlayToggle={jest.fn()} />
      </>
    );
    container.querySelectorAll<HTMLElement>('[class]').forEach((el) => {
      expect(el.className).not.toMatch(HEX_LITERAL);
    });
  });
});
