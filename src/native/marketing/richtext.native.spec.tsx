import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { RichText, parseRichText } from './RichText';

describe('parseRichText', () => {
  it('parses headings, paragraphs, list items and blockquotes in order', () => {
    const blocks = parseRichText(
      '<h2>Our Story</h2><p>We started small.</p><ul><li>One</li><li>Two</li></ul><blockquote>Quote here</blockquote>'
    );
    expect(blocks.map((b) => b.kind)).toEqual([
      'heading', 'paragraph', 'listitem', 'listitem', 'quote',
    ]);
    expect(blocks[0]).toMatchObject({ kind: 'heading', level: 2, text: 'Our Story' });
    expect(blocks[2]).toMatchObject({ kind: 'listitem', text: 'One' });
  });

  it('strips inline tags and decodes entities', () => {
    const [p] = parseRichText('<p>Fish &amp; chips &mdash; <strong>tasty</strong> &#39;n cheap</p>');
    expect(p!.text).toBe("Fish & chips — tasty 'n cheap");
  });

  it('treats tag-less content as a single paragraph', () => {
    expect(parseRichText('just some text')).toEqual([{ kind: 'paragraph', text: 'just some text' }]);
  });

  it('captures loose text between blocks', () => {
    const blocks = parseRichText('<h3>A</h3> loose <p>B</p>');
    expect(blocks.map((b) => b.text)).toEqual(['A', 'loose', 'B']);
  });

  it('ignores empty blocks', () => {
    expect(parseRichText('<p></p><p>   </p><p>real</p>')).toEqual([
      { kind: 'paragraph', text: 'real' },
    ]);
  });
});

describe('RichText (native)', () => {
  it('renders each block as text', () => {
    const { queryByText } = renderThemed(
      <RichText html="<h2>Title</h2><p>Body copy.</p><ul><li>Item</li></ul>" />,
      SEED_LIGHT
    );
    expect(queryByText('Title')).toBeTruthy();
    expect(queryByText('Body copy.')).toBeTruthy();
    expect(queryByText('Item')).toBeTruthy();
  });
});
