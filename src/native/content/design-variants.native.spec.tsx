import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  tokenHexSet,
  renderedStyleHexes,
} from '../spec-support/render-native';
import { ArticleCardV2 } from './ArticleCardV2';
import { ArticleCardV3 } from './ArticleCardV3';
import { ArticleHeaderV2 } from './ArticleHeaderV2';
import { ArticleHeaderV3 } from './ArticleHeaderV3';
import { PodcastRowV2 } from './PodcastRowV2';
import { PodcastRowV3 } from './PodcastRowV3';
import { AuthorBylineV2 } from './AuthorBylineV2';
import { AuthorBylineV3 } from './AuthorBylineV3';
import type { ArticleSummary, PodcastEpisode } from './types';

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

const EPISODE: PodcastEpisode = {
  id: 'e1',
  title: 'Episode 12 — Tokens All the Way Down',
  show: 'The Reader',
  duration: '42 min',
};

describe('content design variants (native)', () => {
  it('all V2/V3 variants mount', () => {
    const { getByText, getAllByText } = renderThemed(
      <>
        <ArticleCardV2 article={ARTICLE} onPress={jest.fn()} variant="featured" />
        <ArticleCardV3 article={ARTICLE} onPress={jest.fn()} />
        <ArticleHeaderV2
          title="Header Two"
          category="News"
          deck="A dek."
          coverImageUrl="https://example.com/c.jpg"
          author={ARTICLE.author}
          date="Aug 24"
          readingTime="6 min"
        />
        <ArticleHeaderV3
          title="Header Three"
          category="News"
          deck="A dek."
          author={ARTICLE.author}
          date="Aug 24"
        />
        <PodcastRowV2 episode={EPISODE} onPlayToggle={jest.fn()} onPress={jest.fn()} />
        <PodcastRowV3 episode={EPISODE} onPlayToggle={jest.fn()} />
        <AuthorBylineV2 author={ARTICLE.author!} date="Aug 24" readingTime="6 min" />
        <AuthorBylineV3 author={ARTICLE.author!} date="Aug 24" readingTime="6 min" />
      </>,
      SEED_LIGHT
    );
    expect(getAllByText(ARTICLE.title).length).toBeGreaterThanOrEqual(2);
    expect(getByText('Header Two')).toBeTruthy();
    expect(getByText('Header Three')).toBeTruthy();
    expect(getAllByText('Ada Lovelace').length).toBeGreaterThanOrEqual(2);
  });

  it('ArticleCardV2 fires onPress with the article', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <ArticleCardV2 article={ARTICLE} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText(ARTICLE.title));
    expect(onPress).toHaveBeenCalledWith(ARTICLE);
  });

  it('PodcastRowV2 toggles play separately from row press', () => {
    const onPlayToggle = jest.fn();
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <PodcastRowV2
        episode={EPISODE}
        playing={false}
        onPlayToggle={onPlayToggle}
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(`Play ${EPISODE.title}`));
    expect(onPlayToggle).toHaveBeenCalledWith(true);
    expect(onPress).not.toHaveBeenCalled();
  });

  describe('token purity: every rendered color traces to a theme token', () => {
    it.each([
      ['light', SEED_LIGHT],
      ['dark', SEED_DARK],
    ] as const)('%s scheme uses only compiled token hexes', (_name, seed) => {
      const { toJSON, root } = renderThemed(
        <>
          <ArticleCardV2 article={ARTICLE} onPress={jest.fn()} variant="featured" />
          <ArticleCardV2 article={{ ...ARTICLE, imageUrl: undefined }} onPress={jest.fn()} />
          <ArticleCardV3 article={ARTICLE} onPress={jest.fn()} />
          <ArticleHeaderV2
            title="H2"
            category="News"
            deck="Dek"
            coverImageUrl="https://example.com/c.jpg"
            author={ARTICLE.author}
            date="Aug 24"
            readingTime="6 min"
          />
          <ArticleHeaderV2 title="H2 no cover" category="News" author={ARTICLE.author} />
          <ArticleHeaderV3
            title="H3"
            category="News"
            deck="Dek"
            coverImageUrl="https://example.com/c.jpg"
            author={ARTICLE.author}
            date="Aug 24"
          />
          <PodcastRowV2 episode={EPISODE} playing onPlayToggle={jest.fn()} onPress={jest.fn()} />
          <PodcastRowV2 episode={{ id: 'e2', title: 'No art' }} onPlayToggle={jest.fn()} />
          <PodcastRowV3 episode={EPISODE} playing onPlayToggle={jest.fn()} />
          <AuthorBylineV2 author={ARTICLE.author!} date="Aug 24" readingTime="6 min" />
          <AuthorBylineV3 author={ARTICLE.author!} date="Aug 24" readingTime="6 min" />
        </>,
        seed
      );
      expect(toJSON()).toBeTruthy();
      const allowed = tokenHexSet(seed);
      renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
