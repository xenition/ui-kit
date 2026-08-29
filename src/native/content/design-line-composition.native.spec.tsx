/**
 * Design-line composition (native). The V2/V3 alternates exist so an app can
 * pick one line and stay in it — every screen it sees is drawn the same way.
 * A composite that reaches back across the line ships a V2 shell with base
 * parts inside it and quietly undoes that choice; because the alternates take
 * identical props, the compiler cannot catch it and nothing on screen is
 * different enough to notice at a glance. So it is asserted here: each
 * ArticleHeader renders the byline from its own line and no other.
 *
 * No cover image is supplied on purpose — V2 prints a flat credit line over a
 * cover and only composes the byline without one, so this is the case that
 * actually exercises the composition.
 */
import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { ArticleHeader } from './ArticleHeader';
import { ArticleHeaderV2 } from './ArticleHeaderV2';
import { ArticleHeaderV3 } from './ArticleHeaderV3';
import type { ArticleHeaderProps } from './ArticleHeader';
import type { ContentAuthor } from './types';

// Each byline is stubbed to a distinguishable marker so the assertion is about
// which module the composite reached for, not about how it looks.
jest.mock('./AuthorByline', () => {
  const react = require('react');
  const { Text } = require('react-native');
  return { AuthorByline: () => react.createElement(Text, null, 'author-byline-base') };
});
jest.mock('./AuthorBylineV2', () => {
  const react = require('react');
  const { Text } = require('react-native');
  return { AuthorBylineV2: () => react.createElement(Text, null, 'author-byline-v2') };
});
jest.mock('./AuthorBylineV3', () => {
  const react = require('react');
  const { Text } = require('react-native');
  return { AuthorBylineV3: () => react.createElement(Text, null, 'author-byline-v3') };
});

const AUTHOR: ContentAuthor = { name: 'Ada Lovelace', role: 'Senior Editor' };

const renderHeader = (Header: React.ComponentType<ArticleHeaderProps>) =>
  renderThemed(
    <Header title="On the analytical engine" author={AUTHOR} date="12 Jan" readingTime="6 min" />,
    SEED_LIGHT
  );

describe('ArticleHeader composes within its own design line (native)', () => {
  it('the base header uses the base byline', () => {
    const { queryByText } = renderHeader(ArticleHeader);
    expect(queryByText('author-byline-base')).toBeTruthy();
    expect(queryByText('author-byline-v2')).toBeNull();
    expect(queryByText('author-byline-v3')).toBeNull();
  });

  it('V2 uses the V2 byline, never the base one', () => {
    const { queryByText } = renderHeader(ArticleHeaderV2);
    expect(queryByText('author-byline-v2')).toBeTruthy();
    expect(queryByText('author-byline-base')).toBeNull();
    expect(queryByText('author-byline-v3')).toBeNull();
  });

  it('V3 uses the V3 byline, never the base one', () => {
    const { queryByText } = renderHeader(ArticleHeaderV3);
    expect(queryByText('author-byline-v3')).toBeTruthy();
    expect(queryByText('author-byline-base')).toBeNull();
    expect(queryByText('author-byline-v2')).toBeNull();
  });
});
