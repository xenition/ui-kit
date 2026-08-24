/** @jest-environment jsdom */
/**
 * Content v2/v3 alternate designs (web / React DOM): render smoke, token-class
 * purity (no literal hex in any className or inline style), and one key
 * interaction/state assertion per variant. These mirror the base
 * `content.spec.tsx` contracts for the drop-in alternate designs.
 */
import { fireEvent, render } from '@testing-library/react';
import { ArticleCardV2 } from './ArticleCardV2';
import { ArticleCardV3 } from './ArticleCardV3';
import { ArticleHeaderV2 } from './ArticleHeaderV2';
import { ArticleHeaderV3 } from './ArticleHeaderV3';
import { AuthorBylineV2 } from './AuthorBylineV2';
import { AuthorBylineV3 } from './AuthorBylineV3';
import { PodcastRowV2 } from './PodcastRowV2';
import { PodcastRowV3 } from './PodcastRowV3';
import type { ArticleSummary, ContentAuthor, PodcastEpisode } from './types';

const AUTHOR: ContentAuthor = { name: 'Ada Lovelace', role: 'Principal Engineer' };

const ARTICLE: ArticleSummary = {
  id: 'a1',
  title: 'The State of Web Design Systems',
  excerpt: 'How token-driven theming crossed the web/native divide.',
  imageUrl: 'https://example.com/cover.jpg',
  category: 'Engineering',
  author: AUTHOR,
  date: 'Aug 24',
  readingTime: '6 min read',
};

const EPISODE: PodcastEpisode = {
  id: 'e1',
  title: 'Episode 12',
  show: 'The Reader',
  duration: '42 min',
};

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

/** Assert no rendered className or inline style carries a literal hex color. */
function expectTokenPurity(container: HTMLElement): void {
  container.querySelectorAll<HTMLElement>('[class]').forEach((el) => {
    expect(el.className).not.toMatch(HEX_LITERAL);
  });
  container.querySelectorAll<HTMLElement>('[style]').forEach((el) => {
    expect(el.getAttribute('style') ?? '').not.toMatch(HEX_LITERAL);
  });
}

describe('content v2/v3 design variants (web)', () => {
  it('ArticleCardV2 renders (media-forward) and fires onClick with the article', () => {
    const onClick = jest.fn();
    const { getByRole, getByText, container } = render(
      <ArticleCardV2 article={ARTICLE} onClick={onClick} variant="featured" />
    );
    expect(getByText(ARTICLE.title)).toBeTruthy();
    expectTokenPurity(container);
    fireEvent.click(getByRole('button', { name: ARTICLE.title }));
    expect(onClick).toHaveBeenCalledWith(ARTICLE);
  });

  it('ArticleCardV3 renders (text-first) and fires onClick with the article', () => {
    const onClick = jest.fn();
    const { getByRole, getByText, container } = render(
      <ArticleCardV3 article={ARTICLE} onClick={onClick} />
    );
    expect(getByText(ARTICLE.title)).toBeTruthy();
    expectTokenPurity(container);
    fireEvent.click(getByRole('button', { name: ARTICLE.title }));
    expect(onClick).toHaveBeenCalledWith(ARTICLE);
  });

  it('ArticleHeaderV2 renders the headline (hero); loading hides it', () => {
    const { getByRole, container, unmount } = render(
      <ArticleHeaderV2 title={ARTICLE.title} category="Engineering" author={AUTHOR} variant="hero" />
    );
    expect(getByRole('heading', { name: ARTICLE.title })).toBeTruthy();
    expectTokenPurity(container);
    unmount();

    const { queryByText } = render(<ArticleHeaderV2 title={ARTICLE.title} loading />);
    expect(queryByText(ARTICLE.title)).toBeNull();
  });

  it('ArticleHeaderV3 renders headline, category and byline (editorial)', () => {
    const { getByRole, getByText, container } = render(
      <ArticleHeaderV3
        title={ARTICLE.title}
        deck="A field report."
        category="Engineering"
        author={AUTHOR}
        date={ARTICLE.date}
        readingTime={ARTICLE.readingTime}
      />
    );
    expect(getByRole('heading', { name: ARTICLE.title })).toBeTruthy();
    expect(getByText('Engineering')).toBeTruthy();
    expect(getByText('Ada Lovelace')).toBeTruthy();
    expectTokenPurity(container);
  });

  it('AuthorBylineV2 renders the enclosed chip with an accessible credit label', () => {
    const { getByLabelText, getByText, container } = render(
      <AuthorBylineV2 author={AUTHOR} date="Aug 24" readingTime="6 min" />
    );
    expect(getByText('Written by')).toBeTruthy();
    expect(getByLabelText(/By Ada Lovelace/)).toBeTruthy();
    expectTokenPurity(container);
  });

  it('AuthorBylineV3 renders the centered stacked credit', () => {
    const { getByLabelText, getByText, container } = render(
      <AuthorBylineV3 author={AUTHOR} date="Aug 24" readingTime="6 min" />
    );
    expect(getByText('Ada Lovelace')).toBeTruthy();
    expect(getByLabelText(/By Ada Lovelace/)).toBeTruthy();
    expectTokenPurity(container);
  });

  it('PodcastRowV2 toggles play separately from the row click (player card)', () => {
    const onPlayToggle = jest.fn();
    const onClick = jest.fn();
    const { getByLabelText, container } = render(
      <PodcastRowV2 episode={EPISODE} playing={false} onPlayToggle={onPlayToggle} onClick={onClick} />
    );
    expectTokenPurity(container);
    fireEvent.click(getByLabelText('Play Episode 12'));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('PodcastRowV3 toggles play separately from the row click (playlist line)', () => {
    const onPlayToggle = jest.fn();
    const onClick = jest.fn();
    const { getByLabelText, container } = render(
      <PodcastRowV3 episode={EPISODE} playing onPlayToggle={onPlayToggle} onClick={onClick} />
    );
    expectTokenPurity(container);
    const btn = getByLabelText('Pause Episode 12');
    expect(btn.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(btn);
    expect(onPlayToggle).toHaveBeenCalledWith(false);
    expect(onClick).not.toHaveBeenCalled();
  });
});
