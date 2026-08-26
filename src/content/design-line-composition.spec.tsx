/** @jest-environment jsdom */
/**
 * Design-line composition (web). The v2/v3 alternates exist so an app can pick
 * one line and stay in it — every screen it sees is drawn the same way. A
 * composite that reaches back across the line ships a v2 shell with base parts
 * inside it and quietly undoes that choice; because the alternates take
 * identical props, the compiler cannot catch it and nothing on screen is
 * different enough to notice at a glance. So it is asserted here: each
 * ArticleHeader renders the byline from its own line and no other.
 *
 * No cover image is supplied on purpose — v2 prints a flat credit line over a
 * cover and only composes the byline without one, so this is the case that
 * actually exercises the composition.
 */
import { render } from '@testing-library/react';
import { ArticleHeader } from './ArticleHeader';
import { ArticleHeaderV2 } from './ArticleHeaderV2';
import { ArticleHeaderV3 } from './ArticleHeaderV3';
import type { ArticleHeaderProps } from './ArticleHeader';

// Each byline is stubbed to a distinguishable marker so the assertion is about
// which module the composite reached for, not about how it looks.
jest.mock('./AuthorByline', () => ({ AuthorByline: () => <p>author-byline-base</p> }));
jest.mock('./AuthorBylineV2', () => ({ AuthorBylineV2: () => <p>author-byline-v2</p> }));
jest.mock('./AuthorBylineV3', () => ({ AuthorBylineV3: () => <p>author-byline-v3</p> }));

const AUTHOR = { name: 'Ada Lovelace', role: 'Senior Editor' };

const renderHeader = (Header: React.ComponentType<ArticleHeaderProps>) =>
  render(<Header title="On the analytical engine" author={AUTHOR} date="12 Jan" readingTime="6 min" />);

describe('ArticleHeader composes within its own design line (web)', () => {
  it('the base header uses the base byline', () => {
    const { queryByText } = renderHeader(ArticleHeader);
    expect(queryByText('author-byline-base')).toBeTruthy();
    expect(queryByText('author-byline-v2')).toBeNull();
    expect(queryByText('author-byline-v3')).toBeNull();
  });

  it('v2 uses the v2 byline, never the base one', () => {
    const { queryByText } = renderHeader(ArticleHeaderV2);
    expect(queryByText('author-byline-v2')).toBeTruthy();
    expect(queryByText('author-byline-base')).toBeNull();
    expect(queryByText('author-byline-v3')).toBeNull();
  });

  it('v3 uses the v3 byline, never the base one', () => {
    const { queryByText } = renderHeader(ArticleHeaderV3);
    expect(queryByText('author-byline-v3')).toBeTruthy();
    expect(queryByText('author-byline-base')).toBeNull();
    expect(queryByText('author-byline-v2')).toBeNull();
  });
});
