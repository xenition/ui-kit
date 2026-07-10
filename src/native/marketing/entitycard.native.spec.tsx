import * as React from 'react';
import { Image, Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { EntityCard } from './EntityCard';

describe('EntityCard (native)', () => {
  it('renders a blog post (seed cover fallback + date meta)', () => {
    const { root, getByTestId, queryByText } = renderThemed(
      <EntityCard title="Restyle by prompt" media={{ seed: 'restyle' }} meta="Mar 3, 2026" />,
      SEED_LIGHT
    );
    expect(queryByText('Restyle by prompt')).toBeTruthy();
    // No imageUrl → GenerativeCover (no <Image>).
    expect(root.findAllByType(Image)).toHaveLength(0);
    expect(getByTestId('xen-entity-meta').props.children).toBe('Mar 3, 2026');
  });

  it('renders a service (price · duration meta)', () => {
    const { getByTestId } = renderThemed(
      <EntityCard title="Deep Tissue Massage" meta="$120 · 60 min" media={{ seed: 'm' }} />,
      SEED_LIGHT
    );
    expect(getByTestId('xen-entity-meta').props.children).toBe('$120 · 60 min');
  });

  it('renders a speaker (eyebrow=company, meta=talk)', () => {
    const { queryByText } = renderThemed(
      <EntityCard
        title="Ada Lovelace"
        eyebrow="Analytical Engines Inc."
        meta="Keynote: Computing the Future"
        media={{ imageUrl: 'https://cdn.example/ada.jpg' }}
      />,
      SEED_LIGHT
    );
    expect(queryByText('Analytical Engines Inc.')).toBeTruthy();
    expect(queryByText('Keynote: Computing the Future')).toBeTruthy();
  });

  it('renders a listing (imageUrl media + Featured badge)', () => {
    const { root, getByTestId } = renderThemed(
      <EntityCard
        title="Loft in Mitte"
        eyebrow="Apartments"
        meta="$2,400 / mo"
        media={{ imageUrl: 'https://cdn.example/loft.jpg', aspect: 1.5 }}
        badge={<Text>Featured</Text>}
      />,
      SEED_LIGHT
    );
    const images = root.findAllByType(Image);
    expect(images).toHaveLength(1);
    expect(images[0]!.props.source).toEqual({ uri: 'https://cdn.example/loft.jpg' });
    expect(getByTestId('xen-entity-badge')).toBeTruthy();
  });

  it('renders a program (no media) and fires onPress', () => {
    const onPress = jest.fn();
    const { root, queryByText, getByLabelText } = renderThemed(
      <EntityCard
        title="Intro to Ceramics"
        eyebrow="Weekend Workshop"
        description="Six sessions covering wheel-throwing and glazing."
        footer={<Text>Enroll</Text>}
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(queryByText('Six sessions covering wheel-throwing and glazing.')).toBeTruthy();
    expect(queryByText('Enroll')).toBeTruthy();
    expect(root.findAllByType(Image)).toHaveLength(0);
    fireEvent.press(getByLabelText('Intro to Ceramics'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('every rendered hex traces to a compiled token (both seeds)', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <EntityCard
          title="Listing"
          eyebrow="Category"
          description="A place to stay."
          meta="$2,400 / mo"
          media={{ seed: 'listing' }}
          badge={<Text>Featured</Text>}
          footer={<Text>Details</Text>}
        />,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
